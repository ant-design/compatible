import CalendarLocale from 'rc-calendar/lib/locale/ga_IE';
import TimePickerLocale from '../../time-picker/locale/ga_IE';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Select date',
    rangePlaceholder: ['Start date', 'End date'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
