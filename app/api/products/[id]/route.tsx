import { NextRequest, NextResponse } from "next/server";
// import {
//   getProductById,
//   removeProduct,
//   updateProduct,
//   Product,
// } from "../products-db";
import schema, { SchemaType } from "../schema";
import { prisma } from "@/prisma/client";

interface Product {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
  registeredAt: Date;
}

async function validateProduct(
  inputId: number
): Promise<{ product: Product } | { error: NextResponse }> {
  const id = parseInt(inputId as unknown as string, 10);
  if (Number.isNaN(id))
    return {
      error: NextResponse.json({ error: "invalid id" }, { status: 400 }),
    };

  // const product = await getProductById(id);
  const product = await prisma.product.findUnique({ where: { id: id } });
  if (!product)
    return {
      error: NextResponse.json(
        { error: `Product with id=${id} not found.` },
        { status: 404 }
      ),
    };

  return { product: product };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const result = await validateProduct(params.id);
  if ("error" in result) return result.error;
  return NextResponse.json(result.product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const result = await validateProduct(params.id);

  if ("error" in result) return result.error;

  const body: SchemaType = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });
  result.product.name = body.name;
  result.product.price = body.price;
  // return NextResponse.json(await updateProduct(result.product));
  const existingProduct = await prisma.product.findFirst({
    where: {
      name: body.name,
      NOT: { id: result.product.id },
    },
  });
  if (existingProduct)
    return NextResponse.json(
      { error: "Product with this name already exist." },
      { status: 400 }
    );

  return NextResponse.json(
    await prisma.product.update({
      where: { id: result.product.id },
      data: { name: result.product.name, price: result.product.price },
    })
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const result = await validateProduct(params.id);

  if ("error" in result) return result.error;

  // return NextResponse.json(await removeProduct(result.product.id), {
  //   status: 200,
  // });
  return NextResponse.json(
    await prisma.product.delete({ where: { id: result.product.id } }),
    {
      status: 200,
    }
  );
}
