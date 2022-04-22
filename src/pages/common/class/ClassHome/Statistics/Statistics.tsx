/**
 * @FileName: Statistics
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/6 16:49
 */
import React, {useEffect, useState} from "react";
import Page from "../../../../../components/Page/Page";
import {Button, Card, Table} from "antd";
import {initProblem, IProblem, IProblemQuery} from "../../../../../api/admin/problem";
import {getStatistics, IStatisticsItem} from "../../../../../api/common/statistics";
import {useParams} from "react-router-dom";

//import styles from './Statistics.module.scss'

interface IProps {

}

interface IState {

}

const Statistics: React.FC<IProps> = ({}) => {
  const {classId} = useParams()
  const [list, setList] = useState<IStatisticsItem[]>(
    []
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<any>({
    pageSize: 100,
    current: 1,
  })
  const fetchData = () => {
    setLoading(true)
    getStatistics(Number(classId)).then(res => {
      const {data} = res.data
      setList(data.statisticsItemList)
      setTotal(data.total)
      setLoading(false)
    })
  }
  useEffect(() => {
    fetchData()
  }, [listQuery])
  const columns: any = [
    {
      title: '姓名',
      dataIndex: 'realName',
      key: 'realName',
    },
    {
      title: <>用户名</>,
      dataIndex: 'username',
      key: 'username',
      // width: '7%',
    },
    {
      title: <>总过题数</>,
      dataIndex: 'totalSolve',
      key: 'totalSolve',
    },
    {
      title: <>总罚时</>,
      dataIndex: 'totalTimePenalty',
      key: 'totalTimePenalty',
    },
  ]
  list[0] && list[0].exerciseItemList.map((it, key) => {
    columns.push(
      {
        title: <span>{it.exerciseName}</span>,
        dataIndex: "solutionInfo",
        // style: {padding: 0, backgroundColor:"#fff"},
        key: "" + key,
        render: (text: any, record: any) => <>{it.totalAC}</>,
      }
    )
  })
  return (<Card
    style={{minHeight:410}}
    title={'班级练习统计'}
    extra={<>
      <Button>导出</Button>
    </>}
  >
    <Table
      dataSource={list}
      bordered
      columns={columns}
      rowKey={(record) => '' + record.userId!}
      loading={loading}
      scroll={{x: 1100}}
      pagination={false}
    >

    </Table>
  </Card>)
}
export default Statistics;
