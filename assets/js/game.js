/* *********
    ****** Author:  Jay Zhao
    ****** Time:     2017/03/22
    ****** E-mail:   jayhowe2014@163.com
*/

(function($){
    var screenScale = new screen({
        width:640,
        height:1100,
        object:'.pagination',
        standard:'orientation',
        alignment:'center',
        success:function(){
            $(".pagination").show();
        }
    });

    function loading(percent) {
        percent = (percent);
        var loadingColorBg=document.getElementById('loadPer');
        loadingColorBg.innerHTML="Loading..."+percent+"%";
    }
    function loadingEffect() {
        var le = function () {
            if (currentPercent <= loadPercent) {
                preloadImages();
                loading(currentPercent);
                currentPercent++;
            } 
            if(currentPercent > 100){
                clearInterval(intervalId);
                document.getElementById('loading').style.display = "none";
               /* playbksound();*/
                $(".container1").removeClass('hide');
            }
        }
        intervalId = setInterval(le, 10);
    }
    //loading images
    function preloadImages() {
        if (imgsrc.length <= 0) {
        } else {
            var res = imgsrc[0];
            imgsrc.splice(0, 1);
            var Img = new Image();
            Img.src = res.src;
            Img.onload = function () {
                loadPercent = res.per;
            }
        }
    }

    var intervalId = false;
    var loadPercent = 0;
    var currentPercent = 0;
    var imgsrc = [
        {src: "assets/images/logo.png", id: "", per: "1"},
        {src: "assets/images/cap_bg.png", id: "", per: "2"},
        {src: "assets/images/bg.jpg", id: "", per: "3"},
        {src: "assets/images/page1_activity.png", id: "", per: "4"},
        {src: "assets/images/page1_big_star.png", id: "", per: "5"},
        {src: "assets/images/page1_btn_after.png", id: "", per: "6"},
        {src: "assets/images/page1_btn_before.png", id: "", per: "7"},
        {src: "assets/images/page1_colorful_1.png", id: "", per: "9"},
        {src: "assets/images/page1_colorful_2.png", id: "", per: "11"},
        {src: "assets/images/page1_colorful_3.png", id: "", per: "13"},
        {src: "assets/images/page1_colorful_4.png", id: "", per: "15"},
        {src: "assets/images/page1_light_1.png", id: "", per: "17"},
        {src: "assets/images/page1_light_2.png", id: "", per: "18"},
        {src: "assets/images/page1_light5.png", id: "", per: "19"},
        {src: "assets/images/page1_middle_star.png", id: "", per: "21"},
        {src: "assets/images/page1_robot.png", id: "", per: "22"},
        {src: "assets/images/page1_small_star.png", id: "", per: "23"},
        {src: "assets/images/page1_title.png", id: "", per: "25"},
        {src: "assets/images/page1_win_word.png", id: "", per: "28"},
        {src: "assets/images/page1-loop.png", id: "", per: "30"},
        {src: "assets/images/page2_big_circle.png.png", id: "", per: "31"},
        {src: "assets/images/page2_btn_after.png", id: "", per: "33"},
        {src: "assets/images/page2_btn_before.png", id: "", per: "35"},
        {src: "assets/images/page2_colorful_1.png", id: "", per: "40"},
        {src: "assets/images/page2_colorful_2.png", id: "", per: "42"},
        {src: "assets/images/page2_colorful_3.png", id: "", per: "43"},
        {src: "assets/images/page2_didi.png", id: "", per: "45"},
        {src: "assets/images/page2_star1.png", id: "", per: "47"},
        {src: "assets/images/page2_star2.png", id: "", per: "51"},
        {src: "assets/images/page2_star3.png", id: "", per: "53"},
        {src: "assets/images/page2_star4.png", id: "", per: "55"},
        {src: "assets/images/page2_star5.png", id: "", per: "56"},
        {src: "assets/images/page2_title_02.png", id: "", per: "58"},
        {src: "assets/images/page2_word.png", id: "", per: "61"},
        {src: "assets/images/page3_btn_after.png", id: "", per: "63"},
        {src: "assets/images/page3_btn_before.png", id: "", per: "65"},
        {src: "assets/images/page3_face1.png", id: "", per: "67"},
        {src: "assets/images/page3_face2.png", id: "", per: "69"},
        {src: "assets/images/page3_txt.png", id: "", per: "70"},
        {src: "assets/images/page4_cap.png", id: "", per: "72"},
        {src: "assets/images/page4_pa.png", id: "", per: "74"},
        {src: "assets/images/page4_txt.png", id: "", per: "76"},
        {src: "assets/images/page5_star1.png", id: "", per: "78"},
        {src: "assets/images/page5_star2.png", id: "", per: "80"},
        {src: "assets/images/page5_star3.png", id: "", per: "82"},
        {src: "assets/images/page5_star4.png", id: "", per: "84"},
        {src: "assets/images/page5_title1.png", id: "", per: "88"},
        {src: "assets/images/page5_title2.png", id: "", per: "90"},
        {src: "assets/images/page5_wechat.png", id: "", per: "93"},
        {src: "assets/images/page5_word.png", id: "", per: "95"},
        {src: "assets/images/page5_word2.png", id: "", per: "100"}
    ];
    loadingEffect();

    var guessGame={
        init:function(){
            var self=this;

            self.addEvent();
        },
        getRandomNumber:function(min,max){
            //0 - (max-1)
            var _getNum=parseInt(Math.random()*max)+min;
            return _getNum;
        },
        priceArr:{
            winPriceArr:[111,222,333],
            losePriceArr:[112,113,221,223,331,332,121,131,212,232,313,323,322,321,123,213,312,321]
        }
    }

    var isGetPrice=false; //是否中奖
    var isBegin = false;
    $(function(){
        var u = 182;
        var timeToJumpTwo=null;
        var _stout; //定时器
        $('.page1-btn').click(function(){
            var result;
            if(isBegin) {return false;}
            else {
                isBegin = true;

                //抽奖动画
                var isLightOne=true;
                var pageOneShining=setInterval(function(){
                        if(isLightOne) {
                            $(".page1-light img").attr("src","assets/images/page1_light_2.png");
                            isLightOne=false;
                        }else {
                            $(".page1-light img").attr("src","assets/images/page1_light_1.png");
                            isLightOne=true;
                        }
                },400)



                //按钮动画
                $(".page1-btn img").attr("src","assets/images/page1_btn_after.png");
                setTimeout(function(){
                    $(".page1-btn img").attr("src","assets/images/page1_btn_before.png");
                },200);

                if(isGetPrice) {
                    result=guessGame.priceArr.winPriceArr[guessGame.getRandomNumber(0,3)];

                }else {
                    result=guessGame.priceArr.losePriceArr[guessGame.getRandomNumber(0,18)];
                }

                var num_arr = (result+'').split('');
                //循环添加
                $(".page1-cap").each(function(index){
                    var _num = $(this);

                    _stout=setTimeout(function(){
                        _num.animate({ 
                            backgroundPositionY: (u*60) - (u*num_arr[index])
                        },{
                            duration: 3000+index*3000,
                            easing: "easeInOutCirc",
                            complete: function(){
                                if(index==3) isBegin = false;
                            }
                        });
                    }, index*1);
                    completeThePageOne();
                });
                function completeThePageOne(){
                    timeToJumpTwo=setTimeout(function(){
                        clearInterval(pageOneShining);
                        $(".container1").addClass("hide");
                          if(isGetPrice) {
                            $(".container2").removeClass("hide");
                          }else {
                            $(".container3").removeClass("hide"); 
                          }
                    },9500)
                }
            }

        });
        
        //提示分享按钮
        $(".page2-btn").on("click",function(){
             $(".page2-btn img").attr("src","assets/images/page2_btn_after.png");
                setTimeout(function(){
                    $(".page2-btn img").attr("src","assets/images/page2_btn_before.png");
                    $(".container4").removeClass("hide");
            },200);
        });

        //再来一次
        $(".page3-btn").on("click",function(){
             isBegin=false;
             $(".page1-cap").css('backgroundPositionY',0);
             clearTimeout(_stout);
             clearTimeout(timeToJumpTwo);
             _stout=null;
             timeToJumpTwo=null;
             $(".page3-btn img").attr("src","assets/images/page3_btn_after.png");
                setTimeout(function(){
                    $(".page3-btn img").attr("src","assets/images/page3_btn_before.png");
                     $(".container3").addClass("hide");
                    $(".container1").removeClass("hide");
            },200);
        });

        $(".container4").on("click",function(){
            $(this).addClass("hide");
        });

        //分享之后调用
        function showAfterShare(){
            $(".container5").removeClass("hide");
        }
    });
   
}(jQuery));
