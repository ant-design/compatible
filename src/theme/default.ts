import type { DerivativeFunc } from '@ant-design/cssinjs';
import { generate } from '@ant-design/colors';
import genColorMapToken from './genColorMapToken';
import { theme } from 'antd';
import type { GenerateColorMap, GenerateNeutralColorMap } from 'antd/lib/theme/themes/ColorMap';
import type { SeedToken } from 'antd/lib/theme';
import type { MapToken } from 'antd/lib/theme/interface';
import { TinyColor } from '@ctrl/tinycolor';

const {defaultAlgorithm} = theme;

export const getAlphaColor = (baseColor: string, alpha: number) =>
  new TinyColor(baseColor).setAlpha(alpha).toRgbString();

export const getSolidColor = (baseColor: string, brightness: number) => {
  const instance = new TinyColor(baseColor);
  return instance.darken(brightness).toHexString();
};

export const generateColorPalettes: GenerateColorMap = (baseColor: string) => {
  const colors = generate(baseColor);
  return {
    1: colors[0],
    2: colors[1],
    3: colors[2],
    4: colors[3],
    5: colors[4],
    6: colors[5],
    7: colors[6],
    8: colors[4],
    9: colors[5],
    10: colors[6],
  };
};

const generateNeutralColorPalettes: GenerateNeutralColorMap = (
  bgBaseColor: string,
  textBaseColor: string,
) => {
  const colorBgBase = bgBaseColor || '#fff';
  const colorTextBase = textBaseColor || '#000';

  return {
    colorBgBase,
    colorTextBase,

    colorText: getAlphaColor(colorTextBase, 0.85),
    colorTextSecondary: getAlphaColor(colorTextBase, 0.45), // Different from v5
    colorTextTertiary: getAlphaColor(colorTextBase, 0.45),
    colorTextQuaternary: getAlphaColor(colorTextBase, 0.25),

    colorFill: getAlphaColor(colorTextBase, 0.06),
    colorFillSecondary: getAlphaColor(colorTextBase, 0.04),
    colorFillTertiary: getAlphaColor(colorTextBase, 0.03),
    colorFillQuaternary: getAlphaColor(colorTextBase, 0.02),

    colorBgLayout: getSolidColor(colorBgBase, 4),
    colorBgContainer: getSolidColor(colorBgBase, 0),
    colorBgElevated: getSolidColor(colorBgBase, 0),
    colorBgSpotlight: getAlphaColor(colorTextBase, 0.85),

    colorBorder: getSolidColor(colorBgBase, 15),
    colorBorderSecondary: getSolidColor(colorBgBase, 6),
    colorSplit: getAlphaColor(colorTextBase, 0.06),
  };
};

const derivative: DerivativeFunc<SeedToken, MapToken> = (token, mapToken) => {
  const mergedMapToken = mapToken ?? defaultAlgorithm(token);

  return {
    ...mergedMapToken,

    // Colors
    ...genColorMapToken(mapToken ?? token, {
      generateColorPalettes,
      generateNeutralColorPalettes,
    }),
  };
};

export default derivative;
