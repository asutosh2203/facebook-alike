import { getSession } from 'next-auth/client'
import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Login from '../components/Login'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'

export default function Home({ session }) {
  // session = null
  if (!session) return <Login />
  return (
    <div className="">
      <Head>
        <title>Facebook Clone</title>
      </Head>
      <Header />
      <main className="flex">
        <Sidebar />
        <Feed />
        <Widgets/>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  //Get the user
  const session = await getSession(context)
  return {
    props: {
      session,
    },
  }
}
