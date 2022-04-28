/**
 * @FileName: Rank
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/4 11:04
 */
import React, {useEffect, useState} from "react";
import {Avatar, Table} from "antd";
import styles from './Rank.module.scss'
import {getUserRank} from "../../../../api/common/home";
import {Link} from "react-router-dom";

interface IProps {
  data?: any;
}

interface IState {

}

const Rank: React.FC<IProps> = ({}) => {
  const [list, setList] = useState()
  const [loading, setLoading] = useState(false)
  const fetchData = () => {
    setLoading(true)
    getUserRank().then(res => {
      console.log(res)
      setList(res.data.data)
      setLoading(false)
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  const columns = [
    {
      title: '#',
      // dataIndex: 'id',
      width: '15%',
      render: (text: any, record: any, index: number) => `${index + 1}`,
    },
    {
      title: '用户',
      dataIndex: 'avatar',
      // width:'35%',
      render: (text: any, record: any) => (
        <>
          <Avatar style={{marginLeft: 8}}
                  src={record.avatar}>
          </Avatar>
          <Link to={`/user/${record.id}`}>
            <span style={{marginLeft: '10px'}}>{record.username}</span>
          </Link>

        </>
      ),
    },
    {
      title: 'AC',
      dataIndex: 'ac',
      width: '20%'
    },
  ]
  return (<>
      <div className={styles.rank}>
        <Table
          loading={loading}
          scroll={{y: 340}}
          pagination={false}
          columns={columns}
          rowKey={(record) => '' + record.id!}
          dataSource={list}
        />
      </div>
    </>
  )
}
export default Rank;
