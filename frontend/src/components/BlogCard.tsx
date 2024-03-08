import { Link } from 'react-router-dom'
import { Blog, generateDate } from '../hooks'
import blog from "../assets/blog.svg"

const BlogCard = ({
  id,
  title,
  content
}:Blog) => {


  return (
    <Link to={`/blog/${id}`}>
      <div className='grid grid-cols-3 m-6 h-30 pl-8'>
        <div className=' col-span-2'>
          <div className='flex mb-4'>
            <p className=' bg-slate-200 rounded-full w-6 h-6 flex justify-center text-s mr-2'> A </p>
            <p className=' font-semibold'> Anukul </p>
            <p className='mx-2 font-light text-base'>{generateDate().toDateString()}</p>
          </div>
          <h1 className=' font-bold text-3xl mb-2'>{title}</h1>
          <p className='mb-2' >{content.slice(0,100) + '...'}</p>
          <p className='mt-4 text-slate-500'>{`${Math.ceil(Math.random()*10)} min read `}</p>
        </div>
        <div className=' col-span-1 py-3'>
          <img src={blog} alt="" className=' w-40'/>
        </div>
      </div>
      <div className='h-0.5 bg-slate-100 w-4/5 ml-36'></div>
    </Link>
  )
}



export default BlogCard