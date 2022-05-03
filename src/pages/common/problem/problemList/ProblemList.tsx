import React, {useContext, useEffect, useState} from 'react'
import Page from "../../../../components/Page/Page";
import {Button, Card, Col, Form, Input, Progress, Row, Select, Switch, Table, Tag, Tooltip} from "antd";
import CommonCarousel from "../../home/components/CommonCarousel";
import Rank from "../../home/components/Rank";
import styles from "../../../admin/dashboard/index.module.scss";
import List from "../../../common/problem/problemList/components/List";
import ProblemTags from "./components/ProblemTags";
import {getProblemList, initProblem, IProblem, IProblemQuery} from "../../../../api/admin/problem";
import {Link} from "react-router-dom";
import {ITag} from "../../../../api/admin/tag";
import {SearchOutlined} from "@ant-design/icons";
import {useForm} from "antd/es/form/Form";

const {Column, ColumnGroup} = Table;

interface ProblemHomeProps {

}

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}
const ProblemList: React.FunctionComponent<ProblemHomeProps> = (props) => {
  // local
  const [list, setList] = useState<IProblem[]>(
    [initProblem
    ]
  )

  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IProblemQuery>({
      pageSize: 10,
      current: 1,
      name: '',
      tag: '',
    }),
    [tag, setTag] = useState<any>({name: '1', color: '#fff'})

  const columns = [
    {
      title: '题目ID',
      dataIndex: 'id',
    },
    {
      title: '题目',
      dataIndex: 'name',
      render: (text: any, record: any) => (
        <Link to={`/problem/${record.id}`}>
          {record.name}
        </Link>
      )
    },
    {
      title: <span>标签</span>,
      dataIndex: 'tags',
      render: (text: any, record: any) => (
        record && record.tags && record.tags.length ?
          <>
            {record.tags.filter((item: ITag, index: number) => index < 2).map((item: any) => {
              return (<Tag key={item.name} color={item.color}>
                {item.name}
              </Tag>)
            })}
          </> : <>无标签</>
      ),
    },
    {
      title: '总提交',
      dataIndex: 'total',
    },
    {
      title: '通过率',
      dataIndex: 'total',
      render: (text: any, record: IProblem) => <>
        <Tooltip title={`${record.ac}/${text}`}>
          <Progress
            // size={"small"}
            width={50}
            status={"active"}
            // strokeWidth={10}
            type="line"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            percent={text ? Number((record.ac / text * 100).toFixed(1)) : 0}
          />
          {/*  {*/}
          {/*text ?*/}
          {/*  (record.ac / text * 100).toFixed(2) : 0}%*/}

        </Tooltip></>
    },
  ]
  const fetchData = () => {
    setLoading(true);
    getProblemList(listQuery).then((res) => {

      // if (_isMounted) {
      setList(res.data.data.records);
      setTotal(res.data.data.total)
      setLoading(false);
      // }
    });
  };
  // 生命周期
  useEffect(() => {
    fetchData()
  }, [])
  const [form] = useForm()
  const filterProblemNameChange = (e: any) => {

    setListQuery({
      ...listQuery,
      name: e.target.value
    })
  };
  const filterTagChange = (e: any) => {
    setListQuery({
      ...listQuery,
      tag: e.target.value
    })
  };
  useEffect(() => {
      fetchData()
    },
    [listQuery.id,
      listQuery.pageSize,
      listQuery.current,
      listQuery.tag
    ])
  const changePage = (current: number, pageSize: number) => {
    setListQuery({
      ...listQuery,
      current,
      pageSize
    })
  };

  return (
    <Page className={styles.dashboard}>
      <Row gutter={24}>
        <Col lg={17} md={24}>
          <Card
            title={"题目列表"}
            bordered={false}
            bodyStyle={{
              // padding: '24px 36px 24px 0',
            }}

            extra={<>
              <Form

                onFinish={fetchData}
                layout="inline"
              >
                <Tag
                  // style={{verticalAlign:"middle"}}
                  visible={listQuery.tag !== ''}
                  onClose={() => setListQuery({...listQuery, tag: ''})}
                  closable
                  color={tag.color}
                >{listQuery.tag}</Tag>
                <Form.Item
                  name="problemName">
                  <Input
                    allowClear
                    onChange={filterProblemNameChange}
                    placeholder={'输入题目名'}
                  />
                </Form.Item>
                <Form.Item>
                  <Button loading={loading} type="primary" icon={<SearchOutlined/>}

                          onClick={fetchData}/>
                </Form.Item>
              </Form>
            </>}
          >
            <Table
              rowKey={(record) => '' + record.id!}
              loading={loading}
              // scroll={{x: 1200}}
              pagination={{
                total: total,
                // defaultPageSize:5,
                pageSizeOptions: ["10", "20", "40"],
                showTotal: total => `共${total}条数据`,
                onChange: changePage,
                current: listQuery.current,
                showSizeChanger: true,
                // showQuickJumper: true,
                hideOnSinglePage: true
              }}
              columns={columns}
              dataSource={list}
            />

          </Card>
        </Col>
        <Col lg={7} md={24}>
          <ProblemTags tagOnClick={(value: any) => {
            setTag(value)
            setListQuery({...listQuery, tag: value.name})
          }}/>
        </Col>
      </Row>
    </Page>
  )
}

export default ProblemList
