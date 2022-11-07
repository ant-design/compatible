import { theme } from 'antd';
import { render as lessRender } from 'less';
import { render } from '@testing-library/react';
import { updateCSS } from 'rc-util/lib/Dom/dynamicCSS';
import { convertLegacyToken } from '../src';

const { defaultAlgorithm, defaultConfig } = theme;

async function renderLess(lessStr: string, vars: Record<string, string>) {
  return new Promise<string>((resolve, reject) => {
    lessRender(
      lessStr,
      {
        javascriptEnabled: true,
        modifyVars: vars,
      },
      (e, output) => {
        if (e) {
          reject(e);
          return;
        }

        resolve(output.css.trim());
      },
    );
  });
}

describe('Less', () => {
  afterEach(() => {
    const styles = Array.from(document.querySelectorAll('style'));
    styles.forEach(style => {
      style.parentNode?.removeChild(style);
    });
  });

  it('work', async () => {
    const mapToken = defaultAlgorithm(defaultConfig.token);
    const legacyToken = convertLegacyToken(mapToken);

    // Value exist check
    expect(legacyToken['line-height-base']).toEqual(`${mapToken.lineHeights[1]}`);
    expect(legacyToken['border-radius-base']).toEqual(`${mapToken.borderRadius}px`);

    // Less compile check
    const css = await renderLess(
      `
@my-prefix-cls: ~'@{ant-prefix}-my';

.@{my-prefix-cls} {
  color: @primary-color;
}
    `,
      legacyToken,
    );

    updateCSS(css, 'ant-my');
    const { container } = render(<p className="ant-my" />);

    expect(container.querySelector('p')).toHaveStyle({
      color: mapToken.colorPrimary,
    });
  });
});
