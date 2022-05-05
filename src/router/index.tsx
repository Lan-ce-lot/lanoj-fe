import React, {useEffect, useState} from "react";
import {Navigate, RouteObject, Router, useRoutes} from "react-router-dom";
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
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {toggleSiderBar} from "../store/actions";
import store from "../store";
import ContestProblem from "../pages/common/contest/contestDetail/ContestProblemList/Problem/ContestProblem";

/**
 * 动态渲染路由
 * 路由应分为4类
 * Root/Admin
 * Teacher
 * Common
 * Guest
 */

const router: any[] = [
  commonRouter,
  adminRouter,
  {
    path: "/test",
    element: <Test/>,
  },
  {
    path: "/problem/:problemId",
    element: <ProblemLayout/>,
    children: [
      {
        index: true,
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
    path: "/problem/:problemId",
    element: <ProblemLayout/>,
    children: [
      {
        index: true,
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
    path: '/contest/:contestId/problem/:problemId',
    element: <ProblemLayout/>,
    children: [
      {
        index: true,
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
    path: '/class/:classId/exercise/:exerciseId/problem/:problemId',
    element: <ProblemLayout/>,
    children: [
      {
        index: true,
        element: <ProblemContent/>,
      },
      {
        path: "submissions",
        element: <ProblemSubmissions/>,
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

interface IProps {
  id?: string;
  role?: string;
  loading?: boolean;
}

export const MyRouter: React.FC<IProps> = (props) => {
  const {role, id} = props
  const [allowRouter, setAllowRouter] = useState<any[]>(router)
  useEffect(() => {
    setAllowRouter([allowRouter[0], allowRouter[allowRouter.length - 3], allowRouter[allowRouter.length - 2], allowRouter[allowRouter.length - 1]])
    if (store.getState().user.role === 'Root' || 'Teacher' || 'Admin') {
      setAllowRouter(router)
    }

    // alert(store.getState().user.role)
    // console.log(allowRouter)
    // tree -> array

    // filter by role

    // array -> tree

  }, [store.getState().user.role])

  return <>
    {useRoutes(allowRouter)}
  </>
  // return useRoutes(router)
}


const mapStateToProps = (state: any) => {
  // alert(1)
  return {
    ...state.app,
    ...state.user
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onCollapseChange(sidebarCollapsed: boolean) {
      dispatch(toggleSiderBar(sidebarCollapsed))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps
  , undefined, {pure: false}
)(MyRouter);
