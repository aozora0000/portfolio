$(function() {
    //サイドバー開閉用
    $("#menu-toggle,#menu-close,a[href*=#]").click(function(e) {
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
// Github
$(function() {
    $.ajax({
        url: '/contributions',
        type: 'GET',
        dataType:'html',
        success: function(result) {
            $("#contributions").append(result);
        }
    });
    $.ajax({
        url: '/qiita_lua',
        type: 'GET',
        success: function(object) {
            $.each(JSON.parse(object), function(key,value) {
                $("#qiita .logs").append(
                    $("<h3>").append(
                        $("<a>").attr("href",value.url).text(value.title)
                    ),
                    $("<p>").append(
                        moment(value.created_at.substring(0, 19)).add(9,"hours").format("YYYY-MM-DD hh:mm"),
                        " ",
                        $("<b>").append(
                            $('<i class="fa fa-folder-o"></i>'),
                            " ",
                            value.stock_count
                        )
                    )
                );
            })
        }
    });
});

google.load("feeds", "1");
google.setOnLoadCallback(github);
google.setOnLoadCallback(stackoverflow);
//GoogleAjaxFeedAPI作成

function github() {
    var feed = new google.feeds.Feed("https://github.com/aozora0000.atom");
    feed.setNumEntries(5);
    feed.load(function (result){
        var container = $("#feed .logs");
        if (!result.error){
            for (var i = 0; i < result.feed.entries.length; i++) {
                var entry = result.feed.entries[i];
                container.append(
                    $("<h3>").append(
                        $("<a>").attr("href",entry.link).text(entry.title)
                    ),
                    $("<p>").text(entry.contentSnippet),
                    $("<small>").text(entry.publishedDate)
                )
            }
        } else {
            container.append("現在アクティビティを取得出来ません。");
        }
    });
}

function stackoverflow() {
    var feed = new google.feeds.Feed("http://ja.stackoverflow.com/feeds/user/4271");
    feed.setNumEntries(5);
    feed.load(function(result) {
        var container = $("#stackoverflow .logs");
        if (!result.error) {
            for (var i = 0; i < result.feed.entries.length; i++) {
                var entry = result.feed.entries[i];
                container.append(
                    $("<h3>").append(
                        $("<a>").attr("href", entry.link).text(entry.title)
                    ),
                    $("<p>").text(entry.contentSnippet),
                    $("<small>").text(entry.publishedDate)
                );
            }
        } else {
            container.append("現在アクティビティを取得出来ません。");
        }
    });
}
