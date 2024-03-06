import { Hono } from "hono";
import { jwt } from "hono/jwt";

const Like = new Hono<{
    Bindings: {
        JWT_SECRET: string,
    }
}>();

Like.get('/',async(c)=>{
    const {postId,userId} = await c.req.json();
    const prisma = c.get("prisma");
    const likes = await prisma.like.findMany({
        where : {
            OR : [
                {
                    postId : postId
                },
                {
                    userId : userId
                }
            ]
        }
    })
    return c.json(likes);
})
//user authentication
Like.use('/like', async (c, next) => {
    const jwtMiddleware = jwt({
        secret : c.env.JWT_SECRET
    })
    return jwtMiddleware(c,next);
})

Like.post('/',async (c)=>{
    const body = await c.req.json();
    const prisma = c.get("prisma");
    const likes = await prisma.like.create({
        data : {
            postId : body.postId,
            userId : c.get("jwtPayload"),
        }
    })
    return c.json(likes);
})

export default Like;