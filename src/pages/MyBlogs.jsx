import Navbar from '../components/Navbar'
import { useFirebase } from '../context/useFirebase'
import Card2 from '../components/Card2'
import Footer from '../components/Footer'
import { useState,useEffect } from 'react'
function MyBlogs() {
  const {GetUserBlogs,DeleteBlog}=useFirebase()
  const [blogs,Setblogs]=useState([])
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const b = await GetUserBlogs();
        const newBlogs = b.docs.map((doc) => ({
          ...doc.data(),
          blogId: doc.id,
        }));
      Setblogs(newBlogs)
      }catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[])
  const handleDelete=async(id)=>{
    try{
      await DeleteBlog(id)
      Setblogs((prevBlogs) => prevBlogs.filter((blog) => blog.blogId !== id));
      console.log("Deleted")
    }catch(e){
      console.log("Unsuccesful deletion")
    }
  }
  return (
    <>
    <Navbar/>
    <div className='w-100% my-3 flex justify-center'>
    <h1 className="mt-5 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
          Welcome To Your Blogs
    </h1>
    </div>
    <div className='w-11/12 h-100% mx-auto mt-12 grid grid-cols-4 gap-4'>
    {blogs && blogs.map((blog) => (
  <Card2 key={blog.blogId} content={blog.content} title={blog.title} username={blog.user} date={blog.date} id={blog.id} blogid={blog.blogId} img={blog.imageUrl} del={handleDelete}/>
))}
    </div>
    <Footer/>
    </>
  )
}

export default MyBlogs