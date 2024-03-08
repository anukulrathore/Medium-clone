import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@anukulrthr/common";

const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	},
  Variables:{
    userId:string
  }
}>();

blogRouter.use('/*', async (c,next) => {
  const jwt = c.req.header('Authorization');
  if(!jwt){
    c.status(401);
    return c.json({error:"Unauthorized"});
  }
  const token = jwt.split(' ')[1];
  const user = await verify(token, c.env.JWT_SECRET);
  if(!user){
    c.status(401);
    return c.json({error:"unauthorized"});
  }
  c.set("userId", user.id);
  await next();
})

blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({error:"Input validation failed"});
  }
  try {
    const post  = await prisma.post.create({
      data:{
        title:body.title,
        content:body.content,
        authorId:userId
      }
    });
    return c.json({id: post.id});
  } catch (error) {
    c.status(500);
    return c.json({error:"Internal server error"});
  }
})
  
blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("jwtPayload");
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({error:"Input validation failed"});
  }
  try {
    const updatedPost = await prisma.post.update({
      where:{
        id:body.id,
        authorId:userId
      },
      data:{
        title:body.title,
        content:body.content
      }
    });
    return c.text("Update successful");
  } catch (error) {
    c.status(500);
    return c.json({error:"Internal server error"});
  }
  
})
  
//pagination
blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const posts = await prisma.post.findMany({});
  console.log(posts);
  return c.json({posts});
})

blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post  = await prisma.post.findUnique({
      where:{
        id
      }
    })
    return c.json({post});
  } catch (error) {
    c.status(404);
    return c.json({error:"Not Found"});
  }
})



export default blogRouter;