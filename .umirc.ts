// more config: https://d.umijs.org/config
import { defineConfig } from 'dumi';

export default defineConfig({
  title: '@ant-design/compatible',
  favicon: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  logo: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  outputPath: '.doc',
  exportStatic: {},
  styles: [
    // Remove when antd fix this
    `
      .markdown table {
        width: auto !important;
      }

      * {
        box-sizing: border-box;
      }
    `,
  ],
});
