import { NextRequest, NextResponse } from "next/server";
import { getAllUsers, addUser } from "./UsersData";

export async function GET(request: NextRequest) {
  const users = await getAllUsers();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const { name }: { name: string } = await request.json();
  if (!name)
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  const created = await addUser(name);
  return NextResponse.json(created, { status: 201 });
}
