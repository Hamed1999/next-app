interface Props {
  params: Promise<{ id: number; photoId: number }>;
}

const UserPhotosPage = async ({ params }: Props) => {
  const id = await (await params).id;
  const photoId = await (await params).photoId;

  return (
    <>
      <h1>User photos Page</h1>
      <p>
        User id is {id} and the photo id is {photoId}
      </p>
    </>
  );
};

export default UserPhotosPage;
