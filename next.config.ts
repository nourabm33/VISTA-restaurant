import type { NextConfig } from "next";

// Static export for GitHub Pages (project site served under /<repo>/).
// Set by .github/workflows/deploy-pages.yml; unset for Netlify / `next start`.
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const modelHeaders = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
  { key: "Access-Control-Allow-Origin", value: "*" },
];

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
        images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
      }
    : {
        async headers() {
          return [
            {
              source: "/models/:path*.glb",
              headers: [...modelHeaders, { key: "Content-Type", value: "model/gltf-binary" }],
            },
            {
              source: "/models/:path*.usdz",
              headers: [...modelHeaders, { key: "Content-Type", value: "model/vnd.usdz+zip" }],
            },
          ];
        },
      }),
};

export default nextConfig;
