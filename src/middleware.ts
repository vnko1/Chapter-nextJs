import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  request;

  return NextResponse.next();
}
