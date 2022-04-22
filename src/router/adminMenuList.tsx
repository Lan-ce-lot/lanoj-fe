import React from "react";

/**
 * @FileName: adminMenuList
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/2/28 15:26
 */
export interface MenuObject {
  // id:number;
  // route:string;
  title: string,
  index?: boolean;
  path?: string;
  element?: React.ReactNode;
  children?: MenuObject[];
  icon?: string;
  name?: string;
  roles?: string[];
  hidden?: true | false;

  [propName: string]: any;
}

/**
 * com -> router
 * router -> com
 */
export const adminMenuList: MenuObject[] = [
  {
    title: "首页",
    icon: "home",
    path: "/admin/home",
    name: "首页",
    roles: ["Root", "Admin", "Teacher"],
  },
  {
    icon: "appstore",
    path: "/admin/problemDetail",
    name: "题目管理",
    title: "题目管理",
    roles: ["Root", "Admin", "Teacher"],
    children: [
      {
        icon: "list",
        name: "题目列表",
        title: "题目列表",
        path: "/admin/problem/list",
        roles: ["Root", "Admin", "Teacher"],
      },
      {
        path: "/admin/problem/create",
        icon: "add",
        name: "增加题目",
        title: "增加题目",
        roles: ["Root", "Admin", "Teacher"],
      },
      {
        path: "/admin/problem/tag",
        icon: "tags",
        name: "标签管理",
        title: "标签管理",
        roles: ["Root", "Admin", "Teacher"],
      },
    ]
  },
  {
    icon: "trophy",
    name: "比赛管理",
    title: "比赛管理",
    path: "/admin/contest",
    roles: ["Root", "Admin", "Teacher"],
    children: [
      {
        path: "/admin/contest/list",
        icon: "list",
        name: "比赛列表",
        title: "比赛列表",
        roles: ["Root", "Admin", "Teacher"],
      },
      {
        path: "/admin/contest/create",
        icon: "add",
        name: "创建比赛",
        title: "创建比赛",
        roles: ["Root", "Admin", "Teacher"],
      },
    ]
  },
  {
    icon: "user",
    path: "/admin/user",
    name: "用户管理",
    title: "用户管理",
    roles: ["Root", "Admin"],
  },
  {
    icon: "read",
    path: "/admin/article",
    name: "题解管理",
    title: "题解管理",
    roles: ["Root", "Admin", "Teacher"],
  },
  {
    icon: "team",
    path: "/admin/class",
    name: "班级管理",
    title: "班级管理",
    roles: ["Root", "Admin", "Teacher"],
    children: [
      {
        path: "/admin/class/list",
        icon: "list",
        name: "班级列表",
        title: "班级列表",
        roles: ["Root", "Admin", "Teacher"],
      },
      {
        path: "/admin/class/add",
        icon: "add",
        name: "创建班级",
        title: "创建班级",
        roles: ["Root", "Admin", "Teacher"],
      },
    ]
  },
  {
    icon: "notice",
    path: "/admin/notice",
    name: "公告管理",
    title: "公告管理",
    roles: ["Root", "Admin"],
  },
  {
    icon: "setting",
    path: "/admin/judger",
    name: "判题机",
    title: "判题机",
    roles: ["Root", "Admin"],
  }
]
