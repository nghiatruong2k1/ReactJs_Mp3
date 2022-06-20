import {memo,useReducer} from 'react';
import {initState,reducerState} from "./init";
import Provider from './provider';
import LoadingControl from './Control';
function Loading({children}){
  const [loadings,dispath] = useReducer(reducerState,initState);
  return (
    <Provider dispath={dispath}>
        <LoadingControl loading={loadings.length > 0}/>
        {children}
    </Provider>
  )
};export default memo(Loading)