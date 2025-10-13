import { NextRequest, NextResponse } from "next/server";
import Users from "./UsersData";

export function GET(request: NextRequest) {
  return NextResponse.json(Users);
}
