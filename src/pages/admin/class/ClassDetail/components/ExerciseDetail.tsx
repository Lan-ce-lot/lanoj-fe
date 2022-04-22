/**
 * @FileName: ExerciseDetail
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/10 18:50
 */
/**
 * @FileName: index
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/23 14:47
 */
import React, {useEffect, useState} from "react";

import {Button, Col, Divider, Form, Input, message, Popconfirm, Row, Table, Tag} from "antd";
import {DatePicker} from 'antd';
import TextArea from "antd/es/input/TextArea";

import {useForm} from "antd/es/form/Form";

import {Link, useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../../../config/config";
import Page from "../../../../../components/Page/Page";
import {deleteContestProblem, IContestProblem} from "../../../../../api/admin/contestProblem";
import {ITag} from "../../../../../api/admin/tag";
import {
  deleteExerciseProblem,
  getExercise, getExerciseProblem,
  IExerciseProblemListQuery,
  updateExercise
} from "../../../../../api/admin/classes";
import ProblemModal from "./ProblemModal";

const {RangePicker} = DatePicker;

//import styles from './index.module.scss'

interface IProps {

}

interface IState {

}

const AddContest: React.FC<IProps> = ({}) => {
  const {exerciseId} = useParams();
  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IExerciseProblemListQuery>({
    pageSize: 10,
    current: 1,
    exerciseId: Number(exerciseId)
  })
  const [problemList, setProblemList] = useState<IContestProblem>()
  const [contest, setContest] = useState()
  const columns = [
    {
      title: '序号',
      // dataIndex:

    },
    {
      title: '题目id',
      dataIndex: 'id',
    },
    {
      title: '题目',
      dataIndex: 'name',
      render: (text: any, record: any) => (
        <Link to={`/problem/detail/${record.id}`}>
          {record.name}
        </Link>
      )
    },
    {
      title: <span>标签</span>,
      dataIndex: 'tags',
      render: (text: any, record: any) => (
        record && record.tags && record.tags.length ?
          <>
            {record.tags.filter((item: ITag, index: number) => index < 2).map((item: any) => {
              return (<Tag key={item.name} color={item.color}>
                {item.name}
              </Tag>)
            })}
          </> : <>无标签</>
      ),
    },
    {
      title: '总提交',
      dataIndex: 'ac',
    },
    {
      title: '通过率',
      dataIndex: 'total',
    },
    {
      title: '操作',
      fixed: 'right' as const,
      width: '15%',
      render: (text: any, record: any) => {
        return (
          <>
            <Popconfirm placement="top" title={'确认删除'}
                        onConfirm={handleDelete.bind(null, record)}
                        okText="确认"
                        cancelText="取消">
              <Button type={"link"} danger size={"small"}
              >删除</Button>
            </Popconfirm>
          </>
        )
      },
    },
  ]
  const handleDelete = (row: any) => {
    setLoading(true)
    setLoading(false)
    deleteExerciseProblem({problemId: row.id, contestId: Number(exerciseId)}).then(res => {
      setLoading(false)
      message.success("删除成功")
      fetchData();
    })
  }
  const handleOnSubmit = () => {
    updateExercise({
      ...form.getFieldsValue(true)
      , startTime: form.getFieldValue('time')[0].format(DEFAULT_DATE_TIME_FORMAT)
      , endTime: form.getFieldValue('time')[1].format(DEFAULT_DATE_TIME_FORMAT)
      , id: Number(exerciseId)
    }).then(res => {
      if (res.data.code === 200) {
        message.success(res.data.msg)
      }
    })
  }

  const fetchData = () => {
    setLoading(true)
    getExercise(Number(exerciseId)).then((res) => {
      // console.log(res.data.data)
      const {data} = res.data
      console.log(data)
      form.setFieldsValue({
          ...data,
          time: [moment(data.startTime), moment(data.endTime)]
        }
      )
    })
    getExerciseProblem(listQuery).then(res => {

      const {data} = res.data
      setProblemList(data.records)
      setTotal(data.total)
      setLoading(false)
    })
  }
  const handleOk = () => {


    setIsModalVisible(false);
  };

  const handleCancel = () => {
    fetchData()
    setIsModalVisible(false);
  };
  useEffect(() => {
    fetchData()
  }, [])


  return (
    <Page inner>
      <Divider orientation="left">基本信息</Divider>
      <Form
        form={form}
        onFinish={handleOnSubmit}
      >
        <Row gutter={24}>
          <Col lg={12}>
            <Form.Item
              name={'name'}
              label={'比赛名称'}
            >
              <Input
                placeholder={'比赛名称'}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={12}>
            <Form.Item
              label={'时间限制'}
              name={'time'}
            >
              <RangePicker showTime
                           placeholder={['开始时间', '结束时间']}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label={'内容描述'}
                   name={'description'}
        >
          <TextArea
            showCount
            maxLength={200}
            placeholder="输入比赛描述"
            autoSize={{minRows: 3, maxRows: 6}}
          />
        </Form.Item>
        <Form.Item>
          <Button type={"primary"} htmlType={"submit"}>
            保存
          </Button>
        </Form.Item>
      </Form>
      <Divider orientation="left">比赛题目</Divider>
      <Row gutter={24}>
        <Col lg={20}>
        </Col>
        <Col lg={4}>
          <Button
            onClick={() => {
              setIsModalVisible(true)
            }}
          >增加题目</Button>
          <ProblemModal isModalVisible={isModalVisible}

                        handleCancel={handleCancel}

          />

        </Col>
      </Row>
      <br/>
      <Table
        dataSource={problemList as any}
        columns={columns}


        rowKey={(record) => '' + record.id!}
        loading={loading}
      />
    </Page>)
}
export default AddContest;

