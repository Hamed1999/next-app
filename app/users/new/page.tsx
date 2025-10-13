"use client";

import { useRouter } from "next/navigation";

const NewUserPage = () => {
  const router = useRouter();
  return (
    <>
      <h1>Create New User:</h1>
      <button
        className="btn btn-primary rounded-md"
        onClick={() => router.back()}
      >
        Create
      </button>
    </>
  );
};

export default NewUserPage;
