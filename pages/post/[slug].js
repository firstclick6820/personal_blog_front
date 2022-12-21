import React, { useEffect, useState} from 'react'
import {Categories, PostWeidght, Author, CommentsForm, Comments, PostDetail} from '../../components'

import { useRouter } from 'next/router'



const url = 'http://localhost:8000/'
import axios  from 'axios'

const PostDetails= () => {

    const [post, setPost] = useState([])
    const router = useRouter()
    const { slug } = router.query
   



    const getPostDetail = async (slug) => {
        if (slug) {
          axios.get(`${url}post_details/${slug}/`)
            .then((response) => {
                setPost(response.data)
            })
            .catch((error) => {
              console.log(error.message)
            })
        }
      }
      

    useEffect(() => {
        
        if (slug) {
          getPostDetail(slug)
        }
      }, [slug])

    

    
  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8">
                <PostDetail post={post} />
                <Author author={post.author} />
                <CommentsForm slug={post.slug} />
                <Comments  slug={post.slug}/>
       
            </div>

            <div className="col-span-1 lg:col-span-4">
                <div className="relative lg:sticky top-8">
                    <PostWeidght slug={post.slug}/>
                    <Categories />
                </div>
            </div>
        </div>
           
    </div>
  )
}


export default PostDetails;