import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-900">
      <div className="mx-auto max-w-5xl space-y-5 px-3 py-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">#be Hired</h3>
            <p className="text-sm text-muted-foreground">
              Creating job opportunities for developers
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground dark:text-blue-500">
          © {new Date().getFullYear()} be Hired, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}