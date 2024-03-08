import axios from "axios";
import { useEffect, useState } from "react";
import { server_url } from "../config";

export interface Blog{
    "id":string,
    "title":string,
    "content":string,
    "published":boolean
}

export const useBlog = ( {id}: {id:string} ) => {
    const [blog, setblog] = useState<Blog>();
    const [loading, setloading] = useState(true);

    useEffect(() => {
      axios.get(`${server_url}/blog/${id}`,{
        headers:{
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
      })
      .then((response)=>{
        setblog(response.data.post);
        setloading(false);
      })
      .catch(error=>console.log(error));
    }, [id]);

    return {
        loading,
        blog
    }
};

export const useBlogs = () => {
    const [blogs, setblogs] = useState<Blog[]>([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
      axios.get(`${server_url}/blog/bulk`,{
        headers:{
            Authorization:'Bearer ' + localStorage.getItem("jwt")
        }
        })
        .then((response)=>{
            setblogs(response.data.posts);
            setloading(false);
        })
        .catch(error=>console.log(error))
    }, []);

    return {
        blogs,
        loading
    }
    
};

export function generateDate():Date{
    const randoms = Math.floor(Math.random()*31536000000)
    const currentDate = new Date();
    return new Date(currentDate.getTime() - randoms);
  }
