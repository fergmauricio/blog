import { ManagePostForm } from "@/components/Admin/ManagePostForm";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "criar post",
};

export default function adminNewPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-extrabold">Criar post</h1>
      <ManagePostForm mode="create" />
    </div>
  );
}
