/**
 * @FileName: Member
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/6 16:48
 */
import React, {useEffect, useState} from "react";
import {Avatar, Card, Input, Space, Table} from "antd";
import {initProblem, IProblem, IProblemQuery} from "../../../../../api/admin/problem";
import {getJoinClassPage, IJoinClassQuery, IMember, IMemberQuery, initMember} from "../../../../../api/admin/classes";
import {Link} from "react-router-dom";

//import styles from './Member.module.scss'

interface IProps {
  classId?: number;
}

interface IState {

}

const Member: React.FC<IProps> = ({classId}) => {

  const [list, setList] = useState<IMember[]>(
    [initMember]
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IJoinClassQuery>({
    pageSize: 10,
    current: 1,
    name: '',
    classId
    // classId: ,
  })
  const columns = [
    {
      dataIndex: 'username',
      title: '用户',
      render: (text: any, record: any) => (<>
        <Space>
          <Avatar style={{marginLeft: 8}} src={record.avatar}/>
          <Link to={`/user/${record.userId}`}>{text}</Link>
        </Space>
      </>),
    },
    {
      dataIndex: 'realName',
      title: '姓名'
    },
    {
      dataIndex: 'createdAt',
      title: '加入时间'
    },
  ]
  const fetchData = () => {
    getJoinClassPage(listQuery).then(res => {
      const {data} = res.data
      setList(data.records)
      setTotal(data.total)
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    setListQuery({...listQuery, classId})
  }, [classId])
  useEffect(() => {
    fetchData()
  }, [listQuery])
  return (<>
    <Card
      title={'成员'}
      extra={
        <Input.Search
          placeholder={'输入成员姓名'}
          // style={{ width: '50%' }}
        />
      }
    >
      <Table
        dataSource={list}
        bordered
        columns={columns}
        rowKey={(record) => '' + record.id!}
        loading={loading}
        scroll={{x: 700}}
        pagination={{
          total: total,
          pageSizeOptions: ["10", "20", "40"],
          showTotal: total => `共${total}条数据`,
          // onChange: changePage,
          current: listQuery.current,
          showSizeChanger: true,
          showQuickJumper: true,
          hideOnSinglePage: true
        }}
      />
    </Card>
  </>)
}
export default Member;
