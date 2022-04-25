/**
 *
 *
 */

import React from 'react'
import {
  Row,
  Col, Card
} from 'antd'
import Page from "../../../components/Page/Page";
import styles from "../../admin/dashboard/index.module.scss";
import CommonCarousel from "./components/CommonCarousel";
import Rank from "./components/Rank"
import ScrollBar from "../../../layout/admin/ScrollBar";
import RecentOtherContest from "./components/RecentOtherContest";
import Notice from "./components/Notice";

interface HomeProps {

}

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}
const Home: React.FunctionComponent<HomeProps> = (props) => {
  // local

  return (
    <Page
      className={styles.dashboard}
    >
      <Row gutter={24}>
        <Col lg={15} md={24}>
          <Card
            title={"欢迎来到LANOJ"}
            bordered={false}
            bodyStyle={{
              // padding: '24px 36px 24px 0',
              height: 468,
            }}
          >
            <CommonCarousel/>
          </Card>
        </Col>
        <Col lg={9} md={24}>
          <Card
            title={"排行榜"}
            bordered={false}
            bodyStyle={{
              height: 468,
            }}
          >
            <ScrollBar>
              <Rank/>
            </ScrollBar>
          </Card>
        </Col>
        <Col lg={15} md={24}>
          <Card
            title={"其他OJ近期比赛"}
            bordered={false}
          >

            <RecentOtherContest/>
          </Card>
        </Col>
        <Col lg={9} md={24}>
          <Card
            title={"公告"}
            bordered={false}
          >
            <Notice/>
          </Card>
        </Col>
      </Row>

    </Page>

  )
}

export default Home
