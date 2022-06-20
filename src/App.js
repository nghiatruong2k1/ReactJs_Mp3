import {memo,Fragment} from 'react';
import { BrowserRouter }from'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import AppScreens from "./Screens/";
function App(props){
  return (
  <CookiesProvider>
    <BrowserRouter>
      <AppScreens />
    </BrowserRouter>
  </CookiesProvider>
  )
};export default memo(App)