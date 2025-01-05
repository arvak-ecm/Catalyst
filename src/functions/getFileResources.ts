import { BaseDirectory } from "@tauri-apps/api/path";
import { readFile } from "@tauri-apps/plugin-fs";

export const getFileResources = async (
  filePath: string,
  typeFile: "string" | "json"
): Promise<string | object> => {
  const file = await readFile(filePath, { baseDir: BaseDirectory.Resource });
  const fileDecode = new TextDecoder().decode(file);
  switch (typeFile) {
    case "string":
      return fileDecode;
    case "json":
      return JSON.parse(fileDecode);
    default:
      return fileDecode;
  }
};
