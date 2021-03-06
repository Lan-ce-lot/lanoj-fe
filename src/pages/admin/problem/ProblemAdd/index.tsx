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
          <Divider orientation="left">????????????</Divider>
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
                  label={'????????????'}
                  name={'name'}
                  rules={[{required: true},]}
                  // initialValue={problem!.name}
                >
                  <Input placeholder={'????????????'}
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
                  label={'????????????'}
                  name={'tags'}
                >
                  <Select
                    allowClear
                    mode={"multiple"}
                    style={{width: '100%'}}
                    placeholder="????????????"
                    onChange={handleChange}>
                    {children}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  label={'????????????'}
                  name={'timeLimit'}
                  rules={[{required: true},]}
                  // initialValue={problem.timeLimit}
                >
                  <InputNumber
                    // defaultValue={problem.timeLimit}
                    placeholder={'????????????'}
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
                  label={'????????????'}
                  name={'memoryLimit'}
                  rules={[{required: true},]}
                  // initialValue={problem.memoryLimit}
                >
                  <InputNumber
                    // defaultValue={problem.memoryLimit}
                    placeholder={'????????????'}
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
                  label={'????????????'}
                  rules={[{required: true},]}
                  // initialValue={problem.outputLimit}
                >
                  <InputNumber
                    // defaultValue={problem.outputLimit}
                    placeholder={'????????????'}
                    addonAfter="Byte"
                    min={0}
                    max={1000000000} style={{width: '100%'}}
                  >
                  </InputNumber>
                </Form.Item>
              </Col>
            </Row>
            <Divider orientation="left">????????????</Divider>
            <Form.Item
              rules={[{required: true},]}
              name={'content'}
              // valuePropName={}

              label={'????????????'}
            >
              <Editor
                language={'zh-CN'}
                ref={contentEditor}
                placeholder={'??????????????????'}
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
              label={'????????????'}
            >
              <Editor
                language={'zh-CN'}
                ref={inputDescriptionEditor}
                placeholder={'????????????'}
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
              label={'????????????'}
            >
              <Editor
                language={'zh-CN'}
                ref={outputDescriptionEditor}
                placeholder={'????????????'}
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
                  label={'????????????'}
                  name={'sampleIn'}
                  rules={[{required: true,}]}
                >
                  <TextArea
                    showCount
                    maxLength={200}
                    placeholder="??????????????????"
                    autoSize={{minRows: 3, maxRows: 6}}
                  />

                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  label={'????????????'}
                  name={'sampleOut'}
                  rules={[{required: true,}]}
                >
                  <TextArea
                    showCount
                    maxLength={200}
                    placeholder="??????????????????"
                    autoSize={{minRows: 3, maxRows: 6}}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button htmlType={"submit"} type={"primary"}>??????</Button>
            </Form.Item>
          </Form>
        </>
    }
  </Page>)

}
export default ProblemAdd;
