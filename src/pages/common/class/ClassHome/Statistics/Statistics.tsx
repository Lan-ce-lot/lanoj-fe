/**
 * @FileName: Statistics
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/6 16:49
 */
import React, {useEffect, useState} from "react";
import {Button, Card, Table} from "antd";
import {getStatistics, IStatisticsItem} from "../../../../../api/common/statistics";
import {useParams} from "react-router-dom";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../../../config/config";
import * as XLSX from 'xlsx'
// @ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

//import styles from './Statistics.module.scss'

interface IProps {

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
  // const exportExcel = () => {
  //   const cloneDivNode = document.getElementById('antdTable')?.cloneNode(true);
  //   const table = document.createElement('table')
  //   table.appendChild(cloneDivNode!);
  //   table.setAttribute('id', 'table-to-xls');
  //   document.getElementById('root')?.appendChild(table);
  //   document.getElementById('test-table-xls-button')?.click();
  //   setTimeout(() => {
  //     document.getElementById('root')?.removeChild(table);
  //   }, 500)
  // }
  return (<Card
      style={{minHeight: 410}}
      title={'班级练习统计'}
      extra={<>
        <Button onClick={exportExcel}>导出</Button>
      </>}
    >
      <Table
        id={'antdTable'}
        dataSource={list}
        bordered
        columns={columns}
        rowKey={(record) => '' + record.userId!}
        loading={loading}
        scroll={{x: 1100}}
        pagination={false}
      >

      </Table>
      <div style={{display: 'none'}}>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          // className="download-table-xls-button"
          table="table-to-xls"
          filename={`班级统计分析-${moment().format('YYYY-MM-DD-HH-mm-ss')}`}
          sheet={"sheet1"}
          buttonText="Download as XLS"/>
      </div>

    </Card>
  )
}
export default Statistics;
