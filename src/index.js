import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  theme,
} from '@chakra-ui/react';
import AuthProvider from './context/auth-context';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    primary: theme.colors.pink,
  },
});

ReactDOM.render(
  <AuthProvider>
    <ChakraProvider theme={customTheme}>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </AuthProvider>,

  document.getElementById('root')
);
