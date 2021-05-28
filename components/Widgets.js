import { SearchIcon } from '@heroicons/react/outline'
import { DotsHorizontalIcon, VideoCameraIcon } from '@heroicons/react/solid'
import Contact from './Contact'
const contacts = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1611898685362-861ca506fe07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    name: 'Contact 1',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1592809825590-2ac8688596db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    name: 'Contact 2',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1598815000898-7d8cd4dc90f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=333&q=80',
    name: 'Contact 3',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1577696428186-efe7404f9cd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    name: 'Contact 4',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1586883056706-6ef0e03ee862?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    name: 'Contact 5',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1534872385500-8802b40c9a7d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    name: 'Contact 6',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1578776675365-60c467cdc11b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80',
    name: 'Contact 7',
  },
]

export default function Widgets() {
  return (
    <div className="hidden lg:flex flex-col w-60 p-2 mt-5">
      <div className="flex justify-between items-center text-gray-500 mb-5">
        <h2 className="text-xl">Contacts</h2>
        <div className="flex space-x-2">
          <VideoCameraIcon className="h-6" />
          <SearchIcon className="h-6" />
          <DotsHorizontalIcon className="h-6" />
        </div>
      </div>

      {contacts.map((contact) => (
        <Contact key={contact.id} src={contact.src} name={contact.name} />
      ))}
    </div>
  )
}
