import { useSession } from 'next-auth/client'
import Image from 'next/image'
import {
  CameraIcon,
  EmojiHappyIcon,
  VideoCameraIcon,
  PlayIcon
} from '@heroicons/react/solid'
import { useRef, useState } from 'react'
import { db, storage } from '../firebase'
import firebase from 'firebase'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
export default function InputBox() {
  const [session] = useSession()

  const fileRef = useRef(null)
  const [imageToPost, setImageToPost] = useState(null)

  const sendPost = (e) => {
    e.preventDefault()

    db.collection('stories')
      .add({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`stories/${doc.id}`)
            .putString(imageToPost, 'data_url')

          removeImage()

          uploadTask.on(
            'state_change',
            null,
            (error) => console.error(error),
            () => {
              storage
                .ref('stories')
                .child(doc.id)
                .getDownloadURL()
                .then((url) =>
                  db.collection('stories').doc(doc.id).set(
                    {
                      storyImage: url,
                    },
                    { merge: true }
                  )
                )
            }
          )
        }
      })
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
    <div className="bg-white p-2 rounded-2xl rounded-b-none shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <div>
<p>Tell us about your day ...</p>
        </div>

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
      <div className="flex justify-between px-4 py-3 border-t">
        <div
          onClick={() => fileRef.current.click()}
          className="flex items-center"
        >
          <PlayIcon className="h-7 text-blue-600 pl-11" />
          <p className="p-2  hover:bg-gray-100 flex-grow cursor-pointer justify-center rounded-full text-xs sm:text-sm xl:text-base">
            Post a Story
          </p>
          <input ref={fileRef} type="file" hidden onChange={addImage} />
        </div>
        <button type="submit" onClick={sendPost}>
            <SendRoundedIcon />
          </button>
      </div>
    </div>
  )
}
