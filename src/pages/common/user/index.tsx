/**
 *
 *
 */

import React, {useContext, useEffect, useState} from 'react'
import Page from "../../../components/Page/Page";
import styles from "./index.module.scss";
import {Row, Col, Card, Avatar, Tag, Tabs, Collapse, Form, Input, Button, InputNumber, Divider, message} from "antd";
import {
  BarChartOutlined,
  CalendarOutlined,
  CheckOutlined, EditOutlined, SettingOutlined,
  StarOutlined,
  UnorderedListOutlined,
  UserOutlined
} from "@ant-design/icons";
import SolvedProblems from "./components/SolvedProblems";
import UserInfoCard from "./components/UserInfoCard";
import {Completed, Sales} from "../../admin/dashboard/components";
import SolveProblemChart from "./components/SolveProblemChart";
import UserPieChart from "./components/UserPieChart";
import sales from "../../admin/dashboard/components/Sales";
import {initUser, IUser} from "../../../api/admin/user";
import {getOtherUserInfo, getUserInfo, getUserSubmissionResult} from "../../../api/common/userInfo";
import {useParams} from "react-router-dom";
import store from "../../../store";
import {Dispatch} from "redux";
import {changeLoading, toggleSiderBar} from "../../../store/actions";
import {connect} from "react-redux";
import loading from "../../../components/Loading";
import {bool} from "prop-types";
import TryProblems from "./components/TryProblems";
import UserDualAxes from "./charts/UserDualAxes";
import Test from "./charts/Test";

interface UserProps {
  loading?: boolean;
  onChangeLoading?: any;
}

const completed = [
  {
    "name": '3.12',
    "SumSolve": 1000,
    'RecentSolve': 100
  },
  {
    "name": '3.13',
    "SumSolve": 2191,
    'RecentSolve': 122
  },
  {
    "name": '3.14',
    "SumSolve": 2791,
    'RecentSolve': 122
  },
  {
    "name": '3.15',
    "SumSolve": 2691,
    'RecentSolve': 1222
  },
  {
    "name": '3.16',
    "SumSolve": 3871,
    'RecentSolve': 1000
  },
  {
    "name": '3.17',
    "SumSolve": 5481,
    'RecentSolve': 1000
  },
  {
    "name": '3.18',
    "SumSolve": 7931,
    'RecentSolve': 7800
  }
]
const User: React.FunctionComponent<UserProps> = ({loading, onChangeLoading}) => {
  // local
  const {id} = useParams()
  const [user, setUser] = useState<IUser>(initUser)
  const [userSubmissionResult, setUserSubmissionResult] = useState<any>()

  const fetchUserData = () => {
    onChangeLoading(true)
    getOtherUserInfo({id: Number(id)}).then(res => {
      const {data} = res.data
      setUser(data)
      onChangeLoading(false)
    })
  }
  const fetchUserSubmissionResultData = () => {
    onChangeLoading(true)
    getUserSubmissionResult({id: Number(id)}).then(res => {
      const {data} = res.data
      console.log(data)
      // console.log(Object.keys(data));
      // console.log(Object.values(data));
      const newData = Object.entries(data).map(it => {
        return {name: it[0], value: it[1]}
      })
      console.log(newData)
      setUserSubmissionResult(data)
    })
  }

  useEffect(() => {
    fetchUserData()
    fetchUserSubmissionResultData()
  }, [])

  return (
    <Page className={styles.userPage}>
      {
       userSubmissionResult && <Row gutter={24}>
          <Col lg={24} md={24} xs={24}>
            <Row gutter={24}>
              <Col lg={6} md={12} xs={24}>
                <Card>
                  <UserInfoCard
                    role = {user.role?.name}
                    total={userSubmissionResult.total}
                    ac={userSubmissionResult.AC}
                    username={user!.username} avatar={user!.avatar}
                    articleNumber={user!.articleNumber}
                  />
                </Card>
              </Col>
              <Col lg={18} md={12}>
                <Row gutter={24}>
                  <Col lg={24}
                       md={24}
                       sm={24}
                  >
                    <Card
                      title={<>
                        个人简介
                      </>}
                    >
                      <Card.Meta description={user?.introduction}/>
                    </Card>
                  </Col>
                  <Col lg={24} md={24} sm={24}>
                    <Row gutter={24}>
                      <Col lg={12} md={24} sm={24}>
                        <Card
                          title={
                            <>
                              近期提交
                            </>
                          }
                        >
                          <UserDualAxes/>
                          {/*<SolveProblemChart data={completed}/>*/}
                        </Card>
                      </Col>
                      <Col lg={12} md={24} sm={24}>
                        <Card

                          title={
                            <>
                              判题统计
                            </>
                          }
                        >
                          {userSubmissionResult && <UserPieChart data={userSubmissionResult}/>}
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col lg={12} md={12} sm={24}>
                <Card
                  title={<>
                    已通过题目
                  </>}
                >
                  <SolvedProblems userId={Number(id)} />
                </Card>
              </Col>
              <Col lg={12} md={12} sm={24}>
                <Card
                  title={<>
                    尝试过题目
                  </>}
                >
                  <TryProblems userId={Number(id)}/>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      }
    </Page>
  )
}


const mapStateToProps = (state: any) => {
  return {
    ...state.app,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChangeLoading(loading: boolean) {
      dispatch(changeLoading(loading))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User)
