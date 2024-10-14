import localFont from "next/font/local";
import { Fugaz_One, Open_Sans } from 'next/font/google'
import "./globals.css";
import Link from "next/link";

const opensans = Open_Sans({
  subsets: ['latin'],
})

const fugaz = Fugaz_One({
  subsets: ['latin'],
  weight: ['400'],
})

/*
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
*/



export const metadata = {
  title: "Broodl",
  description: "Track your daily mood everyday of the year!",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={'/'}>
      <h1 className={'text-base sm:text-lg textGradient ' + fugaz.className}>Broodl</h1>
      </Link>
      <div className="flex items-center justify-between">
        PLACEHOLDER CTA STATS
      </div>
    </header>
  )

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={'text-indigo-700 ' + fugaz.className}>Created with &lt;3</p> 
    </footer>
  )

  return (
    <html lang="en">
      <body className={' w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ' + opensans.className}>
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
