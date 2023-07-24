import { getCopyrightYear } from '@/lib/date'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bagasbgy\'s blog',
  description: 'Bagasbgy\'s blog',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" data-theme="forest">
      <body className={inter.className}>
        <main className="container min-h-screen mx-auto px-3 py-24">
          {children}
          <footer className="footer footer-center sticky top-[100vh] p-10 bg-transparent text-base-content text-xs text-center">
            <div>
              <p>Copyright &copy; {getCopyrightYear()} - R. Dimas Bagas Herlambang</p>
            </div>
          </footer>
        </main>
      </body>
    </html>
  )
}

export default RootLayout
