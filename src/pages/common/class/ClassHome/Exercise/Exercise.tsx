/**
 * @FileName: Exercise
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/6 16:48
 */
import React, {useEffect, useState} from "react";
import {Badge, Card, Input, Table, Tag} from "antd";
import {IProblemQuery} from "../../../../../api/admin/problem";
import {
  getExercisePage,
  IExercise,
  IExerciseQuery,
  IJoinClass,
  IJoinClassQuery,
  initJoinClass,
  initMember
} from "../../../../../api/admin/classes";
import {Link, useParams} from "react-router-dom";
import {ContestStatusToCN, ContestStatusToColorMap} from "../../../../../common/map";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../../../config/config";

//import styles from './Exercise.module.scss'

interface IProps {

}

interface IState {

}

const Exercise: React.FC<IProps> = ({}) => {
  const {classId} = useParams();
  const [list, setList] = useState<IExercise[]>(
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IExerciseQuery>({
    pageSize: 10,
    current: 1,
    classId:Number(classId),
    name: '',
  })
  const columns = [
    {
      dataIndex: 'name',
      title: '标题',
      render: (text: any, record: any) => <Link to={`exercise/${record.id}`}>
        {text}
      </Link>
    },
    {
      dataIndex: 'personNumber',
      title: '参与人数'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: ((text: any, record: any) => <>
        {
          <Tag color={ContestStatusToColorMap[text]}><Badge
            status={ContestStatusToColorMap[text]}/>{ContestStatusToCN[text]}</Tag>
        }
      </>)
    },
    {
      title: <span>开始时间</span>,
      dataIndex: 'startTime',
      width: '18%',
      render: (text: any, record: any) => {
        return (
          <>
            {moment(text).format(DEFAULT_DATE_TIME_FORMAT)}
          </>
        )
      },
    },
    {
      title: <span>结束时间</span>,
      dataIndex: 'endTime',
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
    getExercisePage(listQuery).then(res => {
      const {data} = res.data
      setList(data.records)
      setTotal(data.total)
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (<>
    <Card
      // size={"small"}
      title={'练习'}
      extra={
        <Input.Search
          placeholder={'输入练习标题'}
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
export default Exercise;
