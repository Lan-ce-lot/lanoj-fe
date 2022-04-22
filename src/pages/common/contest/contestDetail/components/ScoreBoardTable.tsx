/**
 * @FileName: ScoreBoardTable
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/13 13:31
 */
import React from "react";
import classNames from 'classnames'
import style from './ScoreBoardTable.module.scss'
import {Table} from "antd";

interface IProps {
  scoreBoardItems?: any[];
  problemAmount?: number;
  onCellClick?: (rowIndex: number, colIndex: number) => void;
  onHeaderClick?: (problemIndex: string) => void;
}

interface IState {

}

const ScoreBoardTable: React.FC<IProps> = (props) => {
  // 渲染每一行的信息
  const renderRowInfo = (value: any, record: any, index: number) => {
    const cellClassnames = classNames(style.problem_cell, {
      [style.accept]: value.isAccepted,
      [style.wrong_answer]: !value.isAccepted && value.tryAmount > 0,
      [style.accept_first]: value.isFirstAc
    })
    return (
      <div key={index} className={cellClassnames}>
        {
          value.tryAmount > 0 &&
          <div>
            <div className={style.problem_cell_time}>
              {value.timeCost !== 0 ? value.timeCost : ' '}
            </div>
            <div className={style.problem_cell_try_amount}>
              {getTryAmount(value.tryAmount)}
            </div>
          </div>
        }
      </div>
    )
  }

  // 渲染尝试数目文字
  const getTryAmount = (amount: number) => {
    return amount + (amount > 1 ? 'tries' : 'try')
  }

  // 渲染列
  const renderColumns = () => {
    let res = []
    for (let i = 0; i < props.problemAmount!; i++) {
      res.push(
        <Table.Column
          onCell={(record: any, rowIndex: number | undefined) => {
            return {

            }
          }}
          className={style.score_board_table_cell}
          key={i}
          align={'center'}
          dataIndex={['solutionInfo', i]}
          render={renderRowInfo}
          width={70} />
      )
    }
    return res
  }



  // 渲染ac数量
  const renderAcAmount = (value: number) => {
    return <div>{value}</div>
  }

  return (
    <div className={style.score_board_table}>
      <Table
        scroll={{ x: 1000 }}
        pagination={false}
        size={'middle'}
        bordered
        rowKey={'rank'}
        dataSource={props.scoreBoardItems}>
        <Table.Column
          title={'Rank'}
          align={'center'}
          fixed={'left'}
          width={65}
          render={(value: any, record: any, index: number) => index + 1} />
        <Table.Column
          title={"team"}
          dataIndex={'teamInfo'}
          align={'center'}
          fixed={'left'}
          width={160} />
        <Table.Column
          title={'AC'}
          dataIndex={'totalAcAmount'}
          render={renderAcAmount}
          align={'center'}
          fixed={'left'}
          width={50} />
        {props.scoreBoardItems!.length > 0 && renderColumns()}
        <Table.Column
          title={"penalty"}
          dataIndex={'totalTimePenalty'}
          align={'center'}
          fixed={'right'}
          width={80} />
      </Table>
    </div>
  )

}
export default ScoreBoardTable;
