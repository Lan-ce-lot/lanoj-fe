import React, {CSSProperties} from "react";
import {
  BackTop
  , Button
} from 'antd';
interface CommonBackTopProps {
  className?:string
  target?:() => HTMLElement | Window | Document;
}
const CommonBackTop: React.FunctionComponent<CommonBackTopProps> = (Props) => {
  const style:CSSProperties = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1890ff',
    // backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',

    fontSize: 14,
  };
  return (
    <BackTop className={Props.className} target={Props.target}>
      <div style={style}>UP</div>
    </BackTop>)
}
export default CommonBackTop
