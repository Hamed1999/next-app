"use client";
import { usePathname } from "next/navigation";

const UserNotFounPage = () => {
  const pathname = usePathname();
  const idStr = pathname.split("/").pop();
  const id = new Number(idStr).valueOf();
  if (!Number.isInteger(id))
    return (
      <div>
        The user id can&apos;t be &apos;{idStr}&apos;, it must be an integer.
      </div>
    );
  return <div>This user with id:{id} doesn&apos;t exist.</div>;
};

export default UserNotFounPage;
