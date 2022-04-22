/**
 * @FileName: RecentOtherContest
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/21 11:14
 */
import React, {useEffect, useState} from "react";

import styles from './RecentOtherContest.module.scss'
import {Table, Tooltip, Typography} from "antd";
import axios from "axios";
import {getOtherContest} from "../../../../api/common/home";
import moment from "moment";
import Ellipsis from "../../../../components/Ellipsis";
const { Text, Link } = Typography;
interface IProps {

}

interface IState {

}

const RecentOtherContest: React.FC<IProps> = ({}) => {
  const [otherContest, setOtherContest] = useState();
  const columns = [
    {
      title:<>近期比赛</>,
      dataIndex:'title',
      width:'50%',
      ellipsis: {
        showTitle: false,
      },
      render:(text:string, record:any) => {
        return (<>
          <Link href={record.url} target="_blank">

          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        </Link>
        </>)
      }
    },
    {
      title:'比赛时间',
      dataIndex: 'beginTime',
      width: '50%',
      showSorterTooltip:{title:'排序'},
      sorter: (a:any, b:any) => a.beginTime - b.beginTime,
      render:(text:any, record:any) => {
        return (
          <>
            {moment(record.beginTime).format("YYYY/MM/DD HH:mm:ss")}
             ~ {moment(record.endTime).format("YYYY/MM/DD HH:mm:ss")}
          </>
        )
      }
    }
  ]

  useEffect(() => {
    getOtherContest().then((res) => {
      setOtherContest(res.data.data)
    })
  },[])

  return (<>
    <div className={styles.otherContest}>

      <Table
        dataSource={otherContest}
        columns={columns}
        pagination={false}
  />
    </div>
  </>)
}
export default RecentOtherContest;
