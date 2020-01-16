import React, { useState } from "react"
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns/esm"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const months = () => {
    const dateFormat = "MMM"
    const totalMonths = []

    for (let i = 0; i < 12; i++) {
      totalMonths.push(
        <div className={`col-1 text-center ${i}`} key={i}>
          {format(addMonths(currentDate, i), dateFormat)}
        </div>
      )
    }

    return <div className="row months">{totalMonths}</div>
  }

  const header = () => {
    return (
      <div className="header row flex-middle">
        <div className="col-1 text-left">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col-10 text-center">
          <span>{months()}</span>
        </div>
        <div className="col-1 text-right">
          <div className="icon" onClick={nextMonth}>
            chevron_right
          </div>
        </div>
      </div>
    )
  }

  const days = () => {
    const dateFormat = "eee"
    const days = []
    let startDate = startOfWeek(currentDate)
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col text-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
          {console.log(addDays(startDate, i))}
        </div>
      )
    }
    return <div className="days row">{days}{console.log(days)}</div>
  }

  const cells = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    const dateFormat = "d"
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ""
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat)
        days.push(
          <div
            className={`column cell ${
              !isSameMonth(day, monthStart) ? "disabled" : ""
              }`}
            key={day}
          >
            <span className="number">{formattedDate}</span>
          </div>
        )
        day = addDays(day, 1)
      }

      rows.push(
        <div className="row" key={day}>
          {" "}
          {days}{" "}
        </div>
      )
      days = []
    }
    return <div className="body">{rows}</div>
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }


  return (
    <div className="calendar">
      <div>{header()} </div>
      <div>{days()}</div>
      <div>{cells()}</div>
    </div>
  )
}
export default Calendar
