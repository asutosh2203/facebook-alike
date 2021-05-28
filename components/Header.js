import Image from 'next/image'
import {
  SearchIcon,
  HomeIcon,
  FlagIcon,
  PlayIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ViewGridAddIcon,
  ChatIcon,
  BellIcon,
  ChevronDownIcon,
} from '@heroicons/react/solid'
import HeaderIcon from './HeaderIcon'
import { signOut, useSession } from 'next-auth/client'

export default function Header() {
  const [session] = useSession()
  return (
    <div className="header flex sticky top-0 bg-white items-center p-2 lg:px-5 shadow-md overflow-x-hidden">
      {/* Left*/}
      <div className="flex items-center">
        <Image
          src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
          height={40}
          width={40}
        />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2 ">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search Facebook"
          />
        </div>
      </div>

      {/* Center */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      {/* Right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        {/* <Image /> */}
        <Image
          onClick={signOut}
          className="rounded-full cursor-pointer"
          src={session.user.image}
          height={40}
          width={40}
          layout="fixed"
        />
        <p className="username font-semibold pr-3 whitespace-nowrap hidden md:hidden sm:inline-flex  lg:inline-flex xl:inline-flex">
          {session.user.name}
        </p>
        <ViewGridAddIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  )
}
