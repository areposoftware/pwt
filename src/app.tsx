import './polyfills';

import { ChakraProvider } from '@chakra-ui/react';
import { render } from 'react-dom';

import { Root } from './ui/components';
import { useAppStore } from './ui/hooks/use-app-store';
import { theme } from './ui/theme';

const App = () => {
  const appStore = useAppStore('saves', []);

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
