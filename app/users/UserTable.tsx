import Link from "next/link";
import { sort } from "fast-sort";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder?: string;
}

const UserTable = async ({ sortOrder }: Props) => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    // { cache: "no-store" }
    { next: { revalidate: 10 } }
  );
  const users: User[] = await res.json();
  let sortedUsers = users;
  if (sortOrder) {
    sortedUsers = sort(sortedUsers).asc(
      sortOrder === "email" ? (user) => user.email : (user) => user.name
    );
  }
  return (
    <table className="table table-borderd bg-base-200 ">
      <thead>
        <tr>
          <th>
            <Link href="/users?sortOrder=name">Name</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=email">Email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id} className="hover:bg-base-300">
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;