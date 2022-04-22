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
  message,
  Row,
  Select,
  Skeleton,
  Space,
  Table,
  Tag
} from "antd";
import {TweenOneGroup} from "rc-tween-one";
import React, {useEffect, useRef, useState} from "react";
import Page from "../../../../components/Page/Page";
import MarkDownEditor from "../../../common/setting/components/MarkDownEditor";
import {CloudDownloadOutlined, MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {addProblem, getProblemDetail, IProblem} from "../../../../api/admin/problem";
import {getTagList, ITag} from "../../../../api/admin/tag";
import {Editor} from "@toast-ui/react-editor";
import store from "../../../../store";
import {useNavigate} from "react-router-dom";
import {validateMessages} from "../../../../config/config";
import '@toast-ui/editor/dist/i18n/zh-cn';

const {Option} = Select;

//import styles from './ProblemAdd.module.scss'

interface IProps {

}

interface IState {

}

const ProblemAdd: React.FC<IProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [problem, setProblem] = useState<IProblem>(
    // initProblem
  );
  const navigate = useNavigate()
  const [tagList, setTaglist] = useState<ITag[]>()
  const [form] = Form.useForm();

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
    addProblem({
      ...form.getFieldsValue(true),
      tags: addTags,
      userId: store.getState().user.id,
      content: contentEditor.current.getInstance().getMarkdown(),
      inputDescription: inputDescriptionEditor.current.getInstance().getMarkdown(),
      outputDescription: outputDescriptionEditor.current.getInstance().getMarkdown(),
    }).then(res => {
      message.success(res.data.msg)
      if (res.data.code === 200) {
        navigate(`/admin/problem/edit/${res.data.data}`)
      }

    })
  };


  const fetchData = () => {
    setLoading(true)
    getTagList({pageSize: 200000}).then(res => {
      setLoading(false)
      setTaglist(res.data.data.records)
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

  function handleChange(value: any) {
    console.log(`selected ${value}`);
  }


  return (<Page inner>
    {
      loading === undefined ? <Skeleton active/> :
        <>
          <Divider orientation="left">增加题目</Divider>
          <Form
            layout={"vertical"}
            labelCol={{span: 5}}
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
                    allowClear
                    mode={"multiple"}
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
                  label={'内存限制'}
                  name={'memoryLimit'}
                  rules={[{required: true},]}
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
                  name={'outputLimit'}
                  label={'输出限制'}
                  rules={[{required: true},]}
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
                placeholder={'输入题目描述'}
                previewStyle="vertical"
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
                ref={outputDescriptionEditor}
                placeholder={'输出描述'}
                // previewStyle="vertical"
                previewStyle={'tab'}
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
        </>
    }
  </Page>)

}
export default ProblemAdd;
