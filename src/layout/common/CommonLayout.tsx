import React from 'react';
import {
  Affix, Button
  , Layout
} from 'antd';
import Header from './header/Header'
import Footer from './footer/Footer'
import {Link, Outlet} from 'react-router-dom'
import styles from './CommonLayout.module.scss'
import CommonBackTop from "./commonBackTop/CommonBackTop";
import {Content} from "antd/lib/layout/layout";
// import RcQueueAnim from "rc-queue-anim/index";
import QueueAnim from 'rc-queue-anim';

interface CommonProps {
  location?: string,


}

const Common: React.FC<CommonProps> = (props) => {
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

              {/*<div key="1">enter in queue</div>*/}
              {/*<div key="2">enter in queue</div>*/}
              {/*<div key="3">enter in queue</div>*/}
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
