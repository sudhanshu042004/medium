import BlogCard from './BlogCard'
import useBlogData from '../hooks/useBlogData';
import { CircularProgress } from '@mui/material';

interface Data {
    id : string,
    title : string,
    images : string,
    createdAt : Date,
}

const AllCard = () => {
    const { blogData, blogLoading } = useBlogData();
    if (blogLoading) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <CircularProgress />
            </div>
        )
    }
    //console.log(blogData);
    return (
        <div className='m-5'  >
            {blogData.map((data : Data) => (
                <BlogCard data={data} key={data.id}/>
            ))}
        </div>
    )
}

export default AllCard