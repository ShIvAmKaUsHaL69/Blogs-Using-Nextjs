import { defineQuery } from "next-sanity";

export const BLOGS_QUERY = defineQuery(`*[_type == 'blogs' && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id, title, slug, _createdAt,
    author -> {
      _id, name, image, bio
    }, views, short_description, category,
    image, 
}`);

export const SINGLE_BLOG_QUERY = defineQuery(`*[_type == 'blogs' && _id == $id][0]{
  _id, title, slug, _createdAt,
    author -> {
      _id, name, image, bio, username,
    }, views, short_description , category,
    image, description,
}`);

export const BLOGS_VIEW_QUERY = defineQuery(`*[_type == 'blogs' && _id == $id][0]{
  _id, views,
  }`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`*[_type == 'author' && id == $id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
  }`);

export const AUTHOR_BY_ID_QUERY_USERPAGE = defineQuery(`*[_type == 'author' && _id == $id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
  }`);