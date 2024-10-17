'use client'

import { Fugaz_One } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import Calendar from './Calendar'
import CookieCounter from './CookieCounter'
import { useAuth } from '@/context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const fugaz = Fugaz_One({
  subsets: ['latin'],
  weight: ['400'],
})

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [ data, setData ] = useState({});

  function countValues() {

  }

  async function handleSetMood(mood) {
    const now = new Date();
    const day = now.getDay();
    const month = now.getMonth();
    const year = now.getFullYear();

    const newData = {...userDataObj};
    if (!newData?.[year]) {
      newData[year] = {};
    }
    if (!newData?.[year]?.[month]) {
      newData[year][month] = {};
    }

    newData[year][month][day] = mood;

      // update current state
      setData(newData);
      // update global state
      setUserDataObj(newData);
      // update firebase database
      const docRef = doc(db, 'users', currentUser.uid);
      const res = await setDoc(docRef, {
        [year]: {
          [month]: {
            [day]: mood
          }
        }
      }, { merge: true })
  }

  const statuses = {
    num_days: 14,
    time_remaining: '13:14:26',
    date: (new Date()).toDateString()
  }

  const moods = {
    'Terrible': '😞',
    'Not good': '😕',
    'Existing': '😶',
    'Good'    : '🙂',
    'Elated'  : '🤩',
  }


  // Reading the data from firebase
  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);

  let children = (
      <Login/>
  )

  if (loading) {
      children = (
          <Loading/>
      )
  }

  if (currentUser) {
      children = (
          <Dashboard/>
      )
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16 ">
      <div className='grid grid-cols-3 bg-indigo-50 text-indigo-500 p-4 '>

        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className='flex flex-col gap-1 sm:gap-2'>
              <p className='font-medium uppercase text-xs sm:text-smtruncate '>{status.replaceAll('_', ' ')}</p>
              <p className={'text-base sm:text-lg truncate ' + fugaz.className}>{statuses[status]}</p>
            </div>
          )
        })}
        
      </div>
      <h4 className={'text-5xl sm:text-6xl md:text-7xl text-center '+ fugaz.className}>
        How do you <span className={'textGradient'}>feel</span> today?
      </h4>
      <div className='flex items-stretch flex-wrap gap-4'>
        {Object.keys(moods).map((mood, moodIndex) => {
          return (

            <button onClick={() => {
              const currentMoodValue = moodIndex + 1;
              handleSetMood(currentMoodValue);
            }} key={moodIndex} className={
              'p-4 px-6 rounded-lg purpleShadow duration-200 bg-indigo-50 hover:bg-[lavender] text-center flex flex-col items-center gap-2 flex-1'
            }>
               
              <p className='text-4xl sm:text-5xl md:text-6xl'>{moods[mood]}</p>

              <p className={'text-indigo-500 text-xs sm:text-sm md:text-base ' + fugaz.className}>{mood}</p>

            </button>
          )
        })}
      </div>
      
      <Calendar data={data} handleSetMood={handleSetMood}/>
    </div>
  )
}
