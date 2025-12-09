import groq from 'groq'

export const getPosts = groq`
*[_type == 'post'] | order(publishedAt desc) {
  'id': _id,
  title,
  'slug': slug.current,
  publishedAt,
  excerpt,
  'image': image.asset -> url,
  tags,
  views,
  'category': category -> title,
  'author': author -> name,
  "text": coalesce(text, body)
}`

export const getPostById = groq`
*[_type == 'post' && _id == $id][0]{
  'id': _id,
  title,
  'slug': slug.current,
  publishedAt,
  excerpt,
  'image': image.asset -> url,
  tags,
  views,
  'category': category -> title,
  'author': author -> name,
  "text": coalesce(text, body)
}`
