/**
 * @FileName: article
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/8 15:35
 */
import {BaseModel} from "../../models/BaseModel";
import {IPageQuery} from "../../models/Pagination";
import request from "../../utils/request";

export interface IArticle extends BaseModel {
  userId: number;
  username?: string;
  avatar?: string;
  title: string;
  content: string;
  problemId: number;
  problemName?: string;
  description?: string;
}

export interface IArticleQuery extends IPageQuery {
  name?: string;
  problemId?: number;
  userId?: number;
  status?: boolean;
}

export const getArticleDetail = (id: number) => {
  return request({
      url: `/article/${id}`,
      method: 'get',
    }
  )
}
export const getArticlePage = (params: IArticleQuery) => {
  return request({
      url: `/article/`,
      method: 'get',
      params
    }
  )
}
export const deleteArticle = (id: number) => {
  return request({
      url: `/article/${id}`,
      method: 'delete',
    }
  )
}
export const createArticle = (data: IArticle) => {
  return request({
      url: `/article/`,
      method: 'post',
      data
    }
  )
}

export const updateArticle = (data: IArticle) => {
  return request({
      url: `/article/`,
      method: 'put',
      data
    }
  )
}
export const getRecentArticle = () => {
  return request({
      url: `/article/recent`,
      method: 'get',
    }
  )
}


export const initArticle: IArticle = {
  avatar: "",
  content: `
由于之前对React的学习更多依赖于阅读Github上的高star项目，所以常常需要调出文档来读。虽然是React的文档不如Vue的中文文档易读(只能说React的翻译很奇怪)，但是细品可以发现，文档写的还是很不错的(相较于Redux的\`论文文档\`)。于是开个坑记录一些有意思的东西。

---

## Props

当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 “props”。

类似插槽

当 props 和 state 发生变化时，React 会重新渲染整个组件

## Hook

别人做好的东西，你直接拿来用产出自己的东西

yysy，我也是因为Hook才入React的坑的。如果停留在类的模式，那Vue不香吗？

### useState

state可以和Vue的data类别，但react的state和vue的data还是有很大区别的，Vue的data是和虚拟dom双向绑定的，React的state需要通过setState进行修改，是一个单向过程，而且在更新过程中的钩子函数中修改的话，会造成死循环。

另外，有一个函数式更新

如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 \`setState\`

\`\`\`javascript
setCount(prevCount => prevCount - 1)
\`\`\`

\`useState\` 不会自动合并更新对象

\`useReducer\` 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。

### useEffect

可以把 \`useEffect\` Hook 看做 \`componentDidMount\`，\`componentDidUpdate\` 和 \`componentWillUnmount\` 这三个函数的组合

阻止每次重新渲染都会执行 useEffect

如果希望 \`effect\` 较少运行，可以提供第二个参数 - 值数组。 将它们视为该\`effect\`的依赖关系。 如果其中一个依赖项自上次更改后，\`effect\`将再次运行。实现性能的优化

仅在挂载和卸载的时候执行

如果想执行只运行一次的 \`effect\`（仅在组件挂载和卸载时执行），可以传递一个空数组（\`[]\`）作为第二个参数。这就告诉 React 你的 \`effect\` 不依赖于 \`props\` 或 \`state\` 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。

## Tip

\`<></>\`不占用Dom

## Hook

别人做好的东西，你直接拿来用产出自己的东西

yysy，我也是因为Hook才入React的坑的。如果停留在类的模式，那Vue不香吗？

### useState

state可以和Vue的data类别，但react的state和vue的data还是有很大区别的，Vue的data是和虚拟dom双向绑定的，React的state需要通过setState进行修改，是一个单向过程，而且在更新过程中的钩子函数中修改的话，会造成死循环。

另外，有一个函数式更新

如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 \`setState\`

\`\`\`javascript
setCount(prevCount => prevCount - 1)
\`\`\`

\`useState\` 不会自动合并更新对象

\`useReducer\` 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。

### useEffect

可以把 \`useEffect\` Hook 看做 \`componentDidMount\`，\`componentDidUpdate\` 和 \`componentWillUnmount\` 这三个函数的组合

阻止每次重新渲染都会执行 useEffect

如果希望 \`effect\` 较少运行，可以提供第二个参数 - 值数组。 将它们视为该\`effect\`的依赖关系。 如果其中一个依赖项自上次更改后，\`effect\`将再次运行。实现性能的优化

仅在挂载和卸载的时候执行

如果想执行只运行一次的 \`effect\`（仅在组件挂载和卸载时执行），可以传递一个空数组（\`[]\`）作为第二个参数。这就告诉 React 你的 \`effect\` 不依赖于 \`props\` 或 \`state\` 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。
## Hook

别人做好的东西，你直接拿来用产出自己的东西

yysy，我也是因为Hook才入React的坑的。如果停留在类的模式，那Vue不香吗？

### useState

state可以和Vue的data类别，但react的state和vue的data还是有很大区别的，Vue的data是和虚拟dom双向绑定的，React的state需要通过setState进行修改，是一个单向过程，而且在更新过程中的钩子函数中修改的话，会造成死循环。

另外，有一个函数式更新

如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 \`setState\`

\`\`\`javascript
setCount(prevCount => prevCount - 1)
\`\`\`

\`useState\` 不会自动合并更新对象

\`useReducer\` 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。

### useEffect

可以把 \`useEffect\` Hook 看做 \`componentDidMount\`，\`componentDidUpdate\` 和 \`componentWillUnmount\` 这三个函数的组合

阻止每次重新渲染都会执行 useEffect

如果希望 \`effect\` 较少运行，可以提供第二个参数 - 值数组。 将它们视为该\`effect\`的依赖关系。 如果其中一个依赖项自上次更改后，\`effect\`将再次运行。实现性能的优化

仅在挂载和卸载的时候执行

如果想执行只运行一次的 \`effect\`（仅在组件挂载和卸载时执行），可以传递一个空数组（\`[]\`）作为第二个参数。这就告诉 React 你的 \`effect\` 不依赖于 \`props\` 或 \`state\` 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。
## Hook

别人做好的东西，你直接拿来用产出自己的东西

yysy，我也是因为Hook才入React的坑的。如果停留在类的模式，那Vue不香吗？

### useState

state可以和Vue的data类别，但react的state和vue的data还是有很大区别的，Vue的data是和虚拟dom双向绑定的，React的state需要通过setState进行修改，是一个单向过程，而且在更新过程中的钩子函数中修改的话，会造成死循环。

另外，有一个函数式更新

如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 \`setState\`

\`\`\`javascript
setCount(prevCount => prevCount - 1)
\`\`\`

\`useState\` 不会自动合并更新对象

\`useReducer\` 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。

### useEffect

可以把 \`useEffect\` Hook 看做 \`componentDidMount\`，\`componentDidUpdate\` 和 \`componentWillUnmount\` 这三个函数的组合

阻止每次重新渲染都会执行 useEffect

如果希望 \`effect\` 较少运行，可以提供第二个参数 - 值数组。 将它们视为该\`effect\`的依赖关系。 如果其中一个依赖项自上次更改后，\`effect\`将再次运行。实现性能的优化

仅在挂载和卸载的时候执行

如果想执行只运行一次的 \`effect\`（仅在组件挂载和卸载时执行），可以传递一个空数组（\`[]\`）作为第二个参数。这就告诉 React 你的 \`effect\` 不依赖于 \`props\` 或 \`state\` 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。
## Hook

别人做好的东西，你直接拿来用产出自己的东西

yysy，我也是因为Hook才入React的坑的。如果停留在类的模式，那Vue不香吗？

### useState

state可以和Vue的data类别，但react的state和vue的data还是有很大区别的，Vue的data是和虚拟dom双向绑定的，React的state需要通过setState进行修改，是一个单向过程，而且在更新过程中的钩子函数中修改的话，会造成死循环。

另外，有一个函数式更新

如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 \`setState\`

\`\`\`javascript
setCount(prevCount => prevCount - 1)
\`\`\`

\`useState\` 不会自动合并更新对象

\`useReducer\` 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。

### useEffect

可以把 \`useEffect\` Hook 看做 \`componentDidMount\`，\`componentDidUpdate\` 和 \`componentWillUnmount\` 这三个函数的组合

阻止每次重新渲染都会执行 useEffect

如果希望 \`effect\` 较少运行，可以提供第二个参数 - 值数组。 将它们视为该\`effect\`的依赖关系。 如果其中一个依赖项自上次更改后，\`effect\`将再次运行。实现性能的优化

仅在挂载和卸载的时候执行

如果想执行只运行一次的 \`effect\`（仅在组件挂载和卸载时执行），可以传递一个空数组（\`[]\`）作为第二个参数。这就告诉 React 你的 \`effect\` 不依赖于 \`props\` 或 \`state\` 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。
## Hook

别人做好的东西，你直接拿来用产出自己的东西

yysy，我也是因为Hook才入React的坑的。如果停留在类的模式，那Vue不香吗？

### useState

state可以和Vue的data类别，但react的state和vue的data还是有很大区别的，Vue的data是和虚拟dom双向绑定的，React的state需要通过setState进行修改，是一个单向过程，而且在更新过程中的钩子函数中修改的话，会造成死循环。

另外，有一个函数式更新

如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 \`setState\`

\`\`\`javascript
setCount(prevCount => prevCount - 1)
\`\`\`

\`useState\` 不会自动合并更新对象

\`useReducer\` 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。

### useEffect

可以把 \`useEffect\` Hook 看做 \`componentDidMount\`，\`componentDidUpdate\` 和 \`componentWillUnmount\` 这三个函数的组合

阻止每次重新渲染都会执行 useEffect

如果希望 \`effect\` 较少运行，可以提供第二个参数 - 值数组。 将它们视为该\`effect\`的依赖关系。 如果其中一个依赖项自上次更改后，\`effect\`将再次运行。实现性能的优化

仅在挂载和卸载的时候执行

如果想执行只运行一次的 \`effect\`（仅在组件挂载和卸载时执行），可以传递一个空数组（\`[]\`）作为第二个参数。这就告诉 React 你的 \`effect\` 不依赖于 \`props\` 或 \`state\` 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。
## Hook

别人做好的东西，你直接拿来用产出自己的东西

yysy，我也是因为Hook才入React的坑的。如果停留在类的模式，那Vue不香吗？

### useState

state可以和Vue的data类别，但react的state和vue的data还是有很大区别的，Vue的data是和虚拟dom双向绑定的，React的state需要通过setState进行修改，是一个单向过程，而且在更新过程中的钩子函数中修改的话，会造成死循环。

另外，有一个函数式更新

如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 \`setState\`

\`\`\`javascript
setCount(prevCount => prevCount - 1)
\`\`\`

\`useState\` 不会自动合并更新对象

\`useReducer\` 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。

### useEffect

可以把 \`useEffect\` Hook 看做 \`componentDidMount\`，\`componentDidUpdate\` 和 \`componentWillUnmount\` 这三个函数的组合

阻止每次重新渲染都会执行 useEffect

如果希望 \`effect\` 较少运行，可以提供第二个参数 - 值数组。 将它们视为该\`effect\`的依赖关系。 如果其中一个依赖项自上次更改后，\`effect\`将再次运行。实现性能的优化

仅在挂载和卸载的时候执行

如果想执行只运行一次的 \`effect\`（仅在组件挂载和卸载时执行），可以传递一个空数组（\`[]\`）作为第二个参数。这就告诉 React 你的 \`effect\` 不依赖于 \`props\` 或 \`state\` 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。
`,
  problemId: 0,
  title: "",
  userId: 0,
  username: ""

}



