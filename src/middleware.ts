import { authMiddleware } from "@clerk/nextjs";
// ! Check clerk docs for possible changes...

export default authMiddleware({});

export const config = {
  matcher: ["/(admin)(.*)"],
};