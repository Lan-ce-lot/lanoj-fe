/**
 * @FileName: Test
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/14 19:25
 */

import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';

const Test = () => {
  // const [data, setData] = useState([]);
  const data = [
    {
      time: '2019-01',
      value: 350,
      count: 800,
    },
    {
      time: '2019-02',
      value: 350,
      count: 800,
    },
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
    {
      time: '2019-10',
      value: 470,
      count: 220,
    },
  ];
  const config = {
    data,
    xField: 'time',
    yField: 'value',
    // xAxis: {
    //   range: [0, 1],
    //   tickCount: 5,
    // },

    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
  };

  return <Area {...config} />;
};

export default Test;
