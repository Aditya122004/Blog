import Navbar from '../components/Navbar'
import Card from '../components/Card'
//import { Pagination } from '../components/Pagination'
import Footer from '../components/Footer'
import { useFirebase } from '../context/useFirebase'
import { useEffect,useState } from 'react'
function Home() {
  const [blogs,Setblogs]=useState([])
  const {GetBlogs}=useFirebase()
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const b=await GetBlogs()
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
  return (
    <>
    <Navbar/>
    <div className='w-100% my-3 flex justify-center'>
    <h1 className="mt-5 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
          Welcome To Home Page
    </h1>
    </div>
    <div className='w-11/12 h-100% mx-auto mt-12 grid grid-cols-4 gap-4'>
    {blogs && blogs.map((blog) => (
  <Card key={blog.blogId} content={blog.content} title={blog.title} username={blog.user} date={blog.date} bid={blog.blogId} img={blog.imageUrl} />
))}
    </div>
    <Footer/>
    </>
  )
}

export default Home