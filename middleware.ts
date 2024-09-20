import { auth } from "./src/app/_lib/auth";

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
