import { getCurrentYearRange } from '@/lib/date'
import '@/public/globals.css'
import "@/public/github-dark-bagasbgy.dev.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'
import Loading from './loading'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BagasBgy\'s blog',
  description: 'Home',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" data-theme="forest">
      <body className={inter.className}>
        <main className="container min-h-[80vh] w-full mx-auto px-3 pt-14 lg:pt-24">
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-7W8VN823ZZ" />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-7W8VN823ZZ');
            `}
          </Script>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </main>
        <footer className="footer footer-center min-h-[12.5vh] max-h-[12.5vh] w-full p-6 mt-[7.5vh] mx-auto bg-base-200 text-base-content gap-0">
          <div className="grid grid-flow-col gap-4">
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
            <Link href="/licenses">Licenses</Link>
          </div>
          <div>
            <p>By <a href='https://twitter.com/bagasbgy' target='_blank'>BagasBgy</a> - {getCurrentYearRange()}</p>
          </div>
        </footer>
      </body>
    </html >
  )
}

export default RootLayout
