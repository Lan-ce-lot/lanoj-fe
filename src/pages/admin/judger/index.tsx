/**
 * @FileName: Judger
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/16 14:31
 */
import React, {useEffect, useState} from "react";
import Page from "../../../components/Page/Page";
import {deleteProblem, getProblemList, initProblem, IProblem, IProblemQuery} from "../../../api/admin/problem";
import {Link, useNavigate} from "react-router-dom";
import {ITag} from "../../../api/admin/tag";
import {Badge, Button, Form, Input, InputNumber, message, Modal, Popconfirm, Select, Table, Tag} from "antd";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT, validateMessages} from "../../../config/config";
import {SearchOutlined} from "@ant-design/icons";
import {
  addJudger,
  deleteJudger,
  getJudgerDetail,
  getJudgerList,
  IJudger,
  IJudgerQuery
} from "../../../api/admin/judger";
import {useForm} from "antd/es/form/Form";

//import styles from './Judger.module.scss'
const {Option} = Select

interface IProps {

}

interface IState {

}

const Judger: React.FC<IProps> = ({}) => {
  const [list, setList] = useState<IJudger[]>(
    []
  )
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IJudgerQuery>({
    pageSize: 10,
    current: 1,
    name: '',
  })
  // let _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  const navigate = useNavigate()
  const columns = [
    {
      title: <span>id</span>,
      dataIndex: 'id',
      width: '7%',
    },
    {
      title: <span>判题机名</span>,
      dataIndex: 'name',
      render: (text: any, record: any) => <Link to={`/admin/judger/${record.id}`}>{text}</Link>,
    },
    {
      title: <span>状态</span>,
      dataIndex: 'tags',
      render: (text: any, record: any) => (
        <>
          <Tag color={"processing"}>
            <Badge status={"processing"}/>正常
          </Tag>
        </>
      ),
    },
    {
      title: <span>Cpu核心数</span>,
      render: (text: any, record: any) => {
        return (
          <>
            1
          </>

        )
      },
    },
    {
      title: <span>判题个数</span>,
      render: (text: any, record: any) => {
        return (
          <>
            1
          </>

        )
      },
    },
    {
      title: <span>内存消耗</span>,
      render: (text: any, record: any) => {
        return (
          <>
          </>
        )
      },
    },
    {
      title: <span>创建时间</span>,
      dataIndex: 'createdAt',
      width: '15%',
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
      width: '11%',
      render: (text: any, record: any) => {
        return (
          <>
            <Button type={"link"} size={"small"}
                    onClick={
                      () => {
                        navigate(`/admin/judger/${record.id}`)
                      }
                    }
            >
              查看
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

  const fetchData = () => {
    setLoading(true);
    getJudgerList(listQuery).then((res) => {

      // if (_isMounted) {
      setList(res.data.data.records);
      setTotal(res.data.data.total)
      setLoading(false);
      // }
    });
  };
  const [form] = Form.useForm();
  const filterNameChange = (e: any) => {
    setListQuery({
      ...listQuery,
      name: e.target.value
    })
  };

  const handleOk = () => {
    const judger: IJudger = form.getFieldsValue(true)
    console.log(judger)
    // console.log(form.getFieldValue('url'))
    addJudger({...judger, baseUrl: 'http://' + judger.baseUrl}).then(res => {
      const {data} = res.data
      message.success(data.msg)
      setIsModalVisible(false);
      fetchData()
    })

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    fetchData()
  }, [listQuery])
  const changePage = (current: number, pageSize: number) => {
    setListQuery({
      ...listQuery,
      current,
      pageSize
    })
  };
  const handleDelete = (row: any) => {
    setLoading(true)
    deleteJudger(row.id).then(res => {
      setLoading(false)
      message.success("删除成功")
      fetchData();
    })
  }


  return (
    <Page inner>
      <div className="app-container">
        <Form
          layout="inline"
        >
          <Form.Item name="name">
            <Input
              allowClear
              onChange={filterNameChange}
              placeholder={'题目名'}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" icon={<SearchOutlined/>} onClick={fetchData}>
              搜索
            </Button>
          </Form.Item>
          <Button onClick={() => {
            setIsModalVisible(true)
          }}>新建</Button>
          <Modal
            title="添加评测机"
            // width={1000}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={'确认'}
            cancelText={'取消'}
            // footer={null}
            destroyOnClose={true}
          >
            <Form
              validateMessages={validateMessages}
              form={form}
            >
              <Form.Item
                rules={[{required: true},]}
                label={'名称'}
                name={'name'}
              >
                <Input style={{width: '100%'}} type="text"/>
              </Form.Item>
              <Form.Item
                rules={[{required: true},]}
                label={'地址'}
                name={'baseUrl'}
              >

                <Input addonBefore="https://" style={{width: '100%'}} type="text"/>
                {/*<Input.Group compact>*/}
                {/*  <Select style={{width: '30%'}} defaultValue="http://">*/}
                {/*    <Option value="http://">Http://</Option>*/}
                {/*    <Option value="https://">Https://</Option>*/}
                {/*  </Select>*/}
                {/*  <Input id={'name'} style={{width: '70%'}} type="text"/>*/}
                {/*</Input.Group>*/}
              </Form.Item>
              <Form.Item
                rules={[{required: true},]}
                name={'port'}
                label={'端口'}
              >
                <InputNumber min={0} max={50000}/>
              </Form.Item>
            </Form>
          </Modal>
        </Form>
        <br/>
        <Table
          dataSource={list}
          bordered
          columns={columns}
          rowKey={(record) => '' + record.id!}
          loading={loading}
          scroll={{x: 1100}}
          pagination={{
            total: total,
            pageSizeOptions: ["10", "20", "40"],
            showTotal: total => `共${total}条数据`,
            onChange: changePage,
            current: listQuery.current,
            showSizeChanger: true,
            showQuickJumper: true,
            hideOnSinglePage: true
          }}
        >
        </Table>
      </div>
    </Page>
  );

}
export default Judger;

