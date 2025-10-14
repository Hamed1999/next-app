import { NextRequest, NextResponse } from "next/server";
import { getAllUsers, addUser } from "./users-db";
import schema, { SchemaType } from "./schema";

export async function GET(request: NextRequest) {
  const users = await getAllUsers();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body: SchemaType = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });
  const created = await addUser(body);
  return NextResponse.json(created, { status: 201 });
}