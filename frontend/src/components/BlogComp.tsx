import { generateDate, useBlog } from "../hooks"
import Skeleton from "./Skeleton";

  const BlogComp = ({id}:{id:string}) => {
  const {loading,blog} = useBlog({id});
  return (
    <div className="p-5 m-5">
      {loading && <Skeleton />}
      <div>
        <h1 className="font-bold text-3xl mb-1">{blog?.title}</h1>
        <p className="text-slate-500 mb-4"> Published on {generateDate().toDateString()}</p>
        <p>{blog?.content}</p>
      </div>
    </div>
  )
}

export default BlogComp
