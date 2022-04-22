/**
 * @FileName: Notice
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/16 22:56
 */
import React, {useEffect, useRef, useState} from "react";
import Page from "../../../components/Page/Page";
import {Button, Drawer, Form, Input, message, Popconfirm, Space, Table} from "antd";
import {initProblem, IProblem, IProblemQuery} from "../../../api/admin/problem";
import {addNotice, deleteNotice, getNoticeList, INotice, INoticeQuery, updateNotice} from "../../../api/admin/notice";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT, validateMessages} from "../../../config/config";
import {SearchOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import store from "../../../store";
import {useForm} from "antd/es/form/Form";

//import styles from './Notice.module.scss'

interface IProps {

}

interface IState {

}

const Notice: React.FC<IProps> = ({}) => {

  const [form] = useForm()
  const
    [list, setList] = useState<INotice[]>(
      []
    ),
    [currentRow, setCurrentRow] = useState<INotice>(),
    [model, setModel] = useState<string>('create'),
    [loading, setLoading] = useState<boolean>(false),
    [total, setTotal] = useState<number>(0),
    [listQuery, setListQuery] = useState<INoticeQuery>({
      pageSize: 10,
      current: 1,
      name: '',
    }),
    [visible, setVisible] = useState(false);
  const columns = [
    {
      dataIndex: 'id',
      title: 'id'
    },
    {
      dataIndex: 'title',
      title: '公告标题',
      // render: (text: any, record: any) =>
      //   <>
      //     <Button
      //       size={"small"}
      //       type={"link"}
      //       onClick={() => {
      //         setVisible(true)
      //
      //       }
      //       }
      //     >{text}</Button>
      //   </>

    },
    // {
    //   dataIndex: 'content',
    //   title: '公告内容',
    //   ellipsis: {
    //     showTitle: true,
    //   },
    // },
    {
      dataIndex: 'username',
      title: '创建人',
    },
    {
      title: <span>创建时间</span>,
      dataIndex: 'createdAt',
      // ellipsis: {
      //   showTitle: true,
      // },
      // width: '18%',
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
      width: '15%',
      render: (text: any, record: any) => {
        return (
          <>
            <Button type={"link"} size={"small"}
                    onClick={
                      handleEdit.bind(null, record)}
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
  const handleDelete = (row: INotice) => {
    deleteNotice(row.id!).then(res => {
      message.success(res.data.msg)
      fetchData()
    })
  }
  const handleEdit = (row: INotice) => {
    setCurrentRow(row)
    form.setFieldsValue(row)
    setModel('update')
    setVisible(true)
  }
  const handleSubmitNotice = (form: any) => {
    if (model === 'update') {
      updateNotice({...currentRow, ...form}).then(res => {
        message.success(res.data.msg)
        fetchData()
      })
    } else if (model === 'create') {
      addNotice({...form, userId: store.getState().user.id}).then(res => {
        message.success(res.data.msg)
        fetchData()
      })
    }

  }
  const fetchData = () => {
    setLoading(true)
    getNoticeList(listQuery).then(res => {
      const {data} = res.data
      setList(data.records)
      setTotal(data.total)
      setLoading(false)
    })
  }

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
  return (<Page inner>
    <Input.Search
      allowClear
      enterButton
      style={{width: 200}}
      // onChange={filterNameChange}
      placeholder={'题目名'}
      onClick={fetchData}
    />

    <Button style={{display: "flex", float: "right"}}
            onClick={() => {
              form.setFieldsValue({title: '', content: ''})
              setModel('create')
              setVisible(true)
            }}
    >创建公告</Button>
    {
      !loading &&
      <Drawer
        onClose={() => {
          // form.setFieldsValue({title: '', content: ''})
          setVisible(false)
        }}
        destroyOnClose
        title={`公告`}
        placement="right"
        visible={visible}
        extra={
          <Space>

          </Space>
        }
      >
        <Form
          form={form}
          validateMessages={validateMessages}
          onFinish={handleSubmitNotice}
          layout={'vertical'}
        >
          <Form.Item
            // rules={}
            rules={[{required: true},]}
            label={'公告标题'}
            name={'title'}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            rules={[{required: true},]}
            label={'公告内容'}
            name={'content'}
          >
            <TextArea
              maxLength={500}
              placeholder=""
              autoSize={{minRows: 4, maxRows: 6}}
              showCount
            />
          </Form.Item>
          <Form.Item>
            <Button
              // onClick={() => {
              //
              // }}
              type={"primary"} htmlType={"submit"}>保存</Button>
          </Form.Item>
        </Form>

      </Drawer>
    }

    <br/>
    <br/>
    <Table
      dataSource={list}
      bordered
      columns={columns}
      rowKey={(record) => '' + record.id!}
      loading={loading}
      scroll={{x: 900}}
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
    />
  </Page>)
}
export default Notice;
