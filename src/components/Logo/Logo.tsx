/**
 * @FileName: Logo
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/20 14:08
 */
import React from "react";
import styles from './Logo.module.scss'

interface IProps {

}

interface IState {

}

const Logo: React.FC<IProps> = ({}) => {
  return (<>

    <div className={styles.brand}>
      <div className={styles.logo}>
        <img alt="logo" src={'/logo192.png'}/>
        {<h1>{'LANOJ Admin'}</h1>}
      </div>
    </div>
  </>)
}
export default Logo;
