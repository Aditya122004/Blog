import { useEffect, useState } from 'react';
import { useFirebase } from '../context/useFirebase';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function ViewBlog() {
  const {GetBlog}=useFirebase()
  const [blog,setblog]=useState({})
  const { id } = useParams();
  useEffect(()=>{
    const fetchblog=async()=>{
      const b=await GetBlog(id)
      setblog(b)
    }
    fetchblog()
  },[])
  return (
    <>
    <Navbar/>
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
    <h1 className="text-4xl font-bold mb-4 text-gray-800">{blog.title}</h1>
    <img
      className="w-full h-auto mb-6 rounded"
      src={blog.imageUrl}
      alt="image"
    />
    <div className="text-sm text-gray-600 mb-6">
      <span className="mr-4">{blog.date}</span>
      <span className="font-semibold">by {blog.user}</span>
    </div>
    <div className="text-lg text-gray-700 leading-relaxed">
      <p>{blog.content}</p>
    </div>
  </div>
  <Footer/>
  </>
  )
}

export default ViewBlog