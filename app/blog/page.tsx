import {getAllPosts} from '@/lib/functions'
import {Post} from '@/lib/types'
import Link from 'next/link'

export const runtime = 'experimental-edge'

/**
 * The blog homepage.
 *
 * @see https://beta.nextjs.org/docs/routing/pages-and-layouts
 */
export default async function BlogHomepage() {
  // Fetch all posts from the WordPress REST API.
  const posts = await getAllPosts()

  // No posts? Bail...
  if (!posts) {
    return <p>There are no posts to display.</p>
  }

  return (
    <>
      {posts.map((post: Post) => (
        <article key={post.id}>
          <h2 dangerouslySetInnerHTML={{__html: post.title.rendered}} />
          <div dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} />
          <Link href={`/blog/${post.slug}`}>Read More</Link>
        </article>
      ))}
    </>
  )
}
