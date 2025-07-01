"use client";

import { MarkdownEditor } from "@/app/admin/MarkdownEditor";
import { Button } from "@/components/Button";
import { InputCheckbox } from "@/components/InputCheckbox";
import { InputText } from "@/components/InputText";
import { useActionState, useEffect, useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { createPostAction } from "@/actions/upload/create-post-action";

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };
  const [state, action, isPending] = useActionState(
    createPostAction,
    initialState
  );

  const { formState } = state;
  const [contentValue, setContentValue] = useState(publicPost?.content || "");

  return (
    <form action={action} className="mb-16">
      <div className="flex flex-col gap-6" data-color-mode="light">
        <InputText
          placeholder="ID gerado automaticamente"
          labelText="ID"
          name="id"
          type="text"
          defaultValue={formState.id}
          readOnly
        />

        <InputText
          placeholder="Slug gerada automaticamente"
          labelText="Slug"
          name="slug"
          type="text"
          defaultValue={formState.slug}
          readOnly
        />

        <InputText
          placeholder="Digite o nome do Autor"
          labelText="Autor"
          name="author"
          type="text"
          defaultValue={formState.author}
        />

        <InputText
          placeholder="Digite o título"
          labelText="Título"
          name="title"
          type="text"
          defaultValue={formState.title}
        />

        <InputText
          placeholder="Digite o resumo"
          labelText="Excerto"
          name="excerpt"
          type="text"
          defaultValue={formState.excerpt}
        />

        <MarkdownEditor
          labelText="Conteúdo"
          disabled={false}
          textAreaName="content"
          value={contentValue}
          setValue={setContentValue}
        />

        <ImageUploader />

        <InputText
          placeholder="URL da imagem de capa"
          labelText="Digite a URL da imagem"
          name="coverImageUrl"
          type="text"
          defaultValue={formState.coverImageUrl}
        />

        <InputCheckbox
          labelText="Publicar?"
          name="published"
          defaultChecked={formState.published}
        />

        <div className="mt-4">
          <Button type="submit">Enviar</Button>
        </div>
      </div>
    </form>
  );
}
