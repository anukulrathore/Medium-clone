
import BlogCard from '../components/BlogCard'
import Skeleton from '../components/Skeleton';
import { useBlogs } from '../hooks'
import Appbar from './Appbar';

const Blogs = () => {
  const {blogs, loading} = useBlogs();
  return (
    <div>
      <Appbar />
      {loading && <Skeleton />}
      {blogs.map((blog,index)=>{
        return (<BlogCard key={index  } id={`${blog.id}`} title={`${blog.title}`} content={`${blog.content}`} published={true} />)
      })}
    </div>
  )
}

export default Blogs