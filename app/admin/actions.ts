"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { staffSession } from "@/lib/access";
import type { Vehicle } from "@/lib/types";

const imageTypes: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

export async function saveVehicle(form: FormData) {
  const session = await staffSession();
  if (!session) redirect("/admin");
  const { client } = session;
  const value = (key: string) => String(form.get(key) ?? "").trim();
  const existingId = value("id");
  const id = existingId || crypto.randomUUID();
  const edit = existingId ? "?edit=" + encodeURIComponent(id) + "&" : "?new=1&";
  const fail = (reason: string): never => redirect("/admin" + edit + "error=" + reason);
  const brand = value("brand");
  const model = value("model");
  const description = value("description");
  const location = value("location");
  const type = value("type") as Vehicle["type"];
  const transmission = value("transmission") as Vehicle["transmission"];
  const fuelType = value("fuelType") as Vehicle["fuelType"];
  const year = Number(value("year"));
  const seats = Number(value("seats"));
  const mileage = Number(value("mileage"));
  const price = Number(value("price"));
  const integer = (number: number, min: number, max: number) => Number.isInteger(number) && number >= min && number <= max;
  if (!brand || brand.length > 60 || !model || model.length > 60 ||
      !description || description.length > 3000 || !location || location.length > 120 ||
      !["rental", "sale"].includes(type) || !["Automatic", "Manual"].includes(transmission) ||
      !["Gasoline", "Diesel", "Hybrid", "Electric"].includes(fuelType) ||
      !integer(year, 1900, new Date().getFullYear() + 2) || !integer(seats, 1, 100) ||
      !value("mileage") || !integer(mileage, 0, 9999999) ||
      !Number.isFinite(price) || price <= 0 || price > 10000000) fail("fields");

  const files = form.getAll("photos").filter((file): file is File => file instanceof File && file.size > 0);
  if (files.length > 8 || files.some((file) => !Object.hasOwn(imageTypes, file.type)) ||
      files.reduce((total, file) => total + file.size, 0) > 3 * 1024 * 1024) fail("photos");

  const current = existingId ? await client.from("fleet").select("details, version").eq("id", id).single() : null;
  if (current && (current.error || current.data.version !== value("version"))) fail("conflict");
  const previous = current?.data?.details as Omit<Vehicle, "id"> | undefined;
  const previousPhotos = previous?.imageUrls ?? (previous?.imageUrl ? [previous.imageUrl] : []);
  const replace = form.has("replacePhotos");
  const photos = replace ? [] : [...previousPhotos];
  if (photos.length + files.length < 1 || photos.length + files.length > 8) fail("photos");

  const bucket = client.storage.from("vehicle-photos");
  const uploaded: string[] = [];
  for (const file of files) {
    const path = crypto.randomUUID() + "." + imageTypes[file.type];
    const { error } = await bucket.upload(path, file, { contentType: file.type });
    if (error) {
      if (uploaded.length) await bucket.remove(uploaded);
      fail("save");
    }
    uploaded.push(path);
    photos.push(bucket.getPublicUrl(path).data.publicUrl);
  }

  const details: Omit<Vehicle, "id"> = {
    title: brand + " " + model + " " + year, brand, model, year, type, transmission, seats, fuelType,
    mileage, location, description, available: form.has("available"),
    pricePerDay: type === "rental" ? price : null, salePrice: type === "sale" ? price : null,
    imageUrl: photos[0], imageUrls: photos
  };
  const result = current?.data
    ? await client.from("fleet").update({ details, version: crypto.randomUUID() })
      .eq("id", id).eq("version", current.data.version).select("id").maybeSingle()
    : await client.from("fleet").insert({ id, details }).select("id").single();

  if (result.error || !result.data) {
    if (uploaded.length && (!result.error || /^[0-9A-Z]{5}$/.test(result.error.code))) await bucket.remove(uploaded);
    fail(result.error ? "save" : "conflict");
  }
  revalidatePath("/", "layout");
  redirect("/admin?saved=1");
}

export async function reviewRequest(form: FormData) {
  const session = await staffSession();
  if (!session) redirect("/admin");
  const id = String(form.get("id") ?? "");
  const status = form.get("status");
  if (status !== "approved" && status !== "declined") redirect("/admin?review=error");
  const { data, error } = await session.client.from("rental_requests").update({ status })
    .eq("id", id).eq("status", "pending").select("id").maybeSingle();
  if (error?.code === "23P01") redirect("/admin?review=overlap#rental-requests");
  if (error || !data) redirect("/admin?review=error#rental-requests");
  revalidatePath("/account");
  redirect("/admin?review=saved#rental-requests");
}
