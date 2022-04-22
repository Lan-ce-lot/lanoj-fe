import React from "react";
import { Breadcrumb } from "antd";
import {adminMenuList} from "../../router/adminMenuList";
import styles from "./index.module.scss";
import {Link, useLocation, withRouter} from "react-router-dom";
import iconMap from "../../utils/iconMap";
const menuList = adminMenuList
// import admin from "@/router/admin";
/**
 * 根据当前浏览器地址栏的路由地址，在menuConfig中查找路由跳转的路径
 * 如路由地址为/charts/keyboard,则查找到的路径为[{title: "图表",...},{title: "键盘图表",...}]
 */
const getPath = (menuList, pathname) => {
  let tempPath = [];
  try {
    function getNodePath(node) {
      tempPath.push(node);
      //找到符合条件的节点，通过throw终止掉递归
      if (node.path === pathname) {
        throw new Error("GOT IT!");
      }
      if (node.children && node.children.length > 0) {
        for (var i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i]);
        }
        //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        tempPath.pop();
      } else {
        //找到叶子节点时，删除路径当中的该叶子节点
        tempPath.pop();
      }
    }
    for (let i = 0; i < menuList.length; i++) {
      getNodePath(menuList[i]);
    }
  } catch (e) {
    return tempPath;
  }
};

const BreadCrumb = (props) => {
  const location = useLocation();
  const { pathname } = location;
  let path = getPath(menuList, pathname);
  const first = path && path[0];
  if (first && first.title.trim() !== "首页") {
    path = [{ title: "首页", path: "/admin/home", icon: "home" }].concat(path);
  }
  return (
    <div className={styles.BreadcrumbContainer}>
      <Breadcrumb>
        {path &&
          path.map((item) =>
            item.title === "首页" ? (
              <Breadcrumb.Item key={item.path}>
                {item.icon && (
                  <span style={{ marginRight: 4 }}>{iconMap[item.icon]}</span>
                )}
                <Link to={item.path || '#'}>{item.title}</Link>
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={item.path}>
                {item.icon && (
                  <span style={{ marginRight: 4 }}>{iconMap[item.icon]}</span>
                )}
                {item.title}
              </Breadcrumb.Item>
            )
          )}
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;
