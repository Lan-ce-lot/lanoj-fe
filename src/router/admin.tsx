import React from "react";
import AdminLayout from "../layout/admin/AdminLayout";
import Dashboard from "../pages/admin/dashboard";

import ContestList from "../pages/admin/contest/contestList/";
import User from "../pages/admin/user/User";
import Error from "../pages/admin/404/Error";
import {RouteObject} from "react-router";
import {Navigate} from "react-router-dom";
import Login from "../pages/common/Login";
import Problem from "../pages/admin/problem/ProblemList";
import ProblemAdd from "../pages/admin/problem/ProblemAdd";
import Tag from "../pages/admin/problem/ProblemTag";
import AddContest from "../pages/admin/contest/AddContest";
import Judger from "../pages/admin/judger";
import UserDetail from "../pages/admin/user/UserDetail";
import ProblemEdit from "../pages/admin/problem/ProblemEdit";
import EditContest from "../pages/admin/contest/EditContest";
import JudgerDetail from "../pages/admin/judger/detail/JudgerDetail";
import Article from "../pages/admin/article";
import AddClass from "../pages/admin/class/AddClass/AddClass";
import ClassList from "../pages/admin/class/ClassList/ClassList";
import ClassDetail from "../pages/admin/class/ClassDetail";
import ExerciseDetail from "../pages/admin/class/ClassDetail/components/ExerciseDetail";
import Notice from "../pages/admin/notice";

const adminMenuRouterList: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={"/admin/home"}/>
  },
  {
    // index: true,
    path: "/admin/home",
    element: <Dashboard/>,
  },
  {
    path: "/admin/login",
    element: <Login/>
  },
  {
    path: "/admin/problem",
    // element: <Problem/>,
    children: [
      {
        path: "/admin/problem/list",
        element: <Problem/>
      },
      {
        path: "/admin/problem/create",
        element: <ProblemAdd/>
      },
      {
        path: "/admin/problem/edit/:id",
        element: <ProblemEdit/>
      },
      {
        path: "/admin/problem/tag",
        element: <Tag/>
      },
    ]
  },
  {
    path: "/admin/contest",
    children: [
      {
        path: "/admin/contest/list",
        element: <ContestList/>,
      },
      {
        path: "/admin/contest/create",
        element: <AddContest/>,
      },
      {
        path: "/admin/contest/edit/:id",
        element: <EditContest/>,
      }
    ]
  },
  {
    path: "/admin/article",
    children: [
      {
        index: true,
        element: <Article/>,
      },
      {
        path: "/admin/article/edit/:articleId",
        element: <EditContest/>,
      }
    ]
    // element: <Problem/>
  },
  {
    path: "/admin/user",
    children: [
      {
        index: true,
        element: <User/>
      },

      {
        path: ":id",
        element: <UserDetail/>
      },
      {}
    ]
  },
  {
    path: "/admin/judger",
    // element: <Judger/>,
    children: [
      {
        index: true,
        element: <Judger/>
      },
      {
        path: ":id",
        element: <JudgerDetail/>
      },
    ]
  },
  {
    path: "/admin/class",
    children: [
      {
        path: "/admin/class/list",
        element: <ClassList/>
      },
      {
        path: "/admin/class/add",
        element: <AddClass/>
      },
      {
        path: "/admin/class/:classId",
        element: <ClassDetail/>,
        // children: [
        //   {
        //     path: "/admin/class/:classId/member",
        //     element: <Judger/>
        //   },
        //   {
        //     path: "/admin/class/:classId/exercise",
        //     element: <ClassDetail/>
        //   },
        //
        //   {
        //     // 分析
        //     path: "/admin/class/:classId/analysis",
        //     element: <Judger/>
        //   },
        // ],
      },
      {
        path: "/admin/class/:classId/exercise/:exerciseId",
        element: <ExerciseDetail/>
      },
    ]
  },
  {
    path:"/admin/notice",
    element:<Notice/>
  },
  {
    path: "/admin/judger",
    element: <Judger/>
  },
  // {
  //   path: "/admin/test",
  //   element: <Table/>
  // },
  {
    path: '*',
    element: <Error/>
  }
]


const adminRouter: RouteObject = {
  path: "/admin",
  element: <AdminLayout/>,
  children: adminMenuRouterList
}

export default adminRouter
