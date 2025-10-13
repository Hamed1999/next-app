"use client";
import { usePathname } from "next/navigation";

const UserNotFounPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  return <div>This user with id:{id} doesn't exist.</div>;
};

export default UserNotFounPage;
