/**
 * @copyright 2025 Herocore LLC, All Rights Reserved.
 * @license This code is licensed under the MIT license. See the LICENSE file
 * in the project root for full license information.
 * @fileoverview Unit tests for the DatePicker component.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DatePicker from './DatePicker';

describe('DatePicker component', () => {
  it('renders with default label', () => {
    render(<DatePicker />);
    expect(screen.getByText('Start Date')).toBeInTheDocument();
  });

  it('renders with custom label "Choose Date"', () => {
    render(<DatePicker label="Choose Date" />);
    expect(screen.getByText('Choose Date')).toBeInTheDocument();
  });

  it('input should be empty by default', () => {
    render(<DatePicker />);
    const input = screen.getByPlaceholderText('Select a Date') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('input should display formatted defaultValue "15-03-2025"', () => {
    render(<DatePicker defaultValue="2025-03-15" />);
    const input = screen.getByPlaceholderText('Select a Date') as HTMLInputElement;
    expect(input.value).toBe('15-03-2025');
  });

  it('calendar becomes visible when input is clicked', () => {
    render(<DatePicker />);
    const input = screen.getByPlaceholderText('Select a Date');
    fireEvent.click(input);
    const calendar = screen.getByTestId('calendar-date');
    expect(calendar.className).toContain('block');
  });

  it('calendar becomes visible when calendar icon is clicked', () => {
    render(<DatePicker />);
    const icon = screen.getByTestId('calendar-icon');
    fireEvent.click(icon);
    const calendar = screen.getByTestId('calendar-date');
    expect(calendar.className).toContain('block');
  });

  it('input shows selected date in DD-MM-YYYY format', () => {
    const handleChange = vi.fn();
    render(<DatePicker onChange={handleChange} />);
    const calendar = screen.getByTestId('calendar-date');
    fireEvent.change(calendar, { target: { value: '2024-12-30' } });

    const input = screen.getByPlaceholderText('Select a Date') as HTMLInputElement;
    expect(input.value).toBe('30-12-2024');
    expect(handleChange).toHaveBeenCalledWith('30-12-2024');
  });

  it('calendar hides after date is selected', () => {
    render(<DatePicker />);
    const input = screen.getByPlaceholderText('Select a Date');
    fireEvent.click(input);
    const calendar = screen.getByTestId('calendar-date');
    fireEvent.change(calendar, { target: { value: '2025-01-10' } });
    expect(calendar.className).not.toContain('block');
  });

  it('calls onChange when a date is selected', () => {
    const handleChange = vi.fn();
    render(<DatePicker onChange={handleChange} />);
    const calendar = screen.getByTestId('calendar-date');
    fireEvent.change(calendar, { target: { value: '2025-01-15' } });
    expect(handleChange).toHaveBeenCalledWith('15-01-2025');
  });

  it('returns empty string when defaultValue is not provided', () => {
    render(<DatePicker />);
    const input = screen.getByPlaceholderText('Select a Date') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  /**
   * Description:
   * Should not crash or update state when calendar emits a falsy value
   *
   * Expected Result:
   * onChange should not be called
   */
  it('does nothing if isoDate is falsy (branch coverage)', () => {
    const handleChange = vi.fn();
    render(<DatePicker onChange={handleChange} />);
    const calendar = screen.getByTestId('calendar-date');
    fireEvent.change(calendar, { target: { value: '' } }); // simulate falsy value
    expect(handleChange).not.toHaveBeenCalled();
  });
});
