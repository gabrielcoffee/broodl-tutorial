import React from 'react'
import { Fugaz_One } from 'next/font/google';

const fugaz = Fugaz_One({
  subsets: ['latin'],
  weight: ['400'],
})

export default function Button(props) {

  const { text, dark, full, clickHandler } = props;

  return (
    <button onClick={clickHandler} className={' border border-solid border-indigo-600 duration-200 overflow-hidden rounded-full hover:opacity-60 ' + 
    (dark ?
      ' text-white bg-indigo-600 border-indigo-600 ' 
    : 
      ' text-indigo-600 ') +
    (full ?
      'grid place-items-center w-full' : ' '
    )}>
      <p className={"px-4 sm:px-10 whitespace-nowrap py-2 sm:py-3 " + fugaz.className}>
      {text}
      </p>
    </button>
  )
}
