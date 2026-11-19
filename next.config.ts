import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const nextConfig: NextConfig = {
  experimental: { serverActions: { bodySizeLimit: "4mb" } },
  images: {
    remotePatterns: [
      new URL("https://images.unsplash.com/**"),
      ...(supabaseUrl ? [{
        hostname: new URL(supabaseUrl).hostname,
        protocol: new URL(supabaseUrl).protocol === "http:" ? "http" as const : "https" as const,
        port: new URL(supabaseUrl).port,
        pathname: "/storage/v1/object/public/vehicle-photos/**"
      }] : [])
    ]
  }
};

export default nextConfig;
