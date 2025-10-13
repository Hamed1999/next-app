import { NextRequest, NextResponse } from "next/server";
import Users, { User } from "../UsersData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  console.log("Entering handler");
  const user = Users[params.id-1];
  if (params.id > 10 || !user)
    return NextResponse.json(
      { error: `User with id=${params.id} not found.` },
      { status: 404 }
    );

  return NextResponse.json(user);
}
