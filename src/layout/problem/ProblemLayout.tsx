/**
 * @FileName: problemLayout
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/20 14:21
 */
import React from "react";
import {Affix, Card, Layout} from "antd";
import Header from "../common/header/Header";
import {Content} from "antd/lib/layout/layout";
// import styles from "../common/CommonLayout.module.scss";
import {Outlet} from "react-router-dom";

import styles from './ProblemLayout.module.scss'
import ProblemDetail from "../../pages/common/problem/problemDetail";

interface IProps {

}

interface IState {

}

const problemLayout: React.FC<IProps> = ({}) => {
  return (<>
    <Layout>
      <Header
        style={{height: '64px'}}
        className='Header'
      />
      <div>
        <Content
          className={styles.content}
        >
          {/*<Outlet/>*/}
          <ProblemDetail/>
        </Content>
      </div>
    </Layout>
  </>)
}
export default problemLayout;
