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
      radiusItem: 0,
      radiusSubMenuItem: 0,
      colorItemTextHover: '#1890ff',
      colorItemTextSelected: '#1890ff',
      colorItemBgSelected: '#e6f7ff',
      colorActiveBarWidth: 3,
      itemMarginInline: 0,
      colorItemBgHover: 'transparent',
    },
  },
}

export const darkTheme: ThemeConfig = {
  ...v4Token,
  algorithm: darkAlgorithm,
  components: {
    Menu: {
      radiusItem: 0,
      radiusSubMenuItem: 0,
      colorItemTextHover: '#1890ff',
      colorItemTextSelected: '#1890ff',
      colorItemBgSelected: '#111b26',
      colorActiveBarWidth: 3,
      itemMarginInline: 0,
      colorItemBgHover: 'transparent',
    },
  },
}
