/**
 * @FileName: index
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/4 11:51
 */
import React, {useEffect, useRef, useState} from "react";
import Page from "../../../../components/Page/Page";
import {useParams, Outlet, useNavigate, Link} from "react-router-dom";
import {Alert, Avatar, Button, Card, Col, Form, message, Row, Select, Skeleton, Space, Table, Tabs} from "antd";
import {
  RedoOutlined,
  SendOutlined,
  CalendarOutlined,
  PieChartOutlined,
  RightSquareOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import {addSubmission, ISubmissionProps} from "../../../../api/common/submission";

import ScrollBar from "../../../../components/admin/ScrollBar";
import BetterMarked from "../../../../components/OhMyMarked/BetterMarked";
import ProblemSubmissions from "./components/ProblemSubmissions";
import Title from "antd/es/typography/Title";
import {parseToken} from "../../../../utils/jwt";
import SplitPane from "react-split-pane";
import {getProblemDetail, initProblem, IProblem} from "../../../../api/admin/problem";
import styles from './index.module.scss'
import {Dispatch} from "redux";
import {changeLoading} from "../../../../store/actions";
import {connect} from "react-redux";
import ProblemPieModal from "./components/ProblemPieModal";
import TextArea from "antd/es/input/TextArea";
import {remoteRunCode,} from "../../../../api/common/run";
import {useForm} from "antd/es/form/Form";
import {SubmitIcon} from "../../../../assets/icon/icon";
import store from "../../../../store";
import ProblemMarked from "../../../../components/OhMyMarked/ProblemMarked";
import CodeBlock from "../../../../components/OhMyMarked/ProblemMarked/code/CodeBlock";
import Editor from "./components/Editor";
import ProblemContent from "./components/ProblemContent";
import loading from "../../../../components/Loading";

const {TabPane} = Tabs;

interface IProps {
  loading?: boolean;
}

interface IState {

}


const ProblemDetail: React.FC<IProps> = ({loading}) => {
  let {id} = useParams();
  const navigate = useNavigate();
  // const [problem, setProblem] = useState<IProblem>(initProblem)
  // const [modalVisible, setModalVisible] = useState(false);
  // const fetchData = () => {
  //   getProblemDetail(Number(id)).then((res) => {
  //     const {data} = res.data
  //     setProblem(data)
  //   })
  // }
  //
  // useEffect(() => {
  //   fetchData()
  // }, [])
  return (<Page
    >
      {/*<SplitPane*/}
      {/*  minSize={50}*/}
      {/*  split="vertical" defaultSize={200} primary="second">*/}
      <Row gutter={12}>
        <Col lg={12} md={24} sm={24} xs={24}>

          <Card
            size={"small"}
          >
            <Tabs
              type="card"
              size={'small'}
              style={{backgroundColor: '#fff'}}
              defaultActiveKey="detail"
              onChange={(key) => {
                navigate(key)
              }
              }>
              <TabPane tab={<span><CalendarOutlined/>题目描述</span>} key="detail">
                <ScrollBar>
                  <ProblemContent/>
                  {/*<div style={{maxHeight: '450px'}}>*/}
                  {/*  <Title level={4}>{problem!.name}</Title>*/}
                  {/*  <Space size={1} style={{display: "flex", justifyContent: 'right'}}>*/}
                  {/*    <Button*/}
                  {/*      icon={<PieChartOutlined/>} type={"link"}*/}
                  {/*      onClick={() => {*/}
                  {/*        setModalVisible(true)*/}
                  {/*      }}*/}
                  {/*    >题目统计</Button>*/}
                  {/*    <ProblemPieModal onCancel={() => setModalVisible(false)} modalVisible={modalVisible}*/}
                  {/*                     problem={problem}/>*/}
                  {/*    /!*<Button icon={<PieChartOutlined/>} type={"link"}>全部提交</Button>*!/*/}
                  {/*    /!*<Button icon={<PieChartOutlined/>} type={"link"}>相关题解</Button>*!/*/}

                  {/*  </Space>*/}
                  {/*  <div className={styles.questionIntr}>*/}
                  {/*  <span>*/}
                  {/*    {'时间限制'}：C/C++*/}
                  {/*    {problem.timeLimit}MS，{'其他语言'}*/}
                  {/*    {problem.timeLimit * 2}MS</span>*/}
                  {/*    <br/>*/}
                  {/*    <span>{'内存限制'}：C/C++*/}
                  {/*      {problem.memoryLimit}KB，{'其他语言'}*/}
                  {/*      {problem.memoryLimit * 2}KB</span><br/>*/}
                  {/*    <span>{'出题人'}：<Link to={`/user/${problem.userId}`}>{problem.username}</Link>*/}
                  {/*   </span><br/>*/}
                  {/*  </div>*/}
                  {/*  <div className={styles.problemContent}>*/}
                  {/*    <h2>题目描述</h2>*/}
                  {/*    <ProblemMarked data={problem!.content}/>*/}
                  {/*    <h2>输入描述</h2>*/}
                  {/*    <ProblemMarked data={problem!.inputDescription}/>*/}
                  {/*    <h2>输出描述</h2>*/}
                  {/*    <ProblemMarked data={problem!.outputDescription}/>*/}
                  {/*    <Row>*/}
                  {/*      <Col lg={12}>*/}
                  {/*        <h2>样例输入</h2>*/}
                  {/*        <CodeBlock language={"text"} value={problem!.sampleIn}></CodeBlock>*/}
                  {/*      </Col>*/}
                  {/*      <Col lg={12}>*/}
                  {/*        <h2>样例输出</h2>*/}
                  {/*        <CodeBlock language={"text"} value={problem!.sampleOut}></CodeBlock>*/}
                  {/*      </Col>*/}
                  {/*    </Row>*/}
                  {/*  </div>*/}
                  {/*  /!*<BetterMarked content={problem!.content}/>*!/*/}
                  {/*</div>*/}
                </ScrollBar>
              </TabPane>
              <TabPane tab={<span><PieChartOutlined/>我的提交</span>} key="submission">
                <Outlet/>
              </TabPane>
            </Tabs>
          </Card>
          {/*</Skeleton>*/}
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Editor
          />
        </Col>
      </Row>
      {/*</SplitPane>*/}
    </Page>
  )
}



export default (ProblemDetail);
