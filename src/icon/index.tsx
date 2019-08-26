import React from 'react';
import * as allIcons from '@ant-design/icons/lib/icons';
import AntdIcon, {
  createFromIconfontCN,
  getTwoToneColor,
  setTwoToneColor,
} from '@ant-design/icons';

import { withThemeSuffix, removeTypeTheme, getThemeFromTypeName, alias } from './utils';
import warning from '../_util/warning';
import { Omit } from '../_util/types';

export interface CustomIconComponentProps {
  width: string | number;
  height: string | number;
  fill: string;
  viewBox?: string;
  className?: string;
  style?: React.CSSProperties;
  spin?: boolean;
  rotate?: number;
  ['aria-hidden']?: React.AriaAttributes['aria-hidden'];
}

export type ThemeType = 'filled' | 'outlined' | 'twoTone';

export interface IconProps {
  tabIndex?: number;
  type: string;
  className?: string;
  theme?: ThemeType;
  title?: string;
  onKeyUp?: React.KeyboardEventHandler<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
  component?: React.ComponentType<CustomIconComponentProps>;
  twoToneColor?: string;
  viewBox?: string;
  spin?: boolean;
  rotate?: number;
  style?: React.CSSProperties;
  role?: string;
}

export interface IconComponent<P> extends React.SFC<P> {
  createFromIconfontCN: typeof createFromIconfontCN;
  getTwoToneColor: typeof getTwoToneColor;
  setTwoToneColor: typeof setTwoToneColor;
}

type LegacyTypeIconProps = Omit<IconProps, 'component'>;

const iconsMap: {
  [key: string]: any;
} = allIcons;

const LegacyTypeIcon: React.FC<LegacyTypeIconProps> = props => {
  const { type, theme } = props;

  if (theme) {
    const themeInName = getThemeFromTypeName(type);
    warning(
      !themeInName || theme === themeInName,
      'Icon',
      `The icon name '${type}' already specify a theme '${themeInName}',` +
        ` the 'theme' prop '${theme}' will be ignored.`,
    );
  }
  const computedType = withThemeSuffix(removeTypeTheme(alias(type)), theme || 'outlined');
  return React.createElement(iconsMap[computedType], props);
};

const Icon: IconComponent<IconProps> = props => {
  const { type, component, children } = props;
  warning(
    Boolean(type || component || children),
    'Icon',
    'Should have `type` prop or `component` prop or `children`.',
  );

  if (component || children) {
    return <AntdIcon {...props} />;
  }

  if (typeof type === 'string') {
    return <LegacyTypeIcon {...props} />;
  }

  return <AntdIcon />;
};

Icon.createFromIconfontCN = createFromIconfontCN;
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;

export default Icon;
