import React, {useState, useEffect} from 'react'
import Link from 'next/link'

const url = 'http://localhost:8000/'

import axios from 'axios';




const Categories = () => {
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
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories.map((category, index) => (
        <Link key={index} href={`/category/${category.slug}`}>
          <span className={`cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>{category.title}</span>
        </Link>
      ))}
    </div>
  )
}

export default Categories