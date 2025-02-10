'use server';

import { auth } from "@/auth";
import { parseserveractionresponce } from "./utils";
import slugify from 'slugify'
import { writeclient } from "@/sanity/lib/write-client";

export const createblog = async (state: any, form: FormData, content: string) => {
    const session = await auth();
    if(!session) return parseserveractionresponce({error: 'Not Signed in', status: 'ERROR'})
        const { title , short_description, category, link} = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'content'),);
    const slug = slugify(title as string, { lower: true, strict: true});

    try{
        const blog = {
            title,
            short_description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: session?.id
            },
            description : content,
        };

        const result = await writeclient.create( { _type: 'blogs' , ...blog })

        return parseserveractionresponce({
            ...result,
            error: '',
            status: 'SUCCESS'
        })
    }catch(err) {
        console.log(err)
        return parseserveractionresponce({
            error: JSON.stringify(err),
            status: 'ERROR',
        })
    }
}