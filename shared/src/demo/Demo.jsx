/**
 * 综合示例页面
 * 展示 whyDidYouRender 的核心功能和使用场景
 * 
 * 演示 enableWdyr 和 enableWdyrBatch 的使用
 * 支持动态配置
 * 
 * 关于hook或者memo相关的使用，需要确保是从 React 导入的
 * 主要考虑 whyDidYouRender 需要重写 React.createElement 等函数来工作
 * 目前当前 Demo 组件导入的 React 并没有被重新，但是在实际使用时，从 React 中导入的方法已经是重写过后的
 */
import React from 'react';
import { enableWdyr, enableWdyrBatch, loadConfig } from '../utils';
import { ConfigPanel } from './ConfigPanel';
import { TrackingBadge } from './TrackingBadge';
import './Demo.css';

// ========== 组件示例 ==========

// 使用 enableWdyr 工具函数启用监听
const MemoizedComponent = enableWdyr(
  React.memo(({ text, count }) => {
    return (
      <div className="demo-card">
        <p>文本: {text} (Memo)</p>
        <p>计数: {count}</p>
      </div>
    );
  }),
  { customName: 'MemoizedComponent' }
);

// 函数组件（使用 enableWdyr）
const FunctionComponent = enableWdyr(({ initialValue }) => {
  const [value, setValue] = React.useState(initialValue);
  return (
    <div className="demo-card">
      <p>当前值: {value}</p>
      <button onClick={() => setValue((prev) => prev + 1)}>增加</button>
    </div>
  );
}, { customName: 'FunctionComponent' });

// ForwardRef 组件（使用 enableWdyr）
const ForwardRefComponent = enableWdyr(
  React.forwardRef(({ label }, ref) => {
    const inputRef = React.useRef(null);
    const [value, setValue] = React.useState('');

    React.useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      setValue: (newValue) => setValue(newValue),
    }));

    return (
      <div className="demo-card">
        <label>{label}</label>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  }),
  { customName: 'ForwardRefComponent' }
);

// 类组件
class ClassComponent extends React.Component {
  render () {
    return (
      <div className="demo-card">
        <h4>{this.props.title}</h4>
        <p>计数: {this.props.count}</p>
      </div>
    );
  }
}

enableWdyr(ClassComponent, { customName: 'ClassComponent' });

// ========== Hook 示例 ==========

// useState 示例
const UseStateDemo = () => {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('');

  return (
    <div className="demo-card">
      <h4>useState 示例</h4>
      <p>计数: {count}</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="输入名称"
      />
      <button onClick={() => setCount((prev) => prev + 1)}>增加</button>
    </div>
  );
};

// useMemo 示例
const UseMemoDemo = () => {
  const [count, setCount] = React.useState(0);
  const [items] = React.useState([1, 2, 3, 4, 5]);

  // 未优化的计算
  const unoptimizedSum = items.reduce((sum, item) => sum + item, 0);

  // 使用 useMemo 优化
  const optimizedSum = React.useMemo(() => {
    console.log('计算总和...');
    return items.reduce((sum, item) => sum + item, 0);
  }, [items]);

  return (
    <div className="demo-card">
      <h4>useMemo 示例</h4>
      <p>计数: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>增加计数</button>
      <p>总和（未优化）: {unoptimizedSum}</p>
      <p>总和（已优化）: {optimizedSum}</p>
      <p className="demo-tip">打开控制台查看计算日志</p>
    </div>
  );
};

// useCallback 示例
const ChildButton = ({ onClick, label }) => {
  console.log(`渲染按钮: ${label}`);
  return <button onClick={onClick}>{label}</button>;
};

const UseCallbackDemo = () => {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('');

  // 未优化的回调
  const unoptimizedCallback = () => {
    console.log('未优化的回调');
  };

  // 使用 useCallback 优化
  const optimizedCallback = React.useCallback(() => {
    console.log('优化的回调');
  }, []);

  return (
    <div className="demo-card">
      <h4>useCallback 示例</h4>
      <p>计数: {count}</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="输入名称（观察子组件是否重新渲染）"
      />
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <ChildButton onClick={unoptimizedCallback} label="未优化按钮" />
        <ChildButton onClick={optimizedCallback} label="优化按钮" />
      </div>
      <p className="demo-tip">打开控制台查看渲染日志</p>
    </div>
  );
};

// 使用 enableWdyrBatch 批量启用 Hook 示例组件
const hookComponents = {
  UseStateDemo,
  UseMemoDemo,
  UseCallbackDemo,
  ChildButton,
};

enableWdyrBatch(hookComponents);

// 注册组件到全局，供配置管理器使用
if (typeof window !== 'undefined') {
  window.wdyrComponents = {
    MemoizedComponent,
    FunctionComponent,
    ForwardRefComponent,
    ClassComponent,
    ...hookComponents,
  };
}

// ========== 主 Demo 组件 ==========

export const Demo = React.memo(() => {
  const [text, setText] = React.useState('Hello World');
  const [count, setCount] = React.useState(0);
  const forwardRef = React.useRef(null);
  const config = loadConfig();

  // 应用组件监听配置
  React.useEffect(() => {
    if (config.componentTracking && window.wdyrComponents) {
      Object.entries(config.componentTracking).forEach(([name, enabled]) => {
        const component = window.wdyrComponents[name];
        if (component) {
          component.whyDidYouRender = enabled;
        }
      });
    }
  }, [config]);

  return (
    <div className="demo-container">
      <ConfigPanel />

      <div className="demo-header">
        <h1>why-did-you-render 综合示例</h1>
        <p className="demo-subtitle">
          打开浏览器控制台查看 why-did-you-render 的输出
        </p>
      </div>

      {/* 组件示例 */}
      <section className="demo-section">
        <h2>组件示例</h2>
        <div className="demo-controls">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入文本"
            className="demo-input"
          />
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="demo-button"
          >
            增加计数
          </button>
        </div>
        <div className="demo-grid">
          <div className="demo-item demo-item-with-badge">
            <TrackingBadge
              componentName="MemoizedComponent"
              isTracking={config.componentTracking?.MemoizedComponent ?? true}
            />
            <h3>Memo 优化版本</h3>
            <MemoizedComponent text={text} count={count} />
          </div>
          <div className="demo-item demo-item-with-badge">
            <TrackingBadge
              componentName="FunctionComponent"
              isTracking={config.componentTracking?.FunctionComponent ?? true}
            />
            <h3>函数组件</h3>
            <FunctionComponent initialValue={count} />
          </div>
        </div>
        <div className="demo-item demo-item-with-badge" style={{ marginTop: '20px' }}>
          <TrackingBadge
            componentName="ForwardRefComponent"
            isTracking={config.componentTracking?.ForwardRefComponent ?? true}
          />
          <button
            onClick={() => forwardRef.current?.focus()}
            className="demo-button"
          >
            聚焦输入框
          </button>
          <ForwardRefComponent ref={forwardRef} label="ForwardRef 输入框" />
        </div>
        <div className="demo-item demo-item-with-badge" style={{ marginTop: '20px' }}>
          <TrackingBadge
            componentName="ClassComponent"
            isTracking={config.componentTracking?.ClassComponent ?? true}
          />
          <ClassComponent title="类组件" count={count} />
        </div>
      </section>

      {/* Hook 示例 */}
      <section className="demo-section">
        <h2>Hook 示例</h2>
        <div className="demo-grid">
          <div className="demo-item demo-item-with-badge">
            <TrackingBadge
              componentName="UseStateDemo"
              isTracking={config.componentTracking?.UseStateDemo ?? true}
            />
            <UseStateDemo />
          </div>
          <div className="demo-item demo-item-with-badge">
            <TrackingBadge
              componentName="UseMemoDemo"
              isTracking={config.componentTracking?.UseMemoDemo ?? true}
            />
            <UseMemoDemo />
          </div>
          <div className="demo-item demo-item-with-badge">
            <TrackingBadge
              componentName="UseCallbackDemo"
              isTracking={config.componentTracking?.UseCallbackDemo ?? true}
            />
            <UseCallbackDemo />
          </div>
        </div>
      </section>

      {/* 配置说明 */}
      <section className="demo-info">
        <h3>当前配置</h3>
        <div className="demo-config-list">
          <div className="demo-config-item">
            <strong>trackAllPureComponents:</strong>{' '}
            <span className={config.trackAllPureComponents ? 'enabled' : 'disabled'}>
              {config.trackAllPureComponents ? '✓' : '✗'}
            </span>
          </div>
          <div className="demo-config-item">
            <strong>trackHooks:</strong>{' '}
            <span className={config.trackHooks ? 'enabled' : 'disabled'}>
              {config.trackHooks ? '✓' : '✗'}
            </span>
          </div>
          <div className="demo-config-item">
            <strong>logOnDifferentValues:</strong>{' '}
            <span className={config.logOnDifferentValues ? 'enabled' : 'disabled'}>
              {config.logOnDifferentValues ? '✓' : '✗'}
            </span>
          </div>
          <div className="demo-config-item">
            <strong>logOwnerReasons:</strong>{' '}
            <span className={config.logOwnerReasons ? 'enabled' : 'disabled'}>
              {config.logOwnerReasons ? '✓' : '✗'}
            </span>
          </div>
        </div>
        <p className="demo-tip">
          点击右上角"配置"按钮可以动态修改配置，配置会保存在 sessionStorage 中
        </p>
      </section>
    </div>
  );
});

enableWdyr(Demo, { customName: 'Demo' });

