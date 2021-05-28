import Providers from 'next-auth/providers'
import NextAuth from 'next-auth'
export default NextAuth({
  providers: [
    Providers.Google({
      clientId:
        '995115901833-7lr4r8tj5d67bb0revomleb4nuaaouqe.apps.googleusercontent.com',
      clientSecret: 'CtjavCbEY-kw72IAJ688dl3e',
    }),
  ],
})
