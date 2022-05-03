import React from 'react';
import {
  Affix, Button
  , Layout, Switch
} from 'antd';
import Header from './header/Header'
import Footer from './footer/Footer'
import {Link, Outlet, Route, useLocation} from 'react-router-dom'
import styles from './CommonLayout.module.scss'
import CommonBackTop from "./commonBackTop/CommonBackTop";
import {Content} from "antd/lib/layout/layout";
// import RcQueueAnim from "rc-queue-anim/index";
import QueueAnim from 'rc-queue-anim';

import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {commonRouter} from "../../router/common";

interface CommonProps {
  location?: string,


}

const Common: React.FC<CommonProps> = (props) => {
  const location = useLocation();
  return (
    <Layout>
      <Affix offsetTop={0}>
        <Header
          className='Header'
        />
        {/*<Button*/}
        {/*  // size="large"*/}
        {/*  type="primary"*/}
        {/*  htmlType="submit"*/}
        {/*  // shape="round"*/}
        {/*><Link to={'/admin/home'}>admin</Link>*/}

        {/*  /!*<Link to={'/login'}></Link>*!/*/}
        {/*</Button>*/}
      </Affix>

      <div key={'content'}>
        <Content className={styles.content}>
          <Outlet key={'11'}/>
        </Content>
        <Footer
          copyright='Lan Online Judge ©2022 Lancel'
        />
        <CommonBackTop/>
      </div>

    </Layout>
  )
}

export default Common;
