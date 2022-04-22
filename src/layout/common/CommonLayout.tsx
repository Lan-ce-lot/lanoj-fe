import React from 'react';
import {
  Affix, Button
  , Layout
} from 'antd';
import Header from '../../components/common/header/Header'
import Footer from '../../components/common/footer/Footer'
import {Link, Outlet} from 'react-router-dom'
import styles from './CommonLayout.module.scss'
import CommonBackTop from "../../components/common/commonBackTop/CommonBackTop";
import {Content} from "antd/lib/layout/layout";

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
      <div >
        <Content className={styles.content}>
          <Outlet/>
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
