import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
const blogRouter = new Hono();
blogRouter.post('/api/v1/blog', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get("jwtPayload");
    const body = await c.req.json();
    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        });
        return c.json({ id: post.id });
    }
    catch (error) {
        c.status(500);
        return c.json({ error: "Internal serber error" });
    }
});
blogRouter.put('/api/v1/blog', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get("jwtPayload");
    const body = await c.req.json();
    try {
        const updatedPost = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        });
        return c.text("Update successful");
    }
    catch (error) {
        c.status(500);
        return c.json({ error: "Internal server error" });
    }
});
blogRouter.get('/api/v1/blog/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        });
        return c.json({ post });
    }
    catch (error) {
        c.status(404);
        return c.json({ error: "Not Found" });
    }
});
blogRouter.get('/api/v1/blog/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const posts = await prisma.post.findMany({});
    return c.json({ posts });
});
export default blogRouter;
