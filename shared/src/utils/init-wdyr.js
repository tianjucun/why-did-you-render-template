/**
 * whyDidYouRender 统一初始化函数
 * 处理配置加载、合并和应用
 */

import { enterpriseWdyrConfig } from '../configs/enterprise.config';
import { loadConfig } from './config-manager';
import { createEnhancedNotifier } from './enhanced-notifier';

/**
 * 初始化 whyDidYouRender
 *
 * @param {Object} React - React 对象
 * @param {Function} whyDidYouRender - whyDidYouRender 函数（从 @welldone-software/why-did-you-render 导入）
 * @param {Object} options - 可选配置
 * @param {Array} options.trackExtraHooks - 额外的 Hook 追踪配置，如 [[ReactRedux, 'useSelector']]
 */
export function initWhyDidYouRender(React, whyDidYouRender, options = {}) {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // 从 sessionStorage 读取配置，如果没有则使用默认配置
  const userConfig = loadConfig();

  // 构建配置对象
  const config = {
    ...enterpriseWdyrConfig,
    // 使用用户配置覆盖默认配置
    trackAllPureComponents:
      userConfig.trackAllPureComponents ??
      enterpriseWdyrConfig.trackAllPureComponents,
    trackHooks: userConfig.trackHooks ?? enterpriseWdyrConfig.trackHooks,
    trackExtraHooks:
      userConfig.trackExtraHooks ?? enterpriseWdyrConfig.trackExtraHooks,
    logOnDifferentValues:
      userConfig.logOnDifferentValues ??
      enterpriseWdyrConfig.logOnDifferentValues,
    logOwnerReasons:
      userConfig.logOwnerReasons ?? enterpriseWdyrConfig.logOwnerReasons,
    onlyLogs: userConfig.onlyLogs ?? enterpriseWdyrConfig.onlyLogs,
    collapseGroups:
      userConfig.collapseGroups ?? enterpriseWdyrConfig.collapseGroups,
    customName: userConfig.customName ?? enterpriseWdyrConfig.customName,
  };

  // 根据配置决定是否使用增强的 notifier
  if (
    userConfig.useEnhancedNotifier ??
    enterpriseWdyrConfig.useEnhancedNotifier
  ) {
    config.notifier = createEnhancedNotifier();
  }

  // 合并外部传入的额外配置（如 trackExtraHooks）
  if (options.trackExtraHooks) {
    config.trackExtraHooks = [
      ...(config.trackExtraHooks || []),
      ...options.trackExtraHooks,
    ];
  }

  // 应用配置
  whyDidYouRender(React, config);
}
