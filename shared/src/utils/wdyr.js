import React from 'react';

/**
 * 为组件启用 whyDidYouRender 监听
 *
 * @param {React.ComponentType} component - 要监听的组件
 * @param {Object} options - 配置选项
 * @param {boolean} options.enabled - 是否启用（默认 true）
 * @param {string} options.customName - 自定义名称
 * @returns {React.ComponentType} 返回组件本身（支持链式调用）
 *
 * @example
 * // 基础使用
 * const MyComponent = enableWdyr(() => <div>Hello</div>);
 *
 * @example
 * // 带自定义名称
 * const MyComponent = enableWdyr(() => <div>Hello</div>, {
 *   customName: 'MyComponent'
 * });
 */
export function enableWdyr(component, options) {
  if (process.env.NODE_ENV === 'development') {
    const { enabled = true, customName } = options || {};

    if (enabled) {
      // 启用 whyDidYouRender
      component.whyDidYouRender = true;

      // 设置自定义名称（如果提供）
      if (customName && component.displayName === undefined) {
        component.displayName = customName;
      }
    }
  }

  return component;
}

/**
 * 批量启用 whyDidYouRender
 *
 * @param {Object} components - 组件对象
 * @param {Object} options - 配置选项
 * @param {boolean} options.enabled - 是否启用（默认 true）
 *
 * @example
 * const components = {
 *   Component1: () => <div>1</div>,
 *   Component2: () => <div>2</div>,
 * };
 * enableWdyrBatch(components);
 */
export function enableWdyrBatch(components, options) {
  if (process.env.NODE_ENV === 'development') {
    const { enabled = true } = options || {};

    Object.values(components).forEach((component) => {
      if (enabled) {
        component.whyDidYouRender = true;
      }
    });
  }
}
