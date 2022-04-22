/**
 * @FileName: index
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/23 14:48
 */
import React, {useEffect, useState} from "react";
import Page from "../../../../components/Page/Page";
import {deleteProblem, getProblemList, initProblem, IProblem, IProblemQuery} from "../../../../api/admin/problem";
import {Link, useNavigate} from "react-router-dom";
import {ITag} from "../../../../api/admin/tag";
import {Badge, Button, Form, Input, message, Popconfirm, Select, Table, Tag} from "antd";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../../config/config";
import {SearchOutlined} from "@ant-design/icons";
import {deleteContest, getContestList, IContestQuery} from "../../../../api/admin/contest";
import {ContestStatusEnum, UserRole} from "../../../../common/enumerations";
import {ContestStatusToCN, ContestStatusToColorMap} from "../../../../common/map";

//import styles from './index.module.scss'

interface IProps {

}

interface IState {

}

const ContestList: React.FC<IProps> = ({}) => {
  const [list, setList] = useState<IProblem[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IContestQuery>({
    pageSize: 10,
    current: 1,
    name: '',
    status: '',
  })
  const navigate = useNavigate()
  const columns = [
    {
      title: <span>id</span>,
      dataIndex: 'id',
      width: '7%',
    },
    {
      title: <span>比赛名</span>,
      dataIndex: 'name',
      render: (text: any, record: any) => <Link to={`/admin/contest/edit/${record.id}`}>{text}</Link>,
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
      title: '创建者',
      dataIndex: 'creatorName',
      render: (text: string) => <span>{text}</span>,
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
                        navigate(`/admin/contest/edit/${record.id}`)
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
    getContestList(listQuery).then((res) => {
      const {data} = res.data
      console.log(data)
      const list = data.records.map((it: any, key: any) => {
        if (new Date(it.startTime!).getTime() > new Date().getTime()) {
          console.log(ContestStatusEnum.NOT_STARTED)
          return {...it, status: ContestStatusEnum.NOT_STARTED}
        } else if (new Date(it.startTime!).getTime() < new Date().getTime() && new Date(it.endTime!).getTime() > new Date().getTime()) {
          console.log(ContestStatusEnum.RUNNING)
          return {...it, status: ContestStatusEnum.RUNNING}
        } else if (new Date(it.endTime!).getTime() <= new Date().getTime()) {
          return {...it, status: ContestStatusEnum.CLOSED}
        }
      })

      setList(list);
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
  const filterStatusChange = (value: string) => {
    setListQuery({
      ...listQuery,
      status: value
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
    deleteContest(row.id).then(res => {
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
              placeholder={'比赛名'}
            />
          </Form.Item>
          <Form.Item name={'status'}>
            <Select
              placeholder={'状态'}
              style={{width: 120}}
              allowClear
              onChange={filterStatusChange}>{
              Object.values(ContestStatusEnum).map(value => {
                return (
                  <Select.Option key={value} value={value}>
                    {value}
                  </Select.Option>
                )
              })
            }
            </Select>
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
        >
        </Table>
      </div>
    </Page>
  );
}
export default ContestList;
