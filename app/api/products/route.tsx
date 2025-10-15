import { NextRequest, NextResponse } from "next/server";
// import { getAllProducts, addProduct } from "./products-db";
import schema, { SchemaType } from "./schema";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  // const products = await getAllProducts();
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body: SchemaType = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });
  // const created = await addProduct(body);
  const product = await prisma.product.findUnique({
    where: { name: body.name },
  });
  if (product)
    return NextResponse.json(
      { error: "Product with this name already exist." },
      { status: 400 }
    );
  const created = await prisma.product.create({
    data: { name: body.name, price: body.price },
  });
  return NextResponse.json(created, { status: 201 });
}
