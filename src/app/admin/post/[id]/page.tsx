export const dynamic = "force-dynamic";

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function adminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  const { id } = await params;
  return <div className="py-16 text-6xl">Admin Post ID({id}) Page</div>;
}
