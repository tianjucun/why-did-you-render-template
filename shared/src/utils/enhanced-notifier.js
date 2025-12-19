/**
 * 增强的 notifier 函数
 * 显示代码位置和调用栈，支持点击定位
 *
 * 使用 console.trace() 来显示调用栈，浏览器会自动处理 Source Map
 * 并让文件路径可点击，直接跳转到对应的代码位置
 */

/**
 * 创建增强的 notifier 函数
 * 在控制台输出中显示代码位置和调用栈
 */
export function createEnhancedNotifier() {
  return (info) => {
    const {
      componentName,
      reason,
      propsDifferences,
      stateDifferences,
      hookName,
      prevHook,
      nextHook,
    } = info;

    // 使用 console.group 来组织日志
    const groupLabel = `%c🔍 ${componentName || 'Component'} re-rendered`;
    console.groupCollapsed(
      groupLabel,
      'color: #ff6b6b; font-weight: bold; font-size: 14px;'
    );

    // 显示原因
    if (reason) {
      console.log('%c📋 Reason:', 'color: #4ecdc4; font-weight: bold;', reason);
    }

    // 显示 props 变化
    if (propsDifferences && propsDifferences.length > 0) {
      console.group(
        '%c📦 Props Changes:',
        'color: #95e1d3; font-weight: bold;'
      );
      propsDifferences.forEach((diff) => {
        const path = diff.path || 'root';
        console.log(
          `%c  ${path}:`,
          'color: #f38181; font-weight: bold;',
          diff.prev,
          '%c→',
          'color: #4ecdc4;',
          diff.next
        );
      });
      console.groupEnd();
    }

    // 显示 state 变化
    if (stateDifferences && stateDifferences.length > 0) {
      console.group(
        '%c🔄 State Changes:',
        'color: #95e1d3; font-weight: bold;'
      );
      stateDifferences.forEach((diff) => {
        const path = diff.path || 'root';
        console.log(
          `%c  ${path}:`,
          'color: #f38181; font-weight: bold;',
          diff.prev,
          '%c→',
          'color: #4ecdc4;',
          diff.next
        );
      });
      console.groupEnd();
    }

    // 显示 Hook 变化
    if (hookName && prevHook !== undefined && nextHook !== undefined) {
      console.group(
        `%c🪝 Hook ${hookName} Changes:`,
        'color: #95e1d3; font-weight: bold;'
      );
      console.log('%c  Prev:', 'color: #f38181; font-weight: bold;', prevHook);
      console.log('%c  Next:', 'color: #4ecdc4; font-weight: bold;', nextHook);
      console.groupEnd();
    }

    // 显示调用栈（使用 console.trace，浏览器会自动让文件路径可点击）
    console.group(
      '%c📍 Call Stack (click file paths to jump to code):',
      'color: #a8e6cf; font-weight: bold;'
    );
    // 直接使用 console.trace，浏览器会自动处理 Source Map 并让路径可点击
    // 这会显示从当前函数到组件定义的完整调用链
    console.trace();
    console.groupEnd();

    // 显示组件定义位置提示
    if (componentName) {
      console.log(
        '%c💡 Tip:',
        'color: #ffd93d; font-weight: bold;',
        `Search for "${componentName}" in your code editor to find the component definition`
      );
    }

    console.groupEnd();
  };
}

/**
 * 创建简化的 notifier（只显示关键信息）
 */
export function createSimpleNotifier() {
  return (info) => {
    const { componentName, reason } = info;
    console.log(
      `%c[why-did-you-render] ${componentName}`,
      'color: #ff6b6b; font-weight: bold;',
      reason || 're-rendered'
    );
    // 显示调用栈
    console.trace();
  };
}
