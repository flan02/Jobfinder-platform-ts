import Link from "next/link";
import logo from "../assets/logoBH.png";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="shadow-sm ">
      <nav className="max-w-5xl m-auto py-5 px-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="Job Board" width={80} height={80} />
          <span className="text-2xl -ml-4 font-bold tracking-tight">be Hired</span>
        </Link>
        <Button asChild>
          <Link href="/jobs/new">Post a job</Link>
        </Button>
      </nav>
    </header>
  )
}