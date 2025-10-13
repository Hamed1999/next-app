"use client";

import { useRouter } from "next/navigation";

const NewUserPage = () => {
  const router = useRouter();
  const handleCreate = async () => {
    // (Optional) do some logic / form submission, etc.
    router.push("/users"); // navigate to `/users` (new history entry)
  };
  return (
    <>
      <h1>Create New User:</h1>
      <button className="btn btn-primary rounded-md" onClick={handleCreate}>
        Create
      </button>
    </>
  );
};

export default NewUserPage;
