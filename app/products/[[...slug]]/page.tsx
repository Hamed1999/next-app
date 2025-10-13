interface Props {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ sortOrder: string }>;
}

const ProductPage = async ({ params, searchParams }: Props) => {
  const slug = (await params).slug;
  const sortOrder = (await searchParams).sortOrder;

  return (
    <>
      <h1>Product Page</h1>
      <p>
        slug is &apos;{slug?.map((s) => s + " ")}&apos; with sort order of {sortOrder}
      </p>
    </>
  );
};

export default ProductPage;
