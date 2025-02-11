import { defineField, defineType } from "sanity";

export const blogs = defineType({
    name: 'blogs',
    title: 'Blogs',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title'
            }
        }),
        defineField({
            name: 'author',
            type: 'reference',
            to: {type: 'author'}
        }),
        defineField({
            name: 'views',
            type: 'number',
        }),
        defineField({
            name: 'short_description',
            type: 'text',
        }),
        defineField({
            name: 'description',
            type: 'markdown',
        }),
        defineField({
            name: 'category',
            type: 'string',
            validation: (Rule) => Rule.min(1).max(20).required().error('please enter a category'),
        }),
        defineField({
            name: 'image',
            type: 'url',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'comments',
            type: 'array',
            of: [{
                type: 'string',
            }
            ]
        })
        
    ],
});