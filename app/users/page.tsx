import Link from "next/link";
import UserTable from "./UserTable";
import { Suspense } from "react";
interface Props {
  searchParams: Promise<{ sortOrder?: string }>;
}

const UsersPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const sortOrder = params?.sortOrder;
  return (
    <>
      <h1>Users Page</h1>
      <Link href="/users/new" className="btn btn-soft mb-3 rounded-md">
        NEW USER
      </Link>
      <Suspense
        fallback={<span className="loading loading-spinner loading-xl"></span>}
      >
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </>
  );
};

export default UsersPage;
