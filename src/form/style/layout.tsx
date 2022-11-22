import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { MergedToken } from '.';

const genVerticalLayoutLabel = (token: MergedToken) => {
  const { lineHeight } = token;

  return {
    display: 'block',
    margin: 0,
    padding: '0 0 8px',
    lineHeight: lineHeight,
    whiteSpace: 'initial',
    textAlign: 'left',
    flexBasis: '100%',

    'label::after': {
      display: 'none',
    },
  };
};

const genVerticalLayoutControlWrapper = () => ({
  flexBasis: '100%',
});

const genVerticalLayout = (token: MergedToken) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-item-label, ${componentCls}-item-control-wrapper`]: {
      display: 'block',
      width: '100%',
    },

    [`${componentCls}-item-label`]: {
      ...genVerticalLayoutLabel(token),
    },

    [`${componentCls}-item-control-wrapper`]: {
      ...genVerticalLayoutControlWrapper(),
    },
  };
};

export const genFormLayoutStyle = (token: MergedToken): CSSInterpolation => {
  const {
    componentCls,
    colorText,
    colorTextSecondary,
    fontSizeLG,
    lineHeight,
    lineWidth,
    lineType,
    colorBorder,
    fontSize,
  } = token;

  return {
    [componentCls]: {},
  };
};
