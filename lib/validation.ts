import {z} from 'zod';

export const formschema = z.object({
    title: z.string().min(3).max(100),
    short_description: z.string().min(20).max(500),
    category : z.string().min(3).max(20),
    link : z.string().url().refine(async (url) => {
        try{
            const res = await fetch(url,  {method: "HEAD"});
            console.log(res)
            const contenttype = res.headers.get("content-type");
            console.log(contenttype)
            return contenttype?.startsWith("image/");
        } catch{
                return false
        }
    }),
    content : z.string().min(10),

})

export const commentschema = z.object({
    comment: z.string().min(3).max(100),
})