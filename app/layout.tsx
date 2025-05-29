'use client'
import "./globals.css"
import { Poppins } from 'next/font/google';



const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // choose the weights you need
  variable: '--font-poppins',   // optional: useful for custom properties
});


import { Provider } from 'react-redux'
import { store } from './redux/store';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={poppins.className}>
        <Provider store={store}> 
             {children}
        </Provider>
      </body>
    </html>
  )
}