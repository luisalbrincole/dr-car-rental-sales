import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { PlaceholderButton } from "@/components/PlaceholderButton";
import { getVehicles } from "@/lib/inventory";
import Link from "next/link";

export const metadata = {
  title: "Contact and Vehicle Inquiries | DR Car Rental & Sales"
};

type ContactPageProps = {
  searchParams: Promise<{ vehicle?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { vehicle: selectedVehicle = "" } = await searchParams;

  const vehicles = (await getVehicles()).filter((vehicle) => vehicle.type === "sale");
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
      <div>
        <SectionHeader
          eyebrow="Contact"
          title="Ask about vehicle sales or import services"
          description="For rental requests, choose a vehicle and enter your travel dates."
        />
        <Link href="/rentals" className="mb-6 inline-block font-semibold text-palm underline">Browse rental cars</Link>
        <div className="grid gap-4 text-sm text-slate-700">
          <p className="flex items-center gap-3">
            <MessageCircle className="text-palm" size={20} aria-hidden="true" /> WhatsApp: +1 809 555 1234
          </p>
          <p className="flex items-center gap-3">
            <Phone className="text-palm" size={20} aria-hidden="true" /> Phone: +1 809 555 1234
          </p>
          <p className="flex items-center gap-3">
            <Mail className="text-palm" size={20} aria-hidden="true" /> info@drcarrentalsales.com
          </p>
          <p className="flex items-center gap-3">
            <MapPin className="text-palm" size={20} aria-hidden="true" /> Santo Domingo, Dominican Republic
          </p>
        </div>
      </div>

      <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Full name
            <input className="focus-ring rounded-md border border-slate-300 px-4 py-3" type="text" name="name" placeholder="Your name" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Email
            <input className="focus-ring rounded-md border border-slate-300 px-4 py-3" type="email" name="email" placeholder="you@example.com" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            WhatsApp or phone
            <input className="focus-ring rounded-md border border-slate-300 px-4 py-3" type="tel" name="phone" placeholder="+1 809 000 0000" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Request type
            <select className="focus-ring rounded-md border border-slate-300 px-4 py-3" name="requestType" defaultValue="sale">
              <option value="sale">Car purchase</option>
              <option value="general">General question</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Vehicle
            <select className="focus-ring rounded-md border border-slate-300 px-4 py-3" name="vehicle" defaultValue={selectedVehicle}>
              <option value="">Select a vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.title}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Pickup or viewing location
            <input className="focus-ring rounded-md border border-slate-300 px-4 py-3" type="text" name="location" placeholder="Santo Domingo, airport, hotel" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Start date
            <input className="focus-ring rounded-md border border-slate-300 px-4 py-3" type="date" name="startDate" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            End date
            <input className="focus-ring rounded-md border border-slate-300 px-4 py-3" type="date" name="endDate" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
            Message
            <textarea className="focus-ring min-h-32 rounded-md border border-slate-300 px-4 py-3" name="message" placeholder="Tell us what you need." />
          </label>
        </div>
        <PlaceholderButton
          message="This request form is a front-end placeholder. Next step: connect it to Supabase, email, or WhatsApp automation."
          className="mt-6 w-full bg-palm text-white hover:bg-emerald-800 sm:w-auto"
        >
          Send request
        </PlaceholderButton>
      </form>
    </section>
  );
}
