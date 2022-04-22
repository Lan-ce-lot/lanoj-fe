/**
 * @FileName: ProblemContent
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/20 16:31
 */
import React, {useEffect, useState} from "react";
import Title from "antd/es/typography/Title";
import {Button, Col, Row, Skeleton, Space} from "antd";
import {PieChartOutlined} from "@ant-design/icons";
import ProblemPieModal from "./ProblemPieModal";
import styles from "../index.module.scss";
import {Link, useParams} from "react-router-dom";
import ProblemMarked from "../../../../../components/OhMyMarked/ProblemMarked";
import CodeBlock from "../../../../../components/OhMyMarked/ProblemMarked/code/CodeBlock";
import {getProblemDetail, initProblem, IProblem} from "../../../../../api/admin/problem";
import loading from "../../../../../components/Loading";
import {Dispatch} from "redux";
import {changeLoading} from "../../../../../store/actions";
import {connect} from "react-redux";

//import styles from './ProblemContent.module.scss'

interface IProps {
  loading?: boolean;
}

interface IState {

}

const ProblemContent: React.FC<IProps> = ({loading}) => {
  let {id} = useParams();
  const [problem, setProblem] = useState<IProblem>(initProblem)
  const [modalVisible, setModalVisible] = useState(false);
  const fetchData = () => {
    getProblemDetail(Number(id)).then((res) => {
      const {data} = res.data
      setProblem(data)
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (<>
    <Skeleton loading={loading} active>
      <div
        style={{width: "100%"}}
      >
        <Title level={4}>{problem!.name}</Title>
        <Space size={1} style={{display: "flex", justifyContent: 'right'}}>
          <Button
            icon={<PieChartOutlined/>} type={"link"}
            onClick={() => {
              setModalVisible(true)
            }}
          >题目统计</Button>
          <ProblemPieModal onCancel={() => setModalVisible(false)} modalVisible={modalVisible}
                           problem={problem}/>
          {/*<Button icon={<PieChartOutlined/>} type={"link"}>全部提交</Button>*/}
          {/*<Button icon={<PieChartOutlined/>} type={"link"}>相关题解</Button>*/}

        </Space>
        <div className={styles.questionIntr}>
                      <span>
                        {'时间限制'}：C/C++
                        {problem.timeLimit}MS，{'其他语言'}
                        {problem.timeLimit * 2}MS</span>
          <br/>
          <span>{'内存限制'}：C/C++
            {problem.memoryLimit}KB，{'其他语言'}
            {problem.memoryLimit * 2}KB</span><br/>
          <span>{'出题人'}：<Link to={`/user/${problem.userId}`}>{problem.username}</Link>
                       </span><br/>
        </div>
        <div className={styles.problemContent}>
          <h2>题目描述</h2>
          <ProblemMarked data={problem!.content}/>
          <h2>输入描述</h2>
          <ProblemMarked data={problem!.inputDescription}/>
          <h2>输出描述</h2>
          <ProblemMarked data={problem!.outputDescription}/>
          <Row>
            <Col lg={12}>
              <h2>样例输入</h2>
              <CodeBlock language={"text"} value={problem!.sampleIn}></CodeBlock>
            </Col>
            <Col lg={12}>
              <h2>样例输出</h2>
              <CodeBlock language={"text"} value={problem!.sampleOut}></CodeBlock>
            </Col>
          </Row>
        </div>
        {/*<BetterMarked content={problem!.content}/>*/}
      </div>
    </Skeleton>
  </>)
}
const mapStateToProps = (state: any) => {
  return {
    ...state.app,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setLoading(loading: boolean) {
      dispatch(changeLoading(loading))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProblemContent);
