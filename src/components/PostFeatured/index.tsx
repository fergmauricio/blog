import { PostCoverImage } from "../PostCoverImage";
import { PostHeading } from "../PostHeading";

export function PostFeatured() {
  const slug = "qualquer";
  const postLink = `/post/${slug}`;

  return (
    <>
      <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
        <PostCoverImage
          linkProps={{ href: postLink }}
          imageProps={{
            width: 1200,
            height: 720,
            src: "/images/bryen_9.png",
            alt: "Alt da Imagem",
            priority: true,
          }}
        />

        <div className="flex flex-col gap-4 sm:justify-center">
          <time
            className="text-slate-600 block text-sm/tight"
            dateTime={"12/12/2022"}
          >
            12/12/2022
          </time>

          <PostHeading url={postLink} as="h1">
            Opa asidjioasd
          </PostHeading>
          <p>asdj ljalskdj asiodujaiosujd zm,xcn iqajsd</p>
        </div>
      </section>
    </>
  );
}
