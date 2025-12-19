/**
 * 企业最佳实践配置
 *
 * 核心组合配置：
 * - trackAllPureComponents: 自动追踪所有纯组件（React.memo、PureComponent）
 * - trackHooks: 追踪所有 Hook 调用
 * - trackExtraHooks: 追踪自定义 Hook（如 Redux useSelector）
 *
 * 日志配置：
 * - logOnDifferentValues: 显示 props/state 值的变化详情
 * - logOwnerReasons: 显示组件拥有者（父组件）的重新渲染原因
 * - onlyLogs: 只打印日志，不进行追踪（用于调试）
 *
 * 自定义配置：
 * - notifier: 自定义通知函数（可以发送到监控系统）
 * - customName: 自定义日志名称
 */
export const enterpriseWdyrConfig = {
  // ========== 核心追踪配置 ==========

  /**
   * 自动追踪所有纯组件
   * - React.memo 包装的组件
   * - React.PureComponent
   * - React.forwardRef 组件
   *
   * 使用场景：想要自动追踪所有优化过的组件，无需手动设置 whyDidYouRender = true
   */
  trackAllPureComponents: false,

  /**
   * 追踪所有 Hook 调用
   * - useState, useEffect, useMemo, useCallback 等
   *
   * 使用场景：发现 Hook 依赖数组问题、不必要的 Hook 重新执行
   */
  trackHooks: true,

  /**
   * 追踪自定义 Hook 或第三方库的 Hook
   * 例如：Redux 的 useSelector
   *
   * 使用方式：
   * trackExtraHooks: [
   *   [ReactRedux, 'useSelector'],
   *   [YourCustomHook, 'useYourHook'],
   * ]
   */
  // trackExtraHooks: [],

  // ========== 日志配置 ==========

  /**
   * 显示值的变化详情
   * - true: 显示 prev 和 next 的完整对比
   * - false: 只显示组件重新渲染了
   *
   * 使用场景：需要查看 props/state 具体变化时
   */
  logOnDifferentValues: true,

  /**
   * 显示组件拥有者（父组件）的重新渲染原因
   * - true: 显示父组件为什么重新渲染，导致子组件也重新渲染
   * - false: 只显示子组件重新渲染
   *
   * 使用场景：需要追踪组件重新渲染的根源（父组件）
   */
  logOwnerReasons: true,

  /**
   * 只打印日志，不进行追踪
   * - true: 只打印，不拦截组件渲染
   * - false: 正常追踪和拦截
   *
   * 使用场景：只想查看日志，不想影响组件行为
   */
  onlyLogs: false,

  /**
   * 折叠相同类型的日志组
   * - true: 折叠相同类型的日志，控制台更整洁
   * - false: 展开所有日志，便于详细查看
   *
   * 使用场景：大量组件重新渲染时，折叠可以更清晰地查看
   */
  collapseGroups: false,

  // ========== 自定义配置 ==========

  /**
   * 是否使用增强的日志输出（Enhanced Notifier）
   * - true: 使用增强日志，显示代码位置和调用栈（可点击定位）
   * - false: 使用默认日志输出
   *
   * 使用场景：
   * - 需要快速定位代码位置时，开启此选项
   * - 需要更详细的日志信息时，开启此选项
   */
  useEnhancedNotifier: true,

  /**
   * 自定义日志打印函数
   *
   * 使用场景：想要自定义日志打印方式，比如发送到监控系统、错误追踪服务等
   * 注意：如果 useEnhancedNotifier 为 true，此配置会被覆盖
   */
  // notifier: (info) => {
  //   console.warn('whyDidYouRender info', info);
  // },

  /**
   * 自定义日志名称
   * 用于区分不同环境或项目的日志
   *
   * 使用方式：
   * customName: 'MyApp-Dev'
   */
  // customName: undefined,

  // ========== 其他配置 ==========

  /**
   * 包含/排除特定组件
   * 使用正则表达式匹配组件名称
   *
   * 使用方式：
   * include: [/^MyComponent$/],
   * exclude: [/^ThirdPartyComponent$/],
   */
  // include: undefined,
  // exclude: undefined,
};
