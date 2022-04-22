/**
 * @FileName: ProblemTags
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/11 18:11
 */
import React, {useEffect, useState} from "react";
import {Card, Input, message, Row, Skeleton, Space, Tag} from "antd";
import {getTagList, ITag, ITagQuery} from "../../../../../api/admin/tag";

//import styles from './ProblemTags.module.scss'

interface IProps {
  tagOnClick: any;
}

interface IState {

}

const ProblemTags: React.FC<IProps> = ({tagOnClick}) => {
  const [list, setList] = useState<ITag[]>(),
    [loading, setLoading] = useState(false),
    [listQuery, setListQuery] = useState<ITagQuery>(
      {
        pageSize: 10000,
        current: 1,
        name: ''
      }
    )
  const fetchData = () => {
    setLoading(true)
    getTagList(listQuery).then(res => {
      const {data} = res.data
      setList(data.records)
      setLoading(false)
    })
  }
  useEffect(() => {
    fetchData()
  }, [listQuery])

  const handleNameFilter = (e: any) => {
    setListQuery({...listQuery, name: e.target.value})
  }
  return (<>

      <Card
        title={"题库标签"}
        bordered={false}
        extra={<Input.Search
          loading={loading}
          onChange={handleNameFilter}
          placeholder={"输入标签名称"}
          // style={{ width: '50%' }}
        />}
      ><Skeleton loading={loading} active>
        <Space size={[12, 8]}
               wrap
        >
          {
            list?.map((it, key) => <Tag
              onClick={tagOnClick.bind(null, it.name)}
              key={it.id} color={it.color}>{it.name}</Tag>)
          }
        </Space></Skeleton>
      </Card>


  </>)
}
export default ProblemTags;
