import React from 'react';
import { render, mount } from 'enzyme';
import { Tooltip } from 'antd';

import { Icon } from '../../src';
import { ThemeType } from '../../src/icon';
import { getThemeFromTypeName, withThemeSuffix } from '../../src/icon/utils';

import { mountTest } from '../utils';

const sleep = (timeout = 0) => new Promise(resolve => setTimeout(resolve, timeout));

describe('Icon', () => {
  mountTest(Icon);

  it('should render to a <i class="xxx"><svg>...</svg></i>', () => {
    const wrapper = render(
      <Icon type="message" className="my-icon-classname" />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support basic usage', () => {
    const wrapper = render(
      <div>
        <Icon type="home" />
        <Icon type="setting" theme="filled" />
        <Icon type="smile" theme="outlined" />
        <Icon type="sync" spin />
        <Icon type="loading" />
      </div>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support older usage', () => {
    const wrapper = render(
      <div>
        <Icon type="home-o" />
        <Icon type="setting-fill" />
        <Icon type="smile-o" />
        <Icon type="check-circle-twotone" />
      </div>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support two-tone icon', () => {
    const wrapper = render(
      <Icon type="check-circle" theme="twoTone" twoToneColor="#f5222d" />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support config global two-tone primary color', () => {
    Icon.setTwoToneColor('#1890ff');
    expect(Icon.getTwoToneColor()).toBe('#1890ff');
    const wrapper = render(<Icon type="check-circle" theme="twoTone" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support pass svg paths as children', () => {
    const wrapper = render(
      <Icon viewBox="0 0 24 24">
        <title>Cool Home</title>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </Icon>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should give warning and render <i>{null}</i>', () => {
    const wrapper = render(<Icon viewBox="0 0 24 24" />);
    expect(wrapper).toMatchSnapshot();
  });

  fit('should support wrapped by Tooltip', async () => {
    const onVisibleChange = jest.fn();
    const wrapper = mount(
      <Tooltip
        title="xxxxx"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        transitionName=""
        onVisibleChange={onVisibleChange}
      >
        <Icon type="home" />
      </Tooltip>,
    );

    expect(wrapper.find('span')).toHaveLength(1);
    const icon = wrapper.find('span').at(0);
    icon.simulate('mouseenter');
    expect(onVisibleChange).toHaveBeenCalledWith(true);
    await sleep(0);
    expect(wrapper.find('.ant-tooltip').at(1).hasClass('ant-tooltip-hidden')).toBe(false);

    icon.simulate('mouseleave');
    expect(onVisibleChange).toHaveBeenCalledWith(false);
    await sleep(0);
    expect(wrapper.find('.ant-tooltip').at(1).hasClass('ant-tooltip-hidden')).toBe(true);
  });

  it('should support custom usage of children', () => {
    expect(() => {
      render(<Icon type="custom">&E648</Icon>);
    }).not.toThrow();
  });

  it('support render svg as component', () => {
    const renderSvg = () => (
      <svg
        viewBox="0 0 1024 1024"
        width="1em"
        height="1em"
        fill="currentColor"
      />
    );
    const SvgIcon = props => <Icon component={renderSvg} {...props} />;

    expect(mount(<SvgIcon />).render()).toMatchSnapshot();
  });

  describe('warning on conflicting theme', () => {
    let errorSpy;
    beforeEach(() => {
      errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      errorSpy.mockRestore();
    });

    it('does not warn', () => {
      mount(<Icon type="clock-circle-o" theme="outlined" />);
      expect(errorSpy).not.toHaveBeenCalled();
    });

    it('warns', () => {
      mount(<Icon type="clock-circle-o" theme="filled" />);
      expect(errorSpy).toHaveBeenCalledWith(
        "Warning: [antd-compatible: Icon] The icon name 'clock-circle-o' already specify a theme 'outlined', the 'theme' prop 'filled' will be ignored.",
      );
    });
  });

  describe('`component` prop', () => {
    it('can access to svg defs if has children', () => {
      const wrapper = render(
        <Icon
          className="my-home-icon"
          component={svgProps => (
            <svg {...svgProps}>
              <defs>
                <linearGradient id="gradient">
                  <stop offset="20%" stopColor="#39F" />
                  <stop offset="90%" stopColor="#F3F" />
                </linearGradient>
              </defs>
              {React.Children.map(svgProps.children, (child: any) =>
                // todo: remove any
                React.cloneElement(
                  child,
                  child.type === 'path' ? { fill: 'scriptUrl(#gradient)' } : {},
                ),
              )}
            </svg>
          )}
        >
          <title>Cool Home</title>
          <path d="'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'" />
        </Icon>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should support svg react component', () => {
    const SvgComponent = props => (
      <svg viewBox="0 0 24 24" {...props}>
        <title>Cool Home</title>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    );

    const wrapper = render(
      <Icon className="my-home-icon" component={SvgComponent}>
        <title>Cool Home</title>
        <path d="'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'" />
      </Icon>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Icon.createFromIconfontCN()', () => {
  const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    extraCommonProps: {
      className: 'abc',
    },
  });

  it('should support iconfont.cn', () => {
    const wrapper = render(
      <div className="icons-list">
        <IconFont type="icon-tuichu" />
        <IconFont type="icon-facebook" />
        <IconFont type="icon-twitter" />
      </div>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('extraCommonProps should works fine and can be overwritten', () => {
    const wrapper = render(
      <div className="icons-list">
        <IconFont type="icon-tuichu" className="bcd" />
        <IconFont type="icon-facebook" />
        <IconFont type="icon-twitter" className="efg" />
      </div>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('utils', () => {
  it('getThemeFromTypeName() should work', () => {
    const testCases = [
      'check-circle',
      'check-circle-o',
      'check-circle-fill',
      'check-circle-twotone',
    ];
    const result = testCases.map(type => getThemeFromTypeName(type));
    expect(result).toEqual([null, 'outlined', 'filled', 'twoTone']);
  });

  it('withThemeSuffix() should work', () => {
    const testCases: { type: string; theme: ThemeType }[] = [
      { type: 'home', theme: 'filled' },
      { type: 'home', theme: 'outlined' },
      { type: 'home', theme: 'twoTone' },
      { type: 'home', theme: 'This-is-the-secret' as any },
      { type: 'home-o', theme: 'filled' },
      { type: 'home-fill', theme: 'outlined' },
      { type: 'home-o', theme: 'twoTone' },
      { type: 'home-o', theme: 'This-is-the-secret' as any },
    ];
    const result = testCases.map(({ type, theme }) =>
      withThemeSuffix(type, theme),
    );
    expect(result).toEqual([
      'HomeFilled',
      'HomeOutlined',
      'HomeTwoTone',
      'Home',
      'HomeOFilled',
      'HomeFillOutlined',
      'HomeOTwoTone',
      'HomeO',
    ]);
  });

  it('should report an error when there are deprecated typos in icon names', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Icon type="interation" />);
    expect(errorSpy).toHaveBeenLastCalledWith(
      "Warning: [antd-compatible: Icon] Icon 'interation' was a typo and is now deprecated, please use 'interaction' instead.",
    );
    render(<Icon type="cross" />);
    expect(errorSpy).toHaveBeenLastCalledWith(
      "Warning: [antd-compatible: Icon] Icon 'cross' was a typo and is now deprecated, please use 'close' instead.",
    );
    render(<Icon type="canlendar" theme="twoTone" />);
    expect(errorSpy).toHaveBeenLastCalledWith(
      "Warning: [antd-compatible: Icon] Icon 'canlendar' was a typo and is now deprecated, please use 'calendar' instead.",
    );
    render(<Icon type="colum-height" />);
    expect(errorSpy).toHaveBeenLastCalledWith(
      "Warning: [antd-compatible: Icon] Icon 'colum-height' was a typo and is now deprecated, please use 'column-height' instead.",
    );
    expect(errorSpy).toHaveBeenCalledTimes(4);
    errorSpy.mockRestore();
  });

  it('should report an error when icon type doesnot exist', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Icon type="cross-circle-o" />);
    expect(errorSpy).toHaveBeenLastCalledWith(
      "Warning: [antd-compatible: Icon] The icon name 'cross-circle-o' doesn't exist, please check it at https://ant.design/components/icon",
    );
    errorSpy.mockRestore();
  });
});
