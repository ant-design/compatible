import React from 'react';
import moment from 'moment';
import TimePicker from '../src/time-picker';
import 'antd/dist/antd.css';
import '../assets/index.css';

export default function Demo() {
  function onChange(time, timeString) {
    console.log(time, timeString);
  }
  return (
    <div>
      <TimePicker
        onChange={onChange}
        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
      />
    </div>
  );
}
