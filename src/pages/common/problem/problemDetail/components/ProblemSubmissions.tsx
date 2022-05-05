/**
 * @FileName: ProblemSubmissions
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/11 17:32
 */
import React, {useEffect, useState} from "react";
import {Avatar, Badge, Card, Descriptions, Input, Modal, Table, Tag, Tooltip} from "antd";
import JudgeTag from "../../../../../components/JudgeTag";
import {useLocation, useParams} from "react-router-dom";
import {getSubmissionList, ISubmissionQuery} from "../../../../../api/common/submission";
import Page from "../../../../../components/Page/Page";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../../../config/config";
import {Controlled as CodeMirror} from "react-codemirror2";
import store from "../../../../../store";
import {JudgeConditionMap} from "../../../../../common/map";

// mode

//import styles from './ProblemSubmissions.module.scss'

interface IProps {

}

interface IState {

}

const options = {
  mode: 'text/x-csrc',
  tabSize: 4,
  theme: 'material',
  // 显示行号
  lineNumbers: true,
  line: true,
  // // 代码折叠
  foldGutter: true,
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
  // lineWrapping: true,
  // 选中文本自动高亮，及高亮方式
  styleSelectedText: true,
  showCursorWhenSelecting: true,
  highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
}
// 查看当前提交轮询任务间隔时间，单位为毫秒
export const SUBMISSION_REQUEST_TASK_TIME: number = 4000;
const ProblemSubmissions: React.FC<IProps> = ({}) => {
  const problemId = useParams().problemId
  const userId = store.getState().user.id
  const [datas, setDatas] = useState([])
  const [currentRow, setCurrentRow] = useState<any>()
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<ISubmissionQuery>({
    pageSize: 10,
    current: 1,
    userId: Number(userId),
    problemId: Number(problemId),
    username: '',
    status: ''
  })

  useEffect(() => {
    getSubmissionList(listQuery).then((res) => {
      if (res.data.code === 200) {
        setDatas(res.data.data.records)
        setTotal(res.data.data.total)
      } else {
      }
    })
  }, [listQuery])
  const changePage = (current: number, pageSize: number) => {
    setListQuery({
      ...listQuery,
      current,
      pageSize
    })
  };
  // 管理轮询任务
  useEffect(() => {
    const id = setInterval(() => {
      console.log(listQuery)
      getSubmissionList(listQuery).then((res) => {
        if (res.data.code === 200) {
          setDatas(res.data.data.records)
          console.log(res.data)
        } else {
        }
      });
    }, SUBMISSION_REQUEST_TASK_TIME);
    return () => {
      // 轮询任务id不能由useState管理，
      // 否则组件销毁再来执行clearInterval会造成id为undefined的情况
      clearInterval(id);
    }
    // eslint-disable-next-line
  }, [problemId, listQuery]);
  const columns: any[] = [
    {
      title: '状态',
      fixed: 'right',
      dataIndex: 'judgeCondition',
      render: (text: any, record: any) => (
        <>
          <Tag
            onClick={() => {
              setCurrentRow(record)
              setModalVisible(true)
            }}
            {...JudgeConditionMap[text]}>
            {JudgeConditionMap[text].name}
          </Tag>
        </>
      ),
    },
    {
      title: '语言',
      dataIndex: 'language',
      render: (text: any, record: any) => (
        <>
          {text === 'C_PLUS_PLUS' ? 'C++' : text}
        </>
      ),
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
              `${(text / 1024).toFixed(1)}MB`
              :
              `----`
          }

        </>
      ),
    },
    {
      title: '提交时间',
      dataIndex: 'createdAt',
      width: '30%'
    }
  ]
  return (<>
    {/*<Card>*/}
      <Table
        rowKey='id'
        columns={columns}
        scroll={{x: 550}}
        dataSource={datas}
        pagination={{
          total: total,
          defaultPageSize: 10,
          onChange: changePage,
          current: listQuery.current,
          pageSizeOptions: ["10", "20"],
          showTotal: total => `共${total}条数据`,
          // onShowSizeChange: changePageSize,
          showSizeChanger: true,
          // showQuickJumper: true,
          // hideOnSinglePage: true
        }}
      >
      </Table>
    {/*</Card>*/}
    <Modal
      destroyOnClose
      // title={'查看提交'}
      visible={modalVisible}
      footer={null}
      width={950}
      onCancel={() => {
        setModalVisible(false)
      }}
    >
      {currentRow &&
        <Descriptions title="查看提交"
                      size={'small'}
                      column={2} bordered>
          <Descriptions.Item
            label="提交时间">{moment(currentRow?.createdAt).format(DEFAULT_DATE_TIME_FORMAT)}</Descriptions.Item>
          <Descriptions.Item label="判题状态"><Tag
            {...JudgeConditionMap[currentRow.judgeCondition]}>
            {JudgeConditionMap[currentRow.judgeCondition].name}
          </Tag></Descriptions.Item>
          <Descriptions.Item label="运行时间">{currentRow.timeCost}ms</Descriptions.Item>
          <Descriptions.Item label="运行内存">{currentRow.memoryCost}KB</Descriptions.Item>
          <Descriptions.Item label="提交语言">
            {currentRow.language}
          </Descriptions.Item>
          <Descriptions.Item label="代码长度">
            {currentRow.codeContent.length}
          </Descriptions.Item>
          <Descriptions.Item label="评测机" span={2}>
            {
              currentRow.judgerName
            }
          </Descriptions.Item>

          <Descriptions.Item label="测试点" span={2}>
            {
              currentRow.judgeResult.judgeResults.map((item: any, index: number) => {
                return (<Tooltip title={`测试点 #${index + 1}`} key={item.id}>
                  <Tag
                    {...JudgeConditionMap[item.message]}>
                    {JudgeConditionMap[item.message].abbreviation}
                  </Tag>
                </Tooltip>)
              })
            }
          </Descriptions.Item>

          <Descriptions.Item label="代码" span={2}>

            <CodeMirror
              options={{...options}}
              value={currentRow.codeContent}
              onChange={(editor, data, value) => {
              }}
              onBeforeChange={(editor, data, value) => {
              }}
            />
          </Descriptions.Item>

          <Descriptions.Item label="评测机返回" span={2}>
            <Input.TextArea disabled value={currentRow.judgeResult.extraInfo} autoSize/>

          </Descriptions.Item>
        </Descriptions>

      }
    </Modal>

  </>)
}
export default ProblemSubmissions;
