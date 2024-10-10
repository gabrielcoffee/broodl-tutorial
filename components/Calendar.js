import React from 'react'
const months = {'January': 'Jan', 'February': 'Feb',
  'March': 'Mar', 'April': 'Apr', 'May': 'May',
   'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
    'September': 'Sept', 'October': 'Oct',
     'November': 'Nov', 'December': 'Dec'};
const now = new Date();
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Calendar() {
  const year = 2024; 
  const month = 'July';

  const monthNow = new Date(year, Object.keys(months).indexOf(month));
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(year, Object.keys(month).indexOf(month) + 1, 0).getDate();

  // Get how many rows we should have
  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = (Math.ceil(daysToDisplay / 7))

  return (
    <div className="flex flex-col overflow-hidden gap-1">
      {[...Array(numRows).keys()].map((row, rowIndex) => {
        return (
          <div key={rowIndex} className=" grid grid-cols-7 gap-1">
            {dayList.map((dayOfWeek, weekDayIndex) => {

              let dayIndex = (rowIndex * 7) + weekDayIndex - (firstDayOfMonth -1)

              let dayDisplay = dayIndex > daysInMonth ? false: (row === 0 && weekDayIndex < firstDayOfMonth) ? false : true;

              let isToday = dayIndex === now.getDate();

              if (!dayDisplay) {
                return (
                  <div className="bg-white" key={weekDayIndex}/>
                )
              }

              return (
                <div className={"text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg " 
                +
                (isToday ? ' border-indigo-400 ' : ' border-indigo-100 ')
                +
                (color === 'white' ? ' text-indigo-400 ' : 'text-white')
                } key={weekDayIndex}>
                  day
                </div>
              )
            })}
          </div>
        )
      })}
      
    </div>
  )
}
