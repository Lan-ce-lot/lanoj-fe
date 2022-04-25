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

interface IProps {

}

const Statistics: React.FC<IProps> = ({}) => {
  const {classId} = useParams()
  const [list, setList] = useState<IStatisticsItem[]>(
    []
  )
  const [tmpData, setTmpData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<any>({
    pageSize: 100,
    current: 1,
  })
  let newData = {}
  const fetchData = () => {
    setLoading(true)
    getStatistics(Number(classId)).then(res => {
      const {data} = res.data
      newData = data.statisticsItemList.map((it: IStatisticsItem, key: number) => {
        const map = new Map()
        it.exerciseItemList.map((j: any) => {
          map.set(j.exerciseName, j.totalAC)
          // return
        })
        const obj = [...map.entries()].reduce((obj, [key, value]) => (obj[key] = value, obj), {})
        // return {...obj, ...it}
        return {
          // username: it.username,
          // realName: it.realName,
          // totalSolve: it.totalSolve,
          // totalTimePenalty: it.totalTimePenalty
          '排名': key + 1,
          '用户名': it.username,
          '姓名': it.realName,
          '总过题数': it.totalSolve,
          '总罚时': it.totalTimePenalty
          , ...obj
        }
      })
      console.log(newData)
      setTmpData(newData)
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
      title: '排名',
      render: (text: any, record: any, index: any) => `${index + 1}`,
    },
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
  // 导出 Excel
  const exportExcel = () => {
    // console.log('exportExcel')
    // 组装数据
    console.log(tmpData)
    console.log(tmpData[0])
    const exportData = [Object.keys(tmpData[0])]
    console.log(exportData)
    for (let i = 0; i < list.length; i++) {
      exportData.push(Object.values(tmpData[i]))

      // 对字段进行个性化处理，例如：创建时间
      // exportData.push(
      //   // Object.keys(tmpData[i])
      //   // newData[i]['id'],
      //   // newData[i]['username'],
      //   // newData[i]['realName'],
      //   // newData[i]['totalSolve'],
      //   // newData[i]['totalTimePenalty'],
      //   // moment(list[i]['created']).format(DEFAULT_DATE_TIME_FORMAT),
      // )
    }

    // 转成 workbook
    const ws = XLSX.utils.aoa_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

    // 生成 excel 文件
    XLSX.writeFile(wb, `班级统计分析-${moment().format('YYYY-MM-DD-HH-mm-ss')}.xlsx`)
  }
  return (<Card
      style={{minHeight: 410}}
      title={'班级练习统计'}
      extra={<>
        <Button type={"primary"} onClick={exportExcel}>导出</Button>
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
      />

    </Card>
  )
}
export default Statistics;
