/**
 * @FileName: ClassJoin
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/6 15:18
 */
import React, {useEffect, useState} from "react";
import {Button, Card, ConfigProvider, Empty, Form, Image, Input, message, Popconfirm, Space, Table, Tag} from "antd";
import {DEFAULT_DATE_TIME_FORMAT, EMPTY_IMAGE} from "../../../../config/config";
import {Link, useNavigate} from "react-router-dom";
import {deleteProblem, getProblemList, initProblem, IProblem, IProblemQuery} from "../../../../api/admin/problem";
import {ITag} from "../../../../api/admin/tag";
import moment from "moment";
import Page from "../../../../components/Page/Page";
import {SearchOutlined, TeamOutlined} from "@ant-design/icons";
import {getJoinClassPage, IJoinClass, IJoinClassQuery, initJoinClass} from "../../../../api/admin/classes";
import store from "../../../../store";
import ClassEmpty from '../../../../assets/教育类app-缺省页_暂无班级.svg'
//import styles from './ClassJoin.module.scss'

interface IProps {

}

interface IState {

}
const customizeRenderEmpty = () => (
  //这里面就是我们自己定义的空状态
  <div style={{ textAlign: 'center' }}>
    {/*<Image*/}
    {/*  width={200}*/}
    {/*  style={{ display: 'none' }}*/}
    {/*  src={ClassEmpty}*/}
    {/*/>*/}
    <img src={ClassEmpty} />
    <Link to={'/class/list'}>
      <Button>加入</Button>
    </Link>

    {/*<Icon type="smile" style={{ fontSize: 20 }} />*/}
  </div>
);
const ClassJoin: React.FC<IProps> = ({}) => {
  const [list, setList] = useState<IJoinClass[]>(
    [
      // initJoinClass
    ]
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IJoinClassQuery>({
    pageSize: 10,
    current: 1,
    name: '',
    userId: store.getState().user.id
  })
  const columns = [
    {
      title: <span>id</span>,
      dataIndex: 'classId',
      width: '7%',
    },
    {
      title: <span>班级名</span>,
      dataIndex: 'className',
      render: (text: any, record: any) => <Link to={`/class/${record.classId}`}>{text}</Link>,
    },
    {
      title: '创建者',
      dataIndex: 'creatorName',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: '成员人数',
      dataIndex: 'memberNumber',
      render: (text: string) => <span>
        <Space>
                  <TeamOutlined/>
          {text}
        </Space>

      </span>,
    },
    {
      title: <span>创建时间</span>,
      dataIndex: 'createdAt',
      width: '18%',
      render: (text: any, record: any) => {
        return (
          <>
            {moment(text).format(DEFAULT_DATE_TIME_FORMAT)}
          </>
        )
      },
    },
  ]

  const fetchData = () => {
    setLoading(true);
    getJoinClassPage(listQuery).then((res) => {

      // if (_isMounted) {
      setList(res.data.data.records);
      setTotal(res.data.data.total)
      setLoading(false);
      // }
    });
  };

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
        <ConfigProvider renderEmpty={customizeRenderEmpty}>
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
        </ConfigProvider>

      </div>
    </Page>
  );
}
export default ClassJoin;
