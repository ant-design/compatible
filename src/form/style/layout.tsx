import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import type { MergedToken } from '.';

const genVerticalLayoutLabel = (token: MergedToken): CSSObject => {
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

const genVerticalLayoutControlWrapper = (): CSSObject => ({
  flexBasis: '100%',
});

const genVerticalLayout = (token: MergedToken): CSSObject => {
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
    antCls,
    componentCls,
    lineHeight,
    formExplainPrecision,
    marginLG,
  } = token;

  return [
    // =============================== Vertical ===============================
    {
      [componentCls]: {
        // when labelCol is 24, it is a vertical form
        [`
        &${componentCls}-vertical ${componentCls}-item-label,
        ${antCls}-col-24${componentCls}-item-label,
        ${antCls}-col-xl-24${componentCls}-item-label
      `]: {
          ...genVerticalLayoutLabel(token),
        },

        [`${componentCls}-vertical`]: {
          [`${componentCls}-item`]: {
            paddingBottom: '8px',
          },

          [`${componentCls}-item-control`]: {
            lineHeight: lineHeight,
          },
          [`${componentCls}-explain`]: {
            marginTop: 2,
            marginBottom: `-4px -${formExplainPrecision}px`,
          },
          [`${componentCls}-extra`]: {
            marginTop: 2,
            marginBottom: -4,
          },
        },
      },

      [`@media (max-width: ${token.screenXSMax})`]: {
        ...genVerticalLayout(token),
        [`${antCls}-col-xs-24${componentCls}-item-label`]: {
          ...genVerticalLayoutLabel(token),
        },
      },

      [`@media (max-width: ${token.screenSMMax})`]: {
        [`${antCls}-col-sm-24${componentCls}-item-label`]: {
          ...genVerticalLayoutLabel(token),
        },
      },

      [`@media (max-width: ${token.screenMDMax})`]: {
        [`${antCls}-col-md-24${componentCls}-item-label`]: {
          ...genVerticalLayoutLabel(token),
        },
      },

      [`@media (max-width: ${token.screenLGMax})`]: {
        [`${antCls}-col-lg-24${componentCls}-item-label`]: {
          ...genVerticalLayoutLabel(token),
        },
      },

      [`@media (max-width: ${token.screenXLMax})`]: {
        [`${antCls}-col-xl-24${componentCls}-item-label`]: {
          ...genVerticalLayoutLabel(token),
        },
      },
    },

    // ================================ Inline ================================
    {
      [`${componentCls}-inline`]: {
        [`${componentCls}-item`]: {
          display: 'inline-block',
          marginRight: '16px',
          marginBottom: '0',

          '&-with-help': {
            marginBottom: marginLG,
          },

          [`> ${componentCls}-item-control-wrapper, > ${componentCls}-item-label`]: {
            display: 'inline-block',
            verticalAlign: 'top',
          },
        },

        [`${componentCls}-text`]: {
          display: 'inline-block',
        },

        '.has-feedback': {
          display: 'inline-block',
        },
      },
    },
  ];
};
