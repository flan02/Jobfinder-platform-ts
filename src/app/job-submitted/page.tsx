import H1 from "@/components/ui/h1";
import Link from "next/link";


export default function Page() {
  return (
    <main className="m-auto h-[80vh] my-10 max-w-5xl space-y-5 px-3 text-center">
      <H1>Job submitted</H1>
      <p>Your job posting has been submitted and is pending approval.</p>
      <br />
      <Link href="/" className="bg-black text-white px-4 py-2 rounded-md">return home</Link>
    </main>
  );
}