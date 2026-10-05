import { existsSync } from "node:fs";
import path from "node:path";

export function hasPublicFile(publicPath: string, extension?: string): boolean {
  if (!publicPath.startsWith("/") || publicPath.startsWith("//")) return false;
  if (extension && path.extname(publicPath).toLocaleLowerCase() !== extension.toLocaleLowerCase()) return false;

  const publicRoot = path.resolve(process.cwd(), "public");
  const filePath = path.resolve(publicRoot, `.${publicPath}`);
  return filePath.startsWith(`${publicRoot}${path.sep}`) && existsSync(filePath);
}
