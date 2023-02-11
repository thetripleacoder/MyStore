import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Card, Row, Container, Col } from 'react-bootstrap';
import UserContext from '../userContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Product from '../components/Product';
import BannerJumbotron from '../components/BannerJumbotron';

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);
  const { user } = useContext(UserContext);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('https://my-store-cy0mjb04g-thetripleacoder.vercel.app/api/products')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.data);
        let productsTemp = data.data;

        let tempArray = productsTemp.filter((product) => {
          return product.isActive === true;
        });

        setActiveProducts(tempArray);
      });
  }, [update]);

  let productComponents = activeProducts.map((product) => {
    return <Product key={product._id} productProp={product} />;
  });

  function archive(productId) {
    fetch(
      `https://my-store-cy0mjb04g-thetripleacoder.vercel.app/api/products/archive/${productId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Product Archived Successful!',
          text: 'Product has been archived.',
        });

        setUpdate({});
      });
  }

  function activate(productId) {
    fetch(
      `https://my-store-cy0mjb04g-thetripleacoder.vercel.app/api/products/activate/${productId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Product Activated Successful!',
          text: 'Product has been activated.',
        });

        setUpdate({});
      });
  }

  function deleteProduct(productId) {
    fetch(
      `https://my-store-cy0mjb04g-thetripleacoder.vercel.app/api/products/delete/${productId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Product Deleted Successful!',
          text: 'Product has been deleted.',
        });

        setUpdate({});
      });
  }

  let productRows = allProducts.map((product) => {
    return (
      <tr key={product._id}>
        <td>{product._id}</td>
        <td>{product.name}</td>
        <td>₱{parseFloat(product.price).toFixed(2)}</td>
        <td className={product.isActive ? 'text-success' : 'text-danger'}>
          {product.isActive ? 'Active' : 'Inactive'}
        </td>
        <td>
          {product.isActive ? (
            <Button
              variant='secondary'
              className='mx-2'
              onClick={() => archive(product._id)}
            >
              Archive
            </Button>
          ) : (
            <Button
              variant='success'
              className='mx-2'
              onClick={() => activate(product._id)}
            >
              Activate
            </Button>
          )}
          <Link
            to={`/products/update/${product._id}`}
            onClick={() => localStorage.setItem('productId', product._id)}
            className='btn btn-warning'
          >
            Edit
          </Link>
          <Button
            variant='danger'
            className='mx-2'
            onClick={() => deleteProduct(product._id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  let bannerContent = {
    title: 'MyProducts',
    description: 'Premium High Quality Products',
    label: 'Login to Buy',
    destination: '/login',
    label2: 'Go to cart',
    destination2: '/cart',
    image: 'shop-jumbotron',
  };

  return user.isAdmin === true ? (
    <Container>
      <Row className='justify-content-center'>
        <Card className='my-5 px-4 py-4' bg='light'>
          <Card className='mx-3 my-3'>
            <h3 className='text-center'>Admin Dashboard</h3>
          </Card>
          <Table striped bordered hover variant='light'>
            <thead>
              <tr className='text-center'>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{productRows}</tbody>
          </Table>
        </Card>
      </Row>
    </Container>
  ) : (
    <>
      <BannerJumbotron bannerProp={bannerContent} />
      <div className='products-list-section'>
        <div class='d-flex justify-content-center text-center products-list-header my-5'>
          <Col xs={12} md={9}>
            <h1>Add to Cart</h1>
          </Col>
        </div>
        <div class='d-flex justify-content-center'>
          <Col xs={12} md={9}>
            <Row className=' justify-content-center mt-3'>
              {productComponents}
            </Row>
          </Col>
        </div>
      </div>
    </>
  );
}
