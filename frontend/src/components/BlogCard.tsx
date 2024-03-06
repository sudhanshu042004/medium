import { Card, CardActionArea, CardMedia, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

interface BlogCardProps {
  data: {
      id: string,
      title: string,
      createdAt: Date,
      images: string // assuming images is a string representing the image URL
  }
}


const BlogCard: React.FC<BlogCardProps> = ({ data }: any) => {
  const navigate = useNavigate();
  const originalDate = new Date(data.createdAt);
  const createdAt = originalDate.toLocaleDateString('en-US');

  const handleCardClick = () => {
    navigate(`/blog/${data.id}`);
  };

  //console.log(data);
  return (
    <div >
      <Card className='m-5' onClick={handleCardClick}>
        <CardActionArea >
          <CardMedia sx={{ height: 140 }} component='img' image={data.images} title="Cover image" />
          <Typography gutterBottom variant="h5" className='px-2' component="div">
            {data.title}
          </Typography>
          <Typography variant="body2" className='px-2' color="text.secondary">
            {data.id} on {createdAt}
          </Typography>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default BlogCard