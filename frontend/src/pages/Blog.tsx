import { useParams } from 'react-router-dom'
import BlogComp from '../components/BlogComp'
import Appbar from './Appbar';

const Blog = () => {
  const { id } = useParams();
  return (
    <div>
      <Appbar />
      {<BlogComp id={`${id}`} />}
    </div>
  )
}

export default Blog
