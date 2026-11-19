import { getTranslator } from "@/lib/locale";
import { ClipboardCheck, FileText, MessageCircle, Search, Ship, Tags } from "lucide-react";
import { PlaceholderButton } from "@/components/PlaceholderButton";
import { SectionHeader } from "@/components/SectionHeader";

export async function generateMetadata() {
  const t = await getTranslator();
  return { title: t("Import Services", "Servicios de importación") + " | DR Car Rental & Sales" };
}

export default async function ImportServicesPage() {
  const t = await getTranslator();
  const serviceSteps = [
    {
      icon: Search,
      title: t("Vehicle search", "Búsqueda de vehículos"),
      description:
        t("We help identify vehicles in the United States that match your use case, preferred brand, year, and budget.", "Te ayudamos a encontrar vehículos en Estados Unidos según el uso que les darás, la marca, el año y tu presupuesto.")
    },
    {
      icon: Tags,
      title: t("Purchase support", "Apoyo con la compra"),
      description:
        t("Get support comparing listings, understanding prices, and preparing the next steps before buying.", "Recibe ayuda para comparar anuncios, entender los precios y preparar los próximos pasos antes de comprar.")
    },
    {
      icon: Ship,
      title: t("Shipping coordination", "Coordinación del envío"),
      description:
        t("Coordinate transport from the seller or auction location to the port and arrival in Dominican Republic.", "Coordina el transporte desde el vendedor o la subasta hasta el puerto y la llegada a República Dominicana.")
    },
    {
      icon: FileText,
      title: t("Customs and aduanas guidance", "Orientación en aduanas"),
      description:
        t("Understand documents, duties, timelines, and customs requirements before the vehicle arrives.", "Conoce los documentos, aranceles, plazos y requisitos aduaneros antes de que llegue el vehículo.")
    },
    {
      icon: ClipboardCheck,
      title: t("Registration guidance", "Orientación para el registro"),
      description:
        t("Receive guidance for the registration, inspection, and plate process after import.", "Recibe orientación para el registro, la inspección y la placa después de la importación.")
    }
  ];
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="mb-4 inline-flex rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-palm">
              {t("United States to Dominican Republic", "De Estados Unidos a República Dominicana")}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              {t("Import Your Car to Dominican Republic", "Importa tu vehículo a República Dominicana")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              {t("We help customers import cars from the United States to the Dominican Republic with vehicle search, purchase support, shipping coordination, customs and aduanas guidance, and registration or plate process guidance.", "Te ayudamos a importar vehículos desde Estados Unidos a República Dominicana con la búsqueda, la compra, el envío y orientación sobre aduanas, registro y placa.")}
            </p>
            <a
              href={"https://wa.me/18492570102?text=" + encodeURIComponent(t("Hello, I want a car import consultation", "Hola, quisiera consultar sobre la importación de un vehículo"))}
              target="_blank"
              rel="noreferrer"
              className="focus-ring mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-palm px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              <MessageCircle size={18} aria-hidden="true" />
              {t("WhatsApp consultation", "Consulta por WhatsApp")}
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {serviceSteps.map((step) => (
              <div key={step.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <step.icon className="text-coral" size={26} aria-hidden="true" />
                <h2 className="mt-4 text-base font-bold text-ink">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <SectionHeader
            eyebrow={t("Import request", "Solicitud de importación")}
            title={t("Tell us what you want to import", "Cuéntanos qué vehículo quieres importar")}
            description={t("Share the vehicle type, budget, preferred year, and brand or model. The form is ready to connect later to Supabase, CRM, email, or WhatsApp automation.", "Comparte el tipo de vehículo, presupuesto, año y marca o modelo. El formulario está preparado para conectarse a un sistema de atención.")}
          />
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600">
            <p className="font-semibold text-ink">{t("Typical support includes:", "Cómo podemos ayudarte")}</p>
            <ul className="mt-3 grid gap-2">
              <li>{t("Vehicle search in the United States", "Búsqueda de vehículos en Estados Unidos")}</li>
              <li>{t("Purchase and listing review support", "Apoyo con la revisión de anuncios y la compra")}</li>
              <li>{t("Shipping coordination", "Coordinación del envío")}</li>
              <li>{t("Customs and aduanas guidance", "Orientación en aduanas")}</li>
              <li>{t("Registration and plate process guidance", "Orientación sobre el registro y la placa")}</li>
            </ul>
          </div>
        </div>

        <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              {t("Customer name", "Nombre del cliente")}
              <input
                className="focus-ring rounded-md border border-slate-300 px-4 py-3"
                type="text"
                name="customerName"
                placeholder={t("Your full name", "Tu nombre completo")}
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              {t("Phone/WhatsApp", "Teléfono o WhatsApp")}
              <input
                className="focus-ring rounded-md border border-slate-300 px-4 py-3"
                type="tel"
                name="phone"
                placeholder="+1 809 000 0000"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              {t("Type of vehicle wanted", "Tipo de vehículo que buscas")}
              <select
                className="focus-ring rounded-md border border-slate-300 px-4 py-3"
                name="vehicleType"
                defaultValue=""
              >
                <option value="" disabled>
                  {t("Select type", "Selecciona un tipo")}
                </option>
                <option value="sedan">{t("Sedan", "Sedán")}</option>
                <option value="suv">SUV</option>
                <option value="pickup">Pickup</option>
                <option value="van">{t("Van", "Furgoneta")}</option>
                <option value="luxury">{t("Luxury", "De lujo")}</option>
                <option value="other">{t("Other", "Otro")}</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              {t("Budget", "Presupuesto")}
              <input
                className="focus-ring rounded-md border border-slate-300 px-4 py-3"
                type="text"
                name="budget"
                placeholder={t("Example: US$25,000", "Ejemplo: US$25,000")}
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              {t("Preferred year", "Año de preferencia")}
              <input
                className="focus-ring rounded-md border border-slate-300 px-4 py-3"
                type="text"
                name="preferredYear"
                placeholder={t("Example: 2021 or newer", "Ejemplo: 2021 o más reciente")}
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              {t("Preferred brand/model", "Marca o modelo de preferencia")}
              <input
                className="focus-ring rounded-md border border-slate-300 px-4 py-3"
                type="text"
                name="preferredBrandModel"
                placeholder={t("Example: Toyota RAV4", "Ejemplo: Toyota RAV4")}
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
              {t("Notes", "Comentarios")}
              <textarea
                className="focus-ring min-h-32 rounded-md border border-slate-300 px-4 py-3"
                name="notes"
                placeholder={t("Tell us about must-have features, timeline, city, or questions.", "Cuéntanos qué características necesitas, tu fecha estimada, tu ciudad o tus preguntas.")}
              />
            </label>
          </div>
          <PlaceholderButton
            message={t("This import request form is a front-end placeholder. Next step: connect it to Supabase, email, or WhatsApp automation.", "Este formulario de importación aún no envía solicitudes. Escríbenos por WhatsApp.")}
            className="mt-6 w-full bg-palm text-white hover:bg-emerald-800 sm:w-auto"
          >
            {t("Send import request", "Enviar solicitud de importación")}
          </PlaceholderButton>
        </form>
      </section>
    </>
  );
}
