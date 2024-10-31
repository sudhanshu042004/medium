import { Hono } from "hono";
const blog = new Hono();

blog.get("/", async (c) => {
  const prisma: any = c.get("prisma");

  const myPost = await prisma.post.findMany({
    where :{
      authorId : c.get("jwtPayload")["id"]
    }
  })
  return c.json(myPost);
})

blog.post("/", async (c) => {
  const body = await c.req.json();
  console.log("request toh ayi");
  const prisma: any = c.get("prisma");
  console.log(body);
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: c.get("jwtPayload")["id"],
      published : true
    },
  });
  console.log(post);
  return c.json({
    postId: post.id,
  });
});

blog.put("/", async (c) => {
  const body = await c.req.json();
  const prisma: any = c.get("prisma");

  await prisma.post.update({
    where: {
      id: body.postId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.text("updated post");
});

//get post

blog.get("/request/:id", async (c) => {
  const { id } = c.req.param();
  console.log("params");
  const prisma: any = c.get("prisma");
  const blogPost = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  if (!blogPost) {
    c.status(404);
    return c.text("data not found");
  }
  return c.json(blogPost);
});


blog.get("/all", async (c) => {
  const prisma: any = c.get("prisma");
  try {
    const allPost = await prisma.post.findMany({
      where : {
        published : true
      },
      orderBy: { createdAt: "desc" },
      take: 10,
      include : {
        author : {
          select : {
            name : true,
            email : true,
          }
        }
      }
    });
    return c.json(allPost);
  } catch (error) {
    console.error("Error:", error);
    c.status(500);
    return c.json({ message: "Internal Server Error" });
  }
});

export default blog;

