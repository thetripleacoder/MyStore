import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Card, Row, Jumbotron } from 'react-bootstrap';
import UserContext from '../userContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Product from '../components/Product';

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);
  const { user } = useContext(UserContext);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    fetch('https://cryptic-crag-81593.herokuapp.com/api/products')
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
      `https://cryptic-crag-81593.herokuapp.com/api/products/archive/${productId}`,
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
      `https://cryptic-crag-81593.herokuapp.com/api/products/activate/${productId}`,
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
      `https://cryptic-crag-81593.herokuapp.com/api/products/delete/${productId}`,
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
        <td>{product.price}</td>
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
  };

  return user.isAdmin === true ? (
    <>
      <Row className='rowCenter'>
        <Card className='my-5 px-4 py-4' bg='light'>
          <Card className='mx-3 my-3'>
            <h3 className='text-center'>Admin Dashboard</h3>
          </Card>
          <Table striped bordered hover variant='light'>
            <thead>
              <tr className='textCenter'>
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
    </>
  ) : (
    <>
      <Jumbotron className='mt-4 jumbotronHome'>
        <h1>{bannerContent.title}</h1>
        <p>{bannerContent.description}</p>
        {!user.email ? (
          <Link
            to={bannerContent.destination}
            className='btn btn-outline-dark bannerButton px-4 py-2 link'
          >
            {bannerContent.label}
          </Link>
        ) : bannerContent.destination2 && bannerContent.label2 ? (
          <Link
            to={bannerContent.destination2}
            className='btn btn-outline-dark bannerButton px-4 py-2 link'
          >
            {bannerContent.label2}
          </Link>
        ) : null}
      </Jumbotron>
      <Row className=' rowCenter'>{productComponents}</Row>
    </>
  );
}
