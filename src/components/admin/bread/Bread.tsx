/**
 * @FileName: Bread
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/2/26 23:53
 */
import React from "react";
import {Link, useLocation} from "react-router-dom";
import iconMap from '../../../utils/iconMap'
import { pathToRegexp } from 'path-to-regexp'
import { queryAncestors } from '../../../utils'
import styles from './Bread.module.scss'
import { Breadcrumb } from 'antd'
interface BreadProps {
  routeList?:any,
  location?:any
}

const Bread: React.FunctionComponent<BreadProps> = (props) => {
  const generateBreadcrumbs = (paths:any) => {
    return paths.map((item:any, key:any) => {
      const content = item && (
        <>
          {item.icon && (
            <span style={{ marginRight: 4 }}>{iconMap[item.icon]}</span>
          )}
          {item.name}
        </>
      )

      return (
        item && (
          <Breadcrumb.Item key={key}>
            {paths.length - 1 !== key ? (
              <Link to={item.path || '#'}>{content}</Link>
            ) : (
              content
            )}
          </Breadcrumb.Item>
        )
      )
    })
  }

  const location = useLocation()
  const { routeList } = props
  // Find a route that matches the pathname.
  const currentRoute = routeList.find(
    (_:any) => _.route && pathToRegexp(_.route).exec(location.pathname)
  )
  // Find the breadcrumb navigation of the current route match and all its ancestors.
  const paths = currentRoute
    ? queryAncestors(routeList, currentRoute, 'breadcrumbParentId').reverse()
    : [
      routeList[0],
      {
        id: 404,
        name: `Not Found`,
      },
    ]

  return (
    <Breadcrumb className={styles.bread}>
      {generateBreadcrumbs(paths)}
    </Breadcrumb>
  )

}
export default Bread;
