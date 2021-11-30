import CalendarLocale from 'rc-calendar/lib/locale/id_ID';
import TimePickerLocale from '../../time-picker/locale/id_ID';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Pilih tanggal',
    rangePlaceholder: ['Mulai tanggal', 'Tanggal akhir'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
