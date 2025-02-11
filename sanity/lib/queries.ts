import { defineQuery } from "next-sanity";

export const BLOGS_QUERY = defineQuery(`*[_type == 'blogs' && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search]  {
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

export const BLOGS_COMMENTS = defineQuery(`*[_type == 'blogs' && _id == $id][0]{
  _id, comments, author -> {
      name, image, _id,
    },
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

  export const BLOGS_BY_AUTHOR_QUERY = defineQuery(`*[_type == 'blogs' && author._ref == $id] {
    _id, title, slug, _createdAt,
      author -> {
        _id, name, image, bio
      }, views, short_description, category,
      image, 
  }`);