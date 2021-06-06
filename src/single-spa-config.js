// single-spa-config.js
import * as singleSpa from 'single-spa' //导入single-spa
/*
 * runScript：一个promise同步方法。可以代替创建一个script标签，然后加载服务
 * */
const runScript = async (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(script, firstScript)
  })
}

singleSpa.registerApplication(
  //注册微前端服务
  'singleVue',
  async () => {
    await runScript('http://127.0.0.1:8080/js/chunk-vendors.js')
    await runScript('http://127.0.0.1:8080/js/app.js')
    return window.singleVue
  },
  (location) => location.pathname.startsWith('/vue') // 配置微前端模块前缀
)

singleSpa.registerApplication(
  //注册微前端服务
  'singleReact',
  async () => {
    await runScript('http://127.0.0.1:3000/js/chunk-vendors.js')
    await runScript('http://127.0.0.1:3000/js/app.js')
    return window.singleReact
  },
  (location) => location.pathname.startsWith('/react'), // 配置微前端模块前缀
  // 传递给子应用的对象，这个很重要，该配置告诉react子应用自己的容器元素是什么，这块儿和vue子应用的集成不一样，官网并没有说这部分，或者我没找到，是通过看single-spa-react源码知道的
  {
    domElement: document.getElementById('root'),
    // 添加 name 属性是为了兼容自己写的lyn-single-spa，原生的不需要，当然加了也不影响
  }
)

singleSpa.start() // 启动
