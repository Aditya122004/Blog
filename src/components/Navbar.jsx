import logo from "../assets/logo.jpeg"
import {Link,useNavigate} from 'react-router-dom'
import { useFirebase } from "../context/useFirebase"
function Navbar() {
  const Navigate=useNavigate()
  const {SignOut}=useFirebase()
  return (
    <>
        <nav className="w-full h-16 border-2 flex justify-between items-centre">
            <img src={logo} className="h-14 w-14 ml-4 mt-[2px]" alt="logo"></img>
            <div className="flex items-center space-x-4">
            <Link to='/'className="hover:text-gray-700 transition duration-300">Home</Link>
            <Link to='/myblog' className="hover:text-gray-700 transition duration-300">My Blogs</Link>
            <Link to='/addblog' className="hover:text-gray-700 transition duration-300">Create Blog</Link>
            </div>
            <div className="flex items-center">
            <button 
            className=" h-fit mr-4 items-center bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            onClick={async()=>{
              try{
                await SignOut()
                console.log("Log out successful")
                Navigate("/signup")
              }
              catch(e){
                console.log("Could Not log out")
              }
            }}>
                Log Out
            </button>
            </div>
            
        </nav>
    </>
  )
}

export default Navbar