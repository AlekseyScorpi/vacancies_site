import '@/styles/globals.css'
import React from 'react'
import { AppProps } from 'next/app'
import { MainLayout } from '@/components/layouts/mainlayout'

export default function App({Component, pageProps}: AppProps) {
  return (
    <MainLayout>
        <Component {...pageProps} />
    </MainLayout>
  )
}