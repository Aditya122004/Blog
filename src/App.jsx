import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import AddBlog from './pages/AddBlog'
import Login from './pages/Login'
import MyBlog from './pages/MyBlogs'
import NotFound from "./pages/NotFound"
import SignUp from "./pages/SignUp"
import ProtectedRouting from "./pages/ProtectedRouting"
import ViewBlog from "./pages/ViewBlog"
import EditBlog from "./pages/EditBlog"
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRouting><Home /></ProtectedRouting>} />
        <Route path='/addblog' element={<ProtectedRouting><AddBlog /></ProtectedRouting>} />
        <Route path='/myblog' element={<ProtectedRouting><MyBlog /></ProtectedRouting>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/blog/:id' element={<ProtectedRouting><ViewBlog /></ProtectedRouting>}/>
        <Route path='/edit/:id' element={<ProtectedRouting><EditBlog /></ProtectedRouting>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App