import { clerkMiddleware } from "@clerk/nextjs/server";


export default clerkMiddleware();

export const config = {
  matcher: ["/(admin)(.*)"],
  //matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// * The clerkMiddleware function is a middleware that is used to protect routes that require authentication.
/*
export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // ? Don't run middleware on static files
    '/', // ? Run middleware on index page
    '/(api|trpc)(.*)'], // ? Run middleware on API routes
  ]
}
*/