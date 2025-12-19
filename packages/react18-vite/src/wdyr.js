/**
 * whyDidYouRender 初始化
 *
 * 配置加载和应用逻辑已统一到 shared 包中
 */
import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { initWhyDidYouRender } from '@wdyr-template/shared';

// 初始化 whyDidYouRender
// 如果需要追踪 Redux useSelector，可以传入额外配置：
// initWhyDidYouRender(React, whyDidYouRender, {
//   trackExtraHooks: [[ReactRedux, 'useSelector']],
// });
initWhyDidYouRender(React, whyDidYouRender);
