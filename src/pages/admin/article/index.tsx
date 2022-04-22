/**
 * @FileName: Article
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/8 15:34
 */
import React, {useEffect, useState} from "react";
import {deleteProblem, getProblemList, initProblem, IProblem, IProblemQuery} from "../../../api/admin/problem";
import {Link, useNavigate} from "react-router-dom";
import {ITag} from "../../../api/admin/tag";
import {Button, Col, Divider, Drawer, Form, Input, message, Popconfirm, Row, Switch, Table, Tag} from "antd";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../config/config";
import Page from "../../../components/Page/Page";
import {SearchOutlined} from "@ant-design/icons";
import {deleteArticle, getArticlePage, IArticleQuery} from "../../../api/admin/article";
import BetterMarked from "../../../components/OhMyMarked/BetterMarked";

//import styles from './Article.module.scss'

interface IProps {

}

interface IState {

}

const DescriptionItem = ({title, content}: any) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);
const Article: React.FC<IProps> = ({}) => {
  const [list, setList] = useState(
  )
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IArticleQuery>({
    pageSize: 10,
    current: 1,
    name: '',
    problemId: undefined,
    status: false, userId: undefined
  })
  const [currentRow, setCurrentRow] = useState<any>()
  // let _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  const navigate = useNavigate()
  const columns = [
    {
      title: <span>id</span>,
      dataIndex: 'id',
      width: '7%',
    },
    {
      title: <span>标题</span>,
      dataIndex: 'title',
      width: '18%',
      render: (text: any, record: any) =>
        <Button type={"link"}
                onClick={() => {
                  setCurrentRow(record)
                  setVisible(true)
                }}
        >
          {text}</Button>,
    },
    {
      title: <span>状态</span>,
      dataIndex: 'status',
      render: (text: any, record: any) =>
        <>
          <Switch checkedChildren="公开" unCheckedChildren="私密" defaultChecked/>
        </>
    },
    {
      title: '创建者',
      dataIndex: 'username',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: <span>创建时间</span>,
      dataIndex: 'createdAt',
      render: (text: any, record: any) => {
        return (
          <>
            {moment(text).format(DEFAULT_DATE_TIME_FORMAT)}
          </>
        )
      },
    },
    {
      title: <span>更新时间</span>,
      dataIndex: 'updatedAt',
      render: (text: any, record: any) => {
        return (
          <>
            {moment(text).format(DEFAULT_DATE_TIME_FORMAT)}
          </>
        )
      },
    },
    {
      title: '操作',
      fixed: 'right' as const,
      width: '10%',
      render: (text: any, record: any) => {
        return (
          <>
            <Popconfirm placement="top" title={'确认删除'}
                        onConfirm={handleDelete.bind(null, record)}
                        okText="确认"
                        cancelText="取消">
              <Button type={"link"} danger size={"small"}
              >删除</Button>
            </Popconfirm>
          </>
        )
      },
    },
  ]

  const fetchData = () => {
    setLoading(true);
    getArticlePage(listQuery).then((res) => {

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

  const filterNameChange = (e: any) => {
    setListQuery({
      ...listQuery,
      name: e.target.value
    })
  };
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
  const handleDelete = (row: any) => {
    setLoading(true)
    deleteArticle(row.id).then(res => {
      setLoading(false)
      message.success("删除成功")
      fetchData();
    })
  }


  return (
    <Page inner>
      <div className="app-container">
        <Form
          layout="inline"
        >
          <Form.Item name="name">
            <Input
              allowClear
              onChange={filterNameChange}
              placeholder={'文章名'}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<SearchOutlined/>} onClick={fetchData}>
              {/*搜索*/}
            </Button>
          </Form.Item>
        </Form>
        <br/>
        <Table
          dataSource={list}
          bordered
          columns={columns}
          rowKey={(record) => '' + record.id!}
          loading={loading}
          scroll={{x: 900}}
          pagination={{
            total: total,
            pageSizeOptions: ["10", "20", "40"],
            showTotal: total => `共${total}条数据`,
            onChange: changePage,
            current: listQuery.current,
            showSizeChanger: true,
            showQuickJumper: true,
            hideOnSinglePage: true
          }}
        >
        </Table>
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={() => setVisible(false)}
          visible={visible}
        >
          {!currentRow || currentRow.content === undefined ? <></> :
            <BetterMarked content={currentRow.content}/>}
        </Drawer>
      </div>
    </Page>
  );
}
export default Article;
