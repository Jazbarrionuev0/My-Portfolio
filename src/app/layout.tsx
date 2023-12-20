import type { Metadata } from 'next'
import './globals.css'
import { Poppins } from "next/font/google"
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const poppins = Poppins({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Luca Palminteri',
  description: 'Luca Palminteri Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-screen min-w-screen flex flex-col items-center justify-start px-4 md:px-8 lg:px-12`}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
