import React from "react";
import {RouteObject} from "react-router";
import Common from "../layout/common/CommonLayout";
import Home from "../pages/common/home/Home";
import ProblemList from "../pages/common/problem/problemList/ProblemList";
import ContestList from "../pages/common/contest/contestList/ContestList";
import Status from "../pages/common/status/Status";

import User from "../pages/common/user";
import {Navigate} from "react-router-dom";
import ProblemDetail from "../pages/common/problem/problemDetail";
import Setting from "../pages/common/setting/Setting";
import ContestDetail from "../pages/common/contest/contestDetail/ContestDetail";
import ProblemSubmissions from "../pages/common/problem/problemDetail/components/ProblemSubmissions";
import ContestProblem from "../pages/common/contest/contestDetail/ContestProblemList/Problem/ContestProblem";
import ContestProblemList from "../pages/common/contest/contestDetail/ContestProblemList";
import ContestStatus from "../pages/common/contest/contestDetail/components/ContestStatus";
import ContestRank from "../pages/common/contest/contestDetail/components/ContestRank";
import ClassJoin from "../pages/common/class/ClassJoin";
import Class from "../pages/common/class";
import ClassList from "../pages/common/class/ClassList";
import ClassHome from "../pages/common/class/ClassHome";
import Detail from "../pages/common/class/ClassHome/Detail/Detail";
import Article from "../pages/common/article";
import Member from "../pages/common/class/ClassHome/Member/Member";
import Exercise from "../pages/common/class/ClassHome/Exercise/Exercise";
import Statistics from "../pages/common/class/ClassHome/Statistics/Statistics";
import ArticleDetail from "../pages/common/article/Detail"
import Edit from "../pages/common/article/Edit";
import Mine from "../pages/common/article/Mine";
import Create from "../pages/common/article/Create";
import ExerciseDetail from "../pages/common/class/ClassHome/Exercise/Detail/ExerciseDetail";
import ExerciseStatus from "../pages/common/class/ClassHome/Exercise/Detail/components/ExerciseStatus";
import ExerciseRank from "../pages/common/class/ClassHome/Exercise/Detail/components/ExerciseRank";
import ExerciseProblemList from "../pages/common/class/ClassHome/Exercise/Detail/components/ExerciseProblemList";
import ExerciseProblem from "../pages/common/class/ClassHome/Exercise/Detail/components/Problem/ExerciseProblem";
import Test from "../pages/common/test";
import ProblemLayout from "../layout/problem/ProblemLayout";

// const commonRouterMenuList:RouteObject[] = {
//
// }

export const commonRouter: RouteObject = {
  path: "/",
  element: <Common/>,
  children: [
    {
      index: true,
      element: <Navigate to={"/home"}/>
    },
    {
      path: "/home",
      element: <Home/>
    },
    {
      path: "/problems",
      element: <ProblemList/>
      // children: [
      //   {
      //     index: true,
      //     element: <Navigate to={"/problem/list"}/>,
      //   },
      //   {
      //     path: "list",
      //     element: <ProblemList/>
      //   },
      //   // {
      //   //   path: "detail/:id",
      //   //   element: <ProblemDetail/>,
      //   // },
      //   // {
      //   //   path: "detail/:id/submission",
      //   //   element: <ProblemSubmissions/>
      //   // }
      // ]
    },

    {
      path: "/class",
      element: <Class/>,
      children: [
        {
          index: true,
          element: <ClassJoin/>
        },
        {
          path: "join",
          element: <ClassJoin/>
        },
        {
          path: "list",
          element: <ClassList/>
        },
        // {
        //   path: "detail/:id",
        // },
        {
          path: "statistics/:id",
          element: <Statistics/>
        }
      ]
      // element: <ProblemSetList/>
    },
    {
      path: "/class/:classId",
      children: [
        {
          index: true,
          element: <ClassHome/>,
        },
        {
          path: "exercise/:exerciseId/problem/:problemId",
          element: <ExerciseProblem/>
        },
        {
          path: "exercise/:exerciseId",
          element: <ExerciseDetail/>,
          children: [
            {
              index: true,
              // element: <ContestProblemList/>,
              element: <Navigate to={"problem"}/>
            },
            {
              path: 'problem',
              children: [
                {
                  index: true,
                  element: <ExerciseProblemList/>,
                },
              ]
            },
            {
              path: 'status',
              element: <ExerciseStatus/>
            },
            {
              path: 'rank',
              element: <ExerciseRank/>
            },
          ]
        },

        // ExerciseDetail.tsx
        {
          // 统计
          path: "statistics",
          element: <Statistics/>,
        },
      ],

    },

    {
      path: "article",
      element: <Article/>,
    },
    {
      path: "article/create",
      element: <Create/>,
    },
    {
      path: "article/edit/:articleId",
      element: <Edit/>,
    },
    {
      path: "article/mine",
      element: <Mine/>,
    },
    {
      path: "article/:articleId",
      element: <ArticleDetail/>,
    },
    {
      path: "/contest",
      children: [
        {
          index: true,
          element: <ContestList/>
          // element: <Navigate to={"/contest/list"}/>,
        },
        // {
        //   path: "list",
        //   element: <ContestList/>
        // },
        {
          path: ":contestId",
          element: <ContestDetail/>,
          children: [
            {
              index: true,
              // element: <ContestProblemList/>,
              element: <Navigate to={"problem"}/>
            },
            {
              path: 'problem',
              children: [
                {
                  index: true,
                  element: <ContestProblemList/>,
                },
              ]
            },
            {
              path: 'status',
              element: <ContestStatus/>
            },
            {
              path: 'rank',
              element: <ContestRank/>
            },
          ]
        },
        {
          path: ':contestId/problem/:problemId',
          element: <ContestProblem/>
        }
      ]
    },
    {
      path: "/status",
      element: <Status/>
    },

    {
      path: "/user",
      // element: <Index/>
      children: [
        {
          path: ":id",
          element: <User/>
        },
      ]
    },
    {
      path: "/setting",
      // element: <Index/>
      children: [
        {
          path: ":id",
          element: <Setting/>
        },
      ]
    },

  ]
}
