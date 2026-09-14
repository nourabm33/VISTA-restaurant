import type { NextConfig } from "next";

const modelHeaders = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
  { key: "Access-Control-Allow-Origin", value: "*" },
];

const nextConfig: NextConfig = {
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
};

export default nextConfig;
