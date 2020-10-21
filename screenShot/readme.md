## 使用阅读

1. 该功能基于html2canvas进行开发
2. 对于iframe嵌套页面无法进行截图
3. 对于非当前域名的图片且该图片未设置跨域时截图后图片是空白

## 使用方法

1. 需要引入样式文件screenShot.css
2. 引入html2canvas.js
3. 再引入screenShot.js
4. shotScreen方法已经被暴露至全局，直接调用则执行进入截图模块