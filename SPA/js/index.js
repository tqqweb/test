/**
 * Created by 123 on 2017/2/15.
 */
//利用js设置不同分辨率下的宽度值
$(function () {
    /*轮播 */
   
// 在这里统一声明要用到的变量和获取要用到的dom节点
    var banner_list = $(".banner_list"); //获取每一个轮播块
    var dot = $(".banner_nav li"); //获取每一个小圆点
   	var bannerItemW = 0;  //声明每一个轮播块的宽度
    var bannerItemH = 0;  //声明每一个轮播块的高度
    var banner = $("div.banner"); //获取包裹轮播列表的.banner框
    var banner_item = $("li.banner_item"); //获取每一个轮播的内容块
    var timer=null;
    var num = 0;
   
    setBannerWidth();//页面首次加载时 初始化 每个部分的 宽度和高度值
    $(window).resize(function () {//窗口改变时 重置各个部分的宽度 高度值
        setBannerWidth()
    });
//  点击小圆点
    dot.click(function () {//点的点击事件
        clearInterval(timer);
        num =  $(this).index();
//      调用轮播动作函数moveBanner()
        moveBanner(num);
        timer=setInterval(function(){automatic()},4000);
    });

//	设置定时器自动轮播
    timer=setInterval(function(){automatic()},4000);

    /*___________封装函数_________________*/
    
    /* 初始化时或窗口改变时设置  重置页面各个部分的宽度值  */
    function setBannerWidth() {
        var winW = $(window).width();//获取窗口的宽度
        if (winW >= 1183) {//设置每个轮播块的宽度值
            banner_item.width(1140)
        } else if (winW < 1183 && winW >= 975) {
            banner_item.width(940)
        } else if (winW < 975 && winW >= 768) {
            banner_item.width(720)
        } else if (winW < 768) {
            banner_item.width(winW - 30)
        }
        
        bannerItemW = banner_item.width();
        bannerItemH = banner_item.height();
        
        banner.css({height: bannerItemH + "px"});//设置轮播窗口的高度值
        banner_list.css({left: 0 + "px"});//设置轮播列表的 位置
    }
    
    function automatic(){//自动轮播的函数
        num++;
//      判断如果num等于3的话,让它归零
        if(num==3){
            banner_list.animate({left: -bannerItemW * num + "px"},1000).animate({left: 0 + "px"},0);
            num=0;
            dot.eq(0).addClass("active").siblings().removeClass("active")
        }else {
            moveBanner(num) 
        }
    }
    
    function moveBanner(num) {//设置轮播的动作函数
        dot.eq(num).addClass("active").siblings().removeClass("active")
//      轮播内容向左移动 当前轮播块的宽度乘以下标值
        banner_list.animate({left: -bannerItemW * num + "px"},1000);
    }
    
    
    
    
})
