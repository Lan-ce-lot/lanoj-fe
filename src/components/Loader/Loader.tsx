import React, {useEffect} from 'react'
import classNames from 'classnames'
import styles from './Loader.module.scss'
import {connect} from "react-redux";

interface IProps {
  loading?: boolean;
  fullScreen?: boolean;
}

const Loader: React.FC<IProps> = ({loading = false, fullScreen=true}) => {
  // useEffect(
  //   () => {
  //     alert(loading)
  //   },[]
  // )
  return (
    <>
      {/*<Loading/>*/}
      <div
        className={classNames(styles.loader, {
          [styles.hidden]: !loading,
          [styles.fullScreen]: fullScreen,
        })}
      >
        <div className={styles.warpper}>
          <div className={styles.inner}/>
          <div className={styles.text}>LOADING</div>
        </div>
      </div>
    </>

  )
}


const mapStateToProps = (state: any) => {
  return {...state.app};
};
export default connect(mapStateToProps)(Loader)
