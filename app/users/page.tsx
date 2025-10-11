import Link from "next/link";
import React from "react";

interface User {
  id: number;
  name: string;
}

const UsersPage = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    // { cache: "no-store" });
    { next: { revalidate: 10 } },
  );
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users Page</h1>
      <p>{new Date().toLocaleTimeString()}</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <Link href="../">Home Page</Link>
    </>
  );
};

export default UsersPage;
