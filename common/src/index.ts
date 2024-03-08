import z, { TypeOf } from "zod";

export const SignupInput = z.object({
    email:z.string(),
    password:z.string().min(6),
})

export type SignupType = z.infer<typeof SignupInput>

export const SigninInput = z.object({
    email:z.string(),
    password:z.string()
})

export type SigninType = z.infer<typeof SigninInput>

export const createBlogInput = z.object({
    title:z.string(),
    content:z.string(),
})

export type createBlogType = z.infer< typeof createBlogInput>

export const updateBlogInput = z.object({
    title:z.string(),
    content:z.string(),
    id:z.string(),
})

export type updateBlogType = z.infer< typeof updateBlogInput>

