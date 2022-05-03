/**
 * @FileName: MixChart
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/5/3 23:05
 */
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {DualAxes} from '@ant-design/plots';

//import styles from './MixChart.module.scss'

interface IProps {

}

interface IState {

}


const MixChart: React.FC<IProps> = ({}) => {
    const data = [
      {
        time: '2019-03',
        value: 350,
        count: 800,
      },
      {
        time: '2019-04',
        value: 900,
        count: 600,
      },
      {
        time: '2019-05',
        value: 300,
        count: 400,
      },
      {
        time: '2019-06',
        value: 450,
        count: 380,
      },
      {
        time: '2019-07',
        value: 470,
        count: 220,
      },
      {
        time: '2019-08',
        value: 470,
        count: 220,
      },
      {
        time: '2019-09',
        value: 470,
        count: 220,
      },
    ];
    const config = {
      data: [data, data],
      xField: 'time',
      yField: ['value', 'count'],
      height: 270,
      geometryOptions: [
        {
          geometry: 'column',
          color: '#5B8FF9',
          columnWidthRatio: 0.4,
          label: {
            position: 'middle' as const,
          },
        },
        {
          geometry: 'line',
          smooth: true,
          color: '#5AD8A6',
          point: {
            size: 5,
            shape: 'diamond',
            style: {
              fill: 'white',
              stroke: '#5AD8A6',
              lineWidth: 2,
            },
          },
        },
      ],
      // 更改柱线交互，默认为 [{type: 'active-region'}]
      interactions: [
        {
          type: 'element-highlight',
        },
        {
          type: 'active-region',
        },
      ],
    };
    return <DualAxes {...config} />;
  };
export default MixChart;
