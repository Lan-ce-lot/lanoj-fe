/**
 * @FileName: AdminMenu
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/2/26 21:48
 */
import React, {useContext, useEffect, useState} from "react";
import {Menu} from 'antd'
import {Link, Location, useLocation} from "react-router-dom";
import {arrayToTree, treeToArray, queryAncestors} from '../../../utils'
import iconMap from '../../../utils/iconMap'
import styles from './AdminMenu.module.scss'
import {pathToRegexp} from 'path-to-regexp'
import {MenuTheme} from "antd/lib/menu/MenuContext";
import {adminMenuList} from "../../../router/adminMenuList";
import PerfectScrollbar from "react-perfect-scrollbar";
import store from "../../../store";
import dashboard from "../../../pages/admin/dashboard";

const {SubMenu} = Menu

interface AdminMenuProps {
  sidebarCollapsed?: boolean,
  theme?: MenuTheme,
  menus?: any;
  role?:string;
  location?: Location,
  // isMobile,
  onCollapseChange?: () => void,
}


const AdminMenu: React.FC<AdminMenuProps> = ({theme,role,}) => {
  const location = useLocation()
  // Generating tree-structured data for menu content.
  // const menuTree = arrayToTree(menus, 'id', 'menuParentId')
  // const menuTree = adminMenuList
  // conest
  const menuArray = treeToArray(adminMenuList, store.getState().user.role)
  const menus = menuArray
  const [menuTree, setMenuTree] = useState<any>(adminMenuList.filter((it) => it.roles?.includes(role!)));
  // const menuTree = adminMenuList.filter((it) => it.roles?.includes(role!))
  console.log(menuTree)
  // const menuTree = adminMenuList
  // Find a menu that matches the pathname.
  const currentMenu = menus.find(
    (_: any) => _.path && pathToRegexp(_.path).exec(location!.pathname)
  )

  // Find the key that should be selected according to the current menu.
  const selectedKeys = currentMenu
    ? queryAncestors(menuArray, currentMenu, 'menuParentId').map((_: any) => _.path)
    : []

  useEffect(() => {
    setMenuTree(adminMenuList.filter((it) => it.roles?.includes(role!)))
  }, [role])
  const generateMenus = (data: any) => {
    return data.map((item: any) => {
      if (item.children) {
        return (
          <SubMenu
            key={item.path}
            title={
              <>
                {item.icon && iconMap[item.icon]}
                <span>{item.name}</span>
              </>
            }
          >
            {generateMenus(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.path}>
          <Link to={item.path || '#'}>
            {item.icon && iconMap[item.icon]}
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      )
    })
  }

  return (
        <Menu
          style={{fontSize: '13px'}}
          mode="inline"
          theme={theme!}
          // onOpenChange={onOpenChange}
          selectedKeys={selectedKeys}
          //{...menuProps}
        >
          {generateMenus(menuTree)}
        </Menu>
  )
}
export default AdminMenu;

