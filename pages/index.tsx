import type { NextPage } from 'next'
import React ,{useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'

import axios from 'axios'

import {PostCard, Categories, PostWeidght} from '../components'

const url  = `http://localhost:8000/`





const Home: NextPage = () => {
  const [posts, setPosts] = useState([])



  const getPosts = async() => {
    axios.get(`${url}posts/`).then((response) => {
      setPosts(response.data)
    })
    .catch((error) => {
      console.log(error.message)
    })
  }


  useEffect(() => {
    getPosts()
  }, [])



  return (

    
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* First Column */}
          <div className="lg:col-span-8 col-span-1">
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>

          {/* Second Column */}
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWeidght slug='' />
              <Categories />
            </div>
          </div>
          
        </div>
      </div>
  )
}


export default Home

