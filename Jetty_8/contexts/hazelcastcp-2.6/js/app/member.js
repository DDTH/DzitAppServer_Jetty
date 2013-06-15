function enableMemberButtons() {
    $("#memberRestartButton")
            .button({
                text:true,
                icons:{
                    primary:"ui-icon-arrowrefresh-1-w"
                }
            })
            .click(function () {
                memberRestartAction()
            })

    $("#memberShutdownButton")
        .button({
            text:true,
            icons:{
                primary:"ui-icon-close"
            }
        })
        .click(function () {
            memberShutdownAction()
        })

    $("#threadDumpButton")
        .button({
            text:true,
            icons:{
                primary:"ui-icon-search"
            }
        })
        .click(function () {
            getThreadDump()
        })

    $("#runGCButton")
        .button({
            text:true,
            icons:{
                primary:"ui-icon-gear"
            }
        })
        .click(function () {
            sendGC()
        })
    disableWriteModeButtons()
}


function sendGC() {
    var data = {cluster:activeCluster, operation:"runGC", member:activeObject }
    opcall(data)
}

function threaddump(data) {
    $("#threadDumpDiv").dialog("open");
    $("#threadDumpTextarea").html(data.data)
}

function runGC(data) {
    $("#gcResultDialog").dialog("open");
}


function getThreadDump() {
    var data = {cluster:activeCluster, operation:"threaddump", member:activeObject }
    opcall(data)
}


function fillMemberListForScripting() {
    $('#memberCheckList').empty()
    for (var i = 0; i < memberlistcache.length; i++) {
        $('#memberCheckList').append("<div class='memberCheckDiv' ><input id='memberchecklist" + i + "' checked='checked' type='checkbox' name='memberchecklist' value='" + memberlistcache[i].label + "'  /><label for='memberchecklist" + i + "' class='itemLink'>" + memberlistcache[i].label + "</label></div>")
    }
}


function fillMemberCheckListForLogs() {
    $('#memberCheckListForLogs').empty()
    for (var i = 0; i < memberlistcache.length; i++) {
        $('#memberCheckListForLogs').append("<div class='memberCheckDiv' ><input id='memberchecklistForLogs" + i + "' checked='checked' type='checkbox' name='memberchecklistForLogs' value='" + memberlistcache[i].label + "'  /><label for='memberchecklistForLogs" + i + "' class='itemLink'>" + memberlistcache[i].label + "</label></div>")
    }
}


function memberpartitions(dataList) {
    $("#memberPartitions").empty()
    if (dataList != null)
        for (var i = 0; i < dataList.length; i++) {
            $("#memberPartitions").append("<div class='partitionDiv'>" + dataList[i] + "</div>")
        }
}


function memberProps(dataList) {
    $("#memberProps").empty()
    if (dataList != null)
        for (lbl in dataList) {
            $("#memberProps").append("<tr><td class='infoLabel'>" + lbl + ":</td><td class='valueTd valueTdSmall'>" + dataList[lbl] + "</td></tr>")
        }
}

function memberConfig(dataList) {
    $("#memberConfig").empty()
    if (dataList != null) {
        dataList = dataList.replace(/</gi, "&lt;").replace(/>/gi, "&gt;")
        $("#memberConfig").append("<pre style='font-size: 10pt;'><code class='xml'>" + dataList + "</code></pre>")

        $('pre code').each(function (i, e) {
            hljs.highlightBlock(e, '    ')
        });
    }
}


function memberruntime(dataList) {
    if (dataList != null)
        for (lbl in dataList) {
            var idm = lbl.split(".")[1]
            $("#" + idm).html(dataList[lbl])
        }
}


function memberlist(olist) {
    memberlistcache = olist
    $('#members').empty()
    $("#membersHeader").html("Members (" + olist.length + ")")
    var str = "<table ><tbody>"
    for (var i = 0; i < olist.length; i++) {
        var latencyPic = "images/"
        var info = "Latest Data: " + olist[i].latency + " seconds ago"
        if (olist[i].latency == -1) {
            latencyPic += "gray.png"
        }
        else if (olist[i].latency < 60) {
            latencyPic += "green.png"
        }
        else if (olist[i].latency < 300)
            latencyPic += "yellow.png"
        else
            latencyPic += "red.png"

        str += "<tr>"
        str += "<td style='vertical-align: bottom;'><img class='latencyPics' src='" + latencyPic + "' alt='' title='" + info + "' /></td>"
        str += "<td style='vertical-align: middle;'><a href='#' class='itemLink' onclick='addViewShort(\"" + olist[i].label + "\", \"member\" )'>" + (i + 1) + "- " + olist[i].label + "</a></td>"

        str += "</tr>"
    }
    str += "</tbody></table>"
    $('#members').append(str)

}

function memberShutdownAction(){
    $("#shutdownMemberAskDialog").dialog("option", "buttons",
        [
            {id:"memberShutdownConfirmCancel", text:"CANCEL", click:function () {
                $(this).dialog("close")
            }},
            {id:"memberShutdownConfirm", text:"YES", click:function () {
                $(this).dialog("close")
                $(".writeModeButton").button( "option", "disabled", true );
                var data = {cluster:activeCluster, operation:"memberShutdown", member:activeObject }
                opcall(data)
            }}
        ])
    $("#shutdownMemberAskDialog").dialog("option", "width", 400);
    $("#shutdownMemberAskDialog").dialog("option", "height", 160);
    $("#shutdownMemberAskDialog").dialog("open")
}

function memberShutdown(olist){
   if(olist == "successful"){
        $(".writeModeButton").button( "option", "disabled", false );
        $("#shutdownMemberDialog").dialog("open");
   }else{

   }
}

function memberRestartAction(){
    $("#restartMemberAskDialog").dialog("option", "buttons",
        [
            {id:"memberRestartConfirmCancel", text:"CANCEL", click:function () {
                $(this).dialog("close")
            }},
            {id:"memberRestartConfirm", text:"YES", click:function () {
                $(this).dialog("close")
                $(".writeModeButton").button( "option", "disabled", true );
                var data = {cluster:activeCluster, operation:"memberRestart", member:activeObject }
                opcall(data)
            }}
        ])
    $("#restartMemberAskDialog").dialog("option", "width", 400);
    $("#restartMemberAskDialog").dialog("option", "height", 160);
    $("#restartMemberAskDialog").dialog("open")
}

function memberRestart(olist){
   if(olist == "successful"){
        $(".writeModeButton").button( "option", "disabled", false );
        $("#restartMemberDialog").dialog("open");
   }else{

   }
}