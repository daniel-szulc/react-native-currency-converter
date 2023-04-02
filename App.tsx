
import React, { createContext, useContext, useMemo, useState } from "react";

import type {PropsWithChildren} from 'react';

import './translation'

type SectionProps = PropsWithChildren<{
  title: string;
}>;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Colors} from './theme';

import {ThemeProvider} from "./components/ThemeContext";
import i18n from "i18next";

import Navigation from "./components/Navigation";

const App = () => {

  i18n.changeLanguage("pl")

  return (
    <ThemeProvider>
      <Navigation/>
    </ThemeProvider>
  );
};

export default App;
