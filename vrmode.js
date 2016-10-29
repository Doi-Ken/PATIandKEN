// カメラ／マイクにアクセスするためのメソッドを取得しておく

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
 
var localStream;    // 自分の映像ストリームを保存しておく変数
var connectedCall;  // 接続したコールを保存しておく変数
 
// SkyWayのシグナリングサーバーへ接続する (APIキーを置き換える必要あり）
var peer = new Peer({ key: 'a70b3fb0-358b-47d9-a2c9-e46a7b4cbe1e', debug: 3});
 
// シグナリングサーバへの接続が確立したときに、このopenイベントが呼ばれる
peer.on('open', function(){
    // 自分のIDを表示する
    // - 自分のIDはpeerオブジェクトのidプロパティに存在する
    // - 相手はこのIDを指定することで、通話を開始することができる
    $('#my-id').text(peer.id);

});
 
// 相手からビデオ通話がかかってきた場合、このcallイベントが呼ばれる
// - 渡されるcallオブジェクトを操作することで、ビデオ映像を送受信できる
peer.on('call', function(call){
  
    $("#message-id").text(call.metadata);
    console.log("------------------------------");
    console.log(call.metadata);
    // 切断時に利用するため、コールオブジェクトを保存しておく
    connectedCall = call;
 
    // 相手のIDを表示する
    // - 相手のIDはCallオブジェクトのpeerプロパティに存在する
    $("#peer-id").text(call.peer);
 
    // 自分の映像ストリームを相手に渡す
    // - getUserMediaで取得したストリームオブジェクトを指定する
    call.answer(localStream);
 
    // 相手のストリームが渡された場合、このstreamイベントが呼ばれる
    // - 渡されるstreamオブジェクトは相手の映像についてのストリームオブジェクト
    call.on('stream', function(stream){
 
        // 映像ストリームオブジェクトをURLに変換する
        // - video要素に表示できる形にするため変換している
        var url = URL.createObjectURL(stream);
 
        // video要素のsrcに設定することで、映像を表示する
        $('#peer-video').prop('src', url);
        $('#peer-video2').prop('src', url);
    });
});
 
// DOM要素の構築が終わった場合に呼ばれるイベント
// - DOM要素に結びつく設定はこの中で行なう
$(function() {
 
    // カメラ／マイクのストリームを取得する
    // - 取得が完了したら、第二引数のFunctionが呼ばれる。呼び出し時の引数は自身の映像ストリーム
    // - 取得に失敗した場合、第三引数のFunctionが呼ばれる
    navigator.getUserMedia({audio: true, video: true}, function(stream){
 
        // このストリームを通話がかかってき場合と、通話をかける場合に利用するため、保存しておく
        localStream = stream;
 
        // 映像ストリームオブジェクトをURLに変換する
        // - video要素に表示できる形にするため変換している
        var url = URL.createObjectURL(stream);
 
        // video要素のsrcに設定することで、映像を表示する
        $('#my-video').prop('src', url);
 
    }, function() { alert("Error!"); });
 
   
    // Start Callボタンクリック時の動作
    $('#call-start').click(function(){
        var message = $('#message-id-input').val();
        console.log("-------------------");
       
        console.log(message);
        // 接続先のIDをフォームから取得する
        var peer_id = $('#peer-id-input').val();
 
        // 相手と通話を開始して、自分のストリームを渡す
        var call = peer.call(peer_id, localStream, {metadata: message});
            
        // 相手のストリームが渡された場合、このstreamイベントが呼ばれる
        // - 渡されるstreamオブジェクトは相手の映像についてのストリームオブジェクト
        call.on('stream', function(stream){
            // 相手のIDを表示する
           
            $("#peer-id").text(call.peer);
            // 映像ストリームオブジェクトをURLに変換する
            // - video要素に表示できる形にするため変換している
            var url = URL.createObjectURL(stream);
 
            // video要素のsrcに設定することで、映像を表示する
            $('#peer-video').prop('src', url);
            $('#peer-video2').prop('src', url);
        });
    });
    

    //テキストを入力し、submitしたとき
$("form").on("submit", function(ev) {
 
  //onsubmitのデフォルト動作（reload）を抑制
  ev.preventDefault();
 
  //テキストを取得
  var $input = $(this).find("input[type=text]"); 
  var data = $input.val();
  $input.val("");
 
  //テキストを表示
  $("#message").append(data + "<br>");
 
  //peerにメッセージを送信
  multiparty.send(data);
 
});
// peerからテキストメッセージを受信したとき
multiparty.on('message', function(mesg) {
  $("#message").append(mesg.data + "<br>");
});

    var wait = function(){
    document.getElementById('sound-file').play() ;
　　// 接続先のIDをフォームから取得する
         var message = $('#message-id-input').val();
        var peer_id = $('#peer-id-res').val();
 
        // 相手と通話を開始して、自分のストリームを渡す
        var call = peer.call(peer_id, localStream, {metadata: message});
            
        // 相手のストリームが渡された場合、このstreamイベントが呼ばれる
        // - 渡されるstreamオブジェクトは相手の映像についてのストリームオブジェクト
        call.on('stream', function(stream){
            // 相手のIDを表示する
            $("#peer-id").text(call.peer);
            // 映像ストリームオブジェクトをURLに変換する
            // - video要素に表示できる形にするため変換している
            var url = URL.createObjectURL(stream);
 
            // video要素のsrcに設定することで、映像を表示する
            $('#peer-video').prop('src', url);
            $('#peer-video2').prop('src', url);
        });
　  } 

     var res_hour = 100;
     var res_minutes = 100;

    // Callres ボタンクリック時の動作
    $('#call-res').click(function(){
        $('#res-id').text("予約完了!!");
        res_hours=$('#hour').val();
        res_minutes=$('#minutes').val();
        console.log(res_hours+ " " + res_minutes);
        
        var date_obj = new Date();
        var current_minutes = date_obj.getMinutes();
        var current_hours = date_obj.getHours();
        var interval_milisecond=1000;
        console.log(current_hours+ " " + current_minutes);
        
        if(current_hours * 60 * 60 + current_minutes * 60 < 
        res_hours * 60 * 60 + res_minutes*60){
            interval_milisecond = 1000 * ((res_hours * 60 * 60 + res_minutes*60)
            - (current_hours * 60 * 60 + current_minutes * 60));
        }
        else{
            interval_milisecond = 1000 * (60 * 60 * (23 - current_hours) + 60 * (60 - current_minutes) 
            + res_hours * 60 * 60 + res_minutes * 60);
        }
        console.log("interval_milisecond:" + interval_milisecond);
        setTimeout(wait, interval_milisecond);
        setTimeout(wait, 5000);
    });

     
 



    // End　Callボタンクリック時の動作
    $('#call-end').click(function(){
        // ビデオ通話を終了する
        connectedCall.close();
    });
});
