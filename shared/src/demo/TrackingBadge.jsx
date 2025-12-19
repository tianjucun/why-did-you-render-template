/**
 * 监听标志组件
 * 显示在开启监听的组件右上角
 */
import React from 'react';

export const TrackingBadge = ({ componentName, isTracking }) => {
  if (!isTracking) return null;

  return (
    <div className="tracking-badge" title={`${componentName} 正在被监听`}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8" r="6" fill="#28a745" />
        <circle cx="8" cy="8" r="3" fill="white" />
        <circle cx="8" cy="8" r="1.5" fill="#28a745" />
      </svg>
      <span className="tracking-badge-text">监听中</span>
    </div>
  );
};

