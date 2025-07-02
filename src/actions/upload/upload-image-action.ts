"use server";

import { mkdir, writeFile } from "fs/promises";
import { extname, resolve } from "path";

type uploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData
): Promise<uploadImageActionResult> {
  const makeResult = ({ url = "", error = "" }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return makeResult({ error: "Dados inválidos" });
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return makeResult({ error: "Arquivo inválido" });
  }

  const IMAGE_UPLOAD_MAX_SIZE =
    Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;

  if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
    return makeResult({ error: "Arquivo muito grande" });
  }

  if (!file.type.startsWith("image/")) {
    return makeResult({ error: "Imagem inválida" });
  }

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const IMAGE_UPLOAD_DIRECTORY =
    process.env.IMAGE_UPLOAD_DIRECTORY || "uploads";

  const uploadFullPath = resolve(
    process.cwd(),
    "public",
    IMAGE_UPLOAD_DIRECTORY
  );

  await mkdir(uploadFullPath, { recursive: true });

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueImageName);

  await writeFile(fileFullPath, buffer);

  const IMAGE_SERVER_URL =
    process.env.IMAGE_SERVER_URL || "http://localhost:3000/uploads";

  const url = `${IMAGE_SERVER_URL}/${uniqueImageName}`;

  return makeResult({ url });
}
