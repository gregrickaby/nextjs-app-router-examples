'use client'

import {useState} from 'react'

/**
 * The comment form component.
 */
export default function CommentForm({postID}: {postID: string}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState('')

  /**
   * Handle the comment form submission.
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Create the comment and await the status.
    const status = await createComment({
      name,
      email,
      website,
      comment,
      postID
    })

    // If the comment was created successfully...
    if (status && status.success) {
      // Clear the form.
      setName('')
      setEmail('')
      setWebsite('')
      setComment('')

      // Set the status message.
      setStatus(
        `Thank you ${name}! Your comment has been submitted and is awaiting moderation.`
      )
    }

    // If there was an error...
    if (status && !status.success) {
      setStatus(`There was an error submitting your comment: ${status.message}`)
    }
  }

  return (
    <>
      <h3>Leave a Comment</h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit</button>
        {status && <p>{status}</p>}
      </form>
    </>
  )
}

/**
 * Create a comment mutation.
 */
async function createComment(comment: {
  name: string
  email: string
  website: string
  comment: string
  postID: string
}) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            mutation CREATE_COMMENT(
                $authorEmail: String!
                $authorName: String!
                $authorUrl: String
                $comment: String!
                $postID: Int!
            ) {
                createComment(
                input: {
                    author: $authorName
                    authorEmail: $authorEmail
                    authorUrl: $authorUrl
                    commentOn: $postID
                    content: $comment
                }
                ) {
                success
                comment {
                    author {
                    node {
                        email
                        gravatarUrl
                        name
                        url
                    }
                    }
                    content(format: RENDERED)
                    date
                }
                }
            }
      `,
        variables: {
          authorEmail: comment.email,
          authorName: comment.name,
          authorUrl: comment.website,
          comment: comment.comment,
          postID: comment.postID
        }
      })
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const status = await response.json()

    if (status.errors) {
      return {
        success: false,
        message: status.errors[0].message
      }
    }

    return {
      success: true,
      message: status.data
    }
  } catch (error) {
    console.error(error)
  }
}
