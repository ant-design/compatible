import React from 'react';
import { theme } from 'antd'
import { convertLegacyToken } from '../src';

const { defaultAlgorithm, defaultConfig } = theme;

describe('Less', () => {
  it('work', () => {
    const mapToken = convertLegacyToken(defaultAlgorithm(defaultConfig.token));

    convertLegacyToken();
  });
});
