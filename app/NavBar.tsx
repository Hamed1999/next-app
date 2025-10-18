import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <nav className="flex gap-5 p-5 mb-5 bg-blue-300">
        <Link href="/">Home</Link>
        <Link href="/users">Users</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/products">Products</Link>
        <Link href="/upload">Upload</Link>
      </nav>
    </>
  );
};

export default NavBar;
