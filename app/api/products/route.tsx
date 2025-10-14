import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, addProduct } from "./products-db";
import schema, { SchemaType } from "./schema";

export async function GET(request: NextRequest) {
  const products = await getAllProducts();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body: SchemaType = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });
  const created = await addProduct(body);
  return NextResponse.json(created, { status: 201 });
}