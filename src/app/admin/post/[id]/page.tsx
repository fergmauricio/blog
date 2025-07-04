import { ManagePostForm } from "@/components/Admin/ManagePostForm";
import { makePublicPostFromDb } from "@/dto/post/dto";
import { findPostByIdAdmin } from "@/lib/post/queries/admin";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "editar post",
};

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function adminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  const { id } = await params;
  const post = await findPostByIdAdmin(id).catch(() => undefined);

  if (!post) notFound();

  const publicPost = makePublicPostFromDb(post);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-extrabold">Editar post</h1>
      <ManagePostForm mode="update" publicPost={post} />
    </div>
  );
}
