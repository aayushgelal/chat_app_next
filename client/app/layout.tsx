import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import React from 'react'
import {store} from './store'
import {Provider} from 'react-redux'
import ReduxProvider from './store/ReduxProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
        <Navbar />

        
        
        {children}
        </ReduxProvider>
    </body>
    </html>
  )
}
