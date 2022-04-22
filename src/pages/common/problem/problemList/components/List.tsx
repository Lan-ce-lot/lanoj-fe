/**
 * @FileName: ProblemList
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/4 15:12
 */
import React from "react";
import {Avatar, Table, Tag, Typography} from "antd";
import {Link} from "react-router-dom";
import {IProblem} from "../../../../../api/admin/problem";
import {ITag} from "../../../../../api/admin/tag";

//import styles from './ProblemList.module.scss'

interface IProps {
  data: any;
}

interface IState {

}

const List: React.FC<IProps> = ({data}) => {
  const columns = [
    {
      title: '题目id',
      dataIndex: 'id',
    },
    {
      title: '题目',
      dataIndex: 'name',
      render: (text: any, record: any) => (
        <Link to={`/problem/detail/${record.id}`} >
          {record.name}
        </Link>
      )
    },
    {
      title: <span>标签</span>,
      dataIndex: 'tags',
      render: (text: any, record: any) => (
        record && record.tags && record.tags.length ?
          <>
            {record.tags.filter((item: ITag, index: number) => index < 2).map((item: any) => {
              return (<Tag key={item.name} color={item.color}>
                {item.name}
              </Tag>)
            })}
          </> : <>无标签</>
      ),
    },
    {
      title: '总提交',
      dataIndex: 'ac',
    },
    {
      title: '通过率',
      dataIndex: 'total',
    },
  ]
  return (<>
    <Table
      // pagination={false}
      columns={columns}
      rowKey='id'
      dataSource={data}
    />
  </>)
}
export default List;
