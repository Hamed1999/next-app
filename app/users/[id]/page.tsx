import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: number }>;
}

const UserDetailPage = async ({ params }: Props) => {
  const id = new Number((await params).id).valueOf();
  if (id > 10 || !Number.isInteger(id)) notFound();
  return (
    <>
      <h1>User Detail Page</h1>
      <p>User id is {id}</p>
    </>
  );
};

export default UserDetailPage;
