/**
 * @FileName: ExerciseStatus
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/11 16:22
 */
import React, {useEffect, useState} from "react";
import {Avatar, Select, Table, Tag} from "antd";
import {Link, useParams} from "react-router-dom";
import {JudgeConditionMap} from "../../../../../common/map";
import store from "../../../../../store";
import {getSubmissionList, ISubmissionProps, ISubmissionQuery} from "../../../../../api/common/submission";
import {JudgeCondition} from "../../../../../common/enumerations";
import {getContestSubmissionList, IContestSubmissionQuery} from "../../../../../api/common/contestSubmission";

//import styles from './ExerciseStatus.module.scss'

interface IProps {

}

interface IState {

}
export const SUBMISSION_REQUEST_TASK_TIME: number = 4000;
const ContestStatus: React.FC<IProps> = ({}) => {
  const {contestId} = useParams()
  const columns: any[] = [
    {
      title: '#',
      dataIndex: 'id',
      width: '10%'
    },
    {
      title: '用户',
      dataIndex: 'avatar',
      render: (text: any, record: any) => (
        <>
          <span style={{marginLeft: '10px'}}>{record.username}</span>
        </>
      ),
    },
    {
      title: '题目',
      dataIndex: 'problemName',
    },
    {
      title: '状态',
      dataIndex: 'judgeCondition',
      width: '9%',
      render: (text: any, record: any) => (
        <>
          <Tag {...JudgeConditionMap[text]}>
            {/*{text}*/}
            {JudgeConditionMap[text].name}
          </Tag>
        </>
      ),
    },
    {
      title: '语言',
      dataIndex: 'language',
    },
    {
      title: '运行时间',
      dataIndex: 'timeCost',
      render: (text: any, record: any) => (
        <>
          {
            text ?
              `${text}ms`
              :
              `----`
          }
        </>
      ),
    },
    {
      title: '运行内存',
      dataIndex: 'memoryCost',
      render: (text: any, record: any) => (
        <>
          {
            text ?
              `${text}KB`
              :
              `----`
          }

        </>
      ),
    },
    {
      title: '提交时间',
      dataIndex: 'createdAt',
    }
  ]

  const problemId = useParams()
  const userId = store.getState().user.id
  const [datas, setDatas] = useState<ISubmissionProps[]>([]
  )

  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IContestSubmissionQuery>({
    pageSize: 10,
    current: 1,
    userId: undefined,
    problemId: undefined,
    username: '',
    status: '',
    contestId: Number(contestId)
  })
  const fetchData = () => {
    getContestSubmissionList(listQuery).then((res) => {
      if (res.data.code === 200) {
        setDatas(res.data.data.records)
        // console.log(res.data)
      } else {
      }
    })
  }
  const statusSelect = []
  for (let judgeConditionKey in JudgeCondition) {
    statusSelect.push(
      <Select.Option {...JudgeCondition[judgeConditionKey]} />
    )
  }
  const filterStatusChange = (value: string) => {
    setListQuery({
      ...listQuery,
      status: value
    })
  };

  const filterUsernameChange = (e: any) => {
    setListQuery({
      ...listQuery,
      username: e.target.value
    })
  };

  useEffect(() => {
    fetchData()
  }, [listQuery])

  // 管理轮询任务
  useEffect(() => {
    const id = setInterval(() => {
      fetchData()
    }, SUBMISSION_REQUEST_TASK_TIME);
    return () => {
      // 轮询任务id不能由useState管理，
      // 否则组件销毁再来执行clearInterval会造成id为undefined的情况
      clearInterval(id);
    }
    // eslint-disable-next-line
  }, []);


  return (<>
    <Table
      scroll={{x: 1200}}
      rowKey='id'
      columns={columns}
      dataSource={datas}
      pagination={{
        defaultPageSize: 5,
        pageSizeOptions: ["5", "10", "20"],
        showTotal: total => `共${total}条数据`,
        // onShowSizeChange: changePageSize,
        showSizeChanger: true,
        showQuickJumper: true,
        // hideOnSinglePage: true
      }}
    >

    </Table>
  </>)
}
export default ContestStatus;
