import { signIn } from 'next-auth/client'
import Image from 'next/image'
export default function Login() {
  return (
    <div className="grid place-items-center m-20">
      <Image
        className="m-10"
        src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
        height={200}
        width={200}
        objectFit="contain"
      />
      <h1
        onClick={signIn}
        className="p-5 bg-blue-600 rounded-full text-white text-center cursor-pointer m-20 font-bold text-lg"
      >
        Login
      </h1>
    </div>
  )
}
