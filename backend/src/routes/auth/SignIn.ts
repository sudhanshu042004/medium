import { Hono } from "hono";
import { sign } from "hono/jwt";

const SignIn = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();

SignIn.post('/', async (c) => {
    const prisma = c.get("prisma");
    const body = await c.req.json();
    try {
        console.log(body)
        const data = new TextEncoder().encode(body.password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        const user = await prisma.user.findUnique({
            where: { 
                email: body.email 
            }
        })
        if(hash != user.password){
            return c.json({
                message : "Invalid Password"
            })
        }
        const token = await sign(user?.id, c.env.JWT_SECRET);
        console.log(token);
        return c.json({
            token: token
        })
        
    } catch (e) {
        c.status(403);
        return c.json({
            message: "error while signIn"
        })
    }
})
export default SignIn;