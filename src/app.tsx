import './polyfills';

import { render } from 'react-dom';

import { Root } from './ui/components';

const App = () => {
  return (
    <>
      <Root />
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
const renderApp = () => render(<App />, document.querySelector('#app'));
renderApp();

// eslint-disable-next-line unicorn/prefer-module
if (module.hot) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, unicorn/prefer-module
  module.hot.accept(renderApp);
}
