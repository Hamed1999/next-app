import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "users.json");

export class User {
  constructor(private readonly _id: number, private _name: string) {}

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(newName: string) {
    this._name = newName;
  }

  // Helper to serialize to plain object
  toJSON() {
    return { id: this._id, name: this._name };
  }
}

// Default in-memory seed (used when file doesn't exist)
const seedUsers = [
  new User(1, "Hamed"),
  new User(2, "Mosh"),
  new User(3, "Mahdi"),
  new User(4, "John"),
  new User(5, "Mahmoud"),
  new User(6, "Homa"),
  new User(7, "Mobina"),
  new User(8, "Zahra"),
];

async function readUsers(): Promise<User[]> {
  try {
    const txt = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(txt) as Array<{ id: number; name: string }>;
    // Rehydrate into User instances
    return parsed.map((p) => new User(p.id, p.name));
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

export async function addUser(name: string): Promise<User> {
  const users = await readUsers();
  const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = new User(nextId, name);
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
