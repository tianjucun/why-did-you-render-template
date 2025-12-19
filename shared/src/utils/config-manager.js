/**
 * whyDidYouRender 配置管理器
 * 支持从 sessionStorage 读取和保存配置
 */

const STORAGE_KEY = 'wdyr-config';

// 默认配置
const defaultConfig = {
  // 核心追踪配置
  trackAllPureComponents: true,
  trackHooks: true,
  trackExtraHooks: [],

  // 日志配置
  logOnDifferentValues: true,
  logOwnerReasons: true,
  onlyLogs: false,
  collapseGroups: false,
  useEnhancedNotifier: true, // 是否使用增强的日志输出（显示代码位置和调用栈）

  // 自定义配置
  customName: undefined,

  // 组件监听配置
  componentTracking: {
    MemoizedComponent: true,
    FunctionComponent: true,
    ForwardRefComponent: true,
    ClassComponent: true,
    UseStateDemo: true,
    UseMemoDemo: true,
    UseCallbackDemo: true,
    ChildButton: true,
  },
};

/**
 * 从 sessionStorage 读取配置
 */
export function loadConfig() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultConfig, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load config from sessionStorage:', e);
  }
  return defaultConfig;
}

/**
 * 保存配置到 sessionStorage
 */
export function saveConfig(config) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.warn('Failed to save config to sessionStorage:', e);
  }
}

/**
 * 重置配置为默认值
 */
export function resetConfig() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to reset config:', e);
  }
}

/**
 * 应用配置到 whyDidYouRender
 */
export function applyConfig(React, whyDidYouRender) {
  const config = loadConfig();

  // 应用组件监听配置
  if (window.wdyrComponents) {
    Object.entries(config.componentTracking || {}).forEach(
      ([name, enabled]) => {
        const component = window.wdyrComponents[name];
        if (component) {
          component.whyDidYouRender = enabled;
        }
      }
    );
  }

  // 应用 whyDidYouRender 配置
  whyDidYouRender(React, {
    trackAllPureComponents: config.trackAllPureComponents,
    trackHooks: config.trackHooks,
    trackExtraHooks: config.trackExtraHooks,
    logOnDifferentValues: config.logOnDifferentValues,
    logOwnerReasons: config.logOwnerReasons,
    onlyLogs: config.onlyLogs,
    collapseGroups: config.collapseGroups,
    customName: config.customName,
  });
}
