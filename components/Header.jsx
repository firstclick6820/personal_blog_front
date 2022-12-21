import React, {useContext, useEffect, useState} from 'react'
import Link from 'next/link'


const url = 'http://localhost:8000/'

import axios from 'axios'


const Header = () => {
    const [categories, setCategories] = useState([])


  const getCategories = async () => {
      axios.get(`${url}categories/`)
      .then((response) => {
        setCategories(response.data)
      })
      .catch((errors) => {
        console.log(errors.message)
      })
    }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="container mx-auto px-10 mb-8">
        <div className="border-b w-full inline-block border-blue-400 py-8">
            <div className ="md:float-left block">
                <Link href="/">
                    <span className="cursor-pointer font-bold text-4xl text-white">
                        MKM
                    </span>
                </Link>
            </div>

            <div className ="hidden md:float-left md:contents">
               {categories.map((category) => (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                    <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                        {category.title}
                    </span>
                </Link>
               ))}
            </div>
        </div>
    </div>
  )
}

export default Header