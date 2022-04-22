/**
 * @FileName: index
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/18 0:56
 */
import React, {useState} from "react";
import {Card} from "antd";
import Split from "@uiw/react-split";
import Editor from "../problem/problemDetail/components/Editor";
import ProblemContent from "../problem/problemDetail/components/ProblemContent";

interface IProps {

}


const Test: React.FC<IProps> = ({}) => {
  const [width, setWidth] = useState(`50%`);
  const onClick = () => {
    setWidth(
      width === `0%` ? `50%` : `0%`,
    );
  }
  const styl: any = {};
  if (width === `0%`) {
    styl.width = `0%`;
  } else {
    styl.width = width;
  }
  return (<>
      {/*<div style={{marginBottom: 10}}>*/}
      {/*  <Button type="primary" onClick={onClick.bind(null)}>{width === `0%` ? '隐藏菜单' : '展示菜单'}</Button>*/}
      {/*</div>*/}
      <Split
        onDragEnd={(preSize: number, nextSize: number, paneNumber: number) => {
          if (preSize <= 15) {
            // alert(nextSize)
            setWidth('0%')
          }

        }}
        // visiable={width !== `0%`}
        style={{height: "100%", border: '1px solid #d5d5d5', borderRadius: 3}}>
        <div style={{
          ...styl,

          height: "100%",
          // minWidth: 30,
          overflow: 'hidden'
        }}>
          <Card
            style={{
              height: "100%",
              overflowX: "auto",
              // maxHeight: "calc(100vh - 65px)"
            }}
          >
            <ProblemContent/>

          </Card>

        </div>

        <div style={{
          flex: 1, height: "100%", minWidth: "45%",
          backgroundColor: '#fff'
        }}>
          <Editor
          />
        </div>
      </Split>
    </>
  )
}
export default Test;
