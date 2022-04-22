/**
 * @FileName: ContestProblemList
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/11 12:20
 */
import React, {useEffect, useState} from "react";
import {Avatar, Space, Table, Tooltip, Typography} from "antd";
import {Link, useParams} from "react-router-dom";
import {
  getContestProblemList,
  IContestProblem,
  IContestProblemQuery
} from "../../../../../../../api/common/contestProblem";
import store from "../../../../../../../store";
import {CheckCircleTwoTone} from "@ant-design/icons";

//import styles from './ContestProblemList.module.scss'

interface IProps {

}

interface IState {

}

const ExerciseProblemList: React.FC<IProps> = ({}) => {
  const contestId = useParams().exerciseId
  const [problemList, setProblemList] = useState<IContestProblem[]>();
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IContestProblemQuery>({
    pageSize: 10,
    current: 1,
    contestId: Number(contestId),
    userId: Number(store.getState().user.id)
  })
  const fetchDate = () => {
    console.log(listQuery)
    getContestProblemList(listQuery).then(res => {
      const {data} = res.data
      console.log(data)
      setProblemList(data.records)
      setTotal(data.total)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchDate()
  }, [])
  const columns = [
    {
      dataIndex: "serialNumber",
      title: "#",
      render: (text: any, record: any) => (
        <>
          {String.fromCharCode('A'.charCodeAt(0) + text - 1)}
        </>
      )
    },
    {
      title: '题目',
      dataIndex: 'name',
      render: (text: any, record: any) => (
        <Link to={`${record.serialNumber}`}>
          {record.name}
        </Link>
      )
    },
    {
      dataIndex: "total",
      title: "总提交",
    },
    {
      dataIndex: "ac",
      title: "通过率",
      render: (text: any, record: any) => (
        <>
          <><Tooltip title={`${text}/${record.total}`}>{
            record.total ?
              (text / record.total * 100).toFixed(2) : 0}%</Tooltip></>
        </>
      )
    },
    {
      dataIndex: "myStatus",
      title: "我的状态",
      render: (text: any, record: any) => (
        <>
          {text ? <Space><Typography.Text type="success">{'已通过'}</Typography.Text><CheckCircleTwoTone twoToneColor="#52c41a"/></Space> : '未通过'}
        </>
      )
    }
  ]
  return (<>
    <Table
      loading={loading}
      dataSource={problemList}
      columns={columns}
      rowKey={'id'}
    />
  </>)
}
export default ExerciseProblemList;
