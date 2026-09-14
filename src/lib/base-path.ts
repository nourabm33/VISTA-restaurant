/** Prefix a root-relative public asset URL with the configured basePath (empty outside GitHub Pages). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(src: string): string {
  if (!basePath || !src.startsWith("/") || src.startsWith(`${basePath}/`)) return src;
  return `${basePath}${src}`;
}
