import React from 'react';
import { Mention } from '../src';
// Fix less resovle fail, so before start run compile style
// eslint-disable-next-line import/no-unresolved
import '../assets/index.css';

const { toString, toContentState } = Mention;

function onChange(contentState) {
  console.log(toString(contentState));
}

function onSelect(suggestion) {
  console.log('onSelect', suggestion);
}

export default () => (
  <Mention
    style={{ width: '100%' }}
    onChange={onChange}
    defaultValue={toContentState('@afc163')}
    defaultSuggestions={[
      'afc163',
      'benjycui',
      'yiminghe',
      'RaoHai',
      '中文',
      'にほんご',
    ]}
    onSelect={onSelect}
  />
);
