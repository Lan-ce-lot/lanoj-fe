import React from 'react';
import './App.css';
import {MyRouter} from './router';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import Loading from "./components/Loading";

import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import Loader from "./components/Loader/Loader";
import {ConfigProvider, message} from "antd";

interface AppProps {
}

const App: React.FunctionComponent<AppProps> = (props) => {
  message.config({
    duration: 1,
    maxCount: 3,
  });
  console.log(
    String.raw`

 ___       ________  ________   ________        ___
|\  \     |\   __  \|\   ___  \|\   __  \      |\  \
\ \  \    \ \  \|\  \ \  \\ \  \ \  \|\  \     \ \  \
 \ \  \    \ \   __  \ \  \\ \  \ \  \\\  \  __ \ \  \
  \ \  \____\ \  \ \  \ \  \\ \  \ \  \\\  \|\  \\_\  \
   \ \_______\ \__\ \__\ \__\\ \__\ \_______\ \________\
    \|_______|\|__|\|__|\|__| \|__|\|_______|\|________|

                    @Author Lancel`
  )
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>

          {/*<Loader />*/}
          <Loading/>
          <MyRouter/>

        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
