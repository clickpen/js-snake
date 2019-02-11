let clock = {
    $time: $('.J-get-time'),
    $setT: $('.J-set'),
    $cancelT: $('.J-cancel'),
    $sub: $('.J-sub'),
    time: '',
    setTime: '',
    init: function() {
        this.updateTime();
        this.bind();
    },
    updateTime: function() {
        let that = this;
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
        that.$setT.on('click', function() {
            let $this = $(this);
            let H = $('input[name="H"]').val();
            let M = $('input[name="M"]').val();
            let S = $('input[name="S"]').val();
            if(H < 24 && M < 60 && S < 60 && H >=0 && M >= 0 && S >= 0) {
                that.setTime = that.formatNumber(H) + ':' + that.formatNumber(M) + ':' + that.formatNumber(S);
                $('input').attr('readonly', 'readonly');
                $this.hide();
                that.$cancelT.css('display', 'block');
                // 执行闹钟任务

            } else {
                $('input').val('');
                alert('时间设置不正确');
            }
        });
        that.$cancelT.on('click', function() {
            let $this = $(this);
            $('input').removeAttr('readonly');
            $this.hide();
            that.$setT.css('display', 'block');
        });
        that.$sub.on('click', function() {
            $('.J-main-wrapper').hide();
            $('input').removeAttr('readonly').val('');
            that.$cancelT.hide();
            that.$setT.css('display', 'block');
            // 关闭闹钟任务
            
        });
    }
};
clock.init();