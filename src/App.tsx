import React from 'react';
import logo from './logo.svg';
import './App.css';
import RouteIndexComp from './components/RouteIndex';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

function App() {
  return (
    <div className="App">
      <FluentProvider theme={webLightTheme}>
        <RouteIndexComp />
      </FluentProvider>
    </div>
  );
}

export default App;
