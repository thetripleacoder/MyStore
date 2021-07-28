import React from 'react'
import Banner from '../components/Banner'
import Highlights from '../components/Highlights'
export default function Home() {
	  let bannerContent = 
    {
      title: "Welcome to My Store",
      description: "Buy Now! Die Later!",
      label: "Shop with us!",
      // destination: "/register"
    }
	return (
		<>
			<Banner bannerProp={bannerContent}/>
			<Highlights />

		</>
	)
}