import type { ImageLoaderProps } from "next/image";
import { withBasePath } from "./base-path";

/** Static-export loader: serve the pre-optimized local asset as-is, under the basePath. */
export default function imageLoader({ src }: ImageLoaderProps): string {
  return withBasePath(src);
}
