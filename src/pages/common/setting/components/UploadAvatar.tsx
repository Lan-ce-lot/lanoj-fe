/**
 * @FileName: UploadAvatar
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/8 21:18
 */
import React, {useEffect, useState} from "react";
// @ts-ignore
import ImgCrop from 'antd-img-crop';
//import styles from './UploadAvatar.module.scss'

import 'antd/dist/antd.css';
// import './index.css';
import {Upload, message, Avatar, Row, Col, Skeleton} from 'antd';
import {InboxOutlined, LoadingOutlined, PlusOutlined, UserOutlined} from '@ant-design/icons';
import {avatarUpload} from "../../../../api/file";
import {IUser} from "../../../../api/admin/user";

const {Dragger} = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info: any) {
    const {status} = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: any) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

interface IProps {
  avatar?: string;
  loading?: boolean;
}

interface IState {

}

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const UploadAvatar: React.FC<IProps> = ({
                                          avatar,
                                          loading = false
                                          // avatar = "https://joeschmoe.io/api/v1/glz"
                                        }) => {
  // const [loading, setloading] = useState(false)
  const [imageUrl, setImageUrl] = useState(avatar)
  useEffect(() => {
    console.log(1)
    setImageUrl(avatar)
  }, [avatar])

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow!.document.write(image.outerHTML);
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div style={{marginTop: 8}}>点击上传</div>
    </div>
  );
  return (<>
    <Skeleton
      loading={loading}
    >
      <Row>
        <Col lg={12}>
          <Avatar shape="square"
                  src={imageUrl}
                  size={104}
                  icon={<UserOutlined/>}
          />
        </Col>
        <Col lg={12}>
          <ImgCrop rotate>
            <Upload
              onPreview={onPreview}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/file/avatar"
              customRequest={
                (info) => {
                  const formData = new FormData()
                  formData.append('file', info.file)
                  avatarUpload(formData).then((res) => {
                    const {data} = res.data
                    setImageUrl(data)
                    message.success(res.data.msg)
                  })
                }
              }
              beforeUpload={beforeUpload}
              // onChange={handleChange}
              progress={{
                strokeColor: {
                  '0%': '#108ee9',
                  '100%': '#87d068',
                },
                strokeWidth: 3,
                format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
              }}

              // customRequest={}
            >
              {
                // imageUrl ?
                // <img src={imageUrl} alt="avatar" style={{width: '100%'}}/>

                uploadButton}
            </Upload>
          </ImgCrop>
        </Col>
      </Row>

    </Skeleton>


  </>)
}
export default UploadAvatar;
