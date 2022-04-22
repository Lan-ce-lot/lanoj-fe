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
  Modal, Rate, DatePicker, Row, Avatar, Space, Popconfirm, Empty
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import moment from "moment";
import {useForm} from "antd/es/form/Form";
import {Link, useNavigate} from "react-router-dom";
import {
  DATE_TIME_FORMAT_BY_HOUR,
  DATE_TIME_FORMAT_WITHOUT_TIME,
  DEFAULT_DATE_TIME_FORMAT
} from "../../../../config/config";
import {deleteItem, tableList} from "../../../../api/admin/table";
import Page from "../../../../components/Page/Page";
import {deleteProblem, getProblemList, initProblem, IProblem, IProblemQuery} from "../../../../api/admin/problem";
import {ITag} from "../../../../api/admin/tag";
// const {Column} = Table;
// const {Panel} = Collapse;

//import styles from './user.module.scss'

interface TableHooksProps {

}


let _isMounted = false;
const User: React.FC<TableHooksProps> = (props) => {
  const [list, setList] = useState<IProblem[]>(
    [initProblem
    ]
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IProblemQuery>({
    pageSize: 10,
    current: 1,
    name: '',
    tag: '',
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
      title: <span>题目名</span>,
      dataIndex: 'name',
      render: (text: any, record: any) => <Link to={`/admin/problem/edit/${record.id}`}>{text}</Link>,
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
          </> : <>未添加标签</>
      ),
    },
    {
      title: '创建者',
      dataIndex: 'username',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: <span>创建时间</span>,
      dataIndex: 'createdAt',
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
      title: <span>更新时间</span>,
      dataIndex: 'updatedAt',
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
      width: '15%',
      render: (text: any, record: any) => {
        return (
          <>
            <Button type={"link"} size={"small"}
                    onClick={
                      () => {
                        navigate(`/admin/problem/edit/${record.id}`)
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

  const fetchData = () => {
    setLoading(true);
    getProblemList(listQuery).then((res) => {
      setList(res.data.data.records);
      setTotal(res.data.data.total)
      setLoading(false);
    });
  };
  // 生命周期
  useEffect(() => {
    fetchData()
  }, [])

  const filterNameChange = (e: any) => {
    setListQuery({
      ...listQuery,
      name: e.target.value
    })
  };
  const filterTagChange = (e: any) => {
    setListQuery({
      ...listQuery,
      tag: e.target.value
    })
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
    deleteProblem(row.id).then(res => {
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
          <Form.Item name={'status'}>
            <Input
              allowClear
              onChange={filterTagChange}
              placeholder={'标签名'}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<SearchOutlined/>} onClick={fetchData}>
              搜索
            </Button>
          </Form.Item>
        </Form>
        <br/>
        <Table
          dataSource={list}
          bordered
          columns={columns}
          rowKey={(record) => '' + record.id!}
          loading={loading}
          scroll={{x: 1200}}
          pagination={{
            total: total,
            pageSizeOptions: ["10", "20", "40"],
            showTotal: total => `共${total}条数据`,
            onChange: changePage,
            current: listQuery.current,
            showSizeChanger: true,
            showQuickJumper: true,
            // hideOnSinglePage: true
          }}
        >
        </Table>
      </div>
    </Page>
  );
}
export default User;
