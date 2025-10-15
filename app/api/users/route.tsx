import { NextRequest, NextResponse } from "next/server";
// import { getAllUsers, addUser } from "./users-db";
import schema, { SchemaType } from "./schema";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  // const users = await getAllUsers();
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body: SchemaType = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });
  // const created = await addUser(body);
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (user)
    return NextResponse.json(
      { error: "User with this email already exist." },
      { status: 400 }
    );
  const created = await prisma.user.create({
    data: { name: body.name, email: body.email },
  });
  return NextResponse.json(created, { status: 201 });
}
