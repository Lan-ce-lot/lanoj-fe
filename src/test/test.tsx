// /**
//  * @FileName: test
//  * @Description: Every Saint has a past, every sinner has a future.
//  * @Author: Lance
//  * @Date: 2022/2/28 21:50
//  */
// import React, { useState } from "react";
// import "react-perfect-scrollbar/dist/css/styles.css";
// import PerfectScrollbar from "react-perfect-scrollbar";
//
//
// //import styles from './test.module.scss'
//
// interface TestProps {
//
// }
//
// import React from 'react';
// import ReactDOM from 'react-dom';
// import Split from '@uiw/react-split';
// import { Menu, Button } from 'uiw';
//
// class Demo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       width: 210,
//     };
//   }
//   onClick() {
//     this.setState({
//       width: this.state.width === 0 ? 210 : 0,
//     });
//   }
//   render() {
//     const styl = {};
//     if (this.state.width === 0) {
//       styl.width = `0%`;
//     } else {
//       styl.width = this.state.width;
//     }
//     return (
//       <>
//         <div style={{ marginBottom: 10 }}>
//           <Button type="primary" onClick={this.onClick.bind(this)}>{this.state.width === 0 ? '隐藏菜单' : '展示菜单'}</Button>
//         </div>
//         <Split lineBar visiable={this.state.width !== 0} style={{ border: '1px solid #d5d5d5', borderRadius: 3 }}>
//           <div style={{ ...styl, overflow: 'hidden' }}>
//             <Menu>
//               <Menu.Item icon="heart-on" text="另存为" active />
//               <Menu.Item icon="appstore" text="应用商城" />
//               <Menu.Item icon="bar-chart" text="月统计报表导出" />
//               <Menu.Item icon="setting" text="偏好设置" />
//               <Menu.Divider />
//               <Menu.Item icon="map" text="谷歌地图" />
//             </Menu>
//           </div>
//           <div style={{ flex: 1, minWidth: 30 }}>
//             Right Pane
//           </div>
//         </Split>
//       </>
//     )
//   }
// }
//
// export default Test;
export {}
