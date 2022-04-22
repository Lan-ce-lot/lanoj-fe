/**
 * @FileName: SolvedProblems
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/11 17:40
 */
import React, {useEffect, useState} from "react";
import {Card, Tag} from "antd";
import {Link} from "react-router-dom";
import {getUserAcceptProblems} from "../../../../api/common/userInfo";
import {EMPTY_IMAGE} from "../../../../config/config";

//import styles from './SolvedProblems.module.scss'

interface IProps {
  userId: number;
}

interface IState {

}

const SolvedProblems: React.FC<IProps> = ({userId}) => {
  const [problems, setProblems] = useState<any[]>([])
  useEffect(() => {

    getUserAcceptProblems(userId).then(res => {
      const {data} = res.data
      setProblems(data)
    })
  }, [])
  return (<>
    <>
      {
        problems.length === 0 ? EMPTY_IMAGE :
          problems.map((item: any, key: any) => {
            return (<Tag color={"green"} key={key}>
              <Link to={`/problem/detail/${item.id}`}>
                {item.id.toString().padStart(5,'0')}
              </Link>
            </Tag>)
          })
      }
    </>
  </>)
}
export default SolvedProblems;
