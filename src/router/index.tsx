import React from "react";
import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import Error from "../pages/admin/404/Error";
import {commonRouter} from "./common";
import Login from '../pages/common/Login'
import Table from '../pages/admin/user/User';
import Register from "../pages/common/Register";
import adminRouter from "./admin";
import Test from "../pages/common/test";
import ProblemLayout from "../layout/problem/ProblemLayout";
import ProblemDetail from "../pages/common/problem/problemDetail";
import ProblemSubmissions from "../pages/common/problem/problemDetail/components/ProblemSubmissions";
import ProblemContent from "../pages/common/problem/problemDetail/components/ProblemContent";


const router: any[] = [
  commonRouter,
  adminRouter,
  // {
  //   path: "/test",
  //   element: <Table/>
  // },
  {
    path: "/test",
    element: <ProblemLayout/>,
    children: [
      {
        index: true,
        element: <Test/>
      },
      {
        path: ":id",
        element: <Test/>
      },
    ]
  },
  {
    path: "/problem/:id",
    element: <ProblemLayout/>,
    children: [
      {
        index:true,
        element: <ProblemContent/>
        // index: true,
        // element: <Navigate to={"/problems"}/>,
        // element: <ProblemDetail/>
      },
      {
        path: "submissions",
        element: <ProblemSubmissions/>
      },
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: '*',
    element: <Error/>
  }
]

export interface ConcreteRouterObject {
  title: string,
  index?: boolean;
  path?: string;
  element?: React.ReactNode;
  children?: ConcreteRouterObject[];
  icon?: string;
  name?: string;
  roles?: string[];
  hidden?: true | false;

  [propName: string]: any;
}

export const change = (routers: ConcreteRouterObject[]): RouteObject[] => {
  let newRouters: RouteObject[] = []
  routers.map(item => {
    let children: RouteObject[]
    let newRouter: RouteObject = {}
    // if (item.children) {
    //   children = change(item.children)
    //   newRouter.children = children
    // }
    newRouter = {...newRouter, ...item}
    newRouters.push(
      newRouter
    )
  })
  return newRouters
}
export const Router: React.FC = () => useRoutes(change(router))
export const MyRouter: React.FC<any> = () => {

  return (
    <Router>

    </Router>
  )
}
export default router;
