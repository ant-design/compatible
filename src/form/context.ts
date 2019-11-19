import * as React from 'react';
import { ColProps } from 'antd/lib/grid/col';
import { FormLabelAlign } from './FormItem';

export interface FormContextProps {
  vertical: boolean;
  colon?: boolean;
  labelAlign?: FormLabelAlign;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

const FormContext = React.createContext<FormContextProps>({
  labelAlign: 'right',
  vertical: false,
});

export default FormContext;
