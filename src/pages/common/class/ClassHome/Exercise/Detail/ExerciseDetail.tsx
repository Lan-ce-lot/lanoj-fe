/**
 * @FileName: ExerciseDetail
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/9 20:53
 */
import React, {useEffect, useState} from "react";
import {Badge, Card, Col, Progress, Row, Space, Statistic, Tabs, Tag, Tooltip} from "antd";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {ContestStatusEnum} from "../../../../../../common/enumerations";
import {getContestDetail, IContest, InitContest} from "../../../../../../api/admin/contest";
import Page from "../../../../../../components/Page/Page";
import styles from "../../../../../admin/dashboard/index.module.scss";
import Title from "antd/lib/typography/Title";
import {CheckCircleTwoTone, ClockCircleOutlined, EditOutlined} from "@ant-design/icons";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../../../../config/config";
import {ContestStatusToCN, ContestStatusToColorMap} from "../../../../../../common/map";
import {SUBMISSION_REQUEST_TASK_TIME} from "../../../../contest/contestDetail/ContestDetail";
const {TabPane} = Tabs
const {Countdown} = Statistic;
//import styles from './ExerciseDetail.module.scss'

interface IProps {

}

interface IState {

}

const ExerciseDetail: React.FC<IProps> = ({}) => {
  const contestId = useParams().exerciseId
  var navigate = useNavigate();
  const [deadline, setDeadline] = useState(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 3); // Moment is also OK
  const [status, setStatus] = useState<String>(ContestStatusEnum.NOT_STARTED)
  const [contestTime, setContestTime] = useState(0);
  const [contest, setContest] = useState<IContest>(InitContest);
  const fetchData = () => {
    getContestDetail(Number(contestId)).then((res) => {
      const {data} = res.data
      setContest(data)
      const endTime = new Date(data.endTime)
      setDeadline(endTime.getTime())
    })
  }


  // 管理轮询任务
  useEffect(() => {
    // console.log(new Date(contest.startTime!))
    // console.log(new Date(contest.endTime!))
    // console.log(new Date())
    if (new Date(contest.startTime!).getTime() > new Date().getTime()) {
      setStatus(ContestStatusEnum.NOT_STARTED)
      console.log(ContestStatusEnum.NOT_STARTED)
    } else if (new Date(contest.startTime!).getTime() < new Date().getTime() && new Date(contest.endTime!).getTime() > new Date().getTime()) {
      setStatus(ContestStatusEnum.RUNNING)
      console.log(ContestStatusEnum.RUNNING)
      const id = setInterval(() => {
        setContestTime(prevCount => prevCount + 1000
        )

        if (new Date().getTime() >= new Date(contest.endTime!).getTime()) {
          setStatus(ContestStatusEnum.CLOSED)
        }
        // if (contestTime)
        // console.log(contestTime)
      }, SUBMISSION_REQUEST_TASK_TIME);
      return () => {
        // 轮询任务id不能由useState管理，
        // 否则组件销毁再来执行clearInterval会造成id为undefined的情况
        clearInterval(id);
      }
    } else if (new Date(contest.endTime!).getTime() <= new Date().getTime()) {
      setStatus(ContestStatusEnum.CLOSED)
    }
  }, [status, contest]);

  useEffect(() => {
    fetchData()
  }, [])
  return (<>
    <Page className={styles.dashboard}>
      <Row gutter={24}>
        <Col lg={24} md={24} sm={24}>
          <Card title={
            <Title level={4} style={{textAlign: 'center'}}>{
              contest!.name
            }
            </Title>
          }>
            <Row gutter={[24, 4]}>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Row gutter={24}>
                  <Col lg={12} md={12} sm={12} xs={24}>
                <span>
                <Space>
                  <ClockCircleOutlined/>
                  开始时间: {contest.startTime}
                </Space>
                </span>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={24}>
                                <span
                                  style={{display: "flex", justifyContent: "right"}}
                                  // style={{float: "right"}}
                                >
                  <Space>
                    <ClockCircleOutlined/>
                  结束时间: {contest.endTime}
                  </Space>
                </span>
                  </Col>
                </Row>
              </Col>
              <Col lg={24} md={24} sm={24} xs={24}>

                <Tooltip title={
                  moment(new Date().getTime()).format(DEFAULT_DATE_TIME_FORMAT)
                }>
                  <Progress
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    // showInfo={false}
                    // steps={100}
                    status={status === ContestStatusEnum.RUNNING ? "active" :
                      status === ContestStatusEnum.NOT_STARTED ? "normal" : "success"
                    }
                    // status="success"
                    percent={(new Date().getTime() - new Date(contest.startTime!).getTime()) /
                      (new Date(contest.endTime!).getTime() - new Date(contest.startTime!).getTime()) * 100
                    }
                    format={(percent) => {
                      const res = parseInt(percent + '')
                      if (res >= 100) {
                        return <><CheckCircleTwoTone twoToneColor="#52c41a"/></>
                      } else {
                        // return
                      }
                    }}
                  />
                </Tooltip>
              </Col>

              <Col style={{display: "flex", justifyContent: "center"}} lg={24} md={24} sm={24} xs={24}>
                {
                  status === ContestStatusEnum.RUNNING &&
                  <Countdown
                    // title="剩余时间"
                    value={deadline} format="HH:mm:ss">
                  </Countdown>
                }
              </Col>
              <Col style={{display: "flex", justifyContent: "center"}} lg={24} md={24} sm={24} xs={24}>
                <Tag color={ContestStatusToColorMap[status as ContestStatusEnum]}>
                  <Badge status={ContestStatusToColorMap[status as ContestStatusEnum]}
                         text={ContestStatusToCN[status as ContestStatusEnum]}/>
                </Tag>
              </Col>
            </Row>


          </Card>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Card size={"small"}>
            <Tabs
              onChange={(activeKey) => {
                navigate(activeKey)
              }}
              type={"card"}
            >
              <TabPane tab={<span><EditOutlined/>题目</span>} key="problem">
                <Outlet/>
              </TabPane>
              <TabPane tab={<span><EditOutlined/>状态</span>} key="status">
                <Outlet/>

              </TabPane>
              <TabPane tab={<span><EditOutlined/>排名</span>} key="rank">

                <Outlet/>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </Page>
  </>)
}
export default ExerciseDetail;
