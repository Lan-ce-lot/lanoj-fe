/**
 * @FileName: DualAxes
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/14 17:48
 */
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Column} from '@ant-design/plots';
import {getRecentSubmission} from "../../../../api/common/userInfo";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT} from "../../../../config/config";
import {useParams} from "react-router-dom";

const UserDualAxes = () => {
  // const data = [
  //   {
  //     name: "acceptAmount",
  //     value: 2,
  //     time: "2022-04-21"
  //   },
  //   {
  //     name: "totalAmount",
  //     value: 9,
  //     time: "2022-04-21"
  //   },
  //   {
  //     name: "acceptAmount",
  //     value: 1,
  //     time: "2022-04-22"
  //   },
  //   {
  //     name: "totalAmount",
  //     value: 0,
  //     time: "2022-04-22"
  //   },
  //   {
  //     name: "acceptAmount",
  //     value: 1,
  //     time: "2022-04-23"
  //   },
  // ];
  const [data, setData] = useState<any[]>([])
  const {id} = useParams();
  useEffect(() => {
    const end = moment().add(1, 'days').format(DEFAULT_DATE_TIME_FORMAT)
    // 默认提早七天
    const start = moment().add(
      5 * (-1),
      'days').format(DEFAULT_DATE_TIME_FORMAT)
    getRecentSubmission(start, end, Number(id)).then(res => {
      const {data} = res.data
      setData(data)
    })
  }, [])
  const config = {
    data,
    // isStack: true,
    height: 270,
    isGroup: true,
    xField: 'time',
    yField: 'value',
    seriesField: 'name',
    // 分组柱状图 组内柱子间的间距 (像素级别)
    dodgePadding: 2,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  }
  // @ts-ignore
  return <Column {...config} />;
};

export default UserDualAxes;
