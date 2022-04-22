/**
 * @FileName: ClassHome
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/6 15:42
 */
import React, {useEffect, useState} from "react";
import {Affix, Button, Card, Col, Menu, message, Popconfirm, Row} from "antd";
import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import Member from "./Member/Member";
import Detail from "./Detail/Detail";
import Exercise from "./Exercise/Exercise";
import Title from "antd/es/typography/Title";
import {Typography, Space} from 'antd';
import {getClassDetail, IClass, leaveJoinClass} from "../../../../api/admin/classes";
import store from "../../../../store";

const {Text} = Typography;

interface IProps {

}

interface IState {

}

const ClassHome: React.FC<IProps> = ({}) => {

  const navigate = useNavigate();
  const {classId} = useParams();
  const [classDetail, setClassDetail] = useState<IClass>();
  const fetchData = () => {
    getClassDetail(Number(classId)).then(res => {
      const {data} = res.data
      setClassDetail(data)
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <>
      <Row gutter={[24, 24]}>

        <Col lg={8}> <Affix offsetTop={75}>
          <Detail/></Affix>
        </Col>
        <Col lg={16}>
          <Row gutter={[24, 12]}>
            <Col lg={24}>
              <Card
                title={<>{classDetail?.name}</>}
                extra={<>
                  {/*<Link to={`/admin/class/${classDetail?.id}`}>*/}
                  {/*  <Button type={"primary"}>管理</Button>*/}
                  {/*</Link>*/}

                  <Link to={`statistics`}><Button>统计</Button></Link>
                  <Popconfirm title="确认离开？" okText="确认" cancelText="取消"
                              onConfirm={() => {
                                leaveJoinClass({
                                  classId: Number(classId),
                                  userId: store.getState().user.id
                                }).then(res => {
                                  message.success(res.data.msg)
                                  navigate('/class')
                                })
                              }
                              }
                  >
                    <Button danger>离开</Button>
                  </Popconfirm>
                </>}
              >
                <Text style={{  whiteSpace:"pre-line"}}>
                  {
                    classDetail?.description
                  }
                </Text>
              </Card>
            </Col>
            <Col lg={24}><Exercise/></Col>
            {/*<Col lg={24}><Member classId={Number(classId)}/></Col>*/}
            <Col lg={24}><Member classId={classDetail?.id}/></Col>
          </Row>
        </Col>
      </Row>
    </>)
}
export default ClassHome;
