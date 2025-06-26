"use client";

import { uploadImageAction } from "@/actions/upload/upload-image-action";
import { Button } from "@/components/Button";
import { IMAGE_UPLOAD_MAX_SIZE } from "@/lib/post/constants";
import { ImageUpIcon } from "lucide-react";
import { useRef, useTransition } from "react";
import { toast } from "react-toastify";

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();

  function handleChooseFile() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();

    if (!fileInputRef.current) return;

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) return;

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      toast.error(
        `O tamanho da imagem está acima do permitido: ${
          IMAGE_UPLOAD_MAX_SIZE / 1024
        }kb`
      );

      fileInput.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        fileInput.value = "";
        return;
      }

      toast.success(result.url);
    });

    //console.log(formData);
  }

  return (
    <div className="flex flex-col  gap-2 py-4">
      <Button type="button" className="self-center" onClick={handleChooseFile}>
        <ImageUpIcon />
        Enviar Imagem
      </Button>
      <input
        ref={fileInputRef}
        className="hidden"
        name="file"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
}
