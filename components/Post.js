import Image from 'next/image'
import { useSession } from 'next-auth/client'
import {
  ChatAltIcon,
  ShareIcon,
  ThumbUpIcon,
  PlusCircleIcon,
} from '@heroicons/react/solid'
import { AddCircle } from '@material-ui/icons'
import { useState, useEffect } from 'react'
import { db } from '../firebase'
export default function Post({
  postId,
  name,
  message,
  email,
  timestamp,
  image,
  postImage,
  likes,
  likedBy,
  userComments,
}) {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [liked, setLiked] = useState(null)
  const [session] = useSession()

  const addComment = (e) => {
    e.preventDefault()

    const newComment = [...comments]
    newComment.push(comment)

    setComments(newComment)
    setComments((comments) => {
      console.log(comments, 'Comments')
      return comments
    })

    db.collection('posts').doc(postId).set(
      {
        comments: newComment,
      },
      { merge: true }
    )
    setComment('')
  }

  const postLike = () => {
    if (!liked) {
      setLiked(true)
      db.collection('posts').doc(postId).set(
        {
          isLiked: true,
          likedBy: session.user.email,
        },
        { merge: true }
      )
    } else {
      setLiked(false)
      db.collection('posts').doc(postId).set(
        {
          isLiked: false,
          likedBy: '',
        },
        { merge: true }
      )
    }
  }

  // if (likes && likedBy == session.user.email) {
  //   setConfirm(true)
  // } else {
  //   setConfirm(false)
  // }

  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-md">
        <div className="flex items-center space-x-2">
          <Image
            className="rounded-full"
            src={image}
            width={40}
            height={40}
            alt=""
          />

          <div>
            <p className="font-medium">{name}</p>

            {timestamp ? (
              <p className="text-xs text-gray-400">
                {new Date(timestamp?.toDate()).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-xs text-gray-400">Loading...</p>
            )}
          </div>
        </div>
        <p className="pt-4">{message}</p>
      </div>
      {postImage && (
        <div className="relative h-56 md:h-96 bg-white">
          <Image src={postImage} objectFit="cover" layout="fill" />
        </div>
      )}
      <div className="flex justify-evenly items-center rounded-b-2xl shadow-md bg-white text-gray-400 border-t">
        <div
          className={`flex items-center justify-items-center py-2.5 p-2 pl-16 cursor-pointer ${
            liked ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
          }`}
          onClick={postLike}
        >
          <ThumbUpIcon className="h-4" />
          <p className="text-xs sm:text-base ml-2">Like</p>
        </div>
        {/* <div className="flex items-center justify-items-center py-2.5 p-2 cursor-pointer hover:text-gray-600">
          <ChatAltIcon className="h-4" />
          <p className="text-xs sm:text-base ml-2">Comment</p>
        </div> */}
        <div className="flex items-center justify-items-center py-2.5 p-2 pr-16 cursor-pointer hover:text-gray-600">
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base ml-2">Share</p>
        </div>
      </div>
      <div>
        {userComments?.map((comment) => (
          <div className="shadow-md m-2 p-3 rounded-xl flex items-center">
          <Image className="rounded-full" height={40} width={40} src={session.user.image}/>
            <div className="pl-2">
            <p className="font-semibold">{session.user.name}</p>
            <p className="">{comment}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="m-4">
        <form
          className="flex justify-between shadow-md p-4 rounded-2xl"
          onSubmit={addComment}
        >
          <input
            className="outline-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add comments"
          />
          <button className="">
            <AddCircle />
          </button>
        </form>
      </div>
    </div>
  )
}
