import  { useEffect, useState } from 'react'
import axios from "axios"
const url = import.meta.env.VITE_API_URL;

const useBlogData = () => {
  const [blogData,setBlogData] = useState([]);
  const [blogLoading,setBlogLoading] = useState(true);

  useEffect(()=>{axios.get(`${url}/blog/all`)
  .then(function (response) {
    setBlogData(response.data);
    setBlogLoading(false);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    
  });
  },[]);
  return {blogData,blogLoading};
}

export default useBlogData