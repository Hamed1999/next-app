import { promises as fs } from "fs";
import path from "path";
import { SchemaType } from "./schema";

const DATA_FILE = path.join(process.cwd(), "data", "users.json");

export class User {
  constructor(private readonly _id: number, private _name: string, private _email: string) {}

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(newName: string) {
    this._name = newName;
  }

  get email() {
    return this._email;
  }

  set email(newEmail: string) {
    this._email = newEmail;
  }

  // Helper to serialize to plain object
  toJSON() {
    return { id: this._id, name: this._name, email: this._email};
  }
}

// Default in-memory seed (used when file doesn't exist)
const seedUsers = [
  new User(1, "Hamed", "hsalmanizadegan@gmail.com"),
  new User(2, "Mosh", "mosh@gmail.com"),
  new User(3, "Mahdi", "mahdi@gmail.com"),
  new User(4, "John", "john@gmail.com"),
  new User(5, "Mahmoud", "mahmoud@gmail.com"),
  new User(6, "Homa", "homa@gmail.com"),
  new User(7, "Mobina", "mobina@gmail.com"),
  new User(8, "Zahra", "zahra@gmail.com"),
];

async function readUsers(): Promise<User[]> {
  try {
    const txt = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(txt) as Array<User>;
    // Rehydrate into User instances
    return parsed.map((p) => new User(p.id, p.name, p.email));
  } catch (err) {
    // If file missing or invalid, return seed
    return seedUsers.slice();
  }
}

async function writeUsers(users: User[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  const plain = users.map((u) => u.toJSON());
  await fs.writeFile(DATA_FILE, JSON.stringify(plain, null, 2), "utf8");
}

export async function getAllUsers(): Promise<User[]> {
  return readUsers();
}

export async function getUserById(id: number): Promise<User | null> {
  const users = await readUsers();
  return users.find((u) => u.id === id) ?? null;
}

export async function addUser(userData: SchemaType): Promise<User> {
  const users = await readUsers();
  const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = new User(nextId, userData.name, userData.email);
  users.push(newUser);
  await writeUsers(users);
  return newUser;
}

export async function updateUser(user: User): Promise<User> {
  const users = await readUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx === -1) {
    throw new Error(`User with id=${user.id} not found.`);
  }

  users[idx].name = user.name;
  await writeUsers(users);
  return users[idx];
}

export async function removeUser(id: number): Promise<User[]> {
  const users = await readUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) {
    throw new Error(`User with id=${id} not found.`);
  }

  users.splice(idx, 1);
  await writeUsers(users);
  return users;
}