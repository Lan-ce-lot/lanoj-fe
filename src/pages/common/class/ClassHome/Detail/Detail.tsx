/**
 * @FileName: Detail
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/6 15:58
 */
import React, {useEffect, useState} from "react";
import {Badge, Card, Descriptions} from "antd";
import {getClassDetail, IClass} from "../../../../../api/admin/classes";
import {useParams} from "react-router-dom";
import moment from "moment";
import {DATE_TIME_FORMAT_WITHOUT_TIME} from "../../../../../config/config";

//import styles from './Detail.module.scss'

interface IProps {

}

interface IState {

}

const Detail: React.FC<IProps> = ({}) => {
  const {classId} = useParams();
  const [classDetail, setClassDetail] = useState<IClass>();
  const fetchData = () => {
    getClassDetail(Number(classId)).then(res => {
      const {data} = res.data
      setClassDetail(data)
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <Card>
      <Descriptions
        // size={"small"}
        title="班级信息" bordered
        column={1}
      >
        <Descriptions.Item label="名称">{classDetail?.name}</Descriptions.Item>
        <Descriptions.Item label="老师">{classDetail?.creatorName}</Descriptions.Item>
        <Descriptions.Item label="班级人数">{classDetail?.memberNumber}</Descriptions.Item>
        <Descriptions.Item label="练习数">{classDetail?.exerciseNumber}</Descriptions.Item>
        <Descriptions.Item label="状态">
          <Badge status={"processing"} text="正常"/>
        </Descriptions.Item>
        <Descriptions.Item
          label="创建时间">{moment(classDetail?.createdAt).format(DATE_TIME_FORMAT_WITHOUT_TIME)}</Descriptions.Item>
      </Descriptions>
    </Card>)
}
export default Detail;
