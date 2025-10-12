interface Props {
  params: { id: number; photoId: number };
}

const UserPhotosPage = ({ params: { id, photoId } }: Props) => {
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
