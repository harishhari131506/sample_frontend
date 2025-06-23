import type {
  CalendarRangeProps,
  CalendarMonthProps,
  CalendarDateProps,
  CalendarMultiProps,
} from "cally";



// Helper type to map Cally's 'on' events to React's camelCase events
// This is crucial for React to correctly pick up the events.
type MapEvents<T> = {
  [K in keyof T as K extends `on${infer E}` ? `on${Capitalize<E>}` : K]: T[K];
};


declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "calendar-month": MapEvents<CalendarMonthProps> &
        React.HTMLAttributes<HTMLElement> & {[key: string]: any;};
      "calendar-range": MapEvents<CalendarRangeProps> &
        React.HTMLAttributes<HTMLElement> & {[key: string]: any;};
      "calendar-date": MapEvents<CalendarDateProps> &
        React.HTMLAttributes<HTMLElement> & {[key: string]: any;};
      "calendar-multi": MapEvents<CalendarMultiProps> &
        React.HTMLAttributes<HTMLElement> & {[key: string]: any;};
    }
  }
}

