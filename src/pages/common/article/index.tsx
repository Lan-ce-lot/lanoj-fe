/**
 * @FileName: Article
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/10 21:57
 */

import React, {useContext, useEffect, useState} from 'react'
import {Card, Col, Row, List, Space, Avatar, Button, Input, Table, Affix, Skeleton} from "antd";
import {
  LikeOutlined,
  EditOutlined,
  SearchOutlined,
  ClockCircleOutlined, EyeOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {getArticlePage, getRecentArticle, IArticle, IArticleQuery} from "../../../api/admin/article";
import QueueAnim from "rc-queue-anim";

interface IProps {

}

const listData: any[] = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    title: `题解 ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/glz',
    description:
      '线段树是一个非常优秀的数据结构，具体来说，它可以...',
  });
}
const IconText = ({icon, text}: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Article: React.FC<IProps> = ({}) => {
  const [recentArticles, setRecentArticles] = useState<any>();
  const [list, setList] = useState<IArticle[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<IArticleQuery>({
    pageSize: 10,
    current: 1,
    name: '',
    problemId: undefined,
    status: true,
    userId: undefined
  })
  const fetchData = () => {
    setLoading(true);
    getRecentArticle().then(res => {
      console.log(res.data.data)
      setRecentArticles(res.data.data)
    })
    getArticlePage(listQuery).then((res) => {
      setList(res.data.data.records);
      setTotal(res.data.data.total)
      setLoading(false);
    });

  };
  const filterTitleChange = (e: any) => {
    setListQuery({
      ...listQuery,
      name: e.target.value
    })
  };
  const changePage = (current: number, pageSize: number) => {
    setListQuery({
      ...listQuery,
      current,
      pageSize
    })
  };
  // 生命周期
  useEffect(() => {
    fetchData()
  }, [listQuery])

  return (<>
    <Row gutter={24}>
      <Col lg={18}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            total: total,
            pageSizeOptions: ["10", "20", "40"],
            showTotal: total => `共${total}条数据`,
            onChange: changePage,
            current: listQuery.current,
            showSizeChanger: true,
            hideOnSinglePage: true
          }}
          dataSource={list}
          renderItem={item => (

              <List.Item
                style={{backgroundColor: '#fff'}}
                key={item.title}
                actions={[
                  <Link to={`/user/${item.userId}`}><Space><Avatar src={item.avatar}/>{item.username}</Space></Link>,
                  <IconText icon={EyeOutlined} text={item.click} key="list-vertical-message"/>,
                  <IconText icon={LikeOutlined} text={item.likeNumber} key="list-vertical-like-o"/>,
                  <IconText icon={ClockCircleOutlined} text={item.createdAt} key="list-vertical-message"/>,
                  // <IconText icon={EditOutlined} text="编辑" key="EditOutlined"/>,
                  // <IconText icon={DeleteOutlined} text="删除" key="DeleteOutlined"/>,
                ]}
              ><Skeleton loading={loading} active avatar>
                <List.Item.Meta
                  // avatar={<Space><Avatar src={item.avatar} />lacel</Space>}
                  title={<Space><Link to={`${item.id}`}>{item.title}</Link>
                    {
                      !item.problemId ? <></> :
                        <Link to={`/problem/detail/${item.problemId}`}><Button size={"small"}>前往原题</Button></Link>
                    }
                  </Space>}
                  description={item.description}
                />
              </Skeleton>
              </List.Item>
          )}
        />
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
              <Link to={'/article/mine'}>
                <Button
                  icon={<SearchOutlined/>
                  }
                  style={{width: '100%'}}>
                  我的
                </Button>
              </Link>

            </Col>
            <Col lg={24}>
              <Input.Search
                allowClear
                placeholder={'输入关键词'}
                onChange={filterTitleChange}
                // onSearch={filterTitleChange}
              />
            </Col>
            <Col lg={24}>
              <Card size={"small"} title={'最新题解'}>
                <Table
                  size={"small"}
                  pagination={false}
                  showHeader={false}
                  rowKey={'id'}
                  columns={[
                    {
                      dataIndex: 'title',
                      render: (text, record) => <Link to={`${record.id}`}>{text}</Link>
                    }]}
                  dataSource={recentArticles}
                />
              </Card>

            </Col>
          </Row>
        </Affix>
      </Col>
    </Row>
  </>)
}
export default Article;
