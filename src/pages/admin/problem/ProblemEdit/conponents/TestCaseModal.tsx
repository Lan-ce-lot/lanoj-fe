/**
 * @FileName: TestCaseModal
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/8 0:43
 */
import React, {useEffect} from "react";
import {Button, Form, Input, message, Modal, Upload} from "antd";
import {createSolution, ProblemTestCase} from "../../../../../api/admin/problemCase";
import {DOWNLOAD_SERVER_BASE_URL, FILE_DIRECTORY, UPLOAD_SERVER_BASE_URL} from "../../../../../config/config";
import {UploadOutlined} from "@ant-design/icons";

//import styles from './TestCaseModal.module.scss'

interface IProps {
  isShow: boolean;
  onConfirmed: () => void;
  onCancel: () => void;
  uploadToken?: string;
  problemId: number;
  initialTestCase?: ProblemTestCase;
}

export declare type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

export interface UploadFile<T = any> {
  uid: string;
  size: number;
  name: string;
  fileName?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  percent?: number;
  thumbUrl?: string;
  originFileObj?: File | Blob;
  response?: T;
  error?: any;
  linkProps?: any;
  type: string;
  xhr?: T;
  preview?: string;
}

interface IState {

}

enum UPLOADER {
  STD_IN,
  STD_OUT
}

const TestCaseModal: React.FC<IProps> = ({
                                           isShow,
                                           onConfirmed,
                                           onCancel,
                                           uploadToken,
                                           problemId,
                                           initialTestCase,
                                         }) => {

  const [form] = Form.useForm();
  useEffect(() => {
    if (initialTestCase) {
      form.setFieldsValue(initialTestCase);
    }
  }, [form, initialTestCase])
// 构造上传表单
  const getUploadForm = (type: UPLOADER) => {
    const extensionName = (type === UPLOADER.STD_IN ? '.in' : '.out');
    return {
      token: uploadToken,
      key: FILE_DIRECTORY + new Date().getTime().toString() + extensionName
    }
  }

  // 确认按钮被单击
  const onThisConfirmed = () => {
    form.validateFields()
      .then(() => {
        submitSolutionFormData();
      });
  }

  // 提交表单
  const submitSolutionFormData = () => {
    const formData = form.getFieldsValue(true);
    console.log(formData)
    const stdInFileData: UploadFile | undefined = formData.stdIn[0];
    const stdOutFileData: UploadFile | undefined = formData.expectedStdOut[0];
    const addSolutionForm: ProblemTestCase = {
      problemId,
      description: formData.description,
      stdOut: getFinalFileDownloadPath(stdOutFileData?.response.key),
      stdIn: getFinalFileDownloadPath(stdInFileData?.response.key)
    }
    console.log(addSolutionForm)
    createSolution(addSolutionForm)
      .then(() => {
        message.success('创建成功～');
        onConfirmed();
      })
  }

  // 拼接下载路径
  const getFinalFileDownloadPath = (key: string) => {
    if (!key) {
      return null;
    }
    return `${DOWNLOAD_SERVER_BASE_URL}/${key}`;
  }

  // 上传组件表单验证器
  const uploadSuccessValidator = (data: any, validateMessage: string) => {
    // console.log(data)
    if (data && data.length > 0) {
      return Promise.resolve();
    }
    return Promise.reject(validateMessage);
  }
  const normFile = (e: any) => {  //如果是typescript, 那么参数写成 e: any
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <div>
      <Modal
        destroyOnClose
        maskClosable={false}
        title="添加测试点"
        visible={isShow}
        onCancel={() => onCancel()}
        onOk={() => onThisConfirmed()}>
        <Form
          name="basic"
          form={form}>
          {/*<Form.Item*/}
          {/*  label="样例描述"*/}
          {/*  name="description"*/}
          {/*  rules={[{*/}
          {/*    required: true,*/}
          {/*    message: '请填写样例描述'*/}
          {/*  }]}>*/}
          {/*  <Input/>*/}
          {/*</Form.Item>*/}
          <Form.Item
            getValueFromEvent={normFile}
            label="标准输入"
            name="stdIn"
            rules={[
              {
                required: true,
                message: '请上传标准输入',
                validator: (r, s) => uploadSuccessValidator(s, '请上传标准输入')
              }
            ]}>
            <Upload
              name="file"
              data={getUploadForm(UPLOADER.STD_IN)}
              action={UPLOAD_SERVER_BASE_URL}>
              <Button>
                <UploadOutlined/> 点我上传标准输入
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            getValueFromEvent={normFile}
            label="期望输出"
            name="expectedStdOut"
            rules={[
              {
                required: true,
                message: '请上传期望输出',
                validator: (r, s) => uploadSuccessValidator(s, '请上传期望输出')
              }
            ]}>
            <Upload
              name="file"
              data={getUploadForm(UPLOADER.STD_OUT)}
              action={UPLOAD_SERVER_BASE_URL}>
              <Button>
                <UploadOutlined/> 点我上传期望输出
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

TestCaseModal.defaultProps = {
  isShow: false,
  uploadToken: ''
}
export default TestCaseModal;
