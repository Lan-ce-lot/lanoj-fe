/**
 * @FileName: ProblemModal
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/1 23:55
 */
import React, {useEffect, useState} from "react";
import {Button, message, Modal, Table, Tag} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {getProblemList, IProblemQuery} from "../../../../../api/admin/problem";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ITag} from "../../../../../api/admin/tag";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../../../config/config";
import {addContestProblem, IContestProblem} from "../../../../../api/admin/contestProblem";

//import styles from './ProblemModal.module.scss'
const {confirm} = Modal;

interface IProps {
  isModalVisible: boolean;
  // handleOk: any;
  handleCancel?: any;

}

interface IState {

}

const ProblemModal: React.FC<IProps> = ({
                                          isModalVisible,
                                          // handleOk,
                                          handleCancel
                                        }) => {
  const contestId = useParams().exerciseId
  const navigate = useNavigate()
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [list, setList] = useState<IContestProblem[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IProblemQuery>({
    pageSize: 10,
    current: 1,
    name: '',
    tag: '',
  })
  const hasSelected = selectedRowKeys.length > 0;
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
  useEffect(() => {
    fetchData()
  }, [listQuery])

  const start = () => {
    setLoading(true);
    addContestProblem(selectedRowKeys.map((it: any): IContestProblem => {
      return {problemId: it, contestId: Number(contestId)}
    })).then(res => {
      const {data} = res.data
      message.success(data)
      setSelectedRowKeys([]);
      setLoading(false)
      handleCancel()
    })
    // ajax request after empty completing
    // setTimeout(() => {
    //   setSelectedRowKeys([]);
    //   setLoading(false)
    //   handleCancel()
    // }, 1000);
  };
  const changePage = (current: number, pageSize: number) => {
    setListQuery({
      ...listQuery,
      current,
      pageSize
    })
  };
  const handleOk = () => {
    confirm({
      title: '以下题目将被添加到比赛',
      icon: <ExclamationCircleOutlined/>,
      content: (<>
        {list!.map((it: any, key: any) => {
            if (selectedRowKeys.includes(it.id)) {
              return (<div key={it.id}>
                {it.id}
                <br/>
              </div>)
            }
          }
        )
        }
      </ >),
      okText: '确认',
      cancelText: '取消',
      onOk() {
        start()
        // console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  };
  const onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };


  return (<>
    <Modal
      title="添加题目到比赛"
      width={1000}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={'确认'}
      cancelText={'取消'}
      footer={null}
      destroyOnClose={true}
    >

      <Button type="primary" onClick={handleOk} disabled={!hasSelected} loading={loading}>
        添加
      </Button>
      <Table


        rowKey={'id'}
        columns={columns}
        dataSource={list}
        rowSelection={rowSelection}
        pagination={{
          total: total,
          defaultPageSize: 5,
          pageSizeOptions: ["5", "10"],
          showTotal: total => `共${total}条数据`,
          onChange: changePage,
          current: listQuery.current,
          showSizeChanger: true,
          // showQuickJumper: true,
          // hideOnSinglePage: true
        }}
      >
      </Table>
    </Modal>
  </>)
}
export default ProblemModal;
