import { NextRequest, NextResponse } from "next/server";
import { getUserById, removeUser, updateUser, User } from "../UsersData";

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

  const { name }: { name: string } = await request.json();
  result.user.name = name;
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
