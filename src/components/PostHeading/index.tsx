import Link from "next/link";

type PostHeadingProps = {
  children: React.ReactNode;
  url?: string;
  as?: "h1" | "h2";
};

export function PostHeading({
  children,
  url = "",
  as: Tag = "h2",
}: PostHeadingProps) {
  const headingClassesMap = {
    h1: "text-3xl/tight font-extrabold sm:text-4xl",
    h2: "text-2xl/tight font-bold",
  };
  return (
    <Tag className={headingClassesMap[Tag]}>
      <Link className="group-hover:text-slate-600 transition" href={url} />
      {children}
    </Tag>
  );
}
