import { NextRequest, NextResponse } from "next/server";

function middleware(request: NextRequest) {
  request;
  const response = NextResponse.next();

  return response;
}

export default middleware;
