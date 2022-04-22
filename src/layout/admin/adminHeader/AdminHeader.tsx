/**
 * @FileName: AdminHeader
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/2/26 20:38
 */
import React from "react";
import {
  Menu, Layout, Avatar, Popover, Badge, List
} from 'antd'
import {
  BellOutlined,
  RightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import classnames from 'classnames'
import styles from './AdminHeader.module.scss'
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {toggleSiderBar} from '../../../store/actions'
import {Link} from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb";
const { SubMenu } = Menu

interface AdminHeaderProps {
  avatar?:string,
  username?:string,
  sidebarCollapsed?:boolean,
  onCollapseChange?:(sidebarCollapsed:boolean)=>void,
}




const AdminHeader: React.FunctionComponent<AdminHeaderProps> = (props) => {
  const {
    avatar,
    username,
    sidebarCollapsed,
    onCollapseChange,
  } = props
  // console.log(sidebarCollapsed)
  // const handleClickMenu = e => {
  //   e.key === 'SignOut'
  // }
  const rightContent = [
    <Menu key="user" mode="horizontal">
      <SubMenu
        key="head"
        title={
          <>
              <span style={{ color: '#999', marginRight: 4 }}>
                <span>欢迎</span>
              </span>
            <span>{username}</span>
            <Avatar style={{ marginLeft: 8 }} src={avatar} />
          </>
        }
      >
        <Menu.Item key="SignOut">
          <span><Link to={'/'}>退出</Link></span>
        </Menu.Item>
      </SubMenu>
    </Menu>,
  ]

  rightContent.unshift(
    <Popover
      placement="bottomRight"
      trigger="click"
      key="notifications"
      overlayClassName={styles.notificationPopover}
      getPopupContainer={() => document.querySelector('#primaryLayout')!}
      content={
        <div className={styles.notification}>
          <List
            itemLayout="horizontal"
            // dataSource={notifications}
            locale={{
              emptyText: 'You have viewed all notifications.',
            }}
            renderItem={(item:any) => (
              <List.Item className={styles.notificationItem}>
                <List.Item.Meta
                  title={
                    item.title
                  }
                />
                <RightOutlined style={{ fontSize: 10, color: '#ccc' }} />
              </List.Item>
            )}
          />
        </div>
      }
    >
      <Badge
        count={10}
        dot
        offset={[-10, 10]}
        className={styles.iconButton}
      >
        <BellOutlined className={styles.iconFont} />
      </Badge>
    </Popover>
  )


  return (
      <Layout.Header
        className={classnames(styles.header, {
          [styles.fixed]: true,
          [styles.collapsed]: sidebarCollapsed,
        })}
        id="layoutHeader"
      >
        <div
          className={styles.button}
          onClick={onCollapseChange!.bind(this,!sidebarCollapsed)}
        >
          {sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>

          {/*<BreadCrumb/>*/}
        <div className={styles.rightContainer}>{rightContent}</div>
      </Layout.Header>
    )
}

const mapStateToProps = (state:any) => {
  return {
    ...state.app,
  };
};
const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    onCollapseChange (sidebarCollapsed:boolean) {
      dispatch(toggleSiderBar(sidebarCollapsed))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);
