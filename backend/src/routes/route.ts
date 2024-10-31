import { Hono } from "hono";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import blog from "./blog/blog";
import { jwt } from "hono/jwt";
import { Prisma } from "@prisma/client/edge";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import Like from "./blog/likes";

type ExtendedPrismaClient = PrismaClient & ReturnType<typeof withAccelerate>;

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

type Variables = {
  prisma: ExtendedPrismaClient;
};

const Route = new Hono<{ Bindings: Bindings; Variables: Variables }>();

//set pisma in gobal
Route.use("*", async (c, next) => {

  //initialize prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate()) ;
  c.set("prisma", prisma as unknown as ExtendedPrismaClient);
  await next();

});

Route.route("/signin", SignIn);
Route.route("/signup", SignUp);

Route.use("/blog", async (c, next) => {
  const jwtMiddleware = jwt({
    secret: c.env.JWT_SECRET,
  });
  return jwtMiddleware(c, next);
});

Route.route("/blog", blog);

Route.route("/like", Like);

export default Route;

