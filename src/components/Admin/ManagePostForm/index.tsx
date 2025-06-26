"use client";

import { MarkdownEditor } from "@/app/admin/MarkdownEditor";
import { Button } from "@/components/Button";
import { InputCheckbox } from "@/components/InputCheckbox";
import { InputText } from "@/components/InputText";
import { BugIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import { ImageUploader } from "../ImageUploader";

export function ManagePostForm() {
  const [contentValue, setContentValue] = useState("Este é um exemplo");
  return (
    <form action="" className="mb-16">
      <div className="flex flex-col gap-6" data-color-mode="light">
        <InputText
          disabled
          placeholder="Digite seu nome"
          labelText="Nome"
          defaultValue="Olá mundo"
        />
        <ImageUploader />

        <InputText
          placeholder="Digite seu sobrenome"
          labelText="Sobrenome"
          readOnly
        />
        <InputCheckbox labelText="Sobrenome" />

        <MarkdownEditor
          labelText="Conteúdo"
          disabled={false}
          textAreaName="content"
          value={contentValue}
          setValue={setContentValue}
        />

        <div className="mt-4">
          <Button type="submit">Enviar</Button>
        </div>
      </div>
    </form>
  );
}
