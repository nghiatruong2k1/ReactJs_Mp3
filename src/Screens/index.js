import {memo,useEffect} from 'react';
import {Routes,Route,useLocation}from'react-router-dom';

import {getAreaName} from "../Config/Route/";
import Loading from "./Loading/";
import Provider from "./provider";

import UserPage from "./User/";

const bodyRoot = document.getElementById("root");
function Screen({...props}){
	const location = useLocation();
	useEffect(function(){
		bodyRoot.scrollTop = 0;
	},[location]);

	return(
	<Provider>
		<Loading>
            <Routes>
            	<Route path={`${getAreaName("user")}/*`} element={<UserPage />} />
            {/*<Route path={`${getAreaName("admin")}/*`} element={<AdminPage />} /> */}
            </Routes> 
        </Loading>
	</Provider>
	)
}
export default memo(Screen);
