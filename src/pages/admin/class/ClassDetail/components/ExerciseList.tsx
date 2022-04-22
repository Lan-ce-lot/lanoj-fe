/**
 * @FileName: Exercise
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/6 16:48
 */
import React, {useEffect, useState} from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Modal, Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  TimePicker
} from "antd";
import {IProblemQuery} from "../../../../../api/admin/problem";
import {
  createExercise, deleteExercise, getExercisePage, getExerciseProblem,
  IExercise,
  IExerciseQuery,
  IJoinClass,
  IJoinClassQuery,
  initJoinClass,
  initMember
} from "../../../../../api/admin/classes";
import {Link, useNavigate, useParams} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {useForm} from "antd/es/form/Form";
import {number} from "prop-types";
import {ContestStatusToCN, ContestStatusToColorMap} from "../../../../../common/map";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../../../config/config";
import {addContest} from "../../../../../api/admin/contest";

//import styles from './Exercise.module.scss'
const {RangePicker} = DatePicker;

interface IProps {

}

interface IState {

}

const Exercise: React.FC<IProps> = ({}) => {

  const navigate = useNavigate();
  const {classId} = useParams();
  const [list, setList] = useState<IExercise[]>(
  )
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IExerciseQuery>({
    pageSize: 10,
    current: 1,
    classId: Number(classId),
    name: '',
  })
  const [form] = useForm();
  const handleDelete = (record: any) => {
    deleteExercise(record.id).then(res => {
      const {data} = res.data
      message.success(res.data.msg)
      fetchData()
    })
  }
  const handleOnSubmit = () => {
    const time = [moment(form.getFieldValue('time')[0]).format(DEFAULT_DATE_TIME_FORMAT),
      moment(form.getFieldValue('time')[1]).format(DEFAULT_DATE_TIME_FORMAT),
    ]

    createExercise({
      ...form.getFieldsValue(true)
      , startTime: time[0]
      , endTime: time[1],
      classId: Number(classId)
    }).then(res => {
      message.success(res.data.msg)
      setModalVisible(false)
      fetchData()
    })
  }

  const fetchData = () => {
    getExercisePage(listQuery).then(res => {
      const {data} = res.data
      setList(data.records)
      setTotal(data.total)
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  const columns = [
    {
      dataIndex: 'name',
      title: '标题',
    },
    {
      dataIndex: 'personNumber',
      title: '参与人数'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: ((text: any, record: any) => <>
        {
          <Tag color={ContestStatusToColorMap[text]}><Badge
            status={ContestStatusToColorMap[text]}/>{ContestStatusToCN[text]}</Tag>
        }
      </>)
    },
    {
      title: <span>开始时间</span>,
      dataIndex: 'startTime',
      width: '18%',
      render: (text: any, record: any) => {
        return (
          <>
            {moment(text).format(DEFAULT_DATE_TIME_FORMAT)}
          </>
        )
      },
    },
    {
      title: <span>结束时间</span>,
      dataIndex: 'endTime',
      width: '18%',
      render: (text: any, record: any) => {
        return (
          <>
            {moment(text).format(DEFAULT_DATE_TIME_FORMAT)}
          </>
        )
      },
    },
    {
      title: '操作',
      fixed: 'right' as const,
      width: '12%',
      render: (text: any, record: any) => {
        return (
          <>
            <Button type={"link"} size={"small"}
                    onClick={
                      () => {
                        navigate(`exercise/${record.id}`)
                      }
                    }
            >
              编辑
            </Button>
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
  return (<>
    <Card
      // size={"small"}
      title={'练习'}
      extra={
        <>
          {/*<Row gutter={[24, 2]}>*/}
          {/*  <Col>*/}
          {/*    */}
          {/*  </Col>*/}
          <Space>
            <Input.Search
              placeholder={'输入练习标题'}
            />
            <Button
              onClick={() => setModalVisible(true)}
            >创建练习</Button>
          </Space>

          {/*</Row>*/}

        </>

      }
    >
      <Modal visible={modalVisible}
             destroyOnClose
             onOk={() => handleOnSubmit()}
             onCancel={() => setModalVisible(false)}
      >
        <Form
          form={form}
          // onFinish={handleOnSubmit}
        >
          <Form.Item
            wrapperCol={{span: 18}}
            name={'name'}
            label={'练习名称'}>
            <Input
              placeholder={'练习名称'}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{span: 24}}
            name={'time'}
            label={'时间限制'}>
            <RangePicker
              // style={{width:'100%'}}
              showTime
              placeholder={['开始时间', '结束时间']}
            />
          </Form.Item>
          <Form.Item
            name={'description'}
            label={'内容描述'}>
            <TextArea
              showCount
              maxLength={200}
              placeholder="输入练习描述"
              autoSize={{minRows: 3, maxRows: 6}}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        dataSource={list}
        bordered
        columns={columns}
        rowKey={(record) => '' + record.id!}
        loading={loading}
        scroll={{x: 700}}
        pagination={{
          total: total,
          pageSizeOptions: ["10", "20", "40"],
          showTotal: total => `共${total}条数据`,
          // onChange: changePage,
          current: listQuery.current,
          showSizeChanger: true,
          showQuickJumper: true,
          hideOnSinglePage: true
        }}
      />
    </Card>
  </>)
}
export default Exercise;
