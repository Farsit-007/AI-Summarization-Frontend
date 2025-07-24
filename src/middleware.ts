import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices";

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (pathname !== "/my-article" && pathname !== "/create-article") {
    return NextResponse.next();
  }

  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url)
    );
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/my-article", "/create-article"],
};
