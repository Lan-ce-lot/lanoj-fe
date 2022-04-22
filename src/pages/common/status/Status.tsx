import React, {useContext, useEffect, useState} from 'react'
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions, Drawer,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  Table,
  Tag,
  Tooltip
} from "antd";
import {Link, useParams} from "react-router-dom";
import {getSubmissionList, ISubmissionProps, ISubmissionQuery} from "../../../api/common/submission";
import JudgeTag from "../../../components/JudgeTag";
import Page from "../../../components/Page/Page";
import {IProblemQuery} from "../../../api/admin/problem";
import {SearchOutlined} from "@ant-design/icons";
import {JudgeCondition, LanguageType, UserRole} from "../../../common/enumerations";
import {JudgeConditionMap, LanguageTypeMap} from "../../../common/map";
import store from "../../../store";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../config/config";
import {Controlled as CodeMirror} from "react-codemirror2";


interface IProps {

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
const Status: React.FC<IProps> = ({}) => {
  const problemId = useParams()
  const userId = store.getState().user.id
  const [datas, setDatas] = useState<ISubmissionProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<ISubmissionQuery>({
    pageSize: 10,
    current: 1,
    userId: undefined,
    problemId: undefined,
    username: '',
    status: ''
  })
  const [currentRow, setCurrentRow] = useState<any>()
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const fetchData = () => {
    // console.log(listQuery)
    setLoading(true)
    getSubmissionList(listQuery).then((res) => {
      if (res.data.code === 200) {
        setDatas(res.data.data.records)
        setTotal(res.data.data.total)
      } else {
      }
      setLoading(false)
    })
  }
  const changePage = (current: number, pageSize: number) => {
    setListQuery({
      ...listQuery,
      current,
      pageSize
    })
  };
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
  }, [listQuery]);
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
      render: (text: string) =>
        <>{
          LanguageTypeMap[text].name
          // LanguageTypeMap[text].value
        }</>
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
  return (<Page>
    <Card
      title={'状态'}
      extra={<>
        <Form
          layout="inline"
        >
          <Form.Item>
            <Switch
              onChange={(checked) => {
                setListQuery({...listQuery, userId: checked ? userId : undefined})
              }
              }
              checkedChildren="我的" unCheckedChildren="全部" defaultChecked={false}/>
          </Form.Item>
          <Form.Item name="username">
            <Input
              allowClear
              onChange={filterUsernameChange}
              placeholder={'用户名'}
            />
          </Form.Item>
          <Form.Item name={'status'}>
            <Select
              showSearch
              placeholder={'状态'}
              style={{width: 120}}
              allowClear
              onChange={filterStatusChange}>
              {
                statusSelect
              }
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<SearchOutlined/>} onClick={fetchData}/>
          </Form.Item>
        </Form>
      </>}
      style={{minHeight: '410px'}}
    >
      <Table
        loading={loading}
        scroll={{x: 1100}}
        rowKey='id'
        columns={columns}
        dataSource={datas}
        pagination={{
          total: total,
          defaultPageSize: 10,
          pageSizeOptions: ["10", "20"],
          onChange: changePage,
          current: listQuery.current,
          showTotal: total => `共${total}条数据`,
          // onShowSizeChange: changePageSize,
          showSizeChanger: true,
          showQuickJumper: true,
          // hideOnSinglePage: true
        }}
      >
      </Table>
    </Card>
    <Drawer
      title="评测结果详情"
      width={750}
      // onClose={onClose}
      onClose={() => {
        setModalVisible(false)
      }}
      visible={modalVisible}
    >
      {currentRow &&
        <Descriptions
          size={'small'}
          column={2} bordered>
          <Descriptions.Item
            label="提交时间">{moment(currentRow?.createdAt).format(DEFAULT_DATE_TIME_FORMAT)}</Descriptions.Item>
          <Descriptions.Item label="判题状态"> <Tag
            {...JudgeConditionMap[currentRow.judgeCondition]}>
            {JudgeConditionMap[currentRow.judgeCondition].name}
          </Tag></Descriptions.Item>
          <Descriptions.Item label="运行时间">{currentRow.timeCost}ms</Descriptions.Item>
          <Descriptions.Item label="运行内存">{currentRow.memoryCost}KB</Descriptions.Item>
          <Descriptions.Item label="提交语言">
            {LanguageTypeMap[currentRow.language].name}
          </Descriptions.Item>
          <Descriptions.Item label="代码长度">
            {currentRow.codeContent.length}
          </Descriptions.Item>
          <Descriptions.Item label="评测机" span={2}>
            {
              currentRow.judgerId
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
                  {/*<Tag>{item.message}</Tag>*/}
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
    </Drawer>

  </Page>)
}


export default Status
