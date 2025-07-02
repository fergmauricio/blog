"use client";

import { uploadImageAction } from "@/actions/upload/upload-image-action";
import { Button } from "@/components/Button";
import { ImageUpIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";

type ImageUploaderProps = {
  disabled?: boolean;
};

export function ImageUploader({ disabled = false }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState();

  function handleChooseFile() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();

    if (!fileInputRef.current) {
      setImgUrl("");
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) {
      setImgUrl("");
      return;
    }

    const IMAGE_UPLOAD_MAX_SIZE =
      Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 0;

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
        setImgUrl("");
        return;
      }

      setImgUrl(result.url);
      toast.success(result.url);
    });
  }

  return (
    <div className="flex flex-col  gap-2 py-4">
      <Button
        type="button"
        className="w-[200px]"
        onClick={handleChooseFile}
        disabled={isUploading || disabled}
      >
        <ImageUpIcon />
        Enviar Imagem
      </Button>

      {!!imgUrl && (
        <div className="flex flex-col gap-4">
          <p>
            <b>URL:</b>
            {imgUrl}
          </p>

          {/* eslint-disable-next-line */}
          <img className="rounded-lg" src={imgUrl} />
        </div>
      )}

      <input
        ref={fileInputRef}
        className="hidden"
        name="file"
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={isUploading || disabled}
      />
    </div>
  );
}
