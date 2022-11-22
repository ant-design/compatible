import * as React from 'react';
import type { ColProps } from 'antd/lib/grid/col';
import type { FormLabelAlign } from './FormItem';

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
