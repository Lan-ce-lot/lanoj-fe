/**
 * @FileName: ContestDetail
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/10 23:38
 */
import React, {useEffect, useState} from "react";
import Page from "../../../../components/Page/Page";
import styles from "../../../admin/dashboard/index.module.scss";
import {Badge, Card, Col, List, Progress, Row, Slider, Space, Statistic, Table, Tabs, Tag, Tooltip} from "antd";
import {
  CalendarOutlined, CheckCircleTwoTone,
  ClockCircleOutlined,
  EditOutlined,
  LikeOutlined,
  MessageOutlined,
  StarOutlined
} from "@ant-design/icons";
import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import ContestProblem from "./components/ContestProblem";
import ContestStatus from "./components/ContestStatus";
import ContestRank from "./components/ContestRank";
import ScoreBoardTable from "./components/ScoreBoardTable";
import {getSubmissionList} from "../../../../api/common/submission";
import {getContestDetail, IContest, InitContest} from "../../../../api/admin/contest";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../../config/config";
import {ContestStatusEnum} from "../../../../common/enumerations";
import {ContestStatusToCN, ContestStatusToColorMap} from "../../../../common/map";
import Title from "antd/lib/typography/Title";

const {Countdown} = Statistic;
const {TabPane} = Tabs;

//import styles from './ContestDetail.module.scss'

export const SUBMISSION_REQUEST_TASK_TIME: number = 1000;

interface IProps {

}

interface IState {

}

const ContestDetail: React.FC<IProps> = ({}) => {
  const {contestId} = useParams()
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


  // ??????????????????
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
        // ????????????id?????????useState?????????
        // ??????????????????????????????clearInterval?????????id???undefined?????????
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
                  ????????????: {contest.startTime}
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
                  ????????????: {contest.endTime}
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
                    // title="????????????"
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
              <TabPane tab={<span><EditOutlined/>??????</span>} key="problem">
                <Outlet/>
              </TabPane>
              <TabPane tab={<span><EditOutlined/>??????</span>} key="status">
                <Outlet/>

              </TabPane>
              <TabPane tab={<span><EditOutlined/>??????</span>} key="rank">

                <Outlet/>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </Page>
  </>)
}
export default ContestDetail;
