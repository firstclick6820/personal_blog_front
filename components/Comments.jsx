import React, { useEffect, useState } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';


const url = 'http://localhost:8000/'
import axios from 'axios';




const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  const getComments = async (slug) => {
    axios.get(`${url}get_post_related_comments/${slug}/`)
    .then((response)=> {
      setComments(response.data)
    })
    .catch((error)=> {
      console.log(error)
    })
  }

  useEffect(()=> {
    getComments(slug)
  }, [slug])

  console.log(comments)

  if (!comments) return null;

  return (
    <>
      {
        Array.isArray(comments) && comments.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
              {comments.length}
              {' '}
              Comments
            </h3>
            {comments.map((comment, index) => (
              <div key={index} className="border-b border-gray-100 mb-4 pb-4">
                <p className="mb-4">
                  <span className="font-semibold">{comment.name}</span>
                  {' '}
                  on
                  {' '}
                  {moment(comment.created_at).format('MMM DD, YYYY')}
                </p>
                <p className="whitespace-pre-line text-gray-600 w-full">{parse(comment.message)}</p>
              </div>
            ))}
          </div>
        )
      }

    </>
  );
};

export default Comments;