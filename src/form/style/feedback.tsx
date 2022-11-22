import type { Keyframes } from '@ant-design/cssinjs';
import type { CSSInterpolation } from '@ant-design/cssinjs';
import { initMotion } from 'antd/lib/style/motion/motion';
import type { MergedToken } from '.';
import { genFormControlValidation } from './mixin';

export const showHelpMotion = (
  className: string,
  inKeyframes: Keyframes,
  outKeyframes: Keyframes,
  duration: string,
): CSSInterpolation => {
  return {
    //   .make-motion(@className, @keyframeName, @duration);
    ...(initMotion(className, inKeyframes, outKeyframes, duration) as any),

    //   .@{className}-enter,
    //   .@{className}-appear {
    //     opacity: 0;
    //     animation-timing-function: @ease-in-out;
    //   }
    //   .@{className}-leave {
    //     animation-timing-function: @ease-in-out;
    //   }
  };
};

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
    },
  };
};
