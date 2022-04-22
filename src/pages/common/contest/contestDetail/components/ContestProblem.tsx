/**
 * @FileName: ContestProblemList
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/11 12:20
 */
import React from "react";
import {Avatar, Table} from "antd";
import {Link} from "react-router-dom";
import DropOption from "../../../../../components/DropOption/DropOption";

//import styles from './ContestProblemList.module.scss'

interface IProps {

}

interface IState {

}

const ContestProblem: React.FC<IProps> = ({}) => {
  const columns:any[] = [
    {
      title: <span>#</span>,
      dataIndex: 'avatar',
      key: 'avatar',
      width: '7%',
      fixed: 'left',
      render: (text:any) => <Avatar style={{ marginLeft: 8 }} src={text} />,
    },
    {
      title: <span>标题</span>,
      dataIndex: 'username',
      key: 'username',
      render: (text:any, record:any) => <Link to={`user/${record.id}`}>{text}</Link>,
    },
    {
      title: <span>AC</span>,
      dataIndex: 'status',
      key: 'status',
      render: (text:any) => <span>{text ? 'Male' : 'Female'}</span>,
    },
    {
      title: <span>总数</span>,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: <span>通过率</span>,
      dataIndex: 'createAt',
      key: 'createAt',
    },
  ]

  return (<>
    <Table
      columns={columns}
    >

    </Table>
  </>)
}
export default ContestProblem;
