interface Props {
  params: { slug: string[] };
  searchParams: { sortOrder: string };
}

const ProductPage = ({
  params: { slug },
  searchParams: { sortOrder },
}: Props) => {
  return (
    <>
      <h1>Product Page</h1>
      <p>slug is {slug} with sort order of {sortOrder}</p>
    </>
  );
};

export default ProductPage;
