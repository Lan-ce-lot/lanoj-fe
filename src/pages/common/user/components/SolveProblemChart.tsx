/**
 * @FileName: SolveProblemChart
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/19 22:43
 */
import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend, AreaChart,
} from 'recharts';
import classnames from "classnames";
import {Color} from "../../../../utils";

import styles from './SolveProblemChart.module.scss'
interface IProps {
  data: any;
}

interface IState {

}

const SolveProblemChart: React.FC<IProps> = ({data}) => {
  return (<>
      <ResponsiveContainer minHeight={270}>
        <ComposedChart data={data}>
          <Legend
            verticalAlign="top"
            content={prop => {
              const {payload} = prop
              return (
                <ul
                  className={classnames({
                    [styles.legend]: true,
                    clearfix: true,
                  })}
                >
                  {payload!.map((item, key) => (
                    <li key={key}>
                      <span
                        className={styles.radiusdot}
                        style={{background: item.color}}
                      />
                      {item.value}
                    </li>
                  ))}
                </ul>
              )
            }}
          />
          <XAxis
            dataKey="name"
            axisLine={{stroke: Color.borderBase, strokeWidth: 1}}
            tickLine={false}
          />
          <YAxis axisLine={false} tickLine={false}/>
          <CartesianGrid
            vertical={false}
            stroke={Color.borderBase}
            strokeDasharray="3 3"
          />
          <Tooltip
            wrapperStyle={{
              border: 'none',
              boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.05)',
            }}
            content={content => {
              const list = content!.payload!.map((item, key) => (
                <li key={key} className={styles.tipitem}>
                  <span
                    className={styles.radiusdot}
                    style={{background: item.color}}
                  />
                  {`${item.name}:${item.value}`}
                </li>
              ))
              return (
                <div className={styles.tooltip}>
                  <p className={styles.tiptitle}>{content.label}</p>
                  {content.payload && <ul>{list}</ul>}
                </div>
              )
            }}
          />
          <Area
            type="monotone"
            dataKey="SumSolve"
            stroke={Color.grass}
            fill={Color.grass}
            strokeWidth={2}
            dot={{fill: '#fff'}}
            activeDot={{r: 5, fill: '#fff', stroke: Color.green}}
          />
          <Bar dataKey="RecentSolve"
               barSize={20} fill={Color.sky} />
        </ComposedChart>
      </ResponsiveContainer>
  </>)
}
export default SolveProblemChart;
