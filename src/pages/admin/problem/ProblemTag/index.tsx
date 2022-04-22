/**
 * @FileName: ProblemTag
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/16 14:28
 */
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Skeleton,
  Table,
  Tag
} from "antd";
import React, {useEffect, useState} from "react";
import Page from "../../../../components/Page/Page";
import {TweenOneGroup} from "rc-tween-one";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {HexColorPicker} from "react-colorful";
import Title from "antd/es/typography/Title";
import {addTag, deleteTag, getTagList, ITag, ITagQuery, updateTag} from "../../../../api/admin/tag";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../../config/config";
import {UserRole} from "../../../../common/enumerations";
import {deleteUser, IUser} from "../../../../api/admin/user";
import TagWordCloud from "./conponents/TagWordCloud";
import {useForm} from "antd/es/form/Form";
//import styles from './ProblemTag.module.scss'
import {ColorResult, ChromePicker} from 'react-color';

const {Search} = Input;

interface IProps {

}

interface IState {

}

let _isMounted = false
const ProblemTag: React.FC<IProps> = ({}) => {
  const [list, setList] = useState<ITag[]>();
  const [currentRowData, setCurrentRowData] = useState<ITag>()
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [listQuery, setListQuery] = useState<ITagQuery>({
    pageSize: 10,
    current: 1,
    name: "",
  });

  const [state, setState] = useState(
    {
      inputVisible: false,
      inputValue: '',
    }
  )

  const [editModalVisible, setEditModalVisible] = useState<boolean>(false)
  const [editModalLoading, setEditModalLoading] = useState<boolean>(false)
  const [color, setColor] = useState("#aabbcc");
  const columns = [
    {
      dataIndex: 'id',
      title: 'id',
      sorter: (a: ITag, b: ITag) => a.id! - b.id!,
    },
    {
      dataIndex: 'name',
      title: '标签名',
      render: (text: string, record: ITag) => (<Tag color={record.color}>{text}</Tag>)
    },
    {
      dataIndex: 'color',
      title: '颜色'
    },
    {
      dataIndex: 'problemNumber',
      title: '题目数'
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
      render: (text: string, record: ITag) => (<>
        <Button type={"link"} size={"small"}
                onClick={handleEdit.bind(null, record)}
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
      </>)
    }
  ]

  const fetchData = () => {
    setLoading(true);
    getTagList(listQuery).then(res => {
      setList(res.data.data.records);
      setTotal(res.data.data.total);
      setCurrentRowData(res.data.data.records[0])
      setLoading(false);
    })
  }
  // 生命周期
  useEffect(() => {
    _isMounted = true
    fetchData()
    return () => {
      _isMounted = false
    }
  }, [])

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


  const handleEdit = (row: ITag) => {
    setCurrentRowData(row)
    setEditModalVisible(true)
    // setLoading(true)
  }
  const handleDelete = (row: ITag) => {
    setLoading(true)
    console.log(row)
    deleteTag(row.id!).then(res => {
      setLoading(false)
      if (res.data.code === 200) {
        message.success("删除成功")
      }
      fetchData();
    })
  }


  const filterNameChange = (e: any) => {
    setListQuery({
      ...listQuery,
      name: e.target.value
    })
  };


  const showInput = () => {
    setState({...state, inputVisible: true});
  };

  const handleInputChange = (e: any) => {
    setState({...state, inputValue: e.target.value});
  };

  const handleInputConfirm = () => {
    const {inputValue} = state;
    setState({
      inputVisible: false,
      inputValue: '',
    });
    addTag({name: inputValue, color}).then(res => {
      message.success(res.data.data.msg)
      fetchData()
    })
  };

  const handleOk = () => {
    console.log(form.getFieldsValue(true))
    updateTag({...currentRowData, name: form.getFieldValue('name')}).then(res => {
      message.success(res.data.msg)
      fetchData()
    })
    setEditModalVisible(false)
  };
  const handleCancel = () => {
    setEditModalVisible(false);
  };
  const [form] = Form.useForm()
  form.setFieldsValue(currentRowData)
  const {inputVisible, inputValue} = state;

  return (
    <Page inner>
      {
        <>
          {/*<Divider orientation="left">标签列表</Divider>*/}
          <Form
            layout="inline"
          >
            <Form.Item name="name">
              <Search
                allowClear
                onSearch={fetchData}
                onChange={filterNameChange}
                placeholder={'标签名'}
                // enterButton
              />
            </Form.Item>
          </Form>
          <br/>
          <Table
            dataSource={list}
            columns={columns}
            rowKey={(record) => record.id!}
            loading={loading}
            scroll={{x: 900}}
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
          {
            currentRowData &&
            <Modal
              title="编辑"
              visible={editModalVisible}
              onOk={handleOk}
              destroyOnClose={true}
              confirmLoading={editModalLoading}
              onCancel={handleCancel}
            >
              <Form
                form={form}
                labelCol={{sm: {span: 8}}}
                wrapperCol={{sm: {span: 16}}}
                // layout={'vertical'}
              >
                <Form.Item label="序号" name="id"
                           initialValue={currentRowData!.id}
                >
                  <Input id="id" disabled/>
                </Form.Item>
                <Form.Item
                  label="标签名" name="name" rules={[{required: true, message: "请输入标签名!"}]}
                  // initialValue={currentRowData!.name}
                >
                  <Input id="title"
                    // defaultValue={currentRowData!.name}
                         placeholder="标题"/>
                </Form.Item>
                <Form.Item
                  label="颜色" name="color" rules={[{required: true, message: "请选择颜色!"}]}
                  // initialValue={currentRowData!.color}
                  valuePropName={color}
                >
                  <>
                    <ChromePicker
                      disableAlpha
                      color={currentRowData!.color}
                      onChange={
                        (newColor) => {
                          setCurrentRowData({...currentRowData!, color: newColor.hex})
                        }
                      }
                    />
                    {/*<HexColorPicker color={currentRowData!.color} onChange={*/}
                    {/*  (newColor) => {*/}
                    {/*    setCurrentRowData({...currentRowData!, color: newColor})*/}
                    {/*  }*/}
                    {/*}/>*/}
                    <Tag color={currentRowData!.color}>{currentRowData!.color}</Tag>
                  </>
                </Form.Item>
              </Form>
            </Modal>
          }

          <Divider orientation="left">创建标签</Divider>
          <>
            <Row gutter={24}>
              <Col lg={12}>
                {inputVisible && (
                  <Input
                    type="text"
                    size="small"
                    style={{width: 78}}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                  />
                )}
                {!inputVisible && (
                  <Tag color={color} onClick={showInput}
                    // className="site-tag-plus"
                  >
                    <PlusOutlined/> 点击创建
                  </Tag>
                )}
              </Col>
              <Col lg={12}>
                <ChromePicker
                  disableAlpha
                  color={color}
                  onChange={(color) => setColor(color.hex)}
                />
                 {/*<HexColorPicker color={color} onChange={setColor}/>*/}
                <Tag color={color}>{color}</Tag>
              </Col>
            </Row>
          </>
          <Divider orientation="left">标签统计</Divider>
          <TagWordCloud
          />
        </>
      }
    </Page>
  )
}
export default ProblemTag;
