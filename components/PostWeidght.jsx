import React , {useState, useEffect} from 'react'
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

import IMAGE from '../public/website.jpg'


import axios from 'axios'

const url = 'http://localhost:8000/'



const PostWeidght = ({slug}) => {
  const [recentPosts, setRecentPosts] = useState([])


  // Call to the GetRecentPosts EndPoint Funcation
  const getRecentPosts = async() => {
    axios.get(`${url}recent_posts/`).then((response) => {
      setRecentPosts(response.data)
    })
    .catch((error) => {
      console.log(error.message)
    })
  }


  // call to the GetRelatedPosts Endpoint
  const getRelatedPosts = async (slug) => {
    // Create another endpoint for the related post
      axios.get(`${url}get_related_posts/${slug}/`).then((response) => {
        setRecentPosts(response.data)
        
      })
      .catch((error) => {
        console.log(error.message)
      })
  }


  useEffect(() => {
    if(slug) {
      getRelatedPosts(slug)
    }
    else {
      getRecentPosts()
    }
    
  }, [slug])


  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
      {recentPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img 
                alt={post.id}
                width="auto"
                height='auto' 
                src={post.image} 
                className="rounded-full align-middle" 
                />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <Link href={`/post/${post.slug}`} as={`/post/${post.slug}`} className="text-md" key={index}>{post.title}</Link>
          </div>
        </div>
      ))}
  </div>
  )
}

export default PostWeidght