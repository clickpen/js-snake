(function(window) {
    const screenShot = {
        screenFullSrc: '',
        $shotWrapper: null,
        $shotBox: null,
        $shotBoxExtendDot: null,
        $shotImgBox: null,
        $fullImg: null,
        // 按钮
        $shotButtonWrapper: null,
        $shotSubmit: null,
        $shotCancel: null,
        init() {
            const me = this
            me.$shotWrapper = me.createDom('div', 'shot-wrapper')
            me.$shotBox = me.createDom('div', 'shot-box', {
                top: 0,
                left: 0,
            })
            me.$shotBoxExtendDot = me.createDom('div', 'shot-box-extend-dot')
            me.$shotImgBox = me.createDom('div', 'shot-img-box')
            me.$fullImg = me.createDom('img', '', {
                position: 'absolute',
                top: '-1px',
                left: '-1px',
            })
            me.$shotImgBox.appendChild(me.$fullImg)
            me.$shotBox.appendChild(me.$shotImgBox)
            me.$shotBox.appendChild(me.$shotBoxExtendDot)
            me.$shotWrapper.appendChild(me.$shotBox)
            // 按钮
            me.$shotButtonWrapper = me.createDom('div', 'shot-button-wrapper')
            me.$shotSubmit = me.createDom('span', 'shot-submit')
            me.$shotCancel = me.createDom('span', 'shot-cancel')
            me.$shotButtonWrapper.appendChild(me.$shotSubmit)
            me.$shotButtonWrapper.appendChild(me.$shotCancel)
            me.$shotWrapper.appendChild(me.$shotButtonWrapper)
            me.layerMove()
            me.buttonEvent()
        },
        // 移动图层事件
        layerMove() {
            const me = this
            let moving = false
            let resizing = false
            // 移动视口
            let shotBoxDisX = 0
            let shotBoxDisY = 0
            let shotBoxCurrentX = 0
            let shotBoxCurrentY = 0
            // 调整视口
            let shotBoxDotX = 0
            let shotBoxDotY = 0
            let shotBoxWidth = 0
            let shotBoxHeight = 0
            me.$shotBoxExtendDot.onmousedown = function(e) {
                e.stopPropagation()
                e.preventDefault()
                if (moving) return
                resizing = true
                shotBoxDotX = e.clientX
                shotBoxDotY = e.clientY
                shotBoxWidth = me.$shotBox.offsetWidth
                shotBoxHeight = me.$shotBox.offsetHeight
            }
            me.$shotBox.onmousedown = function(e) {
                e.preventDefault()
                if (resizing) return
                moving = true
                // 获取初始点击位置
                shotBoxDisX = e.offsetX - shotBoxCurrentX
                shotBoxDisY = e.offsetY - shotBoxCurrentY
            }
            me.$shotWrapper.onmousemove = function(e) {
                if (moving) {
                    shotBoxCurrentX = e.clientX - shotBoxDisX
                    shotBoxCurrentY = e.clientY - shotBoxDisY
                    // shotBox偏移
                    me.$shotBox.style.left = shotBoxCurrentX + 'px'
                    me.$shotBox.style.top = shotBoxCurrentY + 'px'
                    // fullImg反向偏移
                    me.$fullImg.style.left = -shotBoxCurrentX - 1 + 'px'
                    me.$fullImg.style.top = -shotBoxCurrentY - 1 + 'px'
                }
                if (resizing) {
                    let disX = e.clientX - shotBoxDotX
                    let disY = e.clientY - shotBoxDotY
                    // 设置最小20px
                    me.$shotBox.style.width = (shotBoxWidth + disX) <= 20 ? 20 : shotBoxWidth + disX + 'px'
                    me.$shotBox.style.height = (shotBoxHeight + disY) <= 20 ? 20 : shotBoxHeight + disY + 'px'
                }
            }
            me.$shotWrapper.onmouseup = function() {
                moving = false
                resizing = false
            }
        },
        // 按钮事件
        buttonEvent() {
            const me = this
            me.$shotSubmit.addEventListener('click', function() {
                html2canvas(me.$shotImgBox, {
                    allowTaint: true,
                    useCORS: true
                }).then(canvas => {
                    me.saveUrlImg(canvas.toDataURL())
                    me.$shotWrapper.remove()
                })
            })
            me.$shotCancel.addEventListener('click', function() {
                me.$shotWrapper.remove()
            })
        },
        // 进入截图
        shotStart() {
            const me = this
            html2canvas(document.body, {
                allowTaint: true,
                useCORS: true
            }).then(canvas => {
                if (me.$shotWrapper.querySelector('canvas')) {
                    me.$shotWrapper.querySelector('canvas').remove()
                }
                // 底图为canvas
                me.$shotWrapper.appendChild(canvas)
                me.screenFullSrc = canvas.toDataURL()
                me.$fullImg.src = me.screenFullSrc
                // 图片加载成功则展示shotWrapper
                me.$fullImg.onload = function() {
                    document.body.appendChild(me.$shotWrapper)
                }
            })
        },
        // 创建dom
        createDom(name, className, style) {
            if (!name) return
            let dom = document.createElement(name)
            if (className) {
                dom.className = className
            }
            if (style) {
                for (let prop in style) {
                    dom.style[prop] = style[prop]
                }
            }
            return dom
        },
        // 保存链接图片
        saveUrlImg(url, name) {
            let $dom = document.createElement('a')
            $dom.href = url
            $dom.download = name || '截图图片'
            let event = document.createEvent('MouseEvents')
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
            $dom.dispatchEvent(event)
        },
    };
    window.onload = function() {
        screenShot.init();
        window.shotScreen = () => screenShot.shotStart()
    };
})(window)