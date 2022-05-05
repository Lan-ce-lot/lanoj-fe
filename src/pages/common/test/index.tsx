/**
 * @FileName: index
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/18 0:56
 */
import React, {useState} from "react";
import {Card, Menu, Radio, Tabs} from "antd";
import Split from "@uiw/react-split";
import Editor from "../problem/problemDetail/components/Editor";
import ProblemContent from "../problem/problemDetail/components/ProblemContent";
import {Link, useNavigate} from "react-router-dom";
import {CalendarOutlined} from "@ant-design/icons";
import ScrollBar from "../../../layout/admin/ScrollBar";
import styles from './index.module.scss'

const {TabPane} = Tabs;

interface IProps {

}


const Test: React.FC<IProps> = ({}) => {


  return (<>
      <div className={styles.formContainer}>
        <span className={styles.closeBtn}>×</span>
        <div className={styles.formContentLeft}>
          <img className={styles.formImg} src='img/img-2.svg' alt='spaceship'/>
        </div>
        <div className={styles.formContentRight}>
          <form className={styles.form} noValidate>
            <h1>
              Get started with us today! Create your account by filling out the
              information below.
            </h1>
            <div className={styles.formInputs}>
              <label className={styles.formLabel}>Username</label>
              <input
                className={styles.formInput}
                type='text'
                name='username'
                placeholder='Enter your username'

              />

            </div>
            <div className={styles.formInputs}>
              <label className={styles.formLabel}>Email</label>
              <input
                className={styles.formInput}
                type='email'
                name='email'
                placeholder='Enter your email'

              />

            </div>
            <div className={styles.formInputs}>
              <label className={styles.formLabel}>Password</label>
              <input
                className={styles.formInput}
                type='password'
                name='password'
                placeholder='Enter your password'

              />
            </div>
            <button                 className={styles.formInputBtn} type='submit'>
              Sign up
            </button>
            <span                 className={styles.formInputLogin}>
          Already have an account? Login <a href='#'>here</a>
        </span>
          </form>
        </div>

      </div>
    </>

  )
}
export default Test;
