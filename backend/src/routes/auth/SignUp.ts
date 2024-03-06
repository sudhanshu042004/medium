import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/jwt";

const SignUp = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();


SignUp.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    try{
        
    const data = new TextEncoder().encode(body.password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    const datacreated = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: hash
        }
    })
    const token = await sign({id : datacreated.id}, c.env.JWT_SECRET);
    
    return c.json({token}) } catch (e) {
        c.status(403);
        return c.json({
            message : "account already exists"
        })
    }
})
export default SignUp;
