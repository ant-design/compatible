import type { CSSObject } from '@ant-design/cssinjs';
import type { MergedToken } from '.';

export const resetForm = (token: MergedToken): CSSObject => {
  const {
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
    // Based on Bootstrap framework
    legend: {
      display: 'block',
      width: '100%',
      marginBottom: '20px',
      padding: '0',
      color: colorTextSecondary,
      fontSize: fontSizeLG,
      lineHeight: 'inherit',
      border: '0',
      borderBottom: `${lineWidth}px ${lineType} ${colorBorder}`,
    },

    label: {
      fontSize,
    },

    ["input[type='search']"]: {
      boxSizing: 'border-box',
    },

    // Position radios and checkboxes better
    ["input[type='radio'], input[type='checkbox']"]: {
      lineHeight: 'normal',
    },

    ["input[type='file']"]: {
      display: 'block',
    },

    // Make range inputs behave like textual form controls
    ["input[type='range']"]: {
      display: 'block',
      width: '100%',
    },

    // Make multiple select elements height not fixed
    ['select[multiple], select[size]']: {
      height: 'auto',
    },

    // Focus for file, radio, and checkbox
    ["input[type='file']:focus, input[type='radio']:focus, input[type='checkbox']:focus"]: [
      {
        outline: 'thin dotted',
      },
      {
        outline: '5px auto -webkit-focus-ring-color',
        outlineOffset: '-2px',
      },
    ],

    // Adjust output element
    output: {
      display: 'block',
      paddingTop: '15px',
      color: colorText,
      fontSize: fontSize,
      lineHeight: lineHeight,
    },
  };
};

export const genFormControlValidation = (componentCls: string, colorText: string): CSSObject => {
  return {
    [`${componentCls}-explain, ${componentCls}-split`]: {
      color: colorText,
    },
  };
};
