
import { Link } from 'react-router-dom'
// eslint-disable-next-line react/prop-types, no-unused-vars
function Card({title,username,bid,img}) {
  return (
    <div className="w-[300px] rounded-md border">
     <img
  src={img}
  alt="image"
  className="h-[200px] w-full max-w-full max-h-full rounded-md object-cover"
  />
      <div className="p-4">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="mt-3 text-sm text-gray-600">
          {username}
        </p>
        <div className='w-full flex justify-around'>
        <Link to={`/blog/${bid}`}
          className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[12px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"

        >
          Read
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Card