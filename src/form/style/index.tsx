// import '../../style/index.less';
// import './index.less';
import * as React from 'react';
import type { CSSInterpolation } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import { theme as antdTheme, ConfigProvider } from 'antd';
import type { GlobalToken } from 'antd/es/theme/interface';
import { resetComponent, clearFix } from 'antd/es/style';
import { resetForm } from './mixin';
import { genFormLayoutStyle } from './layout';

export interface MergedToken extends GlobalToken {
  componentCls: string;
  antCls: string;
  iconCls: string;
}

// ============================== Export ==============================
const genFormStyle = (token: MergedToken): CSSInterpolation => {
  const {
    antCls,
    iconCls,
    componentCls,
    controlHeightLG,
    controlHeight,
    colorTextHeading,
    colorHighlight,
    colorTextSecondary,
    fontSize,
    lineHeight,
    marginXS,
    marginXXS,
    marginLG,
    motionEaseOut,
    motionDurationSlow,
    paddingXXS,
    paddingXS,
  } = token;

  const formExplainPrecision = 1;
  const formExplainHeight = Math.floor(fontSize * lineHeight);
  const formHelpMarginTop = (controlHeight - controlHeightLG) / 2 + 2;

  return {
    [componentCls]: {
      ...(resetComponent(token) as any),
      ...resetForm(token),
      [`${componentCls}-item-required::before`]: {
        display: 'inline-block',
        marginRight: 4,
        color: colorHighlight,
        fontSize,
        fontFamily: 'SimSun, sans-serif',
        lineHeight: 1,
        content: '" * "',
      },

      [`${componentCls}-hide-required-mark ${componentCls}-item-required::before`]: {
        display: 'none',
      },

      [`${componentCls}-item-label > label`]: {
        color: colorTextHeading,
        '&::after': {
          content: ':',
        },
        position: 'relative',
        top: -0.5,
        margin: `0 ${marginXS}px 0 ${marginXXS / 2}px`,
      },
      [`&${componentCls}-item-no-colon::after`]: {
        content: ' ',
      },

      // ======================== Form Item ========================
      // You should wrap labels and controls in .@{form-prefix-cls}-item for optimum spacing
      [`${componentCls}-item`]: {
        label: {
          position: 'relative',

          [`> ${iconCls}`]: {
            fontSize,
            verticalAlign: 'top',
          },
        },

        ...(resetComponent(token) as any),

        marginBottom: marginLG,
        verticalAlign: 'top',
        '&-control': {
          position: 'relative',
          lineHeight: `${controlHeightLG}px`,
          ...clearFix(),
        },
        '&-children': {
          position: 'relative',
        },
        '&-with-help': {
          marginBottom: Math.max(0, marginLG - formExplainHeight - formHelpMarginTop),
        },
        '&-label': {
          display: 'inline-block',
          overflow: 'hidden',
          lineHeight: `${controlHeightLG - 0.0001}px`,
          whiteSpace: 'nowrap',
          textAlign: 'right',
          verticalAlign: 'middle',
          flexGrow: '0',
          '&-left': {
            textAlign: 'left',
          },
        },
        '&-control-wrapper': {
          flex: '1 1 0',
        },
        [`${antCls}-switch`]: {
          margin: '2px 0 4px',
        },
      },

      // ========================= Explain =========================
      [`${componentCls}-explain, ${componentCls}-extra`]: {
        clear: 'both',
        minHeight: formExplainHeight + formExplainPrecision,
        marginTop: formHelpMarginTop,
        color: colorTextSecondary,
        fontSize: fontSize,
        lineHeight: lineHeight,
        transition: `color ${motionDurationSlow} ${motionEaseOut}`,
      },

      [`${componentCls}-explain`]: {
        marginBottom: -formExplainPrecision,
      },

      [`${componentCls}-extra`]: {
        paddingTop: paddingXXS,
      },

      [`${componentCls}-text`]: {
        display: 'inline-block',
        paddingRight: paddingXS,
      },

      [`${componentCls}-split`]: {
        display: 'block',
        textAlign: 'center',
      },

      // ==================== Form Item Status =====================
      [`${componentCls}-item-feedback-icon-success`]: {
        color: token.colorSuccess,
      },
      [`${componentCls}-item-feedback-icon-validating`]: {
        color: token.colorInfo,
      },
      [`${componentCls}-item-feedback-icon-warning`]: {
        color: token.colorWarning,
      },
      [`${componentCls}-item-feedback-icon-error`]: {
        color: token.colorError,
      },
    },
  };
};

export default function useStyle(
  prefixCls: string,
): [(node: React.ReactNode) => React.ReactElement, string] {
  const { theme, token, hashId } = antdTheme.useToken();
  const { iconPrefixCls, getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();

  return [
    useStyleRegister(
      {
        theme: theme as any,
        token,
        hashId,
        path: ['compatible', 'Form', prefixCls, iconPrefixCls],
      },
      () => {
        const mergedToken = {
          componentCls: `.${prefixCls}`,
          antCls: `.${rootPrefixCls}`,
          iconCls: `.${iconPrefixCls}`,
          ...token,
        };
        return [genFormStyle(mergedToken), genFormLayoutStyle(mergedToken)];
      },
    ),
    hashId,
  ];
}
