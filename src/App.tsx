
import React from "react";

import '../translation'

import {Colors} from './theme';

import {ThemeProvider} from "./theme/ThemeContext";
import i18n from "i18next";

import Navigation from "./screens/Navigation";


const App = () => {

  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
