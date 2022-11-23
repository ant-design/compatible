import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { MergedToken } from '.';
import { genFormControlValidation } from './mixin';

// export const showHelpMotion = (
//   className: string,
//   inKeyframes: Keyframes,
//   outKeyframes: Keyframes,
//   duration: string,
// ): CSSObject => {
//   return {
//     //   .make-motion(@className, @keyframeName, @duration);
//     ...(initMotion(className, inKeyframes, outKeyframes, duration) as any),

//     [`.${className}-enter, .${className}-appear`]: {
//       opacity: 0,
//       // animation-timing-function: @ease-in-out;
//     },
//     [`.${className}-leave`]: {
//       // animation-timing-function: @ease-in-out;
//     },
//   };
// };

// export const helpIn = new Keyframes('legacyAntShowHelpIn', {
//   '0%': {
//     transform: 'translateY(-5px)',
//     opacity: '0',
//   },
//   '100%': {
//     transform: 'translateY(0)',
//     opacity: '1',
//   },
// });

// export const helpOut = new Keyframes('legacyAntShowHelpOut', {
//   to: {
//     transform: 'translateY(-5px)',
//     opacity: '0',
//   },
// });

export const genFeedbackStyle = (token: MergedToken): CSSInterpolation => {
  const { componentCls, colorSuccess, colorInfo, colorWarning, colorError } = token;

  return {
    [componentCls]: {
      // ==================== Form Icon Status =====================
      [`${componentCls}-item-feedback-icon-success`]: {
        color: colorSuccess,
      },
      [`${componentCls}-item-feedback-icon-validating`]: {
        color: colorInfo,
      },
      [`${componentCls}-item-feedback-icon-warning`]: {
        color: colorWarning,
      },
      [`${componentCls}-item-feedback-icon-error`]: {
        color: colorError,
      },

      // ================== Form Feedback Status ===================
      '.has-warning': {
        ...genFormControlValidation(componentCls, colorWarning),
      },
      '.has-error': {
        ...genFormControlValidation(componentCls, colorError),
      },

      // ...showHelpMotion('show-help', helpIn, helpOut, token.motionDurationSlow),
    },
  };
};
