/**
 * @FileName: ProblemPieModal
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/12 15:29
 */
import React from "react";

import {Pie, measureTextWidth} from '@ant-design/plots';
import {Color} from "../../../../../utils";
import {Modal} from "antd";
import {JudgeResultList} from "../../../../../common/enumerations";

//import styles from './ProblemPieModal.module.scss'

interface IProps {
  problem: any;
  modalVisible: boolean;
  onCancel: any;
}

interface IState {

}

const COLORS = [Color.green, Color.red, Color.blue, Color.purple, Color.peach, Color.yellow];
const ProblemPieModal: React.FC<IProps> = ({problem, modalVisible, onCancel}) => {
  const data = Object.entries(problem).filter(it => (JudgeResultList.includes(it[0])) && it[1]
  ).map(it => {
    return {name: it[0], value: it[1]}
  })

  console.log(data)

  // data = data.filter((it: any) => it.value && it.name !== 'total')

  function renderStatistic(containerWidth: any, text: any, style: any) {
    const {width: textWidth, height: textHeight} = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2
    let scale = 1;
    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }
    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  }

  const config = {
    // autoFit:true,
    height: 270,
    appendPadding: 4,
    data,
    angleField: 'value',
    colorField: 'name',
    radius: 0.8,
    innerRadius: 0.64,
    color: COLORS,
    meta: {
      value: {
        formatter: (v: any) => `${v}`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container: any, view: any, datum: any) => {
          const {width, height} = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.name : '总提交';
          return renderStatistic(d, text, {
            fontSize: 8,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '18x',
        },
        customHtml: (container: any, view: any, datum: any, data: any) => {
          const {width} = container.getBoundingClientRect();
          const text = datum ? `${datum.value}` : `${data.reduce((r: any, d: any) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 20,
          });
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      // {
      //   type: 'pie-statistic-active',
      // },
    ],
  };
  return <Modal
    title={'题目统计'}
    visible={modalVisible}
    onCancel={onCancel}
    destroyOnClose
    footer={null}
  >
    <Pie {...config} />
  </Modal>;
}
export default ProblemPieModal;
