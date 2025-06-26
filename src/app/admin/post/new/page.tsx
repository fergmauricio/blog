"use client";

import { ManagePostForm } from "@/components/Admin/ManagePostForm";
import { Button } from "@/components/Button";
import { InputCheckbox } from "@/components/InputCheckbox";
import { InputText } from "@/components/InputText";
import { BugIcon, CheckIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default function adminNewPostPage() {
  return (
    <>
      <h1>Criar post</h1>
      <ManagePostForm />
    </>
  );
}
