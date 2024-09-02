import {useForm} from 'react-hook-form'
import { useState } from 'react'
import { useFirebase } from "../context/useFirebase"
import { Link,useNavigate } from 'react-router-dom'
export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const Navigate=useNavigate()
  const {SignUp,AddUserName}=useFirebase()
  const [firebaseErrors,SetfirebaseErrors]=useState("")
  const click=async(data)=>{
    try {
      const user = await SignUp(data.mail, data.password);
      await AddUserName(data.name, user.uid);
      Navigate('/')
      reset();
    } catch (error) {
      console.log(error);
      SetfirebaseErrors(error.message)
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
    <section className="rounded-sm bg-black/80 p-2">
      <div className="flex items-center justify-center bg-white px-6 py-8">
        <div className="m-2 xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-2xl font-bold leading-tight text-black">Sign up to create account</h2>
          <p className="mt-2 text-base text-gray-600">
            Already have an account?{' '}
            <Link
              to='/login'
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form onSubmit={handleSubmit(click)} className="mt-6">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">
                  Full Name:
                </label>
                <div className="mt-1">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    {...register("name",{required:"Name is Required"})}
                  ></input>
                  {errors.name && (<p className='text-red-600 mt-1'>{errors.name.message}</p>)}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  Email address:
                </label>
                <div className="mt-1">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    {...register("mail",{required:"Email is Required"})}
                    
                  ></input>
                  {errors.mail &&(<p className='text-red-600 mt-1'>{errors.mail.message}</p>) }
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    Password:
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    {...register("password",{required:"Password is Required",minLength:{value:8,message:"Password should have atleast 8 characters"}})}
                  ></input>
                  {errors.password && (<p className='text-red-600 mt-1'>{errors.password.message}</p>)}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  
                >
                  Create Account
                </button>
              </div>
            </div>
            {firebaseErrors && <p className='text-red-600 mt-1 break-words max-w-md mx-auto text-center overflow-auto'>{firebaseErrors}</p>}
          </form>
          <div className="mt-3 space-y-3">
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
