/**
 * @FileName: JudgeTag
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/16 22:21
 */
import React from "react";
import {Tag} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined, SyncOutlined} from "@ant-design/icons";

//import styles from './JudgeTag.module.scss'

interface IProps {
  status: 'ACCEPT' | 'WRONG ANSWER' | 'COMPILE ERROR'
    | 'RUNTIME ERROR' | 'TIME LIMIT EXCEEDED' | 'PENDING' | 'MEMORY LIMIT EXCEEDED' | any;
  children?:React.ReactNode;
}

interface IState {

}


const JudgeTag: React.FC<IProps> = ({status, children}) => {
  status = status || 'PENDING'
  status = status.replace('_', ' ')

  status = status.replace('_', ' ')

  // status = status === 'COMPILE_ERROR' ? 'COMPILE ERROR' : status
  const statusToColor: { [key: string]: any } = {
    'ACCEPT': {color:'#87d068', icon: <CheckCircleOutlined />},
    'WRONG ANSWER': {color:'#FF0033', icon:<CloseCircleOutlined />},
    'COMPILE ERROR': {color:'#FF3399', icon:<CloseCircleOutlined /> },
    'RUNTIME ERROR': {color:'#333399', icon:<CloseCircleOutlined />},
    'TIME LIMIT EXCEEDED': {color:'#FF6600', icon:<CloseCircleOutlined />},
    'PENDING': {color:'#99CCFF', icon:<SyncOutlined spin />},
    'MEMORY LIMIT EXCEEDED': {color:'#663366', icon:<CloseCircleOutlined />},
    'UNKNOWN ERROR': {color:'#663366', icon:<CloseCircleOutlined />},
  }

  return (<>
    <Tag color={statusToColor[status].color} icon={statusToColor[status].icon}>
      {children}
    </Tag>
  </>)
}
export default JudgeTag;
