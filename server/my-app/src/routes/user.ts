import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { SigninInput, SignupInput } from '@anukulrthr/common';

const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const {success} = SignupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({error:"Input validation failed"});
    }
    try {
      const user = await prisma.user.create({
        data:{
          email: body.email,
          password: body.password
        } 
      })
      const jwt = await sign({ id: user.id}, c.env.JWT_SECRET)
      return c.json({jwt})
    } catch (error) {
      c.status(403);
      return c.json({error:"error while signing up"});
    }
  })
  
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const { success } = SigninInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({error:"Input validation failed"});
    }
    try {
      const user = await prisma.user.findUnique({
        where:{
          email: body.email
        }
      });
      if(!user){
        c.status(403)
        return c.json({error: "User does not exist"})
      }
      if(user.password!==body.password){
        c.status(401)
        return c.json({error:"Authentication failed"});
        }
      
      const jwt = await sign({id:user.id}, c.env.JWT_SECRET);
      return c.json({jwt});
    } catch (error) {
      c.status(500);
      c.json({error:"Internal server error"});
    }
  })

  export default userRouter