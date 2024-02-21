import { ElMessageBox } from "element-plus";

/*
 * @Author: huyongle 568055454@qq.com
 * @Date: 2024-02-21 00:15:09
 * @LastEditors: huyongle 568055454@qq.com
 * @LastEditTime: 2024-02-21 02:01:50
 * @FilePath: \mood-blog-front\src\auto-update.ts
 * @Description: 自动监测是否需要更新
 * 
 * Copyright (c) 2024 by 雨落, All Rights Reserved. 
 */
let lastScripts: string[] = []; // script

const POLLING_DELAY: number = 2000; // ms
const scriptRegex: RegExp = /<script[^>]+src=["']([^"']+)["'][^>]*><\/script>/ig;
const scriptSrcRegex: RegExp = /src=["']([^"']+)["']/i;

function fetchScripts(): Promise<string[] | null> {
  return new Promise((resolve, reject) => {
    const scripts: string[] = [];
    fetch('/').then(res => res.text()).then(htmlStr => {
      const matches = htmlStr.match(scriptRegex);
      if (matches) {
        matches.forEach(match => scripts.push(scriptSrcRegex.exec(match)[1]))
      }
      resolve(scripts)
    }).catch(err => {
      reject(err)
    })
  })
}

// eslint-disable-next-line consistent-return
async function needUpdate() {
  const newScripts = await fetchScripts();
  console.log(lastScripts, newScripts);
  

  // 1、如果lastScripts为空数组，则直接赋值，不需要更新
  if (!lastScripts.length) {
    lastScripts = newScripts;
    return false;
  }

  // 2、比较script的个数，个数不同表示需要更新
  if (lastScripts.length !== newScripts.length) {
    lastScripts = newScripts;
    return true;
  }

  // 3、如果个数相同，则比较src属性是否相同
  for (let i = 0; i < lastScripts.length; i++) {
    if (lastScripts[i] !== newScripts[i]) {
      lastScripts = newScripts;
      return true;
    }
  }

  return false;
}


function autoRefresh() {
  window.requestAnimationFrame(() => {
    setTimeout(async () => {
      console.log(lastScripts);
      
      const isNeedUpdate = await needUpdate();
      if (isNeedUpdate) {
        const res = await ElMessageBox.confirm('页面有更新，点击确定刷新页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        if (res) {
          window.location.reload()
        }
      }
      autoRefresh();
    }, POLLING_DELAY)
  })
}
export {
  autoRefresh
}

