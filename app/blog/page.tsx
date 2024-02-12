import {getAllPosts} from '@/lib/queries'
import {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'

/**
 * Default metadata.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata
 */
export const metadata: Metadata = {
  title: 'WordPress Blog (Server)',
  description: "It's headless WordPress!"
}

/**
 * The blog homepage.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 */
export default async function BlogHomepage() {
  // Fetch all posts from WordPress.
  const posts = await getAllPosts()

  if (!posts) {
    notFound()
  }

  return (
    <div className="flex flex-col items-start justify-center gap-8 md:flex-row">
      {posts.map((node) => (
        <article className="w-72" key={node.databaseId}>
          <Image
            alt={node.featuredImage.node.altText}
            height={node.featuredImage.node.mediaDetails.sizes[0].height}
            src={node.featuredImage.node.mediaDetails.sizes[0].sourceUrl}
            width={node.featuredImage.node.mediaDetails.sizes[0].width}
            priority={true}
          />
          <Link href={`/blog/${node.slug}`}>
            <h2 dangerouslySetInnerHTML={{__html: node.title}} />
          </Link>
          <p className="text-sm text-gray-500">{node.commentCount} Comments</p>
          <div dangerouslySetInnerHTML={{__html: node.excerpt}} />
          <Link className="button" href={`/blog/${node.slug}`}>
            View Post
          </Link>
        </article>
      ))}
    </div>
  )
}
