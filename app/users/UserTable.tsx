interface User {
  id: number;
  name: string;
  email: string;
}

const UserTable = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    // { cache: "no-store" }
    { next: { revalidate: 10 } }
  );
  const users: User[] = await res.json();
  return (
    <table className="table table-borderd bg-base-200 ">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
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
