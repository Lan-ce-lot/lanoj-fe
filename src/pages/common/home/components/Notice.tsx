/**
 * @FileName: Notice
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/17 1:15
 */
import React, {useEffect, useState} from "react";
import {List, Space} from "antd";
import {getNoticeList, INotice, INoticeQuery} from "../../../../api/admin/notice";
import {ClockCircleOutlined, LikeOutlined, MessageOutlined, StarOutlined, UserOutlined} from "@ant-design/icons";

//import styles from './Notice.module.scss'

interface IProps {

}

interface IState {

}

const IconText = ({icon, text}: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const Notice: React.FC<IProps> = ({}) => {
  const
    [list, setList] = useState<INotice[]>(
      []
    ),
    [loading, setLoading] = useState<boolean>(false),
    [total, setTotal] = useState<number>(0),
    [listQuery, setListQuery] = useState<INoticeQuery>({
      pageSize: 1,
      current: 1,
      name: '',
    })
  const changePage = (current: number, pageSize: number) => {
    setListQuery({
      ...listQuery,
      current,
      pageSize
    })
  };
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
  return (<>
    <List
      style={{whiteSpace:"pre"}}
      itemLayout="vertical"
      // size="large"
      pagination={{
        total: total,
        defaultPageSize: 1,
        // pageSizeOptions: ["10", "20", "40"],
        showTotal: total => `共${total}条数据`,
        onChange: changePage,
        current: listQuery.current,
        hideOnSinglePage: true,

      }}
      dataSource={list}
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <IconText icon={UserOutlined} text={item.username} key="list-vertical-like-o"/>,
            <IconText icon={ClockCircleOutlined} text={item.createdAt} key="list-vertical-star-o"/>,
          ]}
        >
          <List.Item.Meta
            // avatar={<Avatar src={item.avatar} />}
            title={<>{item.title}</>}
            description={item.content}
          />
          {/*{item.content}*/}
        </List.Item>
      )}
    />
  </>)
}
export default Notice;
