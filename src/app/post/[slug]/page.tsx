import { SinglePost } from "@/components/SinglePost";
import { SpinLoader } from "@/components/SpinLoader";
import {
  findAllPublicPostsCached,
  findPublicPostBySlugCached,
} from "@/lib/post/queries/public";
import { Metadata } from "next";

import { notFound } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-static";

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPublicPostBySlugCached(slug);

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = await findAllPublicPostsCached();

  const params = posts.map((post) => {
    return {
      slug: post.slug,
    };
  });

  return params;
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;

  const post = await findPublicPostBySlugCached(slug).catch(() => undefined);

  if (!post) notFound();

  return (
    <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
      <SinglePost slug={slug} />
    </Suspense>
  );
}
