const compileModules = ['antd', '@babel'];

const ignoreList = [];

// cnpm use `_` as prefix
['', '_'].forEach(prefix => {
  compileModules.forEach(module => {
    ignoreList.push(`${prefix}${module}`);
  });
});

const transformIgnorePatterns = [
  // Ignore modules without es dir.
  // Update: @babel/runtime should also be transformed
  `/node_modules/(?!${ignoreList.join('|')})[^/]+?/(?!(es)/)`,
];

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/tests/setupAfterEnv.ts'],
  transformIgnorePatterns,
};
