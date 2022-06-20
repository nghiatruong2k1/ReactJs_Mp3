import {memo,useContext} from 'react';
import {Button,CircularProgress} from '@mui/material/';
import styles from './styles.module.css';
function LoadingData({loading,...props}){
  if(loading){
    return (
      <Button variant="outlined" className={styles.button}>
        <CircularProgress className={styles.svg}/>
      </Button>
    )
  }
  else{
    return <></>
  }
}
export default memo(LoadingData);