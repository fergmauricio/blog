"use server";

import { PublicPost } from "@/dto/post/dto";

type createPostActionState = {
  formState: PublicPost;
  errors: string[];
};

export async function createPostAction(
  prevState: createPostActionState,
  formData: FormData
): Promise<createPostActionState> {
  //const title = formData.get("title")?.toString() || "";

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: [],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  console.log("OPA ", formDataToObj);

  return {
    formState: { ...prevState.formState },
    errors: [],
  };
}
