import React from "react";
import { useParams } from "react-router-dom";
import Container from "../components/common/Container";

const ProductDetail = () => {
  const { id } = useParams();

  return <div>ProductDetail</div>;
};

export default ProductDetail;
