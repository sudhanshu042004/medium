import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
const url = import.meta.env.VITE_API_URL;

interface Data {
    authorId: string,
    content: string,
    createdAt: string,
    id: string,
    images: string,
    published: boolean,
    title: string,
}

const BlogPage = () => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState<Data | string>("# Loading...");
    useEffect(() => {
        axios.get(`${url}/blog/all/${id}`)
            .then((res) => setBlogData(res.data))
            .catch(() => { })
            .finally(() => { })
    }, [id])

    return (
        <div>
            <div>
                <ReactMarkdown
                    className="relative my-24 text-md md:text-xl mx-auto"
                    children={blogData.content}
                    rehypePlugins={[rehypeRaw]}
                />
            </div>
        </div>
    )
}

export default BlogPage