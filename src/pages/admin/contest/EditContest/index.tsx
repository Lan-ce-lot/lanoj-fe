/**
 * @FileName: EditContest
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/30 10:27
 */
import React, {useEffect, useState} from "react";
import Page from "../../../../components/Page/Page";
import {Button, Col, DatePicker, Divider, Form, Input, message, Modal, Popconfirm, Row, Table, Tag} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useForm} from "antd/es/form/Form";
import {
  addContest,
  getContestDetail,
  getContestList,
  getContestProblem, IContestProblemListQuery,
  updateContest
} from "../../../../api/admin/contest";
import {DEFAULT_DATE_TIME_FORMAT, validateMessages} from "../../../../config/config";
import {Link, useParams} from "react-router-dom";
import moment from "moment";
import {deleteProblem, initProblem, IProblemQuery} from "../../../../api/admin/problem";
import {deleteContestProblem, IContestProblem} from "../../../../api/admin/contestProblem";
import {ITag} from "../../../../api/admin/tag";
import ProblemModal from "./components/ProblemModal";

const {RangePicker} = DatePicker;

//import styles from './EditContest.module.scss'

interface IProps {

}

interface IState {

}

const EditContest: React.FC<IProps> = ({}) => {
  const {id} = useParams();
  const [form] = useForm();

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IContestProblemListQuery>({
    pageSize: 10,
    current: 1,
    contestId: Number(id)
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
    deleteContestProblem({problemId:row.id, contestId:Number(id)}).then(res => {
      setLoading(false)
      message.success("删除成功")
      fetchData();
    })
  }
  const handleOnSubmit = () => {
    updateContest({
      ...form.getFieldsValue(true)
      , startTime: form.getFieldValue('time')[0].format(DEFAULT_DATE_TIME_FORMAT)
      , endTime: form.getFieldValue('time')[1].format(DEFAULT_DATE_TIME_FORMAT)
      , id
    }).then(res => {
      if (res.data.code === 200) {
        message.success('更新比赛成功')
      }
    })
  }

  const fetchData = () => {
    setLoading(true)
    getContestDetail(Number(id)).then((res) => {
      // console.log(res.data.data)
      const {data} = res.data
      console.log(data)
      form.setFieldsValue({
          ...data,
          time: [moment(data.startTime), moment(data.endTime)]
        }
      )
    })
    getContestProblem(listQuery).then(res => {

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
    setIsModalVisible(false);
  };
  useEffect(() => {
    fetchData()
  }, [])


  return (
    <Page inner>
      <Divider orientation="left">基本信息</Divider>
      <Form
        validateMessages={validateMessages}
        form={form}
        onFinish={handleOnSubmit}
      >
        <Row gutter={24}>
          <Col lg={12}>
            <Form.Item
              rules={[{required: true},]}
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
              rules={[{required: true},]}
              label={'时间限制'}
              name={'time'}
            >
              <RangePicker showTime
                           placeholder={['开始时间', '结束时间']}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          rules={[{required: true},]}
          label={'内容描述'}
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
        // scroll={{x: 1200}}
        // pagination={{
        //   total: total,
        //   pageSizeOptions: ["10", "20", "40"],
        //   showTotal: total => `共${total}条数据`,
        //   onChange: changePage,
        //   current: listQuery.current,
        //   showSizeChanger: true,
        //   showQuickJumper: true,
        //   hideOnSinglePage: true
        // }}
      />
    </Page>)

}
export default EditContest;
