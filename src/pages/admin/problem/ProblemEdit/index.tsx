/**
 * @FileName: ProblemAdd
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/16 14:27
 */
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message, Popconfirm,
  Row,
  Select,
  Skeleton,
  Space,
  Table,
  Tag, Tooltip
} from "antd";
import {TweenOneGroup} from "rc-tween-one";
import React, {useEffect, useRef, useState} from "react";
import Page from "../../../../components/Page/Page";
import MarkDownEditor from "../../../common/setting/components/MarkDownEditor";
import {CloudDownloadOutlined, MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {useNavigate, useParams} from "react-router-dom";
import {
  addProblem, deleteProblem,
  getProblemDetail,
  initProblem,
  IProblem,
  IProblemQuery,
  updateProblem
} from "../../../../api/admin/problem";
import {getTagList, ITag} from "../../../../api/admin/tag";
import {editItem} from "../../../../api/admin/table";
import {Editor} from "@toast-ui/react-editor";
import {
  deleteSolution,
  getSolution,
  getUploadToken,
  ISolutionQuery,
  ProblemTestCase
} from "../../../../api/admin/problemCase";
import TestCaseModal from "./conponents/TestCaseModal";
import {validateMessages} from "../../../../config/config";

const {Option} = Select;

//import styles from './ProblemAdd.module.scss'

interface IProps {

}

interface IState {

}

const ProblemEdit: React.FC<IProps> = ({}) => {
  const defaultTags: number[] = [];
  const {id} = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [problem, setProblem] = useState<IProblem>(
    // initProblem
  );
  const [problemCaseList, setProblemCaseList] = useState<ProblemTestCase[]>(

  )
  const [tagList, setTaglist] = useState<ITag[]>()
  const [form] = Form.useForm();
  // 上传凭证
  const [uploadToken, setUploadToken] = useState<string>('');
  // 问题的解决方案
  const [solutions, setSolutions] = useState<ProblemTestCase[]>([]);
  const [listQuery, setListQuery] = useState<ISolutionQuery>({
    pageSize: 10,
    current: 1,
    id: Number(id),
  })
  // 是否展示添加解决方案的对话框
  const [isShowAddSolutionModal, setIsShowAddSolutionModal] = useState(false);
  const contentEditor = useRef<any>()
  const inputDescriptionEditor = useRef<any>()
  const outputDescriptionEditor = useRef<any>()
  const onFinish = (values: any) => {
    console.log(form.getFieldsValue(true))
    const list = form.getFieldValue('tags')
    const addTags = tagList?.filter((it: ITag) => {
        if (list) {
          return list.indexOf(it.id) !== -1
        } else {
          return 0;
        }
      }
    )
    console.log(addTags)
    updateProblem({
      ...form.getFieldsValue(true),
      tags: addTags,
      content: contentEditor.current.getInstance().getMarkdown(),
      inputDescription: inputDescriptionEditor.current.getInstance().getMarkdown(),
      outputDescription: outputDescriptionEditor.current.getInstance().getMarkdown(),
    }).then(res => {
      message.success(res.data.msg)
    })
  };

  // 获取上传凭证
  const getUploadTokenData = () => {
    getUploadToken()
      .then(res => {
        const {data} = res.data;
        setUploadToken(data);
      })
      .catch(() => {
        message.error('获取上传凭证失败');
      })
  }

  const fetchData = () => {
    setLoading(true)
    getTagList({pageSize: 200000}).then(res => {
      setTaglist(res.data.data.records)
    })
    getProblemDetail(Number(id)).then(res => {
      res.data.data.tags.map((it: any) => {
        defaultTags.push(it.id)
      })
      console.log(defaultTags)
      form.setFieldsValue({...res.data.data, tags: defaultTags})
      setProblem(res.data.data)
      setLoading(false)
    })
    getUploadTokenData()
    getSolution(listQuery).then(res => {
      const {data} = res.data
      setProblemCaseList(data.records)
    })
  }
  useEffect(() => {
    fetchData()

  }, [])
  const children: any = [];
  tagList?.map((item) => {
    children.push(
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    )
  })
  // 测试样例添加cg
  const onTestCaseAddSuccess = () => {
    setIsShowAddSolutionModal(false);
    fetchData()
  }

  function handleChange(value: any) {
    console.log(`selected ${value}`);
  }

  const handleDelete = (row: any) => {
    setLoading(true)
    deleteSolution({id: row.id}).then(res => {
      setLoading(false)
      message.success("删除成功")
      fetchData();
    })
  }
  const handleDownload = (url: string) => {
    window.open(url)
  }
  const columns = [
    {
      dataIndex: 'id',
      title: 'id',
      width: '20%',
    },
    {
      dataIndex: 'stdIn',
      title: '标准输入',
      ellipsis: {
        showTitle: false,
      },
      render: (text: any, record: any) => {
        return (
          <Space>
            <Tooltip placement="topLeft" title={text}>
              {text.replace(/.*\//, '')}
            </Tooltip>
            <Button
              icon={<CloudDownloadOutlined/>}
              onClick={
                handleDownload.bind(null, text)
              }
            />
          </Space>
        )
      }
    },
    {
      dataIndex: 'stdOut',
      title: '标准输出',
      ellipsis: {
        showTitle: false,
      },
      render: (text: any, record: any) => {
        return (
          <Space>
            <Tooltip placement="topLeft" title={text}>
              {text.replace(/.*\//, '')}
            </Tooltip>
            <Button
              icon={<CloudDownloadOutlined/>}
              onClick={
                handleDownload.bind(null, text)
              }
            />
          </Space>
        )
      }
    },
    {
      dataIndex: '4',
      title: '操作',
      fixed: 'right' as const,
      width: '12%',
      render: (text: any, record: any) => {
        return (
          <>
            <Popconfirm placement="top" title={'确认删除'}
                        onConfirm={handleDelete.bind(null, record)}
                        okText="确认"
                        cancelText="取消">
              <Button type={"link"} danger size={"small"}
              >删除</Button>
            </Popconfirm>
          </>
        )
      }
    }
  ]
  return (<Page inner>
    {
      loading || problem?.tags === undefined ? <Skeleton active/> :
        <>
          <Divider orientation="left">编辑题目</Divider>
          <Form
            layout={'vertical'}
            // labelCol={{ span: 4 }}
            labelCol={{span: 5}}
            // wrapperCol={{ span: 8 }}
            validateMessages={validateMessages}
            form={form}
            onFinish={onFinish}
          >
            <Row gutter={24}>
              <Col lg={12} md={24} sm={24} xs={24}>
                <Form.Item
                  label={'题目名称'}
                  name={'name'}
                  rules={[{required: true},]}
                  // initialValue={problem!.name}
                >
                  <Input placeholder={'题目名称'}
                    // defaultValue={problem!.name}
                         maxLength={35}
                  >
                  </Input>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col lg={12} md={24} sm={24} xs={24}>
                <Form.Item
                  label={'标签设置'}
                  name={'tags'}
                >
                  <Select
                    // defaultValue={
                    //   problem.tags.map(item => item.name)
                    // }
                    allowClear
                    mode="multiple"
                    style={{width: '100%'}}
                    placeholder="添加标签"
                    onChange={handleChange}>
                    {children}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  label={'时间限制'}
                  name={'timeLimit'}
                  rules={[{required: true},]}
                  // initialValue={problem.timeLimit}
                >
                  <InputNumber
                    // defaultValue={problem.timeLimit}
                    placeholder={'时间限制'}
                    addonAfter="ms"
                    min={0}
                    max={1000000000}
                    style={{width: '100%'}}
                  >
                  </InputNumber>
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  rules={[{required: true},]}
                  label={'内存限制'}
                  name={'memoryLimit'}
                  // initialValue={problem.memoryLimit}
                >
                  <InputNumber
                    // defaultValue={problem.memoryLimit}
                    placeholder={'内存限制'}
                    addonAfter="KB"
                    min={0}
                    max={1000000000} style={{width: '100%'}}
                  >
                  </InputNumber>
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  rules={[{required: true},]}
                  label={'输出限制'}
                  name={'outputLimit'}
                  // initialValue={problem.outputLimit}
                >
                  <InputNumber
                    // defaultValue={problem.outputLimit}
                    placeholder={'输出限制'}
                    addonAfter="Byte"
                    min={0}
                    max={1000000000} style={{width: '100%'}}
                  >
                  </InputNumber>
                </Form.Item>
              </Col>
            </Row>
            <Divider orientation="left">题目内容</Divider>
            <Form.Item
              rules={[{required: true},]}
              name={'content'}
              // valuePropName={}

              label={'题目描述'}
            >
              <Editor
                language={'zh-CN'}
                ref={contentEditor}
                initialValue={problem?.content || '无内容'}
                placeholder={'输入题目描述'}
                // previewStyle="vertical"
                previewStyle={'tab'}
                height={'300px'}
                initialEditType="markdown"
                useCommandShortcut={true}
              />
            </Form.Item>
            <Form.Item
              rules={[{required: true},]}
              name={'inputDescription'}
              // valuePropName={}
              label={'输入描述'}
            >
              <Editor
                language={'zh-CN'}
                ref={inputDescriptionEditor}
                initialValue={problem?.inputDescription || '无内容'}
                placeholder={'输入描述'}
                previewStyle="vertical"
                height={'300px'}
                initialEditType="markdown"
                useCommandShortcut={true}
              />
            </Form.Item>
            <Form.Item
              rules={[{required: true},]}

              name={'outputDescription'}
              // valuePropName={}
              label={'输出描述'}
            >
              <Editor
                language={'zh-CN'}
                initialValue={problem?.outputDescription || '无内容'}
                ref={outputDescriptionEditor}
                placeholder={'输出描述'}
                previewStyle="vertical"

                height={'300px'}
                initialEditType="markdown"
                useCommandShortcut={true}
              />
            </Form.Item>
            <Row
              gutter={24}>

              <Col lg={12}>
                <Form.Item
                  label={'样例输入'}
                  name={'sampleIn'}
                  rules={[{required: true,}]}
                >
                  <TextArea
                    showCount
                    maxLength={200}
                    placeholder="测试样例输入"
                    autoSize={{minRows: 3, maxRows: 6}}
                  />

                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  label={'样例输出'}
                  name={'sampleOut'}
                  rules={[{required: true,}]}
                >
                  <TextArea
                    showCount
                    maxLength={200}
                    placeholder="测试样例输出"
                    autoSize={{minRows: 3, maxRows: 6}}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button htmlType={"submit"} type={"primary"}>保存</Button>
            </Form.Item>
          </Form>
          <Card
            title={<>
              测试点
            </>}
            extra={<>
              <TestCaseModal
                problemId={problem.id!}
                onConfirmed={() => onTestCaseAddSuccess()}
                onCancel={() => setIsShowAddSolutionModal(false)}
                isShow={isShowAddSolutionModal}
                uploadToken={uploadToken}/>
              <Button style={{float: 'right'}}
                      onClick={() => setIsShowAddSolutionModal(true)}
              >添加测试点</Button>
            </>}
          >
            <Table
              scroll={{x: 800}}
              dataSource={
                problemCaseList
              }
              columns={
                columns
              }
              rowKey={'id'}
            >
            </Table>
          </Card>
        </>
    }
  </Page>)
}
export default ProblemEdit;
