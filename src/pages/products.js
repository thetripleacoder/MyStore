import React, {useState, useEffect, useContext} from 'react'
import {Table, Button, Card, CardGroup, Row, Col} from 'react-bootstrap'
import UserContext from '../userContext'
import {Link} from 'react-router-dom'

/*import components here*/
import Banner from '../components/Banner'
import Product from '../components/Product'

export default function Products(){

	const [allProducts, setAllProducts] = useState([])
	const [activeProducts, setActiveProducts] = useState([])
	const {user} = useContext(UserContext)
	const [update,setUpdate] = useState(0)

	useEffect(()=>{
	
		fetch('https://cryptic-crag-81593.herokuapp.com/api/products')
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			setAllProducts(data.data)
			let productsTemp = data.data
			/*temporary array to hold filtered items. only active courses*/
			let tempArray = productsTemp.filter(product => {
				return product.isActive === true
			})

			setActiveProducts(tempArray)
		})
	},[update])



	let productComponents = activeProducts.map((product)=>{
		// console.log(product)

	  return (
	      <Product key = {product._id} productProp={product}/>
	     
	    )
	})



	function archive(productId){
		fetch(`https://cryptic-crag-81593.herokuapp.com/api/products/archive/${productId}`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setUpdate({})
			
		})
	}

	function activate(productId){
		fetch(`https://cryptic-crag-81593.herokuapp.com/api/products/activate/${productId}`, {
				method: 'PUT',
				headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setUpdate({})
		})
}


// console.log(typeof null)

let productRows = allProducts.map(product=>{

	// console.log(product)
	
	return (
			<tr key={product._id} >
					<td>{product._id}</td>
					<td>{product.name}</td>
					<td>{product.price}</td>
					<td className={product.isActive ? "text-success" : "text-danger"}>{product.isActive ? "Active" : "Inactive"}</td>
					<td>
					{
						product.isActive
						?
						<Button variant="danger" className="mx-2" onClick={()=>archive(product._id)}>Archive</Button>
						:
						<Button variant="success" className="mx-2" onClick={()=>activate(product._id)}>Activate</Button>
					}
					<Link  to={`/products/update/${product._id}`} onClick={()=> localStorage.setItem('productId', product._id)} className="btn btn-primary">Edit
					</Link>

					</td>
			</tr>
		
		)

})

let bannerContent = 
{
  title: "MyProducts",
  description: "Affordable products for everybody",
  label: "Login to Buy",
  destination: "/login"
}

	return (
		
				user.isAdmin === true
				? 
				<>
				<Row  className="rowCenter">
					<Card className="mt-5 px-4 py-4" bg="light" >
					<Card className="mx-3 my-3">
						<h1  className="text-center">Admin Dashboard</h1>
						</Card>
						<Table striped bordered hover variant="light">
							<thead>
								<tr className="textCenter">
									<th>Product ID</th>
									<th>Name</th>
									<th>Price</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{productRows}
							</tbody>
						</Table>
						</Card>
					</Row>
				</>
				: 
					<>
						<Banner bannerProp={bannerContent} />
						<Row xs={12} md={4} className=" rowCenter">
						
								{productComponents}
								
						</Row>
					</>
			
		
		)
}