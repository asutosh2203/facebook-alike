import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import Post from './Post'
export default function Posts() {
  const [realtimePosts, loading, error] = useCollection(
    db.collection('posts').orderBy('timestamp', 'desc')
  )
  return (
    <div>
      {realtimePosts?.docs.map((post) => (
        <Post
          key={post.id}
          postId={post.id}
          name={post.data().name}
          message={post.data().message}
          email={post.data().email}
          timestamp={post.data().timestamp}
          image={post.data().image}
          postImage={post.data().postImage}
          likes={post.data().isLiked}
          likedBy={post.data().likedBy}
          userComments={post.data().comments}
        />
      ))}
    </div>
  )
}
