import { useSession } from 'next-auth/client'
import Image from 'next/image'
import {
  CameraIcon,
  EmojiHappyIcon,
  VideoCameraIcon,
} from '@heroicons/react/solid'
import PostAddIcon from '@material-ui/icons/PostAdd'
import { useRef, useState } from 'react'
import { db, storage } from '../firebase'
import firebase from 'firebase'

export default function InputBox() {
  const [session] = useSession()
  const postInputRef = useRef(null)
  const fileRef = useRef(null)
  const [imageToPost, setImageToPost] = useState(null)
  const sendPost = (e) => {
    e.preventDefault()
    if (!postInputRef.current.value) return
    db.collection('posts')
      .add({
        message: postInputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, 'data_url')

          removeImage()

          uploadTask.on(
            'state_change',
            null,
            (error) => console.error(error),
            () => {
              storage
                .ref('posts')
                .child(doc.id)
                .getDownloadURL()
                .then((url) =>
                  db.collection('posts').doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  )
                )
            }
          )
        }
      })
    postInputRef.current.value = ''
  }

  const addImage = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result)
    }
  }

  const removeImage = () => {
    setImageToPost(null)
  }
  return (
    <div className="bg-white p-2 rounded-2xl rounded-t-none shadow-md text-gray-500 font-medium ">
      <div className="flex space-x-4 p-4 items-center">
        {/* <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        /> */}

        <form className="flex flex-1">
          <input
            className="outline-none rounded-full h-12 bg-gray-100 flex-grow px-5"
            type="text"
            placeholder={`What's on your mind, ${
              session.user.name.split(' ')[0]
            }?`}
            ref={postInputRef}
          />
          <button className="pl-3 outline-none" onClick={sendPost}>
            <PostAddIcon />
          </button>
        </form>

        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img className="h-10 object-contain" src={imageToPost} alt="" />
            <p className="text-xs sm:text-sm xl:text-base text-red-500">
              Remove
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="flex items-center">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="p-2 hover:bg-gray-100 flex-grow cursor-pointer justify-center rounded-full text-xs sm:text-sm xl:text-base">
            Live Video
          </p>
        </div>
        <div
          onClick={() => fileRef.current.click()}
          className="flex items-center"
        >
          <CameraIcon className="h-7 text-green-600" />
          <p className="p-2 hover:bg-gray-100 flex-grow cursor-pointer justify-center rounded-full text-xs sm:text-sm xl:text-base">
            Photo/ Video
          </p>
          <input ref={fileRef} type="file" hidden onChange={addImage} />
        </div>
        <div className="flex items-center">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="p-2 hover:bg-gray-100 flex-grow cursor-pointer justify-center rounded-full text-xs sm:text-sm xl:text-base">
            Feeling/ Activity
          </p>
        </div>
      </div>
    </div>
  )
}
