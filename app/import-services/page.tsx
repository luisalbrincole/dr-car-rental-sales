import { ClipboardCheck, FileText, MessageCircle, Search, Ship, Tags } from "lucide-react";
import { PlaceholderButton } from "@/components/PlaceholderButton";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Import Services | DR Car Rental & Sales"
};

const serviceSteps = [
  {
    icon: Search,
    title: "Vehicle search",
    description:
      "We help identify vehicles in the United States that match your use case, preferred brand, year, and budget."
  },
  {
    icon: Tags,
    title: "Purchase support",
    description:
      "Get support comparing listings, understanding prices, and preparing the next steps before buying."
  },
  {
    icon: Ship,
    title: "Shipping coordination",
    description:
      "Coordinate transport from the seller or auction location to the port and arrival in Dominican Republic."
  },
  {
    icon: FileText,
    title: "Customs and aduanas guidance",
    description:
      "Understand documents, duties, timelines, and customs requirements before the vehicle arrives."
  },
  {
    icon: ClipboardCheck,
    title: "Registration guidance",
    description:
      "Receive guidance for the registration, inspection, and plate process after import."
  }
];

export default function ImportServicesPage() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="mb-4 inline-flex rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-palm">
              United States to Dominican Republic
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Import Your Car to Dominican Republic
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              We help customers import cars from the United States to the Dominican Republic with
              vehicle search, purchase support, shipping coordination, customs and aduanas guidance,
              and registration or plate process guidance.
            </p>
            <a
              href="https://wa.me/18095551234?text=Hello%2C%20I%20want%20a%20car%20import%20consultation"
              target="_blank"
              rel="noreferrer"
              className="focus-ring mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-palm px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp consultation
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
            eyebrow="Import request"
            title="Tell us what you want to import"
            description="Share the vehicle type, budget, preferred year, and brand or model. The form is ready to connect later to Supabase, CRM, email, or WhatsApp automation."
          />
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600">
            <p className="font-semibold text-ink">Typical support includes:</p>
            <ul className="mt-3 grid gap-2">
              <li>Vehicle search in the United States</li>
              <li>Purchase and listing review support</li>
              <li>Shipping coordination</li>
              <li>Customs and aduanas guidance</li>
              <li>Registration and plate process guidance</li>
            </ul>
          </div>
        </div>

        <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Customer name
              <input
                className="focus-ring rounded-md border border-slate-300 px-4 py-3"
                type="text"
                name="customerName"
                placeholder="Your full name"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Phone/WhatsApp
              <input
                className="focus-ring rounded-md border border-slate-300 px-4 py-3"
                type="tel"
                name="phone"
                placeholder="+1 809 000 0000"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Type of vehicle wanted
              <select
                className="focus-ring rounded-md border border-slate-300 px-4 py-3"
                name="vehicleType"
                defaultValue=""
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="pickup">Pickup</option>
                <option value="van">Van</option>
                <option value="luxury">Luxury</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Budget
              <input
                className="focus-ring rounded-md border border-slate-300 px-4 py-3"
                type="text"
                name="budget"
                placeholder="Example: US$25,000"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Preferred year
              <input
                className="focus-ring rounded-md border border-slate-300 px-4 py-3"
                type="text"
                name="preferredYear"
                placeholder="Example: 2021 or newer"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Preferred brand/model
              <input
                className="focus-ring rounded-md border border-slate-300 px-4 py-3"
                type="text"
                name="preferredBrandModel"
                placeholder="Example: Toyota RAV4"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
              Notes
              <textarea
                className="focus-ring min-h-32 rounded-md border border-slate-300 px-4 py-3"
                name="notes"
                placeholder="Tell us about must-have features, timeline, city, or questions."
              />
            </label>
          </div>
          <PlaceholderButton
            message="This import request form is a front-end placeholder. Next step: connect it to Supabase, email, or WhatsApp automation."
            className="mt-6 w-full bg-palm text-white hover:bg-emerald-800 sm:w-auto"
          >
            Send import request
          </PlaceholderButton>
        </form>
      </section>
    </>
  );
}
