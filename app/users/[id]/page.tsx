interface Props {
  params: { id: number };
}

const UserDetailPage = ({ params: { id } }: Props) => {
  return (
    <>
      <h1>User Detail Page</h1>
      <p>User id is {id}</p>
    </>
  );
};

export default UserDetailPage;
