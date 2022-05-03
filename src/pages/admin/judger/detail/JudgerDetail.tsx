/**
 * @FileName: JudgerDetail
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/3 0:28
 */
import React, {useEffect, useState} from "react";
import {Badge, Descriptions, Input, Tag, Tooltip} from "antd";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../../config/config";
import {Controlled as CodeMirror} from "react-codemirror2";
import Page from "../../../../components/Page/Page";
import {getJudgerDetail, IJudger} from "../../../../api/admin/judger";
import {useParams} from "react-router-dom";

//import styles from './JudgerDetail.module.scss'

interface IProps {

}

interface IState {

}

const JudgerDetail: React.FC<IProps> = ({}) => {
  const [judger, setJudger] = useState<IJudger>()
  const {id} = useParams()
  const fetchData = () => {
    getJudgerDetail(Number(id)).then(res => {
      const {data} = res.data
      setJudger(data)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (<Page inner>
    <Descriptions title={'判题机信息'}
      // size={'small'}
                  column={2} bordered>

      <Descriptions.Item label="名称">{judger?.name}</Descriptions.Item>
      <Descriptions.Item label="编号">{judger?.id}</Descriptions.Item>
      <Descriptions.Item label="状态">
        {
          judger?.isActive ?
            <Tag color={"processing"}><Badge status={"processing"}/>
              运行中
            </Tag> :

            <Tag color={"error"}>
              <Badge status={"error"}/>
              已停止
            </Tag>
        }
      </Descriptions.Item>
      <Descriptions.Item label="地址">{judger?.baseUrl}</Descriptions.Item>
      <Descriptions.Item label="端口">{judger?.port}</Descriptions.Item>
      {/*<Descriptions.Item label="创建时间">*/}
      {/*  {judger?.createdAt}*/}
      {/*</Descriptions.Item>*/}
      <Descriptions.Item label="Cpu核心数" span={1}>
        {judger?.condition?.cpuCoreAmount}
      </Descriptions.Item>
      <Descriptions.Item label="CPU占用" span={1}>
        {judger?.condition?.cpuCostPercentage}%
      </Descriptions.Item>
      <Descriptions.Item label="内存占用" span={1}>
        {judger?.condition?.memoryCostPercentage}%
      </Descriptions.Item>
    </Descriptions>


  </Page>)
}
export default JudgerDetail;
