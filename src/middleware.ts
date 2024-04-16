import { NextRequest, NextResponse } from "next/server";

function middleware(request: NextRequest) {
  const cookie = request?.cookies.get("token")?.value;
  console.log("🚀 ~ middleware ~ request:", cookie);
  const response = NextResponse.next();

  return response;
}

export default middleware;
