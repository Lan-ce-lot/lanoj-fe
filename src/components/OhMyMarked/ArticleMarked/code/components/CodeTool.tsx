/**
 * @FileName: CodeTool
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/18 3:09
 */
import React, {useState} from 'react';
import {CopyTwoTone} from '@ant-design/icons';
import CopyToClipboard from 'react-copy-to-clipboard';
import {message, Tooltip} from 'antd';

interface CodeToolProps {
  code: string;
  classNames?: string;
}

const CodeTool: React.FunctionComponent<CodeToolProps> = (props) => {
  // 复制提示标签内容
  const [toolTipData, setToolTipData] = useState<string>('点击复制');

  // 复制成功
  const onCopySuccess = () => {
    message.success({
      duration: 0.5,
      content: "复制成功"
    })
    setToolTipData('复制成功');
  }

  // 鼠标从复制图标上移开
  const onMouseMoveFromIcon = () => {
    // 给个延迟，防止在tooltip收回动画播放时文字改变让人视觉上感到不适
    setTimeout(() => {
      setToolTipData('点击复制')
    }, 500);
  }

  return (
    <div className={props.classNames}>
      <CopyToClipboard text={props.code} onCopy={() => onCopySuccess()}>
        <Tooltip placement="top" title={toolTipData}>
          <CopyTwoTone onMouseLeave={() => onMouseMoveFromIcon()}/>
        </Tooltip>
      </CopyToClipboard>
    </div>
  )
}


export default CodeTool;
