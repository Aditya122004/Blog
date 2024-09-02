import {useForm} from 'react-hook-form'
import Navbar from '../components/Navbar';
import { useFirebase } from '../context/useFirebase';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
function EditBlog() {
  const Navigate=useNavigate()
  const { id } = useParams();
  const {GetBlog,UpdateBlog}=useFirebase()
  const [blog,setblog]=useState({})
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  
  const res=()=>{
    reset()
  }
  useEffect(()=>{
    const fetchblog=async()=>{
        const b=await GetBlog(id)
        setblog(b)
        console.log(blog.title,blog.content)
        reset({title:blog.title,text:blog.content})
      }
      fetchblog()
  },[])
  const click=async(data)=>{
      try{
        await UpdateBlog(data.title,data.text,id)
        res()
        Navigate('/')
      }catch(err){
        console.log(err)
      }
  }

  return (
    <>
      <Navbar />
      <div className='w-100% my-3 flex justify-center'>
      <h1 className="mt-5 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
          What is your Mind Today?
    </h1>
    </div>
      <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-10 border-2">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-center mb-4">Create your Own Blog</h2>
          <form onSubmit={handleSubmit(click)}>
          <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  id="title-upload"
                  type="text"
                  {...register("title",{required:"Title is Required"})}
                  className="mt-1 block w-full text-sm px-1 py-1 text-gray-500 bg-white border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {errors.title &&(<p className='text-red-600 mt-1 text-sm'>{errors.title.message}</p>) }
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-md file:border-0
                             file:text-sm file:font-semibold
                             file:bg-blue-50 file:text-blue-700
                             hover:file:bg-blue-100"
                />
              </div>
              <div>
                <label htmlFor="text-area" className="block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  id="text-area"
                  {...register("text",{required:"Text is Required"})}
                  placeholder="Enter your message here..."
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                             focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  rows={4}
                />
                {errors.text &&(<p className='text-red-600 mt-1 text-sm'>{errors.text.message}</p>) }
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={res}
                className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditBlog;