/**
 * @fileoverview Smoke test for the App component to ensure it renders successfully.
 */

import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';


describe('App', () => {
  it('renders DatePicker with label', () => {
    render(<App />);
    expect(screen.getByText(/start date/i)).toBeInTheDocument();
  });
});
