
import blog from "../assets/blog.svg"
import { Link } from 'react-router-dom';
const Appbar = () => {
  
  return (
    <div>
        <div className='flex justify-between p-3 px-5 font-bold text-2xl border box-border'>
            Medium
            <div className='flex'>
                <Link className=' font-medium text-sm border bg-blue-500 rounded text-white p-2 hover:bg-blue-700' to={'/publish'}>Create Article</Link>
                <img src={blog} alt="" className=' w-14'/>
                
            </div>
        </div>

    </div>
  )
}

export default Appbar