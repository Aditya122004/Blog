import { useForm } from "react-hook-form"
import { useFirebase } from "../context/useFirebase"
import { useNavigate,Link } from "react-router-dom"
import { useState } from "react"
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const Navigate=useNavigate()
    const{LogIn}=useFirebase()
    const [firebaseErrors,SetfirebaseErrors]=useState("")
    const click=async(data)=>{
      try{
        await LogIn(data.mail,data.password)
        Navigate('/')
        reset()
      }
      catch(e){
        SetfirebaseErrors(e.message)
      
      }
    }
  return (
    <>
    <div className="w-full h-screen flex items-center justify-center">
    <section className="rounded-md bg-black/70 p-2">
      <div className="flex items-center justify-center bg-white px-6 py-6">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-1">
          </div>
          <h2 className="text-2xl font-bold leading-tight text-black">Log in to your account</h2>
          <p className="mt-2text-sm text-gray-600 ">
            Don&apos;t have an account?{' '}
            <Link
              to='/signup'
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create an account
            </Link>
          </p>
          <form onSubmit={handleSubmit(click)} className="mt-6">
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address:
                </label>
                <div className="mt-1">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    {...register("mail",{required:"Email is Required"})}
                  ></input>
                  {errors.mail &&(<p className='text-red-600 mt-1'>{errors.mail.message}</p>) }
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Password:
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
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
                  Login
                </button>
              </div>
            </div>
            {firebaseErrors && <p className='text-red-600 mt-1 break-words max-w-md mx-auto text-center overflow-auto'>{firebaseErrors}</p>}
          </form>
          <div className="mt-3 space-y-3"></div>
        </div>
      </div>
    </section>
    
    </div>
    </>
  )
}
