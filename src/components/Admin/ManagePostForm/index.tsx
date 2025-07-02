"use client";

import { MarkdownEditor } from "@/app/admin/MarkdownEditor";
import { Button } from "@/components/Button";
import { InputCheckbox } from "@/components/InputCheckbox";
import { InputText } from "@/components/InputText";
import { useActionState, useEffect, useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { createPostAction } from "@/actions/post/create-post-action";
import { toast } from "react-toastify";
import { updatePostAction } from "@/actions/post/update-post-action";
import { useRouter, useSearchParams } from "next/navigation";

type ManagePostFormUpdateProps = {
  publicPost?: PublicPost;
  mode: "update";
};

type ManagePostFormCreateProps = {
  publicPost?: PublicPost;
  mode: "create";
};

type ManagePostFormProps =
  | ManagePostFormCreateProps
  | ManagePostFormUpdateProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;
  const searchParams = useSearchParams();
  const created = searchParams.get("created");
  const router = useRouter();

  let publicPost;

  if (mode === "update") publicPost = props.publicPost;

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };
  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState
  );

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach((error) => toast.error(error));
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success("Post atualizado com sucesso");
    }
  }, [state.success]);

  useEffect(() => {
    if (created === "1") {
      toast.dismiss();
      toast.success("Post criado com sucesso");
      const url = new URL(window.location.href);
      url.searchParams.delete("created");
      router.replace(url.toString());
    }
  }, [created, router]);

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
          disabled={isPending}
        />

        <InputText
          placeholder="Slug gerada automaticamente"
          labelText="Slug"
          name="slug"
          type="text"
          defaultValue={formState.slug}
          readOnly
          disabled={isPending}
        />

        <InputText
          placeholder="Digite o nome do Autor"
          labelText="Autor"
          name="author"
          type="text"
          defaultValue={formState.author}
          disabled={isPending}
        />

        <InputText
          placeholder="Digite o título"
          labelText="Título"
          name="title"
          type="text"
          defaultValue={formState.title}
          disabled={isPending}
        />

        <InputText
          placeholder="Digite o resumo"
          labelText="Excerto"
          name="excerpt"
          type="text"
          defaultValue={formState.excerpt}
          disabled={isPending}
        />

        <MarkdownEditor
          labelText="Conteúdo"
          disabled={false}
          textAreaName="content"
          value={contentValue}
          setValue={setContentValue}
          disabled={isPending}
        />

        <ImageUploader disabled={isPending} />

        <InputText
          placeholder="URL da imagem de capa"
          labelText="Digite a URL da imagem"
          name="coverImageUrl"
          type="text"
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
        />

        <InputCheckbox
          labelText="Publicar?"
          name="published"
          defaultChecked={formState.published}
          disabled={isPending}
        />

        <div className="mt-4">
          <Button type="submit">Enviar</Button>
        </div>
      </div>
    </form>
  );
}
