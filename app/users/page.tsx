import Link from "next/link";
import UserTable from "./UserTable";
interface Props {
  searchParams: Promise<{ sortOrder?: string }>;
}

const UsersPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const sortOrder = params?.sortOrder;
  return (
    <>
      <h1>Users Page</h1>
      <UserTable sortOrder={sortOrder} />
      <Link href="../">Home Page</Link>
    </>
  );
};

export default UsersPage;
