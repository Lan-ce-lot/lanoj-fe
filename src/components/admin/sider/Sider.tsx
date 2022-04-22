/**
 * @FileName: Sider
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/2/26 21:47
 */
import React, {createContext, useState} from "react";
import {
  Switch, Layout,
  ConfigProvider
} from 'antd'
import styles from './Sider.module.scss'
import ScrollBar from '../ScrollBar'
import {BulbOutlined} from '@ant-design/icons'
import SiderMenu from '../adminMenu/AdminMenu'
import {Dispatch} from "redux";
import {toggleSiderBar} from "../../../store/actions";
import {connect} from "react-redux";
import {MenuTheme} from "antd/lib/menu/MenuContext";
import {adminMenuList} from "../../../router/adminMenuList";

interface SiderProps {
  menus?: any,
  sidebarCollapsed?: boolean,
  theme?: string,
  onThemeChange?: () => void,
  onCollapseChange?: any,
  role?:string;
}

const Sider: React.FunctionComponent<SiderProps> = ({sidebarCollapsed, onCollapseChange, role}) => {
  // const theme:string = 'light'
  const [theme, setTheme] = useState<MenuTheme>('light');
  return (
    <Layout.Sider
      width={256}
      theme={theme}
      breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={sidebarCollapsed}
      onBreakpoint={onCollapseChange}
      className={styles.sider}
    >
      <div className={styles.brand}>
        <div className={styles.logo}>
          <img alt="logo" src={'/logo192.png'}/>
          {!sidebarCollapsed && <h1>{'LANOJ Admin'}</h1>}
        </div>
      </div>

      <div className={styles.menuContainer}>
        <div className={styles.menuBody}>
          <ScrollBar
            options={{
              // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
              suppressScrollX: true,
              suppressScrollY: false
            }}
          >
            <SiderMenu
              menus={adminMenuList}
              theme={theme}
              role={role}
              sidebarCollapsed={sidebarCollapsed}
              // onCollapseChange={onCollapseChange}
            />
          </ScrollBar>
        </div>

      </div>
      {!sidebarCollapsed && (
        <div className={styles.switchTheme}>
            <span>
              <BulbOutlined/>
              切换主题
            </span>
          <Switch
            onChange={
              () => setTheme(theme === 'dark' ? 'light' : 'dark')
            }
            defaultChecked={theme === 'dark'}
            checkedChildren={`暗`}
            unCheckedChildren={`明`}
          />
        </div>
      )}
    </Layout.Sider>

  )
}

const mapStateToProps = (state: any) => {
  return {
    ...state.app,
    ...state.user,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onCollapseChange(sidebarCollapsed: boolean) {
      dispatch(toggleSiderBar(sidebarCollapsed))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sider);
