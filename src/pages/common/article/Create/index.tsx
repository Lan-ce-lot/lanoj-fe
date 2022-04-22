/**
 * @FileName: Create
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/7 14:04
 */
import React, {useRef, useState} from "react";
import {Button, Card, Col, Form, Input, message, Row, Select, Space} from "antd";
import {Editor} from "@toast-ui/react-editor";
import TextArea from "antd/es/input/TextArea";
import {useNavigate, useParams} from "react-router-dom";
import {createArticle} from "../../../../api/admin/article";
import store from "../../../../store";
import {validateMessages} from "../../../../config/config";

//import styles from './Create.module.scss'

interface IProps {

}

interface IState {

}

const Create: React.FC<IProps> = ({}) => {
  const navigate = useNavigate();
  const markdownEditor = useRef<any>()
  const {articleId} = useParams();
  const [article, setArticle] = useState<any>();
  if (articleId === undefined) {

  } else {

  }
  const handleFinish = () => {
    console.log(markdownEditor.current.getInstance().getMarkdown())
    createArticle({
      ...form.getFieldsValue(true),
      content: markdownEditor.current.getInstance().getMarkdown(),
      userId: store.getState().user.id,
      status:true
    }).then(res => {
      const {data} = res.data
      message.success(res.data.msg)
      navigate(`/article/${data}`)
    })
  }
  const [form] = Form.useForm()
  return (<>
    <Form
      validateMessages={validateMessages}

      form={form}
      onFinish={handleFinish}
      layout={"vertical"}
    >
      <Row gutter={[24, 12]}>

        <Col lg={18} md={24} sm={24} xs={24}>
          <Card>
            <Form.Item
              rules={[{required: true},]}
              label={'标题'}
              name={'title'}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              rules={[{required: true},]}
              label={'内容'}
              name={'content'}
            >
              <Editor
                ref={markdownEditor}
                initialValue={'无内容'}
                previewStyle="vertical"
                height={'600px'}
                initialEditType="markdown"
                useCommandShortcut={true}
              />
            </Form.Item>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <Form.Item
            >
              <Button htmlType={"submit"} type={"primary"} style={{width: '100%'}}>保存</Button>
            </Form.Item>
            <Form.Item
              label={'选择题目'}
              name={'problemId'}
            >
              <Select style={{width: '100%'}}>
                <Select.Option>
                  1001
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              rules={[{required: true},]}
              label={'简介'}
              name={'description'}
            >
              <TextArea
                // value={value}
                // onChange={this.onChange}
                placeholder="输入简介"
                autoSize={{minRows: 3, maxRows: 5}}
              />
            </Form.Item>
          </Card>

        </Col>
      </Row>
    </Form>
  </>)
}
export default Create;
