/**
 * @FileName: commonMenuList
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/23 2:10
 */
import React from "react";
import {MenuObject} from "./adminMenuList";

//import styles from './commonMenuList.module.scss'

interface IProps {

}

interface IState {

}


export const commonMenuList: MenuObject[] = [
  {
    title: "首页",
    icon: "home",
    path: "/home",
    name: "首页",
    roles: ["Root", "Admin", "Teacher", "Common"],
  },
  {
    title: "题库",
    icon: "home",
    path: "/problem",
    name: "题库",
    roles: ["Root", "Admin", "Teacher", "Common"],
  },
  {
    title: "班级",
    icon: "home",
    path: "/class",
    name: "班级",
    roles: ["Root", "Admin", "Teacher", "Common"],
  },
]
