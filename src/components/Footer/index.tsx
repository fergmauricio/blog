import Link from "next/link";

export function Footer() {
  return (
    <footer className="pb-16 text-center">
      <p className="py-8">
        <span>Copyright &copy;</span> {new Date().getFullYear()} -{" "}
        <Link href="/">The Blog</Link>
      </p>
    </footer>
  );
}
