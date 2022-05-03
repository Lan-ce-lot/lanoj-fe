/**
 * @FileName: Mine
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/7 14:31
 */
import React, {useEffect, useState} from "react";
import {Affix, Button, Card, Col, Input, message, Popconfirm, Row, Table} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {EditOutlined, SearchOutlined} from "@ant-design/icons";
import {deleteArticle, getArticlePage, IArticle, IArticleQuery} from "../../../../api/admin/article";
import store from "../../../../store";

//import styles from './Mine.module.scss'

interface IProps {

}

interface IState {

}

const data = [{
  id: 1,
  name: 'ACM',
}]
const Mine: React.FC<IProps> = ({}) => {
  const navigate = useNavigate();
  const [list, setList] = useState<IArticle[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IArticleQuery>({
    pageSize: 10,
    current: 1,
    name: '',
    problemId: undefined,
    status: true,
    userId: store.getState().user.id
  })
  const fetchData = () => {
    setLoading(true);
    getArticlePage(listQuery).then((res) => {
      // if (_isMounted) {
      setList(res.data.data.records);
      setTotal(res.data.data.total)
      setLoading(false);
      // }
    });
  };
  const handleDelete = (row: any) => {
    setLoading(true)
    deleteArticle(row.id).then(res => {
      setLoading(false)
      message.success("删除成功")
      fetchData();
    })
  }
  useEffect(() => {
    fetchData()
  }, [listQuery])
  const columns = [
    // {
    //   dataIndex:'id',
    //   title:'编号'
    // },
    {
      dataIndex: 'title',
      title: '标题'
    },
    {
      dataIndex: 'createdAt',
      title: '创建时间'
    },
    {
      dataIndex: 'likeNumber',
      title: '点赞量'
    },
    {
      dataIndex: 'click',
      title: '浏览量'
    },
    {
      title: '操作',
      fixed: 'right' as const,
      width: '15%',
      render: (text: any, record: IArticle) => {
        return (
          <>
            <Button type={"link"} size={"small"}
                    onClick={
                      () => {
                        navigate(`/article/edit/${record.id}`)
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
    <Row gutter={[24, 12]}>
      <Col lg={18}>
        <Card
          title={'我的题解'}
        >
          <Table
            columns={columns}
            dataSource={list}
          />
        </Card>

      </Col>
      <Col lg={6}>
        <Affix offsetTop={75}>
          <Row gutter={[24, 12]}>
            <Col lg={24}>
              <Link to={'/article/create'}>
                <Button
                  icon={<EditOutlined/>
                  }
                  type={"primary"} style={{width: '100%'}}
                >
                  发布一个
                </Button>
              </Link>

            </Col>
            <Col lg={24}>
              <Button
                onClick={() => {navigate('/article')}}
                icon={<SearchOutlined/>
                }
                style={{width: '100%'}}>
                全部
              </Button>
            </Col>
            <Col lg={24}>
              <Input.Search
                placeholder={'输入关键词'}
              />

            </Col>
            <Col lg={24}>
              <Card size={"small"} title={'最新题解'}>
                <Table
                  size={"small"}
                  pagination={false}
                  showHeader={false}
                  columns={[{dataIndex: 'name'}
                  ]}
                  dataSource={[
                    {name: '二叉树入门'},
                    {name: '深度优先搜索'},
                    {name: '线段树'},
                  ]}
                >

                </Table>
              </Card>

            </Col>
          </Row>

        </Affix>
      </Col>
    </Row>
  </>)
}
export default Mine;
