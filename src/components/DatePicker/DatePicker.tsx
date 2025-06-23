/**
 * @copyright 2025 Herocore LLC, All Rights Reserved.
 * @license This code is licensed under the MIT license. See the LICENSE file
 * in the project root for full license information.
 * @fileoverview React DatePicker component using Cally calendar web component.
 */


/* c8 ignore next */
import React, { useState } from 'react';

/* c8 ignore next */
import 'cally'; // Import Cally web components

import Calendar from '../../assets/svg/calendar.svg?react';
import Previous from '../../assets/svg/previous.svg?react';
import Next from '../../assets/svg/next.svg?react';

interface DatePickerProps {
  /**
   * Label for the date picker input field.
   * @default 'Start Date'
   */
  label?: string;

  /**
   * Initial date value in 'YYYY-MM-DD' format.
   */
  defaultValue?: string;

  /**
   * Callback triggered when a new date is selected.
   * Returns the date in 'DD-MM-YYYY' format.
   */
  onChange?: (date: string) => void;
}

/**
 * Utility to get today's date in 'YYYY-MM-DD' format.
 */
const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * DatePicker component using the Cally calendar web component.
 * Provides a custom-styled date input that opens a calendar popover for selection.
 */
const DatePicker: React.FC<DatePickerProps> = ({
  label = 'Start Date',
  defaultValue = '',
  onChange
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(() => {
    if (!defaultValue) return '';
    else {
      const [yyyy, mm, dd] = defaultValue.split('-');
      return `${dd}-${mm}-${yyyy}`;
    }
  });

  /**
   * Handles the date selection from the Cally calendar component.
   * Converts 'YYYY-MM-DD' to 'DD-MM-YYYY' format.
   */
  const handleCalendarChange = (event: any) => {
    const isoDate = event.target.value;
    if (!isoDate) return;
    else {
      const [yyyy, mm, dd] = isoDate.split('-');
      const formatted = `${dd}-${mm}-${yyyy}`;

      setSelectedDate(formatted);
      setIsCalendarOpen(false);
      onChange?.(formatted);
    }

  };

  return (
    <div className="max-w-sm font-poppins">
      {/* Input label */}
      <label className="label">
        <span className="label-text font-medium text-md">{label}</span>
      </label>

      <div className="relative">
        {/* Input container */}
        <div
          className="input flex items-center justify-between cursor-pointer gap-2 border border-gray-300 rounded-lg px-4 py-3"
          onClick={() => setIsCalendarOpen(prev => !prev)}
        >
          <input
            type="text"
            readOnly
            value={selectedDate}
            placeholder="Select a Date"
            className={`text-base outline-none bg-transparent w-full ${selectedDate ? 'text-gray-900' : 'text-gray-400'
              }`}
          />

          {/* Calendar icon (SVG as React Component) */}
          <Calendar data-testid="calendar-icon" />
        </div>

        {/* Cally Calendar Web Component */}
        <calendar-date
          value={defaultValue}
          min={getTodayDate()}
          locale="en-GB"
          onchange={handleCalendarChange}
          class={`${isCalendarOpen ? 'block' : 'hidden'} absolute z-50 top-full left-0 mt-2 bg-white shadow-2xl rounded-2xl border border-gray-200 p-4`}
          data-testid="calendar-date"
        >
          {/* Slot-based custom navigation icons for previous and next buttons */}
          <Previous
            alt="Previous"
            {...({ slot: 'previous' } as any)}
            className="w-4 h-4"
          />
          <Next
            alt="Next"
            {...({ slot: 'next' } as any)}
            className="w-4 h-4"
          />

          {/* Displays the current month */}
          <calendar-month></calendar-month>
        </calendar-date>
      </div>
    </div>
  );
};

export default DatePicker;