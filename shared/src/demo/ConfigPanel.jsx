/**
 * 配置面板组件
 * 允许用户动态修改 whyDidYouRender 配置
 */
import React, { useState, useEffect, memo } from 'react';
import { loadConfig, saveConfig, resetConfig } from '../utils/config-manager';

export const ConfigPanel = memo(({ onApply }) => {
  const [config, setConfig] = useState(loadConfig());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setConfig(loadConfig());
  }, []);

  const handleChange = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleComponentTrackingChange = (componentName, enabled) => {
    setConfig((prev) => ({
      ...prev,
      componentTracking: {
        ...prev.componentTracking,
        [componentName]: enabled,
      },
    }));
  };

  const handleApply = () => {
    saveConfig(config);
    if (onApply) {
      onApply();
    } else {
      // 刷新页面应用配置
      window.location.reload();
    }
  };

  const handleReset = () => {
    resetConfig();
    setConfig(loadConfig());
    window.location.reload();
  };

  const componentNames = [
    'MemoizedComponent',
    'FunctionComponent',
    'ForwardRefComponent',
    'ClassComponent',
    'UseStateDemo',
    'UseMemoDemo',
    'UseCallbackDemo',
    'ChildButton',
  ];

  return (
    <>
      {/* 配置按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        {isOpen ? '关闭配置' : '⚙️ 配置'}
      </button>

      {/* 配置面板 */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: '60px',
            right: '20px',
            width: '400px',
            maxHeight: '80vh',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            zIndex: 999,
            overflow: 'auto',
            padding: '20px',
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '18px' }}>
            whyDidYouRender 配置
          </h3>

          {/* 核心追踪配置 */}
          <section style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
              核心追踪配置
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={config.trackAllPureComponents}
                  onChange={(e) => handleChange('trackAllPureComponents', e.target.checked)}
                />
                <span style={{ fontSize: '13px' }}>trackAllPureComponents</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={config.trackHooks}
                  onChange={(e) => handleChange('trackHooks', e.target.checked)}
                />
                <span style={{ fontSize: '13px' }}>trackHooks</span>
              </label>
            </div>
          </section>

          {/* 日志配置 */}
          <section style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
              日志配置
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={config.logOnDifferentValues}
                  onChange={(e) => handleChange('logOnDifferentValues', e.target.checked)}
                />
                <span style={{ fontSize: '13px' }}>logOnDifferentValues</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={config.logOwnerReasons}
                  onChange={(e) => handleChange('logOwnerReasons', e.target.checked)}
                />
                <span style={{ fontSize: '13px' }}>logOwnerReasons</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={config.onlyLogs}
                  onChange={(e) => handleChange('onlyLogs', e.target.checked)}
                />
                <span style={{ fontSize: '13px' }}>onlyLogs</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={config.collapseGroups}
                  onChange={(e) => handleChange('collapseGroups', e.target.checked)}
                />
                <span style={{ fontSize: '13px' }}>collapseGroups</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={config.useEnhancedNotifier ?? true}
                  onChange={(e) => handleChange('useEnhancedNotifier', e.target.checked)}
                />
                <span style={{ fontSize: '13px' }}>
                  useEnhancedNotifier
                  <span style={{ color: '#666', fontSize: '11px', marginLeft: '4px' }}>
                    (显示代码位置和调用栈)
                  </span>
                </span>
              </label>
            </div>
          </section>

          {/* 组件监听配置 */}
          <section style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
              组件监听配置
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                maxHeight: '200px',
                overflow: 'auto',
                padding: '8px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
              }}
            >
              {componentNames.map((name) => (
                <label
                  key={name}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <input
                    type="checkbox"
                    checked={config.componentTracking?.[name] ?? true}
                    onChange={(e) =>
                      handleComponentTrackingChange(name, e.target.checked)
                    }
                  />
                  <span style={{ fontSize: '12px' }}>{name}</span>
                </label>
              ))}
            </div>
          </section>

          {/* 操作按钮 */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              onClick={handleApply}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              应用并刷新
            </button>
            <button
              onClick={handleReset}
              style={{
                padding: '10px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              重置
            </button>
          </div>
        </div>
      )}
    </>
  );
});


