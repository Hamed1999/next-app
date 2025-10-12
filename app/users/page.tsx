import Link from "next/link";
import UserTable from "./UserTable";

const UsersPage = () => {
  return (
    <>
      <h1>Users Page</h1>
      <UserTable />
      <Link href="../">Home Page</Link>
    </>
  );
};

export default UsersPage;
