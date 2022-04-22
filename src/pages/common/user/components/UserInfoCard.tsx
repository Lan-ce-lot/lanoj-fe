import React from 'react'
import PropTypes from 'prop-types'
import {Button, Avatar, Tag, Space} from 'antd'
import CountUp from 'react-countup'
import {Color} from '../../../../utils'
import styles from './UserInfoCard.module.scss'
import {useNavigate, useParams} from "react-router-dom";
import store from "../../../../store";
import Icon, {CheckCircleOutlined, ReadOutlined} from "@ant-design/icons";
import {submit} from "../../../../assets/icon";
import {RankIcon, SubmitIcon, SubmitIconOutline} from "../../../../assets/icon/icon";

const countUpProps = {
  start: 100,
  duration: 1.0,
  useEasing: true,
  useGrouping: true,
  separator: ',',
}

interface IProps {
  avatar: string;
  username: string;
  sales?: number;
  sold?: number;
  total?: number;
  ac?: number;
  rank?: number;
  role?: string;
  articleNumber?: number;
}

const UserInfoCard: React.FC<IProps> = ({
                                          role = 'Common',
                                          username,
                                          avatar = 'https://joeschmoe.io/api/v1/random',
                                          total = 10,
                                          ac = 10,
                                          rank = 1,
                                          articleNumber = 10
                                        }) => {
  const navigate = useNavigate()
  const {id} = useParams()
  return (
    <div className={styles.user}>
      <div className={styles.header}>
        <div className={styles.headerinner}>
          <Avatar style={{border: '1px solid #eee'}} size={64} src={avatar}/>
          <h5 className={styles.name}>{username}</h5>
          <Tag color={"red"}>{role.toUpperCase()}</Tag>
        </div>
      </div>
      <div className={styles.number}>
        <div className={styles.item}>

          <p><Space><CheckCircleOutlined/>通过数</Space>
          </p>
          <p style={{color: Color.green}}>
            <CountUp end={ac} {...countUpProps} />
          </p>
        </div>
        <div className={styles.item}>
          <p><Space><SubmitIconOutline/>提交数</Space></p>
          <p style={{color: Color.blue}}>
            <CountUp end={total} {...countUpProps} />
          </p>
        </div>
      </div>
      <div className={styles.number}>
        <div className={styles.item}>
          <p><Space><RankIcon/>通过率</Space></p>
          <p style={{color: Color.green}}>
            <CountUp end={Number((total ? ac / total * 100 : 0).toFixed(2))} suffix={'%'}
                     decimals={2} {...countUpProps} />
          </p>
        </div>
        <div className={styles.item}>
          <p><Space><ReadOutlined />题解数</Space></p>
          <p style={{color: Color.blue}}>
            <CountUp end={articleNumber}/>
          </p>
        </div>
      </div>
      <div className={styles.footer}>
        {
          store.getState().user.id === id &&
          <Button type="ghost" size="large" onClick={
            () => {
              navigate(`/setting/${id}`)
            }
          }>
            修改信息
          </Button>
        }
      </div>
    </div>
  )
}

export default UserInfoCard
