import React , {useState, useEffect} from 'react';
import { useRouter } from 'next/router';




const url = 'http://localhost:8000/'
import axios  from 'axios'

import { PostCard, Categories } from '../../components';

const CategoryPost = () => {
  
  const [posts, setPost] = useState([])
  const router = useRouter()
  const { slug } = router.query
 



  const getPostDetail = async (slug) => {
      if (slug) {
        axios.get(`${url}categroies/${slug}`)
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



    if (!posts) return null;

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

