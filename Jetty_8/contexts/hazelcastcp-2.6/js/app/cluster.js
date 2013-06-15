var pieChartOpts = {
    series:{
        pie:{
            show:true,
            radius:1,
            label:{
                show:true,
                radius:3 / 4,
                formatter:function (label, series) {
                    return '<div style="font-size:8pt;text-align:center;padding:2px; font-weight: bold; color: white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
                },
                background:{ opacity:0.5 }
            }
        }
    },
    legend:{
        show:false
    }
}

var pieChartOptsMany = {
    series:{
        pie:{
            show:true,
            radius:1,
            label:{
                show:false
            }
        }
    },
    legend:{
        show:false
    }
}


var chartOpts = {
    series:{
        lines:{ show:true },
        points:{ show:true }
    },
    xaxis:{
        mode:"time", minTickSize:[15, "second"]
    },
    yaxis:{
        autoscaleMargin:4
//                ticks: 10,
//                min: 0,
//                max: 1000
    },
    grid:{
        backgroundColor:{ colors:["#fff", "#eee"] }
    }
}


function partitionspiechart(dataList) {
    if (dataList.length > 25)
        $.plot($("#partitionspiechart"), dataList, pieChartOptsMany);
    else
        $.plot($("#partitionspiechart"), dataList, pieChartOpts);
}


function clusterProps(dataList) {
    if (dataList != null){
        if(dataList["data.cl_immediateTasksCount"] + dataList["data.cl_scheduledTasksCount"] == 0) {
            $("#migrationWarningRow").hide()
        }
        else {
            $("#migrationWarningRow").show()
        }
        for (lbl in dataList) {
            var idm = lbl.split(".")[1]
            $("#" + idm).html(dataList[lbl])
        }
    }
}


function clusterHome() {
    $("#radio1").click();
    setTimeout('addView("Cluster Home", "cluster", "cluster")', 500);
}
