let clock = {
    $time: $('.J-get-time'),
    $setT: $('.J-set'),
    $cancelT: $('.J-cancel'),
    $sub: $('.J-sub'),
    time: '',
    setTime: '',
    setting: false,
    Alarm: null,
    alarmT: null,
    init: function() {
        this.Alarm = new Audio;
        this.Alarm.src = './music/music.mp3';
        this.updateTime();
        this.bind();
    },
    updateTime: function() {
        let that = this;
        let date = new Date();
        that.time = that.formatNumber(date.getHours()) + ':' + that.formatNumber(date.getMinutes()) + ':' + that.formatNumber(date.getSeconds());
        that.$time.text(that.time);
        setInterval(() => {
            let date = new Date();
            that.time = that.formatNumber(date.getHours()) + ':' + that.formatNumber(date.getMinutes()) + ':' + that.formatNumber(date.getSeconds());
            that.$time.text(that.time);
        }, 1000);
    },
    formatNumber: function(num) {
        if(num < 0) {
            return '00';
        }else if(num < 10) {
            return '0' + num;
        } else {
            return '' + num;
        }
    },
    bind: function() {
        let that = this;
        document.onkeydown = function(e) {
            if(e.keyCode == 13) {
                that.setting ? that.$cancelT.trigger('click') : that.$setT.trigger('click');
            }
        };
        that.$setT.on('click', function() {
            if(that.setting) {
                return;
            }
            that.setting = true;
            let $this = $(this);
            // 输入小数时四舍五入为整
            let H = Math.round(+ $('input[name="H"]').val());
            let M = Math.round(+ $('input[name="M"]').val());
            let S = Math.round(+ $('input[name="S"]').val());
            $('input[name="H"]').val(H);
            $('input[name="M"]').val(M);
            $('input[name="S"]').val(S);
            if(H < 24 && M < 60 && S < 60 && H >=0 && M >= 0 && S >= 0) {
                that.setTime = that.formatNumber(H) + ':' + that.formatNumber(M) + ':' + that.formatNumber(S);
                $('input').attr('readonly', 'readonly');
                $this.hide();
                that.$cancelT.css('display', 'block');
                // 执行闹钟任务
                that.alarmTask();
            } else {
                that.setting = false;
                $('input').val('');
                alert('时间设置不正确');
            }
        });
        that.$cancelT.on('click', function() {
            if(!that.setting) {
                return;
            }
            that.setting = false;
            let $this = $(this);
            $('input').removeAttr('readonly');
            $this.hide();
            that.$setT.css('display', 'block');
            clearInterval(that.alarmT);
        });
        that.$sub.on('click', function() {
            that.setting = false;
            $('.J-main-wrapper').fadeOut();
            $('input').removeAttr('readonly').val('');
            that.$cancelT.hide();
            that.$setT.css('display', 'block');
            // 关闭闹钟任务
            that.Alarm.pause();
            that.Alarm.currentTime = 0;
            clearInterval(that.alarmT);
        });
    },
    alarmTask: function() {
        let that = this;
        that.alarmT = setInterval(() => {
            if(that.time == that.setTime) {
                that.Alarm.play();
                $('.J-main-wrapper').fadeIn();
                // 如不处理则默认三分钟后关闭
                setTimeout(() => {
                    that.Alarm.pause();
                    that.Alarm.currentTime = 0;
                    that.$sub.trigger('click');
                }, 180000);
            }
        }, 1000);
    }
};
clock.init();