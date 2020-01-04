import warning from './warning';

export default (component: string) =>
  warning(
    false,
    component,
    `The legacy component has been deprecated, and ant design 4.0 now released! Please follow https://ant.design/components/${component.toLowerCase()}${
      component === 'Mention' ? 's' : ''
    } to upgrade.`,
  );
