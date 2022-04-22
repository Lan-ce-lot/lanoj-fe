import React, {Fragment, useEffect, useState} from "react";
import {Outlet, useLocation} from 'react-router-dom'
import {Layout} from 'antd'
// import { enquireScreen, unenquireScreen } from 'enquire.js'
import CommonBackTop from "../../components/common/commonBackTop/CommonBackTop";
import AdminHeader from "../../components/admin/adminHeader/AdminHeader";
import Sider from "../../components/admin/sider/Sider";
import styles from './AdminLayout.module.scss'
import Bread from "../../components/admin/bread/Bread";
import Footer from "../../components/admin/adminFooter/Footer";
import Error from '../../pages/admin/404/Error'
import BreadCrumb from "../../components/BreadCrumb";
import Loading from "../../components/Loading";
import NProgress from "nprogress";
import store from "../../store";
import {getUserInfo} from "../../api/admin/user";

const {Content} = Layout

interface AdminLayoutProps {
  sidebarCollapsed?: boolean,
  onCollapseChange?: (sidebarCollapsed: boolean) => void,
}

const AdminLayout: React.FunctionComponent<AdminLayoutProps> = (props) => {


  const hasPermission = true
  const location = useLocation()
  const [username, setUsername] = useState()
  const [avatar, setAvatar] = useState()
  const fetchData = () => {
    getUserInfo({id: store.getState().user.id}).then((res) => {
      const {data} = res.data
      setUsername(data.username)
      setAvatar(data.avatar)
    })
  }
  useEffect(() => {
    fetchData()
  },[])
  // isMobile
  return (
    <Fragment>
      {/*<Loading/>*/}
      <Layout>
        <Sider/>
        <div
          className={styles.container}
          style={{paddingTop: 72}}
          id="primaryLayout"
        >
          <AdminHeader
            username={username}
            avatar={avatar}
          />
          <Content className={styles.content}>
            <BreadCrumb/>
            {hasPermission ? <Outlet/> : <Error/>}
          </Content>
          <CommonBackTop
            className={styles.backTop}
            target={(): any => document.querySelector('#primaryLayout')}
          />
          <Footer
            className={styles.footer}
            copyright={'Lan Online Judge ©2022 Lancel'}/>
        </div>
      </Layout>
    </Fragment>

  )
}

export default (AdminLayout);
