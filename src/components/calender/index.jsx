import React, { useState } from "react"
import Slider from "react-slick"
import { parseISO } from "date-fns"
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  addMonths,
  setMonth,
  isEqual
} from "date-fns/esm"
import CalendarEvents from "./calendarEvents"
import './index.css'


const LeftArrow = ({ style, onClick }) => {
  return (
    <button
      className={`event-calendar-left-arrow`}
      onClick={onClick}
      style={{
        ...style,
      }}
    >
      <i
        style={{ fontSize: 20, color: "rgb(167, 167, 167, 0.8)" }}
        className="btn fa fa-caret-left"
      />
    </button>
  )
}

const RightArrow = ({ style, onClick }) => {
  return (
    <button
      className={`event-calendar-right-arrow`}
      onClick={onClick}
      style={{
        ...style,
      }}
    >
      <i
        style={{ fontSize: 20, color: "rgb(167, 167, 167, 0.8)" }}
        className="btn fa fa-caret-right"
      />
    </button>
  )
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 12,
  slidesToScroll: 1,
  nextArrow: <RightArrow />,
  prevArrow: <LeftArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 10,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
  ],
}


const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [activeMonth, setActiveMonth] = useState(0)

  const months = () => {
    const dateFormat = "MMM"
    const totalMonths = []

    for (let i = 0; i < 12; i++) {
      totalMonths.push(
        <div className={`event-calendar-months text-center ${i} ${activeMonth === i ? 'active-month' : ''}`} key={i} onClick={() => changeMonth(i)}>
          {format(addMonths(new Date(), i), dateFormat)}
        </div>
      )
    }

    return <div className="row">
      <div className="col-12">
        <Slider {...settings}>
          {totalMonths}
        </Slider>
      </div>
    </div>
  }

  const header = () => {
    return (
      <div className="event-calendar-header row flex-middle">
        <div className="col-12 text-center">
          <span>{months()}</span>
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
        </div>
      )
    }
    return <div className="event-calendar-days row m-0">{days}</div>
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
            className={`col cell text-center ${
              !isSameMonth(day, monthStart) ? "disabled" : ""
              }`}
            key={day}
          >
            <span className="event-calendar-date">{formattedDate}</span>
            {CalendarEvents.map((event, index) => {
              let formatEventDate = parseISO(event.start_date)

              return (isEqual(day, formatEventDate) &&
                <div className="event-calendar-start-end-time justify-content-between" key={index}>
                  <span>{event.start_time}</span>
                  <span>{event.endtime}</span>
                </div>
              )
            })}
          </div>
        )
        day = addDays(day, 1)
      }

      rows.push(
        <div className="row m-0" key={day}>
          {" "}
          {days}{" "}
        </div>
      )
      days = []
    }
    return <div className="event-calendar-body">{rows}</div>
  }

  const changeMonth = key => {
    setCurrentDate(setMonth(currentDate, key))
    setActiveMonth(key)
  }


  return (
    <div className="event-calendar">
      <div>{header()}</div>
      <div>{days()}</div>
      <div>{cells()}</div>
    </div >
  )
}
export default Calendar
