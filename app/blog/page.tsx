import {getAllPosts} from '@/lib/functions'
import {Post} from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

export const runtime = 'experimental-edge'

/**
 * The blog homepage.
 *
 * @see https://beta.nextjs.org/docs/routing/pages-and-layouts
 */
export default async function BlogHomepage() {
  // Fetch all posts from the WordPress REST API.
  const {posts} = await getAllPosts()

  // No posts? Bail...
  if (!posts) {
    return <p>There are no posts to display.</p>
  }

  return (
    <>
      {posts.nodes.map((post: Post) => (
        <article key={post.databaseId}>
          <Image
            alt={post.featuredImage.node.altText}
            height={post.featuredImage.node.mediaDetails.sizes[0].height}
            src={post.featuredImage.node.mediaDetails.sizes[0].sourceUrl}
            width={post.featuredImage.node.mediaDetails.sizes[0].width}
          />
          <h2 dangerouslySetInnerHTML={{__html: post.title}} />
          <div dangerouslySetInnerHTML={{__html: post.excerpt}} />
          <Link className="button" href={`/blog/${post.slug}`}>
            Read More
          </Link>
        </article>
      ))}
    </>
  )
}
