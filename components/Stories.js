import StoryCard from './StoryCard'
import StoryInput from './StoryInput'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
const stories = [
  {
    name: 'Me',
    src: 'https://images.unsplash.com/photo-1579532170157-edfd40d7d749?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    profile: 'https://avatars.githubusercontent.com/u/49114164?v=4',
  },
  {
    name: 'Me',
    src: 'https://images.unsplash.com/photo-1579532170157-edfd40d7d749?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    profile: 'https://avatars.githubusercontent.com/u/49114164?v=4',
  },
  {
    name: 'Me',
    src: 'https://images.unsplash.com/photo-1579532170157-edfd40d7d749?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    profile: 'https://avatars.githubusercontent.com/u/49114164?v=4',
  },
  {
    name: 'Me',
    src: 'https://images.unsplash.com/photo-1579532170157-edfd40d7d749?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    profile: 'https://avatars.githubusercontent.com/u/49114164?v=4',
  },
  {
    name: 'Me',
    src: 'https://images.unsplash.com/photo-1579532170157-edfd40d7d749?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    profile: 'https://avatars.githubusercontent.com/u/49114164?v=4',
  },
]

export default function Stories() {
  const [realtimeStories, loading, error] = useCollection(
    db.collection('stories').orderBy('timestamp', 'desc')
  )
  return (
    <div>
      <div className="flex justify-center space-x-3 mx-auto">
        {realtimeStories?.docs.map((story) => (
          <StoryCard
            name={story.data().name}
            storyImage={story.data().storyImage}
            profile={story.data().image}
          />
        ))}
      </div>
      <StoryInput />
    </div>
  )
}
