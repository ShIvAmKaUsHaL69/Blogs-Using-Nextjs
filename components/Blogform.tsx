'use client'

import { useState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea";
import MDEditor from '@uiw/react-md-editor'
import { Button } from "./ui/button";
import { Send } from "lucide-react";

export default function Blogform() {
    const [errors,Seterrors]=useState<Record<string,string>>({});
    const [content, setcontent] = useState("");
    const ispending = false
  return (
    <form action={() => {}} className="blog-form">
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
        {errors.shortdescription && <p className="blog-form_error">{errors.shortdescription}</p>}
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
        id='blogcontent'
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
