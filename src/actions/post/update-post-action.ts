"use server";

import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { PostUpdateSchema } from "@/lib/post/validations";
import { PostModel } from "@/models/post/post-model";
import { postRepository } from "@/repositories/post";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { makeSlugFromText } from "@/utils/make-slug-from-text";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidV4 } from "uuid";

type updatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: true;
};

export async function updatePostAction(
  prevState: updatePostActionState,
  formData: FormData
): Promise<updatePostActionState> {
  //const title = formData.get("title")?.toString() || "";

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const id = formData.get("id")?.slice.toString() || "";

  if (!id || id !== "string") {
    return {
      formState: prevState.formState,
      errors: ["ID inválido"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: makePartialPublicPost(formDataToObj),
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost: PostModel = {
    ...validPostData,
  };

  try {
    await postRepository.update(newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newPost,
        errors: ["Erro desconhecido"],
      };
    }
  }

  revalidateTag("posts");
  redirect(`/admin/post/${newPost.id}`);
}
