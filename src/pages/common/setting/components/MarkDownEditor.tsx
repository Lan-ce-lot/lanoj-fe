/**
 * @FileName: MarkDownEditor
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/8 21:52
 */
import React from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
//import styles from './MarkDownEditor.module.scss'
import {Editor} from '@toast-ui/react-editor';

interface IProps {
  initialValue?: string;
  height?: string;
}

interface IState {

}

const MarkDownEditor: React.FC<IProps> = ({
                                            initialValue = "Hello LANOJ!",
                                            height = '500px'
                                          }) => {


  return (<>
    <Editor
      initialValue={initialValue || '无内容'}
      previewStyle="vertical"
      height={height}
      initialEditType="markdown"
      useCommandShortcut={true}
    />
  </>)
}
export default MarkDownEditor;
