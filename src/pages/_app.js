import Navbar from '@/components/navbar/Navbar'
import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps: {session, ...pageProps } }) {
  return (
    <div className='section-center'>
    <Navbar/>
    <div className='section'>
      <SessionProvider session={session}>
    <Component {...pageProps} />
    <ToastContainer/>
      </SessionProvider>
    </div>
    </div>
  )
}
