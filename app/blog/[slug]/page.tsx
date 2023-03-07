import {getPost} from '@/lib/functions'

export const runtime = 'experimental-edge'

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
 * The single blog post page.
 */
export default async function Page({params}: {params: {slug: string}}) {
  // Get the post.
  const {post} = await getPost(params.slug)

  // No post? Bail...
  if (!post) {
    return <p>There is no post to display.</p>
  }

  return (
    <article className="max-w-3xl">
      <h2 dangerouslySetInnerHTML={{__html: post.title}} />
      <div dangerouslySetInnerHTML={{__html: post.content}} />
    </article>
  )
}
