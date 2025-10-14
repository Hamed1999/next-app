import { promises as fs } from "fs";
import path from "path";
import { SchemaType } from "./schema";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");

export class Product {
  constructor(private readonly _id: number, private _name: string, private _price: number) {}

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(newName: string) {
    this._name = newName;
  }

  get price() {
    return this._price;
  }

  set price(newPricce: number) {
    this._price = newPricce;
  }

  // Helper to serialize to plain object
  toJSON() {
    return { id: this._id, name: this._name, price: this._price};
  }
}

// Default in-memory seed (used when file doesn't exist)
const seedProducts = [
  new Product(1, "Milk", 12.5),
  new Product(2, "Chocolate", 87.5),
  new Product(3, "Bread", 1.87),
  new Product(4, "Shampoo", 24.65),
];

async function readProducts(): Promise<Product[]> {
  try {
    const txt = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(txt) as Array<Product>;
    // Rehydrate into User instances
    return parsed.map((p) => new Product(p.id, p.name, p.price));
  } catch (err) {
    // If file missing or invalid, return seed
    return seedProducts.slice();
  }
}

async function writeProducts(users: Product[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  const plain = users.map((u) => u.toJSON());
  await fs.writeFile(DATA_FILE, JSON.stringify(plain, null, 2), "utf8");
}

export async function getAllProducts(): Promise<Product[]> {
  return readProducts();
}

export async function getProductById(id: number): Promise<Product | null> {
  const users = await readProducts();
  return users.find((u) => u.id === id) ?? null;
}

export async function addProduct(productData: SchemaType): Promise<Product> {
  const products = await readProducts();
  const nextId = products.length ? Math.max(...products.map((u) => u.id)) + 1 : 1;
  const newProduct = new Product(nextId, productData.name, productData.price);
  products.push(newProduct);
  await writeProducts(products);
  return newProduct;
}

export async function updateProduct(product: Product): Promise<Product> {
  const products = await readProducts();
  const idx = products.findIndex((p) => p.id === product.id);
  if (idx === -1) {
    throw new Error(`Product with id=${product.id} not found.`);
  }

  products[idx] = product;
  await writeProducts(products);
  return products[idx];
}

export async function removeProduct(id: number): Promise<Product[]> {
  const products = await readProducts();
  const idx = products.findIndex((u) => u.id === id);
  if (idx === -1) {
    throw new Error(`Product with id=${id} not found.`);
  }

  products.splice(idx, 1);
  await writeProducts(products);
  return products;
}