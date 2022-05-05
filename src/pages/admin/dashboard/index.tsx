/**
 * @FileName: index
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/2/27 15:41
 */
import React, {useEffect, useState} from "react";
import Page from '../../../components/Page/Page'
import {Row, Col, Card, Descriptions} from 'antd'
import styles from './index.module.scss'
import {
  NumberCard,
  Sales,
  Completed,
} from './components'
import TagWordCloud from "../problem/ProblemTag/conponents/TagWordCloud";
import SubmissionPie from "./charts/SubmissionPie";
import {getHomeCount, IHomeCount} from "../../../api/admin/home";
import store from "../../../store";
import MixChart from "./charts/MixChart";

interface indexProps {

}

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}
const sales = [
  {
    "name": 2008,
    "Clothes": 424,
    "Food": 332,
    "Electronics": 402
  },
  {
    "name": 2009,
    "Clothes": 311,
    "Food": 226,
    "Electronics": 340
  },
  {
    "name": 2010,
    "Clothes": 457,
    "Food": 383,
    "Electronics": 413
  },
  {
    "name": 2011,
    "Clothes": 218,
    "Food": 297,
    "Electronics": 393
  },
  {
    "name": 2012,
    "Clothes": 453,
    "Food": 227,
    "Electronics": 403
  },
  {
    "name": 2013,
    "Clothes": 371,
    "Food": 373,
    "Electronics": 543
  },
  {
    "name": 2014,
    "Clothes": 240,
    "Food": 221,
    "Electronics": 388
  },
  {
    "name": 2015,
    "Clothes": 221,
    "Food": 389,
    "Electronics": 358
  }
]
const Dashboard: React.FunctionComponent<indexProps> = (props) => {
  const [count, setCount] = useState<IHomeCount>()
  const fetchData = () => {
    getHomeCount().then(res => {
      const {data} = res.data
      console.log(data)
      setCount(data)
    })
  }


  useEffect(() => {
    fetchData()
    console.log(count)
  }, [])
  const completed = [
    {
      "name": 2008,
      "Task complete": 778,
      "Cards Complete": 606
    },
    {
      "name": 2009,
      "Task complete": 570,
      "Cards Complete": 259
    },
    {
      "name": 2010,
      "Task complete": 834,
      "Cards Complete": 513
    },
    {
      "name": 2011,
      "Task complete": 740,
      "Cards Complete": 626
    },
    {
      "name": 2012,
      "Task complete": 390,
      "Cards Complete": 731
    },
    {
      "name": 2013,
      "Task complete": 576,
      "Cards Complete": 818
    },
    {
      "name": 2014,
      "Task complete": 853,
      "Cards Complete": 219
    },
    {
      "name": 2015,
      "Task complete": 857,
      "Cards Complete": 279
    },
    {
      "name": 2016,
      "Task complete": 749,
      "Cards Complete": 269
    },
    {
      "name": 2017,
      "Task complete": 342,
      "Cards Complete": 387
    },
    {
      "name": 2018,
      "Task complete": 874,
      "Cards Complete": 548
    },
    {
      "name": 2019,
      "Task complete": 276,
      "Cards Complete": 793
    }
  ]

  return (<>
    <Page
      // loading={loading.models.dashboard && sales.length === 0}
      className={styles.dashboard}
    >
      <Row gutter={24}>
        <Col lg={6} md={12}>
          <NumberCard {...{icon: "team", color: "#64ea91", title: "注册人数", number: count?.userNumber}}/>
        </Col>
        <Col lg={6} md={12}>
          <NumberCard {...{icon: "appstore", color: "#8fc9fb", title: "题目总数", number: count?.problemNumber}}/>
        </Col>
        <Col lg={6} md={12}>
          <NumberCard {...{icon: "fileDone", color: "#d897eb", title: "提交总数", number: count?.submissionNumber}}/>
        </Col>
        <Col lg={6} md={12}>
          <NumberCard {...{icon: "setting", color: "#f69899", title: "判题核心", number: count?.judgerNumber}}/>
        </Col>
        <Col lg={14} md={24}>
          <Card
            title={'站内七天提交统计'}
            bordered={false}
            // bodyStyle={{
            //   padding: '24px 36px 24px 0',
            // }}
          >
            <MixChart/>
            {/*<TagWordCloud/>*/}
            {/*<Descriptions title={`欢迎,${store.getState().user.role}`} column={1} bordered>*/}
            {/*  /!*<Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>*!/*/}
            {/*  <Descriptions.Item label="IP">1810000000</Descriptions.Item>*/}
            {/*  <Descriptions.Item label="OS">Hangzhou, Zhejiang</Descriptions.Item>*/}
            {/*  <Descriptions.Item label="浏览器">empty</Descriptions.Item>*/}
            {/*</Descriptions>*/}
            {/*<Sales data={sales}/>*/}
          </Card>
        </Col>
        <Col lg={10} md={24}>
          <Card
            title={<>提交情况</>}
            bordered={false}
            // bodyStyle={{
            //   padding: '24px 36px 24px 36px',
            // }}
          >
            <SubmissionPie/>
            {/*<UserPieChart data={}></UserPieChart>*/}
          </Card>
        </Col>

        {/*<Col lg={24} md={24}>*/}
        {/*  <Card*/}
        {/*    bordered={false}*/}
        {/*    title={'站内统计'}*/}
        {/*    // bodyStyle={{*/}
        {/*    //   padding: '24px 36px 24px 0',*/}
        {/*    // }}*/}
        {/*  >*/}
        {/*    /!*<TagWordCloud/>*!/*/}
        {/*    <MixChart/>*/}
        {/*    /!*<Completed data={completed}/>*!/*/}
        {/*  </Card>*/}
        {/*</Col>*/}
        {/*<Col lg={8} md={24}>*/}
        {/*  <Card*/}
        {/*    bordered={false}*/}
        {/*    title={'标签词云'}*/}
        {/*    // bodyStyle={{ height:'300px'}}*/}
        {/*  >*/}
        {/*    <TagWordCloud/>*/}
        {/*    /!*<User {...user} avatar={avatar} username={username} />*!/*/}
        {/*  </Card>*/}
        {/*</Col>*/}
      </Row>
    </Page>
  </>)
}
export default Dashboard;
