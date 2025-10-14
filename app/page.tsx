import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main>
      <h1>Hello World! I&apos;m Hamed.</h1>
      <div>
        <h2>
          The Users API exposes RESTful endpoints supporting{" "}
          <strong>GET</strong>, <strong>POST</strong>, <strong>PUT</strong>, and{" "}
          <strong>DELETE</strong> operations for user resource management.
        </h2>
        <p>
          Base URL:{" "}
          <Link href="/api/users" className="btn btn-link" target="_blank">
            /api/users
          </Link>
        </p>
      </div>
      <ProductCard />
    </main>
  );
}
