import './polyfills';

import { ChakraProvider } from '@chakra-ui/react';
import { render } from 'react-dom';
import useAsyncEffect from 'use-async-effect';

import { greet } from './core/worker/pwt.worker';
import { Root } from './ui/components';
import { theme } from './ui/theme';

const App = () => {
  useAsyncEffect(async () => {
    console.log('enter');
    // eslint-disable-next-line @typescript-eslint/await-thenable
    console.log(await greet('me'));
    console.log('exit');
  }, []);

  return (
    <>
      <ChakraProvider theme={theme}>
        <Root />
      </ChakraProvider>
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
