import { PostCoverImage } from "../PostCoverImage";

import { PostSummary } from "../PostSummary";
import { findAllPublicPostsCached } from "@/lib/post/queries";

export async function PostFeatured() {
  const slug = "qualquer";
  const postLink = `/post/${slug}`;

  const posts = await findAllPublicPostsCached();
  const post = posts[0];

  return (
    <>
      <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
        <PostCoverImage
          linkProps={{ href: postLink }}
          imageProps={{
            width: 1200,
            height: 720,
            src: post.coverImageUrl,
            alt: post.title,
            priority: true,
          }}
        />

        <PostSummary
          excerpt={post.excerpt}
          createdAt={post.createdAt}
          relativeDate={post.createdAt}
          title={post.title}
          postLink={postLink}
          postHeading="h1"
        />
      </section>
    </>
  );
}
