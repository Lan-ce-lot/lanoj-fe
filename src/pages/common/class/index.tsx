/**
 * @FileName: ClassList
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/6 14:48
 */
import React from "react";
import {Button, Card, Empty, Menu} from "antd";
import {EMPTY_IMAGE} from "../../../config/config";
import {Link, Outlet} from "react-router-dom";

//import styles from './ClassList.module.scss'

interface IProps {

}

interface IState {

}

const Class: React.FC<IProps> = ({}) => {
  return (
    // <Card>
    <>
      <div>
        <Menu mode="horizontal">
          <Menu.Item key="mail">
            <Link to={'/class'}>
              我的班级
            </Link>
          </Menu.Item>
          <Menu.Item key="app">
            <Link to={'/class/list'}>
              班级列表
            </Link>
          </Menu.Item>
        </Menu>
      </div>
      <>
        <Outlet/>
      </>
    </>
    // </Card>
  )
}
export default Class;
