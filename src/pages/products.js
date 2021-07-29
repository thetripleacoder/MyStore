import React, {useState, useEffect, useContext} from 'react'
import {Table, Button} from 'react-bootstrap'
import Banner from '../components/Banner'
import Course from '../components/Course'
import UserContext from '../userContext'

export default function Courses(){

	const [allCourses, setAllCourses] = useState([])
	const [activeCourses, setActiveCourses] = useState([])
	const {user} = useContext(UserContext)
	const [update,setUpdate] = useState(0)

	useEffect(()=>{
	
		fetch('http://localhost:4000/api/courses')
		.then(res => res.json())
		.then(data => {
			console.log(data)
			setAllCourses(data.data)
			let coursesTemp = data.data
			/*temporary array to hold filtered items. only active courses*/
			let tempArray = coursesTemp.filter(course => {
				return course.isActive === true
			})

			setActiveCourses(tempArray)
		})
	},[update])

	let courseComponents = activeCourses.map((course)=>{
		console.log(course)

	  return (
	      <Course key = {course._id} courseProp={course}/>
	     
	    )
	})
	function archive(courseId){
		fetch(`http://localhost:4000/api/courses/archive/${courseId}`, {
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

	function activate(courseId){
		fetch(`http://localhost:4000/api/courses/activate/${courseId}`, {
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

console.log(typeof null)

let courseRows = allCourses.map(course=>{
	
	return (
			<tr key={course._id}>
					<td>{course._id}</td>
					<td>{course.name}</td>
					<td className={course.isActive ? "text-success" : "text-danger"}>{course.isActive ? "Active" : "Inactive"}</td>
					<td>
					{
						course.isActive
						?
						<Button variant="danger" className="mx-2" onClick={()=>archive(course._id)}>Archive</Button>
						:
						<Button variant="success" className="mx-2" onClick={()=>activate(course._id)}>Activate</Button>
					}

					</td>
			</tr>
		
		)

})

let bannerContent = 
{
  title: "Welcome to Courses Page",
  description: "Affordable courses for everyone",
  label: "Login to Enroll",
  destination: "/login"
}

	return (
		
				user.isAdmin === true
				? 
				<>
						<h1 className="text-center">Admin Dashboard</h1>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{courseRows}
							</tbody>
						</Table>
				</>
				: 
					<>
						<Banner bannerProp={bannerContent} />
						{courseComponents}
					</>
			
		
		)
}