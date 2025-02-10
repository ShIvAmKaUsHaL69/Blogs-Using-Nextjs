'use client'

import { useActionState, useState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea";
import MDEditor from '@uiw/react-md-editor'
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formschema } from "@/lib/validation";
import z from 'zod';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createblog } from "@/lib/actions";

export default function Blogform() {
    const [errors,Seterrors]=useState<Record<string,string>>({});
    const [content, setcontent] = useState("");
    const {toast} = useToast();
    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formdata: FormData) => {
        try{
          const formvalues = {
            title: formdata.get('title') as string,
            short_description: formdata.get('short_description') as string,
            category: formdata.get('category') as string,
            link: formdata.get('link') as string,
            content,
          }

          await formschema.parseAsync(formvalues);
          console.log(formvalues)

          const result = await createblog(prevState, formdata, content)

          if(result.status == 'SUCCESS') {
            toast({
              title: 'Success',
              description: 'Your Blog has been published',
            })

            router.push(`/blogs/${result._id}`)
          }
          return result
        } catch (error) {
          if(error instanceof z.ZodError) {
            const fieldErrors = error.flatten().fieldErrors;
            Seterrors(fieldErrors as unknown as Record<string, string>);
            toast({
              title: 'Error',
              description: 'Please check your inputs and try again',
              variant: 'destructive',
            })
            return { ...prevState, error: 'Validation Failed' , status: 'ERROR'}
          }
          toast({
            title: 'Error',
            description: 'Unexpected error',
            variant: 'destructive',
          })
          return { ...prevState, error: 'Unexpected error', status: 'ERROR'}

        } 

    }

    const [state, formAction, ispending] = useActionState(handleFormSubmit, { error: '', status: 'INITIAL'});

    

  return (
    <form action={formAction} className="blog-form">
      <div>
        <label htmlFor="title" className="blog-form_label">
            Title
        </label>
        <Input id='title' name="title" className="blog-form_input" required placeholder="Blog Title"/>
        {errors.title && <p className="blog-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="shortdescription" className="blog-form_label">
            Short Description
        </label>
        <Textarea id='short_description' name="short_description" className="blog-form_textarea" required placeholder="Short Description"/>
        {errors.short_description && <p className="blog-form_error">{errors.short_description}</p>}
      </div>
      <div>
        <label htmlFor="category" className="blog-form_label">
        Category
        </label>
        <Input id='category' name="category" className="blog-form_input" required placeholder="Blog Category (Tech, Health, Education)"/>
        {errors.category && <p className="blog-form_error">{errors.category}</p>}
      </div>
      <div>
        <label htmlFor="link" className="blog-form_label">
            Image URL
        </label>
        <Input id='link' name="link" className="blog-form_input" required placeholder="Feature Image URL"/>
        {errors.link && <p className="blog-form_error">{errors.link}</p>}
      </div>
      <div data-color-mode='light'>
        <label htmlFor="content" className="blog-form_label">
        Blog Content
        </label>
        <MDEditor
        value={content}
        onChange={(value) => setcontent(value as string)}
        id='content'
        preview="edit"
        height={300}
        style={{borderRadius:20, overflow: "hidden"}}
        textareaProps={{
            placeholder: 'Enter whats in your mind about the topic you have choosen'
        }}
        previewOptions={{
            disallowedElements: ['style']
        }}
      />
        {errors.content && <p className="blog-form_error">{errors.content}</p>}
      </div>

        <Button type="submit" className="blog-form_btn text-white" disabled={ispending}>
            {ispending ? 'Submitting...' : 'Submit'}
            <Send className="size-6 ml-2 "/>
        </Button>
    </form>
  )
}
