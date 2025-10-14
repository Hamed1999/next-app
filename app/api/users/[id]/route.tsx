import { NextRequest, NextResponse } from "next/server";
import { getUserById, removeUser, updateUser, User } from "../users-db";
import schema, { SchemaType } from "../schema";

async function validateUser(
  inputId: number
): Promise<{ user: User } | { error: NextResponse }> {
  const id = parseInt(inputId as unknown as string, 10);
  if (Number.isNaN(id))
    return {
      error: NextResponse.json({ error: "invalid id" }, { status: 400 }),
    };

  const user = await getUserById(id);
  if (!user)
    return {
      error: NextResponse.json(
        { error: `User with id=${id} not found.` },
        { status: 404 }
      ),
    };

  return { user: user };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const result = await validateUser(params.id);
  if ("error" in result) return result.error;
  return NextResponse.json(result.user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const result = await validateUser(params.id);

  if ("error" in result) return result.error;

  const body: SchemaType = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });
  result.user.name = body.name;
  result.user.email = body.email;
  return NextResponse.json(await updateUser(result.user));
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const result = await validateUser(params.id);

  if ("error" in result) return result.error;

  return NextResponse.json(await removeUser(result.user.id), { status: 200 });
}
