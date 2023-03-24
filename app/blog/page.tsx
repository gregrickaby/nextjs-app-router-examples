import {getAllPosts} from '@/lib/functions'
import {Post} from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'

export const runtime = 'experimental-edge'
export const revalidate = 60

/**
 * The blog homepage.
 *
 * @see https://beta.nextjs.org/docs/routing/pages-and-layouts
 */
export default async function BlogHomepage() {
  // Fetch all posts from WordPress.
  const posts = await getAllPosts()

  // No posts? Bail...
  if (!posts) {
    notFound()
  }

  return (
    <div className="flex flex-col items-start justify-center gap-8 md:flex-row">
      {posts.map((post: Post) => (
        <article className="w-72" key={post.databaseId}>
          <Image
            alt={post.featuredImage.node.altText}
            height={post.featuredImage.node.mediaDetails.sizes[0].height}
            src={post.featuredImage.node.mediaDetails.sizes[0].sourceUrl}
            width={post.featuredImage.node.mediaDetails.sizes[0].width}
            priority={true}
          />
          <h2 dangerouslySetInnerHTML={{__html: post.title}} />
          <p className="text-sm text-gray-500">{post.commentCount} Comments</p>
          <div dangerouslySetInnerHTML={{__html: post.excerpt}} />
          <Link className="button" href={`/blog/${post.slug}`}>
            View Post
          </Link>
        </article>
      ))}
    </div>
  )
}
