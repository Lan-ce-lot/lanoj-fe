/**
 * @FileName: ClassList
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/6 15:27
 */
import React, {useEffect, useState} from "react";
import {Button, Card, message, Popconfirm, Table} from "antd";
import {
  getClassPage,
  getJoinClassPage, IClass, IClassQuery,
  IJoinClass,
  IJoinClassQuery,
  initJoinClass, joinClass
} from "../../../../api/admin/classes";
import store from "../../../../store";
import {Link, useNavigate} from "react-router-dom";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../../config/config";
import {deleteProblem} from "../../../../api/admin/problem";
import Page from "../../../../components/Page/Page";

//import styles from './ClassList.module.scss'

interface IProps {

}

interface IState {

}

const initData = [
  {
    id: 1,
    name: "acm",
    teacher: "glz",
    memberNumber: 10
  }
]
const ClassList: React.FC<IProps> = ({}) => {

  const [list, setList] = useState<IClass[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IClassQuery>({
    pageSize: 10,
    current: 1,
    name: '',
  })
  // let _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  const navigate = useNavigate()
  const columns = [
    {
      title: <span>id</span>,
      dataIndex: 'id',
      width: '7%',
    },
    {
      title: <span>班级名</span>,
      dataIndex: 'name',
      // render: (text: any, record: any) => <Link to={`/class/${record.id}`}>{text}</Link>,
    },
    {
      title: '创建者',
      dataIndex: 'creatorName',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: '成员人数',
      dataIndex: 'memberNumber',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: '操作',
      fixed: 'right' as const,
      render: (text: string, record: any) => <>
        <Popconfirm placement="top" title={'确认加入？'}
                    onConfirm={handleJoin.bind(null, record)}
                    okText="确认"
                    cancelText="取消">
          <Button
            // onClick={handleJoin.bind(null, record)}
          >加入</Button>
        </Popconfirm>

      </>,
    }
  ]
  const handleJoin = (record: any) => {
    joinClass({
      userId: store.getState().user.id, classId:
      record.id
    }).then(res => {
      message.success(res.data.msg)
    })
  }
  const fetchData = () => {
    setLoading(true);
    getClassPage(listQuery).then((res) => {

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
    deleteProblem(row.id).then(res => {
      setLoading(false)
      message.success("删除成功")
      fetchData();
    })
  }


  return (
    <Page inner>
      <div className="app-container">
        {/*<Form*/}
        {/*  layout="inline"*/}
        {/*>*/}
        {/*  <Form.Item name="name">*/}
        {/*    <Input*/}
        {/*      allowClear*/}
        {/*      onChange={filterNameChange}*/}
        {/*      placeholder={'题目名'}*/}
        {/*    />*/}
        {/*  </Form.Item>*/}
        {/*  <Form.Item>*/}
        {/*    <Button type="primary" icon={<SearchOutlined/>} onClick={fetchData}>*/}
        {/*      搜索*/}
        {/*    </Button>*/}
        {/*  </Form.Item>*/}
        {/*</Form>*/}
        {/*<br/>*/}
        <Table
          dataSource={list}
          // bordered
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
      </div>
    </Page>
  );
}
export default ClassList;
