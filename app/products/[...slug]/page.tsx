interface Props {
  params: { slug: string[] };
}

const ProductPage = ({ params: { slug } }: Props) => {
  return (
    <>
      <h1>Product Page</h1>
      <p>slug is {slug}</p>
    </>
  );
};

export default ProductPage;
