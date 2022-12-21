import React , {useEffect, useState, useRef}from 'react'


import axios from 'axios'

const url = 'http://localhost:8000/'



const CommentsForm = ({slug}) => {
  const [error , setError] = useState(false)
  const [_localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const newslug = slug

  const formEl = useRef()
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl= useRef()



 

  const handleCommentSubmission = (event) => {
    
    event.preventDefault();

    setError(false);

    const  {value: message} = commentEl.current;
    const {value: name} = nameEl.current;
    const {value: email} = emailEl.current;
    const {checked: storeData } = storeDataEl.current;

    if (!message || !name || !email) {
      setError(true)
      return;
    }

    


    if (storeData) {
      localStorage.setItem('name', name)
      localStorage.setItem('email', email)
    }else {
      localStorage.removeItem('name', name)
      localStorage.removeItem('email', email)
    }

    
    axios.post(`${url}${newslug}/comment/`, {'name':name, 'email': email, 'message': message})
    .then((res) => {
      // Show the success message
      setShowSuccessMessage(true)

      // Disappear the success message after 3 seconds
      setTimeout(()=> {
          setShowSuccessMessage(false)
      }, 3000)

      // clear the form inputs
      formEl.current.reset()

    
    })   
    .catch((error) => {
      console.log(error.message)
    })
 
  }


  return (
    <form ref={formEl} className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8" onSubmit={handleCommentSubmission}>
      {/* Title  */}
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>


      {/* Comment Field */}
 
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea ref={commentEl} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="comment" placeholder="Comment" />
      </div>

      {/* name and email fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input type="text" ref={nameEl} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Name" name="name" />
        <input type="email" ref={emailEl} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Email" name="email" />
      </div>

      {/* Check Box */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" value="true" />
          <label className="text-gray-500 cursor-pointer" htmlFor="storeData"> Save my name, email in this browser for the next time I comment.</label>
        </div>
      </div>

      {/* Errors */}
    {error && <p className="text-xs text-red-500">All fields are required!</p>}

    {/* Button to submit the comment */}
    <div className="mt-8">
      <button 
            type="submit" 
            
            className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Post Comment</button>
      {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
    </div>
  </form>
);
};
  

export default CommentsForm