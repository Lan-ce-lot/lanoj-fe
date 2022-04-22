/**
 * @FileName: ContestRank
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/11 16:28
 */
import React, {useEffect, useState} from "react";
import {Avatar, Card, Empty, Space, Table, Tooltip} from "antd";
import {Link, useParams} from "react-router-dom";

import styles from './ContestRank.module.scss'
import classNames from "classnames";
import {getContestRank, IContestRank, initRank} from "../../../../../api/common/contestRank";
import {Dispatch} from "redux";
import {changeLoading} from "../../../../../store/actions";
import {connect} from "react-redux";
import moment from "moment";
import {EMPTY_IMAGE} from "../../../../../config/config";

interface IProps {
  loading?: boolean;
}

interface IState {

}

const ContestRank: React.FC<IProps> = ({loading}) => {
  const {contestId} = useParams()
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
      width: 70, align: 'center',
      fixed: 'left',
    },
    {
      title: <span>用户</span>,
      dataIndex: 'teamInfo',
      key: 'username',
      width: 150, align: 'center',
      // width: '7%',
      fixed: 'left',
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
      width: 100, align: 'center',
      key: 'totalAcAmount',
    },
  ]
  rank.participants.length && rank.participants[0].solutionInfo.map((it: any, key: any) => {
    columns.push(
      {
        title: <span>{String.fromCharCode('A'.charCodeAt(0) + key)}</span>,
        dataIndex: "solutionInfo",
        width: 140, align: 'center',
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
    fixed: 'right',
    width: 100, align: 'center',
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
            // rowClassName={
            //   (record: any, index: any): string => {
            //     if (record.A === 'AC') {
            //       return styles.rankAC
            //     } else {
            //       return styles.rankWA
            //     }
            //   }
            // }
            // size={'large'}
            dataSource={rank.participants}
            scroll={{x: 1100}}
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
export default connect(mapStateToProps, mapDispatchToProps)(ContestRank);
