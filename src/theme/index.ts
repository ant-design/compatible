import type { ThemeConfig } from 'antd/lib/config-provider/context';
import defaultAlgorithm from './default';
import darkAlgorithm from './dark';

export { defaultAlgorithm, darkAlgorithm };

const v4Token: ThemeConfig = {
  token: { borderRadius: 2, colorPrimary: '#1890ff', wireframe: true },
}

export const defaultTheme: ThemeConfig = {
  ...v4Token,
  algorithm: defaultAlgorithm,
  components: {
    Menu: {
      itemBorderRadius: 0,
      subMenuItemBorderRadius: 0,
      itemHoverColor: '#1890ff',
      itemSelectedColor: '#1890ff',
      itemSelectedBg: '#e6f7ff',
      activeBarWidth: 3,
      itemMarginInline: 0,
      itemHoverBg: 'transparent',
    },
  },
}

export const darkTheme: ThemeConfig = {
  ...v4Token,
  algorithm: darkAlgorithm,
  components: {
    Menu: {
      itemBorderRadius: 0,
      subMenuItemBorderRadius: 0,
      itemHoverColor: 'transparent',
      itemSelectedColor: '#1890ff',
      itemSelectedBg: '#111b26',
      activeBarWidth: 3,
      itemMarginInline: 0,
      itemHoverBg: 'transparent',
    },
  },
}
