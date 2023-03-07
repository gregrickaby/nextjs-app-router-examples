import {getPost} from '@/lib/functions'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'

export const runtime = 'experimental-edge'
export const dynamicParams = true

/**
 * Generate posts for static generation.
 *
 * @see https://beta.nextjs.org/docs/api-reference/generate-static-params
 */
export async function generateStaticParams() {
  // Get a list of all blog posts.
  const posts = await fetch(
    'https://nextjswp.dreamhosters.com/wp-json/wp/v2/posts'
  ).then((res) => res.json())

  // Return the slugs for each post.
  return posts.map((post: {slug: string}) => ({
    slug: post.slug
  }))
}

/**
 * Generate dynamic metadadta.
 *
 * @see https://beta.nextjs.org/docs/guides/seo#dynamic-metadata
 */
export async function generateMetadata({
  params
}: {
  params: {slug: string}
}): Promise<Metadata> {
  // Get the blog post.
  const {post} = await getPost(params.slug)

  return {
    title: post.title
  }
}

/**
 * The single blog post page.
 */
export default async function Page({params}: {params: {slug: string}}) {
  // Get the post.
  const {post} = await getPost(params.slug)

  // No post? Bail...
  if (!post) {
    notFound()
  }

  return (
    <article>
      <h2 dangerouslySetInnerHTML={{__html: post.title}} />
      <div dangerouslySetInnerHTML={{__html: post.content}} />
    </article>
  )
}
