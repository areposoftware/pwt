module.exports = {
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  '**/*.{js,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '**/*.{json,md,html,css}': ['prettier --write'],
};
