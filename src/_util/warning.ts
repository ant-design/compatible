import warning from 'rc-util/lib/warning';

export default (valid: boolean, component: string, message: string): void => {
  warning(valid, `[antd-compatible: ${component}] ${message}`);
};
