import {memo,createContext} from 'react';
import { initCase } from './init';
export const LoadingContext = createContext();
function LoadingProvider({dispath,children}){
    return (
        <LoadingContext.Provider value={{initCase,dispath}}>
            {children}
        </LoadingContext.Provider>
    )
};export default memo(LoadingProvider)