import { getTranslator } from "@/lib/locale";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { PlaceholderButton } from "@/components/PlaceholderButton";
import { getVehicles } from "@/lib/inventory";
import Link from "next/link";

export async function generateMetadata() {
  const t = await getTranslator();
  return { title: t("Contact and Vehicle Inquiries", "Contacto y consultas sobre vehículos") + " | DR Car Rental & Sales" };
}

type ContactPageProps = {
  searchParams: Promise<{ vehicle?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const t = await getTranslator();
  const { vehicle: selectedVehicle = "" } = await searchParams;

  const vehicles = (await getVehicles()).filter((vehicle) => vehicle.type === "sale");
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
      <div>
        <SectionHeader
          eyebrow={t("Contact", "Contacto")}
          title={t("Ask about vehicle sales or import services", "Consulta sobre venta o importación de vehículos")}
          description={t("For rental requests, choose a vehicle and enter your travel dates.", "Para solicitar un alquiler, elige un vehículo e indica las fechas de tu viaje.")}
        />
        <Link href="/rentals" className="mb-6 inline-block font-semibold text-palm underline">{t("Browse rental cars", "Explorar vehículos de alquiler")}</Link>
        <div className="grid gap-4 text-sm text-slate-700">
          <a className="flex items-center gap-3 font-medium text-palm hover:underline" href="https://wa.me/18492570102" target="_blank" rel="noreferrer">
            <MessageCircle size={20} aria-hidden="true" /> WhatsApp +1 849-257-0102
          </a>
          <p className="flex items-center gap-3">
            <Mail className="text-palm" size={20} aria-hidden="true" /> info@drcarrentalsales.com
          </p>
          <p className="flex items-center gap-3">
            <MapPin className="text-palm" size={20} aria-hidden="true" />{" "}{t("Santo Domingo, Dominican Republic", "Santo Domingo, República Dominicana")}
          </p>
        </div>
      </div>

      <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            {t("Full name", "Nombre completo")}
            <input className="focus-ring rounded-md border border-slate-300 px-4 py-3" type="text" name="name" placeholder={t("Your name", "Tu nombre")} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            {t("Email", "Correo electrónico")}
            <input className="focus-ring rounded-md border border-slate-300 px-4 py-3" type="email" name="email" placeholder="you@example.com" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            {t("WhatsApp or phone", "WhatsApp o teléfono")}
            <input className="focus-ring rounded-md border border-slate-300 px-4 py-3" type="tel" name="phone" placeholder="+1 809 000 0000" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            {t("Request type", "Tipo de consulta")}
            <select className="focus-ring rounded-md border border-slate-300 px-4 py-3" name="requestType" defaultValue="sale">
              <option value="sale">{t("Car purchase", "Compra de vehículo")}</option>
              <option value="general">{t("General question", "Consulta general")}</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            {t("Vehicle", "Vehículo")}
            <select className="focus-ring rounded-md border border-slate-300 px-4 py-3" name="vehicle" defaultValue={selectedVehicle}>
              <option value="">{t("Select a vehicle", "Selecciona un vehículo")}</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.title}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            {t("Pickup or viewing location", "Lugar de recogida o visita")}
            <input className="focus-ring rounded-md border border-slate-300 px-4 py-3" type="text" name="location" placeholder={t("Santo Domingo, airport, hotel", "Santo Domingo, aeropuerto, hotel")} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            {t("Start date", "Fecha de inicio")}
            <input className="focus-ring rounded-md border border-slate-300 px-4 py-3" type="date" name="startDate" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            {t("End date", "Fecha de fin")}
            <input className="focus-ring rounded-md border border-slate-300 px-4 py-3" type="date" name="endDate" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
            {t("Message", "Mensaje")}
            <textarea className="focus-ring min-h-32 rounded-md border border-slate-300 px-4 py-3" name="message" placeholder={t("Tell us what you need.", "Cuéntanos qué necesitas.")} />
          </label>
        </div>
        <PlaceholderButton
          message={t("This request form is a front-end placeholder. Next step: connect it to Supabase, email, or WhatsApp automation.", "Este formulario aún no envía solicitudes. Escríbenos por WhatsApp.")}
          className="mt-6 w-full bg-palm text-white hover:bg-emerald-800 sm:w-auto"
        >
          {t("Send request", "Enviar solicitud")}
        </PlaceholderButton>
      </form>
    </section>
  );
}
