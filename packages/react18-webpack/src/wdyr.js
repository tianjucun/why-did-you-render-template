/**
 * whyDidYouRender 初始化
 *
 * 配置加载和应用逻辑已统一到 shared 包中
 */
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  const { initWhyDidYouRender } = require('@wdyr-template/shared');

  // 初始化 whyDidYouRender
  // 如果需要追踪 Redux useSelector，可以传入额外配置：
  // initWhyDidYouRender(React, whyDidYouRender, {
  //   trackExtraHooks: [[ReactRedux, 'useSelector']],
  // });
  initWhyDidYouRender(React, whyDidYouRender);
}
