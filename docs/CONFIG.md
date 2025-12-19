# whyDidYouRender 配置说明

## 企业最佳实践配置

推荐使用以下组合配置：

```javascript
{
  trackAllPureComponents: true,  // 自动追踪所有纯组件
  trackHooks: true,              // 追踪所有 Hook
  trackExtraHooks: [],           // 追踪自定义 Hook
  logOnDifferentValues: true,    // 显示值的变化详情
  logOwnerReasons: true,         // 显示组件拥有者的原因
}
```

### trackAllPureComponents + trackHooks + trackExtraHooks

**组合使用场景**：

- **trackAllPureComponents**: 自动追踪所有使用 `React.memo`、`PureComponent`、`forwardRef` 的组件
- **trackHooks**: 追踪所有内置 Hook（useState、useEffect、useMemo 等）
- **trackExtraHooks**: 追踪自定义 Hook 或第三方库的 Hook

**示例**：

```javascript
whyDidYouRender(React, {
  trackAllPureComponents: true,
  trackHooks: true,
  trackExtraHooks: [
    // 追踪 Redux useSelector
    [ReactRedux, 'useSelector'],
    // 追踪自定义 Hook
    [useCustomHook, 'useCustomHook'],
  ],
});
```

**优势**：
- 无需手动为每个组件设置 `whyDidYouRender = true`
- 自动发现所有性能问题
- 覆盖组件和 Hook 两个维度

## logOnDifferentValues 使用场景

**作用**：控制是否显示 props/state 的详细变化

```javascript
logOnDifferentValues: true  // 显示详细对比
logOnDifferentValues: false // 只显示组件重新渲染了
```

**使用场景**：

1. **需要查看具体变化**：设置为 `true`
   ```
   [why-did-you-render] MyComponent re-rendered:
     prev: { count: 0, name: 'Alice' }
     next: { count: 1, name: 'Alice' }
   ```

2. **日志太多，只需要知道重新渲染了**：设置为 `false`
   ```
   [why-did-you-render] MyComponent re-rendered
   ```

## logOwnerReasons 使用场景

**作用**：显示组件拥有者（父组件）的重新渲染原因

```javascript
logOwnerReasons: true  // 显示父组件为什么重新渲染
logOwnerReasons: false // 只显示子组件重新渲染
```

**使用场景**：

1. **追踪渲染根源**：设置为 `true`
   ```
   [why-did-you-render] ChildComponent re-rendered
     Owner (ParentComponent) re-rendered because:
       props changed: { count: 0 -> 1 }
   ```

2. **只关注当前组件**：设置为 `false`
   ```
   [why-did-you-render] ChildComponent re-rendered
   ```

**典型场景**：
- 子组件频繁重新渲染，需要知道是哪个父组件导致的
- 调试组件树中的性能问题

## onlyLogs 使用场景

**作用**：只打印日志，不拦截组件渲染

```javascript
onlyLogs: true  // 只打印，不影响组件
onlyLogs: false // 正常追踪和拦截
```

**使用场景**：

1. **调试模式**：设置为 `true`
   - 只想查看日志，不想影响组件行为
   - 用于性能分析，不改变组件渲染逻辑

2. **正常模式**：设置为 `false`
   - 正常追踪和拦截组件渲染
   - 用于发现和修复性能问题

## notifier 使用场景

**作用**：自定义通知函数，可以发送日志到监控系统

```javascript
notifier: (info) => {
  // 发送到监控系统
  sendToMonitoring(info);
  // 或发送到错误追踪服务
  Sentry.captureMessage('Component re-rendered', { extra: info });
}
```

**使用场景**：

1. **生产环境监控**（虽然 whyDidYouRender 通常只在开发环境使用）
2. **性能分析工具集成**
3. **自定义日志处理**

**示例**：

```typescript
whyDidYouRender(React, {
  notifier: (info) => {
    // 发送到性能监控系统
    if (info.reason.propsDifferences) {
      performanceMonitor.track('unnecessary-render', {
        component: info.componentName,
        props: info.reason.propsDifferences,
      });
    }
  },
});
```

## customName 使用场景

**作用**：自定义日志名称，用于区分不同环境或项目

```javascript
customName: 'MyApp-Dev'  // 日志前缀
```

**使用场景**：

1. **多项目开发**：区分不同项目的日志
2. **多环境**：区分开发、测试、预发布环境
3. **团队协作**：标识不同开发者的日志

**示例**：

```typescript
whyDidYouRender(React, {
  customName: process.env.APP_NAME || 'MyApp',
  // 日志输出：[MyApp] Component re-rendered
});
```

## 完整配置示例

```javascript
import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { enterpriseWdyrConfig } from '@wdyr-template/shared';
import ReactRedux from 'react-redux';

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    ...enterpriseWdyrConfig,
    trackExtraHooks: [
      [ReactRedux, 'useSelector'],
    ],
    customName: 'MyApp-Dev',
    notifier: (info) => {
      // 发送到监控系统
      console.log('Performance issue detected:', info);
    },
  });
}
```

## 配置建议

### 开发阶段

```javascript
{
  trackAllPureComponents: true,
  trackHooks: true,
  logOnDifferentValues: true,
  logOwnerReasons: true,
  collapseGroups: false,  // 展开所有日志
}
```

### 性能分析阶段

```javascript
{
  trackAllPureComponents: true,
  trackHooks: true,
  logOnDifferentValues: false,  // 减少日志量
  logOwnerReasons: false,
  collapseGroups: true,  // 折叠日志
  onlyLogs: true,  // 只记录，不影响
}
```

### 生产环境

**不要在生产环境使用 whyDidYouRender！**

确保配置只在开发环境生效：

```javascript
if (process.env.NODE_ENV === 'development') {
  // whyDidYouRender 配置
}
```

