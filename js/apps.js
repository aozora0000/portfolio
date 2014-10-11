$(function() {
    //サイドバー開閉用
    $("#menu-toggle,#menu-close").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    //ページ内遷移スクロール
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});
//レーダーチャート作成
$(function() {
    var radarChartData = {
        labels: ["PHP", "Ruby", "Python", "Lua", "JavaScript","HTML5", "CSS"],
        datasets: [
            {
                fillColor: "rgba(250,83,0,0.5)", // 線で囲まれた部分の色
                strokeColor: "rgba(250,83,0,1)", // 線の色
                pointColor: "rgba(250,83,0,1)",  // 点の色
                pointStrokeColor: "#fff",           // 点を囲む線の色
                data: [8,5,5,6,7,8,7]
            }
        ]
    };

    // Canvas にレーダーチャートを描画
    var canvas = document.getElementById("canvas1");
    var context = canvas.getContext("2d");
    var chart = new Chart(context);
    var rader = chart.Radar(radarChartData,{
        scaleOverride : true,
        scaleSteps : 10,
        scaleStepWidth : 1,
        scaleStartValue : 0,

        animation: true,
        animationSteps: 100,
        animationEasing: "easeOutQuart",
        responsive: true,
        scaleBeginAtZero : true,
        scaleShowLabels: true,  // 目盛を表示
        pointLabelFontSize : 10, // ラベルを表示
        scaleFontSize: 14,
        pointLabelFontSize : 20,
        pointDot : true,
        datasetStroke : true,
    });
});
