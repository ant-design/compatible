import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';
import { ThemeType } from './index';
import warning from '../_util/warning';

// These props make sure that the SVG behaviours like general text.
// Reference: https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
export const svgBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  'aria-hidden': true,
  focusable: 'false',
};

const fillTester = /-fill$/;
const outlineTester = /-o$/;
const twoToneTester = /-twotone$/;

export function getThemeFromTypeName(type: string): ThemeType | null {
  let result: ThemeType | null = null;
  if (fillTester.test(type)) {
    result = 'filled';
  } else if (outlineTester.test(type)) {
    result = 'outlined';
  } else if (twoToneTester.test(type)) {
    result = 'twoTone';
  }
  return result;
}

export function removeTypeTheme(type: string) {
  return type
    .replace(fillTester, '')
    .replace(outlineTester, '')
    .replace(twoToneTester, '');
}

const themeMap: { [key in ThemeType]: string } = {
  filled: 'filled',
  outlined: 'outlined', // default theme
  twoTone: 'twoTone',
};

export function withThemeSuffix(type: string, theme: ThemeType) {
  const result = upperFirst(camelCase(type));
  const realTheme = upperFirst(themeMap[theme]);

  if (theme !== 'outlined' && !realTheme) {
    warning(false, 'Icon', `This icon '${type}' has unknown theme '${theme}'`);
  }

  return result + realTheme;
}

// For alias or compatibility
export function alias(type: string) {
  let newType = type;
  switch (type) {
    case 'cross':
      newType = 'close';
      break;
    // https://github.com/ant-design/ant-design/issues/13007
    case 'interation':
      newType = 'interaction';
      break;
    // https://github.com/ant-design/ant-design/issues/16810
    case 'canlendar':
      newType = 'calendar';
      break;
    // https://github.com/ant-design/ant-design/issues/17448
    case 'colum-height':
      newType = 'column-height';
      break;
    default:
  }
  warning(
    newType === type,
    'Icon',
    `Icon '${type}' was a typo and is now deprecated, please use '${newType}' instead.`,
  );
  return newType;
}
