import CommentForm from '@/components/blog/CommentForm'
import {getAllPosts, getPost} from '@/lib/queries'
import {Metadata} from 'next'
import Image from 'next/image'
import {notFound} from 'next/navigation'

/**
 * Generate the static routes at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  // Get a list of all blog posts.
  const posts = await getAllPosts()

  // No posts? Bail...
  if (!posts) {
    return []
  }

  // Return the slugs for each post.
  return posts.map((node) => ({
    slug: node.slug
  }))
}

/**
 * Generate the metadata for each static route at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata({
  params
}: {
  params: {slug: string}
}): Promise<Metadata | null> {
  // Get the blog post.
  const post = await getPost(params.slug)

  // No post? Bail...
  if (!post) {
    return {}
  }

  return {
    title: post.seo.title,
    description: post.seo.metaDesc
  }
}

/**
 * The blog post page.
 */
export default async function Page({params}: {params: {slug: string}}) {
  // Get a single blog post.
  const post = await getPost(params.slug)

  // No post? Bail...
  if (!post) {
    notFound()
  }

  return (
    <article>
      <header>
        <h1 dangerouslySetInnerHTML={{__html: post.title}} />
        <p className="italic">
          By {post.author.node.name} on <time>{post.date}</time>
        </p>
      </header>

      <div dangerouslySetInnerHTML={{__html: post.content}} />

      <footer className="flex items-center justify-between gap-4 pb-4">
        <div>
          <h3>Categories</h3>
          <ul className="m-0 flex list-none gap-2 p-0">
            {post.categories.edges.map(({node}) => (
              <li className="m-0 p-0" key={node.databaseId}>
                {node.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Tags</h3>
          <ul className="m-0 flex list-none gap-2 p-0">
            {post.tags.edges.map(({node}) => (
              <li className="m-0 p-0" key={node.databaseId}>
                {node.name}
              </li>
            ))}
          </ul>
        </div>
      </footer>

      <section className="border-t-2">
        <h3>Comments</h3>
        {post.comments.edges.map(({node}) => (
          <article key={node.databaseId}>
            <header className="flex items-center gap-2">
              <Image
                alt={node.author.node.name}
                className="m-0 rounded-full"
                height={64}
                src={node.author.node.avatar.url}
                width={64}
              />
              <div className="flex flex-col gap-2">
                <h4
                  className="m-0 p-0 leading-none"
                  dangerouslySetInnerHTML={{__html: node.author.node.name}}
                />
                <time className="italic">{node.date}</time>
              </div>
            </header>

            <div dangerouslySetInnerHTML={{__html: node.content}} />
          </article>
        ))}
      </section>
      <CommentForm postID={post.databaseId} />
    </article>
  )
}
