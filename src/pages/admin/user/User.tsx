/**
 * @FileName: user
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/2 16:14
 */
import React, {Component, useEffect, useState} from "react";
import {
  Table,
  Tag,
  Form,
  Button,
  Input,
  message,
  Select,
  Modal, Rate, DatePicker, Row, Avatar, Space, Badge, Popconfirm, Skeleton
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import {tableList, deleteItem, editItem} from "../../../api/admin/table";
import Page from "../../../components/Page/Page";
import moment from "moment";
import {useForm} from "antd/es/form/Form";
import {Link, useNavigate} from "react-router-dom";
import {
  DATE_TIME_FORMAT_BY_HOUR,
  DATE_TIME_FORMAT_WITHOUT_TIME,
  DEFAULT_DATE_TIME_FORMAT
} from "../../../config/config";
import {deleteUser, getUserList, IUser, IUserListQuery} from "../../../api/admin/user";
import {IPageQuery} from "../../../models/Pagination";
import {RoleToColorMap, UserStatusToColorMap} from "../../../common/map";
import {UserRole} from "../../../common/enumerations";

// const {Column} = Table;
// const {Panel} = Collapse;

//import styles from './user.module.scss'

interface IProps {

}

const InitUser: IUser =
  {
    id: 1,
    username: 'lancel',
    email: 'email',
    avatar: 'a',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: '正常',
    role: {
      id: 1,
      name: 'Root',
    }
  }

let _isMounted = false;

const User: React.FC<IProps> = (props) => {
  const [list, setList] = useState<IUser[]>([
    InitUser
  ])
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IUserListQuery>({
    pageSize: 10,
    current: 1,
    username: "",
    role: "",
    status: ""
  })
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false)
  const [editModalLoading, setEditModalLoading] = useState<boolean>(false)
  const [currentRowData, setCurrentRowData] = useState<IUser>(
    InitUser
  )
  // let _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  const [form] = useForm();
  const navigate = useNavigate()

  const columns = [
    {
      title: <span>用户名</span>,
      dataIndex: 'username',
      width: '15%',
      fixed: 'left' as const,

      showSorterTooltip: {title: '排序'},
      sorter: (a: IUser, b: IUser) => a.username.localeCompare(b.username)   ,
      render: (text: any, record: any) => (<>
        <Space>
          <Avatar style={{marginLeft: 8}} src={record.avatar}/>
          <Link to={`${record.id}`}>{text}</Link>
        </Space>

      </>),
    },
    {
      title: <span>角色</span>,
      dataIndex: 'role',
      width: '8%',
      render: (text: any, record: any) => {
        return (
          <Tag color={RoleToColorMap[text.name]}>
            {text.name}
          </Tag>
        )
      },
    },
    {
      title: <span>状态</span>,
      dataIndex: 'status',
      width: '9%',
      render: (text: string) => (
        <span>
          <Badge status={UserStatusToColorMap[text]}/>
          {text}
        </span>
      ),
    },
    {
      title: <span>邮箱</span>,
      dataIndex: 'email',
    },
    {
      title: <span>创建时间</span>,
      dataIndex: 'createdAt',
      render: (text: any, record: any) => {
        return (
          <>
            {moment(text).format(DEFAULT_DATE_TIME_FORMAT)}
          </>
        )
      },
    },
    {
      title: <span>更新时间</span>,
      dataIndex: 'updatedAt',
      render: (text: any, record: any) => {
        return (
          <>
            {moment(text).format(DEFAULT_DATE_TIME_FORMAT)}
          </>
        )
      },
    },
    {
      title: <span>操作</span>,
      fixed: 'right' as const,
      width: '11%',
      render: (text: any, record: any) => {
        return (
          <>
            <Space size={[2, 4]} wrap>

              <Button type={"link"} size={"small"}
                      onClick={() => {
                        navigate(`${record.id}`)
                      }}
                // onClick={handleEdit.bind(record)}
              >
                编辑
              </Button>
              <Popconfirm placement="top" title={'确认删除'} onConfirm={handleDelete.bind(null, record)} okText="确认"
                          cancelText="取消">
                <Button type={"link"} danger size={"small"}
                  // onClick={handleDelete.bind(record)}
                >删除</Button>
              </Popconfirm>
            </Space>
          </>
        )
      },
    },
  ]


  const fetchData = () => {
    setLoading(true);
    console.log(listQuery)
    getUserList(listQuery).then((res) => {

      // if (_isMounted) {
        setList(res.data.data.records);
        setTotal(res.data.data.total);
        setLoading(false);
      // }
    });
  };
  // 生命周期
  useEffect(() => {
    _isMounted = true
    fetchData()
    return () => {
      _isMounted = false
    }
  }, [])

  const filterTitleChange = (e: any) => {
    setListQuery({
      ...listQuery,
      username: e.target.value
    })
  };
  const filterStatusChange = (value: string) => {
    setListQuery({
      ...listQuery,
      status: value
    })
  };
  const filterRoleChange = (value: string) => {
    setListQuery({
      ...listQuery,
      role: value
    })
  };
  useEffect(() => {
    fetchData()
  }, [listQuery])

  const changePage = (pageNumber: number, pagesize: number) => {
    setListQuery({
      ...listQuery,
      current: pageNumber,
      pageSize: pagesize
    })
  };
  const handleDelete = (row: any) => {
    setLoading(true)
    console.log(row)
    deleteUser(row.id).then(res => {
      setLoading(false)
      if (res.data.code === 200) {
        message.success("删除成功")
      }
      fetchData();
    })
  }
  const handleEdit = (row: any) => {
    setCurrentRowData(
      {...row});
    setEditModalVisible(true)
  };
  const handleOk = () => {
    setEditModalVisible(false)
  };
  const handleCancel = () => {
    setEditModalVisible(false);
  };

  return (
    <Page inner>
      <div className="app-container">
        <Form
          layout="inline"
          onFinish={handleOk}
        >
          <Form.Item name="name">
            <Input
              allowClear
              onChange={filterTitleChange}
              placeholder={'用户名'}
            />
          </Form.Item>
          <Form.Item>
            {
              <Select
                placeholder={'角色'}
                style={{width: 120}}
                allowClear
                onChange={filterRoleChange}
              >{
                Object.values(UserRole).map(value => {
                  return (
                    <Select.Option key={value} value={value}>
                      {value}
                    </Select.Option>
                  )
                })
              }
              </Select>
            }
          </Form.Item>
          <Form.Item name={'status'}>
            <Select
              placeholder={'状态'}
              style={{width: 120}}
              allowClear
              onChange={filterStatusChange}>
              <Select.Option value="Normal">{'Normal'}</Select.Option>
              <Select.Option value="Banned">{'Banned'}</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type="primary" icon={<SearchOutlined/>} onClick={fetchData}>
              搜索
            </Button>
          </Form.Item>

        </Form>
        <br/>
        <Table
          dataSource={list}
          // bordered
          columns={columns}
          rowKey={(record) => record.id!}
          loading={loading}
          scroll={{x: 1200}}
          pagination={{
            total: total,
            pageSizeOptions: ["5", "10", "20", "40"],
            showTotal: total => `共${total}条数据`,
            onChange: changePage,
            current: listQuery.current,
            // onShowSizeChange: changePageSize,
            showSizeChanger: true,
            showQuickJumper: true,
            hideOnSinglePage: true
          }}
        >
        </Table>
        <Modal
          title="编辑"
          visible={editModalVisible}
          onOk={handleOk}
          destroyOnClose={true}
          confirmLoading={editModalLoading}
          onCancel={handleCancel}
          // footer={[
          //   <Button onClick={handleOk} type={"primary"}>确认</Button>,
          //   <Button onClick={handleCancel}>取消</Button>
          // ]}
        >
          <Form
            labelCol={{sm: {span: 8}}}
            wrapperCol={{sm: {span: 16}}}
            // layout={'vertical'}
          >
            <Form.Item label="序号:" name="id" initialValue={currentRowData.id}

            >
              <Input id="id" disabled/>
            </Form.Item>
            <Form.Item label="用户名:" name="username" rules={[{required: true, message: "请输入标题!"}]}
                       initialValue={currentRowData.username}>
              <Input id="title" placeholder="标题"/>
            </Form.Item>
            <Form.Item label="头像:" name="avatar" initialValue={currentRowData.avatar}>
              <Input disabled/>
            </Form.Item>

            <Form.Item label="状态:" name="status" initialValue={currentRowData.status}>
              <Select id="status" style={{width: 120}}>
                <Select.Option value="published">published</Select.Option>
                <Select.Option value="draft">draft</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="角色:" name="role" initialValue={currentRowData.role}>
              <Select id="status" style={{width: 120}}>
                <Select.Option value="published">published</Select.Option>
                <Select.Option value="draft">draft</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="时间:"
              name="date"
              rules={[{type: 'object', required: true, message: '请选择时间!'}]}
              initialValue={moment(Date() || "YYYY-MM-DD HH:mm:ss")}
            >
              <DatePicker
                id="date"
                showTime format="YYYY-MM-DD HH:mm:ss"/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Page>
  );
}
export default User;
