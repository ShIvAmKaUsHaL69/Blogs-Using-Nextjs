'use client'

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import z from 'zod';
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { commentschema } from "@/lib/validation";
import { addcomment } from "@/lib/actions";

export default function Commentfrm({id}: {id: string}) {
    const [errors,Seterrors]=useState<Record<string,string>>({});
    const {toast} = useToast();
        const handleFormSubmit = async (prevState: any, formdata: FormData) => {
            try{
              const formvalues = {
                comment: formdata.get('comment') as string,
              }
    
              await commentschema.parseAsync(formvalues);
              console.log(formvalues)
    
              const result = await addcomment(prevState, formdata, id)
    
              if(result.status == 'SUCCESS') {
                toast({
                  title: 'Success',
                  description: 'Your comment has been added',
                })
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
    <form action={formAction} className="blog-form !ml-0 !mr-0 !pl-0">
    <div>
      <label htmlFor="comment" className="blog-form_label">
          Add Comment
      </label>
      <Input id='comment' name="comment" className="blog-form_input" required placeholder="Something in mind?"/>
      {errors.comment && <p className="blog-form_error">comment must contain at least 3 characters</p>}
    </div>
      <Button type="submit" className="blog-form_btn text-white" disabled={ispending}>
          {ispending ? 'Submitting...' : 'Submit'}
          <Send className="size-6 ml-2 "/>
      </Button>
  </form>
  )
}
