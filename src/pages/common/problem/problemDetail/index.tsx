/**
 * @FileName: index
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/4 11:51
 */
import React, {useEffect, useRef, useState} from "react";
import Page from "../../../../components/Page/Page";
import {useParams, Outlet, useNavigate, Link} from "react-router-dom";
import {Alert, Avatar, Button, Card, Col, Form, Menu, message, Row, Select, Skeleton, Space, Table, Tabs} from "antd";
import {
  RedoOutlined,
  SendOutlined,
  CalendarOutlined,
  PieChartOutlined,
  RightSquareOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import {addSubmission, ISubmissionProps} from "../../../../api/common/submission";

import ScrollBar from "../../../../layout/admin/ScrollBar";
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
import Split from "@uiw/react-split";

const {TabPane} = Tabs;

interface IProps {
  loading?: boolean;
}

interface IState {

}


const ProblemDetail: React.FC<IProps> = ({loading}) => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(`50%`);
  const onClick = () => {
    setWidth(
      width === `0%` ? `50%` : `0%`,
    );
  }
  const styl: any = {};
  if (width === `0%`) {
    styl.width = `0%`;
  } else {
    styl.width = width;
  }
  return (<>
      {/*<div style={{marginBottom: 10}}>*/}
      {/*  <Button type="primary" onClick={onClick.bind(null)}>{width === `0%` ? '隐藏菜单' : '展示菜单'}</Button>*/}
      {/*</div>*/}
      <Split
        onDragEnd={(preSize: number, nextSize: number, paneNumber: number) => {
          setWidth(`${preSize}`)
          if (preSize <= 20) {
            // alert(preSize)
            setWidth('0%')
          }
        }}
        // visiable={width !== `0%`}
        style={{height: "100%", border: '1px solid #d5d5d5', borderRadius: 3}}>
        <div style={{
          ...styl,
          width: width,
          height: "100%",
          // minWidth: 30,
          overflow: 'hidden'
        }}>
          <Menu mode="horizontal">
            <Menu.Item key="mail">
              <Link to={'/class'}>
                题目详情
              </Link>
            </Menu.Item>
            <Menu.Item key="app">
              <Link to={'/class/list'}>
                我的提交
              </Link>
            </Menu.Item>
          </Menu>
          <Card
            size={'small'}
            style={{
              // height: "100%",
              height: "calc(100% - 45px)",
              overflowX: "auto",
              // backgroundColor: '#fff',
              // padding:'12px',
              // maxHeight: "calc(100vh - 65px)"
            }}
          >
            <ProblemContent/>
          </Card>

        </div>
        <div style={{
          flex: 1, height: "100%", minWidth: "45%",
          backgroundColor: '#fff'
        }}>
          <Editor
          />
        </div>
      </Split>
    </>
  )
  // let {id} = useParams();
  // const navigate = useNavigate();
  // // const [problem, setProblem] = useState<IProblem>(initProblem)
  // // const [modalVisible, setModalVisible] = useState(false);
  // // const fetchData = () => {
  // //   getProblemDetail(Number(id)).then((res) => {
  // //     const {data} = res.data
  // //     setProblem(data)
  // //   })
  // // }
  // //
  // // useEffect(() => {
  // //   fetchData()
  // // }, [])
  // return (<Page
  //   >
  //     {/*<SplitPane*/}
  //     {/*  minSize={50}*/}
  //     {/*  split="vertical" defaultSize={200} primary="second">*/}
  //     <Row gutter={12}>
  //       <Col lg={12} md={24} sm={24} xs={24}>
  //
  //         <Card
  //           size={"small"}
  //         >
  //           <Tabs
  //             type="card"
  //             size={'small'}
  //             style={{backgroundColor: '#fff'}}
  //             defaultActiveKey="detail"
  //             onChange={(key) => {
  //               navigate(key)
  //             }
  //             }>
  //             <TabPane tab={<span><CalendarOutlined/>题目描述</span>} key="detail">
  //               <ScrollBar>
  //                 <ProblemContent/>
  //                 {/*<div style={{maxHeight: '450px'}}>*/}
  //                 {/*  <Title level={4}>{problem!.name}</Title>*/}
  //                 {/*  <Space size={1} style={{display: "flex", justifyContent: 'right'}}>*/}
  //                 {/*    <Button*/}
  //                 {/*      icon={<PieChartOutlined/>} type={"link"}*/}
  //                 {/*      onClick={() => {*/}
  //                 {/*        setModalVisible(true)*/}
  //                 {/*      }}*/}
  //                 {/*    >题目统计</Button>*/}
  //                 {/*    <ProblemPieModal onCancel={() => setModalVisible(false)} modalVisible={modalVisible}*/}
  //                 {/*                     problem={problem}/>*/}
  //                 {/*    /!*<Button icon={<PieChartOutlined/>} type={"link"}>全部提交</Button>*!/*/}
  //                 {/*    /!*<Button icon={<PieChartOutlined/>} type={"link"}>相关题解</Button>*!/*/}
  //
  //                 {/*  </Space>*/}
  //                 {/*  <div className={styles.questionIntr}>*/}
  //                 {/*  <span>*/}
  //                 {/*    {'时间限制'}：C/C++*/}
  //                 {/*    {problem.timeLimit}MS，{'其他语言'}*/}
  //                 {/*    {problem.timeLimit * 2}MS</span>*/}
  //                 {/*    <br/>*/}
  //                 {/*    <span>{'内存限制'}：C/C++*/}
  //                 {/*      {problem.memoryLimit}KB，{'其他语言'}*/}
  //                 {/*      {problem.memoryLimit * 2}KB</span><br/>*/}
  //                 {/*    <span>{'出题人'}：<Link to={`/user/${problem.userId}`}>{problem.username}</Link>*/}
  //                 {/*   </span><br/>*/}
  //                 {/*  </div>*/}
  //                 {/*  <div className={styles.problemContent}>*/}
  //                 {/*    <h2>题目描述</h2>*/}
  //                 {/*    <ProblemMarked data={problem!.content}/>*/}
  //                 {/*    <h2>输入描述</h2>*/}
  //                 {/*    <ProblemMarked data={problem!.inputDescription}/>*/}
  //                 {/*    <h2>输出描述</h2>*/}
  //                 {/*    <ProblemMarked data={problem!.outputDescription}/>*/}
  //                 {/*    <Row>*/}
  //                 {/*      <Col lg={12}>*/}
  //                 {/*        <h2>样例输入</h2>*/}
  //                 {/*        <CodeBlock language={"text"} value={problem!.sampleIn}></CodeBlock>*/}
  //                 {/*      </Col>*/}
  //                 {/*      <Col lg={12}>*/}
  //                 {/*        <h2>样例输出</h2>*/}
  //                 {/*        <CodeBlock language={"text"} value={problem!.sampleOut}></CodeBlock>*/}
  //                 {/*      </Col>*/}
  //                 {/*    </Row>*/}
  //                 {/*  </div>*/}
  //                 {/*  /!*<BetterMarked content={problem!.content}/>*!/*/}
  //                 {/*</div>*/}
  //               </ScrollBar>
  //             </TabPane>
  //             <TabPane tab={<span><PieChartOutlined/>我的提交</span>} key="submission">
  //               <Outlet/>
  //             </TabPane>
  //           </Tabs>
  //         </Card>
  //         {/*</Skeleton>*/}
  //       </Col>
  //       <Col lg={12} md={24} sm={24} xs={24}>
  //         <Editor
  //         />
  //       </Col>
  //     </Row>
  //     {/*</SplitPane>*/}
  //   </Page>
  // )
}



export default (ProblemDetail);
