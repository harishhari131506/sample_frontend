/**
 * @copyright 2025 Herocore LLC, All Rights Reserved.
 * @license This code is licensed under the MIT license. See the LICENSE file
 * in the project root for full license information.
 * @fileoverview Storybook stories for the DatePicker component demonstrating usage scenarios.
 */

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import DatePicker from '../components/DatePicker/DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

/**
 * @description
 * Basic usage of the DatePicker component without an initial value.
 * Demonstrates a date input that updates local state and displays the selected date.
 *
 * @story Default
 */
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<string>('');

    return (
      <div className="p-4 space-y-2">
        <DatePicker label="Select Date" onChange={(d) => setDate(d)} />
        <p className="text-sm text-gray-700">Selected: {date || 'None'}</p>
      </div>
    );
  },
};

/**
 * @description
 * Demonstrates the DatePicker initialized with a pre-filled default value.
 * Useful for scenarios like editing pre-existing form data (e.g., birthdays, due dates).
 *
 * @story WithInitialValue
 */
export const WithInitialValue: Story = {
  render: () => {
    const [date, setDate] = useState<string>('25-12-2024');

    return (
      <div className="p-4 space-y-2">
        <DatePicker
          label="Birthday"
          defaultValue="2024-12-25"
          onChange={(d) => setDate(d)}
        />
        <p className="text-sm text-gray-700">Selected: {date}</p>
      </div>
    );
  },
};
