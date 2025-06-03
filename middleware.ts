import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // You can add authentication or other middleware logic here
  return NextResponse.next()
}
