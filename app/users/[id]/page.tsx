import { notFound } from "next/navigation";

interface Props {
  params: { id: number };
}

const UserDetailPage = ({ params: { id } }: Props) => {
  if (id > 10) notFound();
  return (
    <>
      <h1>User Detail Page</h1>
      <p>User id is {id}</p>
    </>
  );
};

export default UserDetailPage;
