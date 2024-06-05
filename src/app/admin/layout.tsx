import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Metadata } from "next";
import AdminNavbar from "./AdminNavbar";

export const metadata: Metadata = {
  title: "Admin | Dan Chanivet",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <SignedOut>
        <div className="h-[80vh] flex justify-center items-center">
          <div className="dark:bg-blue-500 dark:hover:bg-blue-600 w-24 h-10 text-center text-white px-4 py-2 rounded-lg">
            <SignInButton />
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <AdminNavbar />
        {children}
      </SignedIn>
    </ClerkProvider>
  );
}