import React from 'react';
import { render } from 'enzyme';
import { Mention } from '../../src';

jest.mock('draft-js/lib/generateRandomKey', () => () => '123');

describe('Mention', () => {
  it('should render correctly', () => {
    const MentionWrapper = (
      <Mention
        style={{ width: '100%' }}
        defaultSuggestions={[
          'afc163',
          'benjycui',
          'yiminghe',
          'RaoHai',
          '中文',
          'にほんご',
        ]}
      />
    );

    const wrapper = render(MentionWrapper);
    expect(wrapper).toMatchSnapshot();
  });
});
