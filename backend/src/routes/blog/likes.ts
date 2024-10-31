import { Hono } from "hono";
import { jwt } from "hono/jwt";

const Like = new Hono<{
    Bindings: {
        JWT_SECRET: string,
    }
}>();

Like.get('/', async (c) => {
    const { postId, userId } = await c.req.json();
    const prisma: any = c.get("prisma");

    const likes = await prisma.like.count({
        where: {
            postId : postId
        }
    })
    return c.json({
        count : likes
    });
})
//user authentication
Like.use('/*', async (c, next) => {
    const jwtMiddleware = jwt({
        secret: c.env.JWT_SECRET
    })
    return jwtMiddleware(c, next);
})

Like.post('/', async (c) => {
    const body = await c.req.json();
    const prisma: any = c.get("prisma");

    const alreadyLiked = await prisma.like.findUnique({
        where: {
            postId: body.postId,
            userId: c.get("jwtPayload")["id"]
        }
    });

    if (alreadyLiked) {
        await prisma.like.delete({
            where: {
                postId: body.postId,
                userId: c.get("jwtPayload")["id"]
            }
        })
        return c.json({
            "msg" : "like removed"
        })
    }

    const likes = await prisma.like.create({
        data: {
            postId: body.postId,
            userId: c.get("jwtPayload")["id"],
        }
    })
    return c.json({
        "msg" : "like added"
    });
});

Like.get('/me', async(c)=>{
    const prisma: any = c.get("prisma");

    const likedPost = await prisma.like.findMany({
        where :{
            userId : c.get("jwtPayload")["id"]
        },
        include:{
            post :true,
        }
    })
    return c.json(likedPost);
})

export default Like;