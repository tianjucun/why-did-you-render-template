import React from 'react';
import { Demo } from '@wdyr-template/shared';
import './App.css';

const App = () => {
  return (
    <div className='app'>
      <header className='app-header'>
        <h1>why-did-you-render 示例</h1>
        <p>React 18 + Webpack</p>
      </header>
      <main className='app-main'>
        <Demo />
      </main>
      <footer className='app-footer'>
        <p>打开浏览器控制台查看 why-did-you-render 的输出</p>
      </footer>
    </div>
  );
};

export default App;

