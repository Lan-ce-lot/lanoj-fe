/**
 * @FileName: CommonMenu
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/25 1:04
 */
import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import store from "../../../../store";
import {pathToRegexp} from "path-to-regexp";
import {queryAncestors, treeToArray} from "../../../../utils";
import {commonMenuList} from "../../../../router/commonMenuList";
import iconMap from "../../../../utils/iconMap";
import {Menu} from "antd";

//import styles from './CommonMenu.module.scss'

interface IProps {

}

interface IState {

}

const CommonMenu: React.FC<IProps> = ({}) => {
  const location = useLocation()
  const menuArray = treeToArray(commonMenuList, store.getState().user.role)
  const menus = menuArray
  const [menuTree, setMenuTree] = useState<any>(commonMenuList.filter((it) => it.roles?.includes('*') || it.roles?.includes(store.getState().user.role)));
  // const menuTree = adminMenuList.filter((it) => it.roles?.includes(role!))
  // console.log(menuTree)
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
    setMenuTree(commonMenuList.filter(
        (it) => it.roles?.includes('*') || it.roles?.includes(store.getState().user.role!)
      )
    )
  }, [store.getState().user.role])

  const generateMenus = (data: any) => {
    return data.map((item: any) => {
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
  return (<>
    <Menu
      style={{fontSize: '13px'}}
      mode="horizontal"
      // onOpenChange={onOpenChange}
      selectedKeys={selectedKeys}
      //{...menuProps}
    >
      {generateMenus(menuTree)}
    </Menu>
  </>)
}
export default CommonMenu;
