import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/common/FormContainer";
import { toast } from "react-toastify";
import axios from "axios";
import Container from "../../components/common/Container";
import { Form } from "react-bootstrap";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      };

      await axios.put(`/api/products/${productId}`, updatedProduct);

      toast.success("Product updated");
      navigate("/admin/productList");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update product");
    }
  };

  

  useEffect(() => {
    console.log("useeffect");
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
  
        // Check if the response status is OK (200)
        if (response.status === 200) {
          const productData = response.data;
          setName(productData.name);
          setPrice(productData.price);
          setImage(productData.image);
          setBrand(productData.brand);
          setCategory(productData.category);
          setCountInStock(productData.countInStock);
          setDescription(productData.description);
          setLoading(false);
        }
      } catch (err) {
        // Handle errors, e.g., display an error message
        setError(
          err?.response?.data?.message || "Failed to fetch product details"
        );
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const response = await axios.post("/api/upload", formData);
        toast.success("File uploaded successfully");
        setImage(response.data.image);
    
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to upload file");
    }
    console.log(e.target.files[0])
  };

  return (
    <>
      <Container className="mx-auto p-4">
        <Link to="/admin/productList" className="btn btn-light my-3">
          Go Back
        </Link>
        <FormContainer>
          <h1 className="text-2xl font-semibold mb-4">Edit Product</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="error">{error}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="brand"
                  className="block font-medium text-gray-700"
                >
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              ></Form.Control>
            </Form.Group>
              

              <div className="mb-4">
                <label
                  htmlFor="countinstock"
                  className="block font-medium text-gray-700"
                >
                  Count In Stock
                </label>
                <input
                  type="number"
                  id="countinstock"
                  placeholder="Enter Count In Stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  placeholder="Enter price"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <button
                disabled={loading}
                type="submit"
                className="bg-blue-500 disabled:bg-blue-300 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Update
              </button>
              {loading && <Loader />}
            </form>
          )}
        </FormContainer>
      </Container>
    </>
  );
};

export default ProductEditScreen;
