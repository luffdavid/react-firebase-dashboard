import React, { useState } from 'react';
import { format } from 'date-fns';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { PRIMARY } from '../general/Constants';
import dayjs from 'dayjs';

export default function WorkoutCalender({workouts}) {
    const bookedStyle = { border: '1px solid' + PRIMARY, margin:'2px'}
    const [booked, setBooked] = React.useState(false);
    const handleDayClick = (day, modifiers) => {
        setBooked(day && modifiers.booked);
      };

      const workoutDates = workouts.map((w) => new Date(w.date));

    return (
    <div className="chart">
        <span className="title">WORKOUT CALENDER</span>
    <DayPicker
      mode="single"
      showOutsideDays
      defaultMonth={Date.now()}
      modifiers={{ booked: workoutDates }}
      modifiersStyles={{ booked: bookedStyle }}
      onDayClick={handleDayClick}
      />
    </div>
  );
}