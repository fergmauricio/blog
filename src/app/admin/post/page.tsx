import PostsListAdmin from "@/components/PostsListAdmin";
import { SpinLoader } from "@/components/SpinLoader";
import { findAllPostsAdmin } from "@/lib/post/queries/admin";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Post Admin",
};

export default async function adminPostPage() {
  return (
    <Suspense fallback={<SpinLoader className="mb-16" />}>
      <PostsListAdmin />
    </Suspense>
  );
}
