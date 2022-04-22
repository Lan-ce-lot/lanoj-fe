/**
 * @FileName: ExerciseRank
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/11 16:28
 */
import React, {useEffect, useState} from "react";
import {Avatar, Card, Empty, Space, Table, Tooltip} from "antd";
import {Link, useParams} from "react-router-dom";

import styles from './ExerciseRank.module.scss'
import classNames from "classnames";

import {Dispatch} from "redux";

import {connect} from "react-redux";
import moment from "moment";
import {getContestRank, IContestRank, initRank} from "../../../../../../../api/common/contestRank";
import {EMPTY_IMAGE} from "../../../../../../../config/config";
import {changeLoading} from "../../../../../../../store/actions";


interface IProps {
  loading?: boolean;
}

interface IState {

}

const ExerciseRank: React.FC<IProps> = ({loading}) => {
  const contestId = useParams().exerciseId
  const [rank, setRank] = useState<IContestRank>(
    initRank
  );
  const fetchData = () => {
    getContestRank(Number(contestId)).then(res => {
      const {data} = res.data
      setRank(data)
    })
  }
  useEffect(() => {
    fetchData()
  }, [])

  const renderRowInfo = (text: any, record: any) => {
    console.log(text)
    const cellClassnames = classNames(styles.problem_cell, {
      [styles.accept_first]: text.isFirstAc,
      [styles.accept]: text.isAccepted,
      [styles.wrong_answer]: !text.isAccepted && text.tryAmount > 0,
    })
    let time = moment.duration(text.timeCost / 60, 'seconds')  //得到一个对象，里面有对应的时分秒等时间对象值
    let hours = time.hours()
    let minutes = time.minutes()
    let seconds = time.seconds()
    return (text.isAccepted ?
        <div className={cellClassnames}>
          <div className={styles.time}>
            <Tooltip title={moment({h: hours, m: minutes, s: seconds}).format('HH:mm:ss')}>

              {(text.timeCost).toFixed()}
            </Tooltip>

          </div>
          <div className={styles.try}>
            {text.tryAmount} try
          </div>
        </div> : !text.isAccepted && text.tryAmount > 0 ? <div className={cellClassnames}>
          <div className={styles.time}>
          </div>
          <div className={styles.try}>
            {
              text.tryAmount > 1 ? `${text.tryAmount} tries` : `${text.tryAmount} try`
            }
          </div>
        </div> : <div className={cellClassnames}>
        </div>
    )
  }
  let columns: any[] = [
    {
      title: <span>排名</span>,
      dataIndex: 'rank',
      key: 'rank',
      width: 65,
      align: 'center',
      // width: '7%',
      fixed: 'left',
    },
    {
      title: <span>用户</span>,
      dataIndex: 'teamInfo',
      key: 'username',
      fixed: 'left', align: 'center',
      width: 100,
      render: (text: any, record: any) => <>
        <Space>
          <Avatar src={record.teamInfo.avatar}/>
          <Link to={`/user/${record.teamInfo.id}`}>{record.teamInfo.username}</Link>
        </Space>
      </>,
    },
    {
      title: <span>AC</span>,
      dataIndex: 'totalAcAmount',
      key: 'totalAcAmount', align: 'center',
      width: 50,
    },
  ]
  rank.participants.length && rank.participants[0].solutionInfo.map((it: any, key: any) => {
    columns.push(
      {
        title: <span>{String.fromCharCode('A'.charCodeAt(0) + key)}</span>,
        dataIndex: "solutionInfo",
        width: 60, align: 'center',
        // width: 150,
        // style: {padding: 0, backgroundColor:"#fff"},
        key: "" + key,
        render: (text: any, record: any) => renderRowInfo(record.solutionInfo[key], record),
      }
    )
  })
  columns = [...columns, {
    title: <span>罚时</span>,
    dataIndex: 'totalTimePenalty',
    key: 'totalTimePenalty',
    fixed: 'right', align: 'center',
    width: 80,
    render: (text: any) =>
      <>{(text).toFixed()}</>
  }]
  return (<>
    <div
      className={styles.score_board_table}
    >
      {
        rank.participants.length ?
          <Table
            pagination={false}
            size={'middle'}
            bordered
            rowKey='rank'
            columns={columns}
            loading={loading}
            // size={'large'}
            dataSource={rank.participants}
            scroll={{x: 1000}}
          /> : <Empty image={EMPTY_IMAGE}/>

      }

    </div>

  </>)
}

const mapStateToProps = (state: any) => {
  return {
    ...state.app,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setLoading(loading: boolean) {
      dispatch(changeLoading(loading))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExerciseRank);
