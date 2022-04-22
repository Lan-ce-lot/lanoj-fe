/**
 * @FileName: ProblemList
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/1 12:22
 */
import React from "react";

import { Table, Avatar } from 'antd'
import Ellipsis from '../../../../../components/Ellipsis'

interface ListProps {
  pagination:any;
  dataSource:any;
  loading:boolean;
}

const List: React.FunctionComponent<ListProps> = (props) => {

  const { ...tableProps } = props
  const columns = [
    {
      title: `Image`,
      dataIndex: 'image',
      render: (text:any) => <Avatar shape="square" src={text} />,
    },
    {
      title: `Title`,
      dataIndex: 'title',
      render: (text:any) => (
        <Ellipsis tooltip length={30}>
          {text}
        </Ellipsis>
      ),
    },
    {
      title: `Author`,
      dataIndex: 'author',
    },
    {
      title: `Categories`,
      dataIndex: 'categories',
    },
    {
      title: `Tags`,
      dataIndex: 'tags',
    },
    {
      title: `Visibility`,
      dataIndex: 'visibility',
    },
    {
      title: `Comments`,
      dataIndex: 'comments',
    },
    {
      title: `Views`,
      dataIndex: 'views',
    },
    {
      title: `Publish Date`,
      dataIndex: 'date',
    },
  ]

  return (<>
    <Table
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
        showTotal: total => `Total ${total} Items`,
      }}
      bordered
      scroll={{ x: 1200 }}
      columns={columns}
      rowKey={record => record.id}
    />
  </>)
}
export default List;
