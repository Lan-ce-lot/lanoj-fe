import React, {useContext, useEffect, useState} from 'react'
import Page from "../../../../components/Page/Page";
import styles from "../../../admin/dashboard/index.module.scss";
import {Badge, Card, Col, Row, List, Space, Avatar, Tag, Button, Form, Input, Select, Skeleton} from "antd";
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined, ClockCircleOutlined, UserOutlined, TeamOutlined, SearchOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Meta from "antd/es/card/Meta";
import Title from "antd/es/typography/Title";
import {getContestList, IContest, IContestQuery} from "../../../../api/admin/contest";
import {IProblemQuery} from "../../../../api/admin/problem";
import {ContestCondition, ContestStatusEnum, JudgeCondition} from "../../../../common/enumerations";
import {SUBMISSION_REQUEST_TASK_TIME} from "../contestDetail/ContestDetail";
import {ContestStatusToCN, ContestStatusToColorMap} from "../../../../common/map";

interface ContestHomeProps {

}

const listData: any[] = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `春季新生比赛 ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}
const IconText = ({icon, text}: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ContestList: React.FunctionComponent<ContestHomeProps> = (props) => {
  // local

  const [contestList, setContestList] = useState<IContest>();
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IContestQuery>({
    pageSize: 5,
    current: 1,
    name: '',
    status: ''
  })

  const fetchData = () => {
    setLoading(true)
    getContestList(listQuery).then((res) => {
      const {data} = res.data
      const list = data.records.map((it: IContest, key: any) => {
        if (new Date(it.startTime!).getTime() > new Date().getTime()) {
          console.log(ContestStatusEnum.NOT_STARTED)
          return {...it, status: ContestStatusEnum.NOT_STARTED}
        } else if (new Date(it.startTime!).getTime() < new Date().getTime() && new Date(it.endTime!).getTime() > new Date().getTime()) {
          console.log(ContestStatusEnum.RUNNING)
          return {...it, status: ContestStatusEnum.RUNNING}
        } else if (new Date(it.endTime!).getTime() <= new Date().getTime()) {
          return {...it, status: ContestStatusEnum.CLOSED}
        }
      })
      setContestList(list)
      setTotal(data.total)
      setLoading(false)
    })
  }
  useEffect(() => {
    fetchData()
  }, [listQuery])
  const changePage = (current: number, pageSize: number) => {
    setListQuery({
      ...listQuery,
      current,
      pageSize
    })
  };
  const filterStatusChange = (value: any) => {
    setListQuery({...listQuery, status: value})
  }
  const filterContestNameChange = (e: any) => {
    setListQuery({...listQuery, name: e.target.value})

  }
  const statusSelect = []
  for (let judgeConditionKey in ContestCondition) {
    statusSelect.push(
      <Select.Option {...ContestCondition[judgeConditionKey]} />
    )
  }
  return (
    <Page className={styles.dashboard}>
      <Row gutter={24}>
        <Col lg={24} md={24}>
          <Card
            title={"全部比赛"}
            bordered={false}
            extra={<>
              <Form
                layout="inline"
              >
                <Form.Item name="username">
                  <Input
                    allowClear
                    onChange={filterContestNameChange}
                    placeholder={'输入比赛名'}
                  />
                </Form.Item>
                <Form.Item name={'status'}>
                  <Select
                    placeholder={'状态'}
                    style={{width: 120}}
                    allowClear
                    onChange={filterStatusChange}
                  >
                    {
                      statusSelect
                    }
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" icon={<SearchOutlined/>} onClick={fetchData}/>
                </Form.Item>
              </Form>
            </>}
          >
            <List
              loading={loading}
              itemLayout="vertical"
              size="large"
              pagination={{
                total: total,
                defaultPageSize: 5,
                pageSizeOptions: ["5", "10", "20"],
                showTotal: total => `共${total}条数据`,
                onChange: changePage,
                current: listQuery.current,
                showSizeChanger: true,
                showQuickJumper: true,
                hideOnSinglePage: true
              }}
              dataSource={contestList as any}
              renderItem={(item: any) => (
                <List
                  size="large"
                  // className="Item"
                >
                  {/*<Skeleton loading={loading} active avatar>*/}
                  <Badge.Ribbon
                    color={"gold"}
                    text={<><Badge/>RATING</>}>

                    <Card
                    >
                      <Meta
                        avatar={
                          <Avatar
                            size={120}
                            shape={"square"} src={`https://joeschmoe.io/api/v1/${item.id}`}/>}
                        title={<Title level={3}><Link to={`/contest/${item.id}`}>{item.name}  </Link></Title>}
                        description={
                          <>
                            <Row gutter={[24, 2]}>
                              <Col lg={24} md={24} sm={24} xs={24}>
                                <IconText icon={ClockCircleOutlined}
                                          text={`开始时间: ${item.startTime}`}
                                          key="list-vertical-star-o"/>
                              </Col>
                              <Col lg={12} md={12} sm={20} xs={24}>
                                <IconText icon={ClockCircleOutlined}
                                          text={`结束时间: ${item.endTime}`}
                                          key="list-vertical-star-o"/>
                              </Col>
                              <Col style={{display: "flex", justifyContent: "right"}} lg={12} md={12} sm={4} xs={24}>
                                <Tag color={ContestStatusToColorMap[item.status as ContestStatusEnum]}>
                                  <Badge status={ContestStatusToColorMap[item.status as ContestStatusEnum]}
                                         text={ContestStatusToCN[item.status as ContestStatusEnum]}/>
                                </Tag>
                              </Col>
                              <Col lg={24}>
                                <Space size={8}>
                                  <IconText icon={TeamOutlined} text={`参加人数: ${item.personNumber}`}
                                            key="list-vertical-like-o"/>
                                  <IconText icon={UserOutlined} text={`创建人: ${item.creatorName}`}
                                            key="list-vertical-message"/>
                                </Space>
                              </Col>
                            </Row>
                          </>
                        }
                      />
                    </Card>
                  </Badge.Ribbon>
                  {/*</Skeleton>*/}
                </List>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Page>
  )
}

export default ContestList
