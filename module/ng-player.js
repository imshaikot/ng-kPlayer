/**
 * Created by abuhena on 11/26/15.
 */
angular.module('KaliverPlayer', [])
    .directive('ngPlayer', function() {

  var controller = ['$scope','$sce', '$timeout', function ($scope, $sce, $timeout) {

    $scope.playerInit = function()
    {
      $scope.domPlayer = document.querySelector(".main-player");
      $scope.context = document.querySelector(".main-player-component");
      $scope.sbContext = document.querySelector(".player-control");

      document.querySelector(".touchable-component").ondblclick = function()
      {
        $scope.toggleFullScreen();
      }

      document.body.onkeyup = function(e)
      {
        if (e.keyCode==32)
        {
          if ($scope.domPlayer.paused)
          {
            $scope.kPlay();
          } else {
            $scope.kPause();
          }
        }


        //

        if (e.keyCode==37) //left arrow
        {
          $scope.domPlayer.currentTime = $scope.domPlayer.currentTime - 3;
        }

        if (e.keyCode==39) //right arrow
        {
          $scope.domPlayer.currentTime = $scope.domPlayer.currentTime + 3;
        }
      }

      if ($scope.kaliver_vAutoplay)
      {
        $scope.domPlayer.autoplay = true;
      }

      if ($scope.kaliver_vPreload)
      {
        $scope.domPlayer.preload = true;
      }

      $scope.domPlayer.onplaying = function()
      {
        document.title = document.title +" - "+ $scope.kaliver_videoTitle;

        $scope.isBuffering = false;
        $scope.error_playing_video = false;
        document.querySelector("#big-play-btn").style.display = "none";
        document.querySelector("#big-pause-btn").style.display = "block";

        $timeout(function(){
          document.querySelector("#big-pause-btn").style.display = "none";
        }, 500);

        document.querySelector("#big-pause-btn").className = "fa fa-pause zoomOut animated";

        //$timeout(function(){
        //  document.querySelector('#big-pause-btn').style.display = "none";
        //}, 500);

        document.querySelector('#pause').className = "fa fa-pause fa-btn bounceIn animated";
        document.querySelector('#play').className = "fa fa-play fa-btn hide";
      }

      $scope.domPlayer.onpause = function()
      {
        document.querySelector('#play').className = "fa fa-play fa-btn bounceIn animated";
        document.querySelector('#pause').className = "fa fa-pause fa-btn hide";

      }

      $scope.domPlayer.onended = function()
      {



        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }

      $scope.domPlayer.onloadedmetadata = function()
      {
        $scope.kaliver_vDuration = (new Date).clearTime()
          .addSeconds($scope.domPlayer.duration)
          .toString('mm:ss');
      }



      $scope.domPlayer.ontimeupdate = function()
      {

        $scope.$apply(function(){

          $scope.isBuffering = false;

          $scope.kaliver_vTimelapse = (new Date).clearTime()
            .addSeconds($scope.domPlayer.currentTime)
            .toString('mm:ss')
        });

        var percent = 100 * ( $scope.domPlayer.currentTime / $scope.domPlayer.duration );
        var max_px = $scope.fsActivate ? $scope.fsSeekBarSize : 614;
        var pixel = (max_px / 100) * percent;

        document.querySelector('.timeBar').style.width = pixel+"px";
      }

      $scope.domPlayer.onerror = function()
      {
        $scope.error_playing_video = true;
      }

    }

    document.addEventListener("webkitfullscreenchange", function(){

      $scope.startBuffer()

      if (document.webkitFullscreenElement != null)
      {
        //console.log();
        var getSide = 10;//(screen.width - 640) / 2;



        document.querySelector(".player-control").style.width = (window.innerWidth - (getSide * 2))+"px";
        //document.querySelector(".player-control").style.marginLeft = "-"+getSide+"px";
        document.querySelector(".player-control").style.marginRight = getSide+"px";
        document.querySelector(".player-control").style.marginTop = (window.innerHeight - (navigator.platform == "Win32" ? 160 : -100))+"px";
        document.querySelector(".player-control").style.position = "relative";
        document.querySelector(".player-control").style.top = "0px";
        document.querySelector(".player-control").style.left = "-20px";

        //
        document.querySelector(".progress-bar-x").style.width = ((window.innerWidth - (getSide * 2)) - 20)+"px";
        $scope.fsSeekBarSize = ((window.innerWidth - (getSide * 2)) - 20);
        //console.log($scope.fsSeekBarSize);
        document.querySelector(".progress-x").style.width = $scope.fsSeekBarSize+"px";
        document.querySelector(".timeBar").style.top = "3px";

        document.querySelector(".error-component").style.width = window.innerWidth+"px";
        document.querySelector(".error-component").style.height = window.innerHeight+"px";
        document.querySelector(".error-component").style.top = "50px";

       document.querySelector(".touchable-component").style.width = (window.innerWidth )+"px";
        document.querySelector(".touchable-component").style.height = (window.innerHeight - (navigator.platform == "Win32" ? 60 : -40))+"px";
        document.querySelector("#big-pause-btn").style.marginTop = ((window.innerHeight - 75)/2) +"px";
        document.querySelector("#big-pause-btn").style.fontSize = "150px";
        document.querySelector("#big-play-btn").style.marginTop = ((window.innerHeight - 75)/2) +"px";
        document.querySelector("#big-play-btn").style.fontSize = "150px";

        $scope.fsActivate = true;

        $scope.onSSUpdate();
      } else {

        document.querySelector(".player-control").style.width = "640px";
        document.querySelector(".player-control").style.marginLeft = "0px";
        document.querySelector(".player-control").style.marginTop = "0%";
        document.querySelector(".player-control").style.position = "absolute";
        document.querySelector(".player-control").style.top = "300px";
        document.querySelector(".player-control").style.left = "0px";

        document.querySelector(".progress-bar-x").style.width = "614px";
        document.querySelector(".progress-x").style.width = "614px";
        document.querySelector(".timeBar").style.top = "8px";

        document.querySelector(".error-component").style.width = "640px";
        document.querySelector(".error-component").style.height = "360px";
        document.querySelector(".error-component").style.top = "0px";

        document.querySelector(".touchable-component").style.width = "640px";
        document.querySelector(".touchable-component").style.height = "275px";
        document.querySelector("#big-pause-btn").style.marginTop = "115px";
        document.querySelector("#big-pause-btn").style.fontSize = "75px";
        document.querySelector("#big-play-btn").style.marginTop = "115px";
        document.querySelector("#big-play-btn").style.fontSize = "75px";

        $scope.fsActivate = !$scope.fsActivate;

        $scope.onSSUpdate();
      }
    }, false);



    document.addEventListener("mozfullscreenchange", function(){

      $scope.startBuffer();

      if (document.mozFullScreenElement != null)
      {
        var getSide = 10;//(screen.width - 640) / 2;

        document.querySelector(".player-control").style.width = (window.innerWidth - (getSide * 2))+"px";
        document.querySelector(".player-control").style.marginLeft = "-"+getSide+"px";
        document.querySelector(".player-control").style.marginRight = getSide+"px";
        document.querySelector(".player-control").style.marginTop = (window.innerHeight - 160)+"px";
        //document.querySelector(".player-control").style.position = "relative";
        document.querySelector(".player-control").style.top = "0px";
        document.querySelector(".player-control").style.left = "-10px";

        //
        document.querySelector(".progress-bar-x").style.width = ((window.innerWidth - (getSide * 2)) - 20)+"px";
        $scope.fsSeekBarSize = ((window.innerWidth - (getSide * 2)) - 20);
        console.log($scope.fsSeekBarSize);
        document.querySelector(".progress-x").style.width = $scope.fsSeekBarSize+"px";
        document.querySelector(".timeBar").style.top = "3px";

        document.querySelector(".error-component").style.width = window.innerWidth+"px";
        document.querySelector(".error-component").style.height = window.innerHeight+"px";
        document.querySelector(".error-component").style.top = "50px";

        //document.querySelector(".touchable-component").style.position = "relative";
        document.querySelector(".touchable-component").style.width = (window.innerWidth )+"px";
        document.querySelector(".touchable-component").style.height = (window.innerHeight - (navigator.platform == "Win32" ? 60 : -40))+"px";
        document.querySelector("#big-pause-btn").style.marginTop = ((window.innerHeight - 75)/2) +"px";
        document.querySelector("#big-pause-btn").style.fontSize = "150px";
        document.querySelector("#big-play-btn").style.marginTop = ((window.innerHeight - 75)/2) +"px";
        document.querySelector("#big-play-btn").style.fontSize = "150px";

        $scope.fsActivate = true;
        $scope.onSSUpdate();
      } else {

        document.querySelector(".player-control").style.width = "640px";
        document.querySelector(".player-control").style.marginLeft = "0px";
        document.querySelector(".player-control").style.marginTop = "0%";
        document.querySelector(".player-control").style.position = "absolute";
        document.querySelector(".player-control").style.top = "300px";
        document.querySelector(".player-control").style.left = "0px";

        document.querySelector(".progress-bar-x").style.width = "614px";
        document.querySelector(".progress-x").style.width = "614px";
        document.querySelector(".timeBar").style.top = "8px";

        document.querySelector(".error-component").style.width = "640px";
        document.querySelector(".error-component").style.height = "360px";
        document.querySelector(".error-component").style.top = "0px";

        document.querySelector(".touchable-component").style.width = "640px";
        document.querySelector(".touchable-component").style.height = "275px";
        document.querySelector("#big-pause-btn").style.marginTop = "115px";
        document.querySelector("#big-pause-btn").style.fontSize = "75px";
        document.querySelector("#big-play-btn").style.marginTop = "115px";
        document.querySelector("#big-play-btn").style.fontSize = "75px";

        $scope.fsActivate = !$scope.fsActivate;
        $scope.onSSUpdate();
      }
    }, false);


    /***********************/

    $scope.kPlay = function()
    {
      document.querySelector('#pause').className = "fa fa-pause fa-btn bounceIn animated";
      document.querySelector('#play').className = "fa fa-play fa-btn hide";
      $scope.domPlayer.play();
    }

    $scope.kPause = function()
    {
      document.querySelector('#play').className = "fa fa-play fa-btn bounceIn animated";
      document.querySelector('#pause').className = "fa fa-pause fa-btn hide";
      $scope.domPlayer.pause();
    }

    $scope.kClickPlay = function()
    {
      var pauseBtn = document.querySelector("#big-pause-btn");
      var playBtn = document.querySelector("#big-play-btn");

      if ( $scope.domPlayer.paused )
      {
        playBtn.style.display = "none";
        pauseBtn.style.display = "block";
        pauseBtn.className = "fa fa-pause zoomOut animated";


        $scope.domPlayer.play();

      } else {

        playBtn.style.display = "block";
        pauseBtn.style.display = "none";
        playBtn.className = "fa fa-play-circle-o zoomIn animated";

        $timeout(function(){
          playBtn.style.display = "none";
        }, 400);

        $scope.domPlayer.pause();
      }
    }

    $scope.mute = function()
    {
      $scope.domPlayer.muted = !$scope.domPlayer.muted;
      $scope.muted = $scope.domPlayer.muted;
    }

    $scope.urlWhiteList = function(src)
    {
      return $sce.trustAsResourceUrl(src);
    }

    $scope.toggleFullScreen = function()
    {


      var element = $scope.domPlayer;

      if ($scope.fsActivate)
      {

        if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else {
          document.webkitCancelFullScreen();
        }

      } else {
        if (element.mozRequestFullScreen) {

          element.mozRequestFullScreen();

        } else if (element.webkitRequestFullScreen) {

          element.webkitRequestFullScreen();

        }
      }


    }

    /************************/

    $scope.seekBarInit = function()
    {
      $scope.seekBar = document.querySelector(".progress-bar-x");
      console.log($scope.seekBar);
      $scope.dragging = false;

      $scope.seekBar.onmouseover = function(e)
      {
        $scope.activeTime(true, e);
      }

      $scope.seekBar.onmousedown = function(e)
      {
        $scope.dragging = true;
        $scope.updateBar(e.pageX)
      }

      $scope.seekBar.onmouseup = function(e)
      {
        if ($scope.dragging)
        {
          $scope.dragging = false;
          $scope.updateBar(e.pageX)
        }
      }

      $scope.seekBar.onmousemove = function(e)
      {
        $scope.activeTime(true, e);
        if ($scope.dragging)
        {
          $scope.updateBar(e.pageX)
        }
      }

      $scope.context.onmouseout = function()
      {
        $scope.dragging = false;
        $scope.activeTime(false);
      }

      $timeout($scope.startBuffer, 1000);

    }

    $scope.startBuffer = function()
    {
      var max_px = $scope.fsActivate ? $scope.fsSeekBarSize : 614;
      var currentBuffer = $scope.domPlayer.buffered.end(0);
      var maxduration = $scope.domPlayer.duration;
      var perc = 100 * currentBuffer / maxduration;
      document.querySelector('.bufferBar').style.width = (max_px / 100 ) * perc +"px";

      if(currentBuffer < maxduration) {
        $timeout($scope.startBuffer, 500);
      }
    }

    $scope.updateBar = function(x)
    {

      var max_px = $scope.fsActivate ? $scope.fsSeekBarSize : 614;
      var progress =  $scope.seekBar;

      var maxduration = $scope.domPlayer.duration;
      var position = !$scope.fsActivate ? ((x - progress.offsetLeft) - $scope.context.offsetLeft) : (x - progress.offsetLeft - 10);

      if ($scope.fsActivate) console.log("Page X: "+ x +" OffSet: "+progress.offsetLeft);

      var percentage = 100 * position / (parseInt(progress.style.width.replace('px', '')));


      if(percentage > 100) {
        percentage = 100;
      }
      if(percentage < 0) {
        percentage = 0;
      }
      document.querySelector('.timeBar').style.width = (max_px / 100) * percentage+'px';
      $scope.domPlayer.currentTime = maxduration * percentage / 100;
    }

    $scope.onSSUpdate = function()
    {
      var percent = 100 * ( $scope.domPlayer.currentTime / $scope.domPlayer.duration );
      var max_px = $scope.fsActivate ? $scope.fsSeekBarSize : 614;
      var pixel = (max_px / 100) * percent;

      document.querySelector('.timeBar').style.width = pixel+"px";
    }

    $scope.copyURL = function()
    {
      document.querySelector(".context-menu").style.display = 'none';
      document.querySelector("#copytoc").focus();
      document.querySelector("#copytoc").select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.log('Oops, unable to copy');
      }
    }

    $scope.activeTime = function(bool, event)
    {
      var elem = document.querySelector(".time-title");
      if (bool)
      {
        var max_px = $scope.fsActivate ? $scope.fsSeekBarSize : 614;
        var perc_px = (100 / (max_px)) * (event.layerX - 10);
        var timeTo = (perc_px * $scope.domPlayer.duration) / 100;

        if (perc_px >= 0.005)
        {
          $scope.timeToFF = (new Date).clearTime()
              .addSeconds(timeTo)
              .toString('mm:ss');

          elem.style.display = "block";
          elem.style.left = ((event.layerX - 10) - (parseInt(elem.offsetWidth)/2))+"px";
          elem.className = "time-title fadeInUp animated";
        }

      }else {
        elem.className = "time-title fadeOutDown animated";

      }
    }

    $scope.about = function(show)
    {
        var elem = document.querySelector(".about");
      elem.className = "about bounceIn animated";
      if (show ) {elem.style.display = "block";}
      elem.style.left = ((document.querySelector(".touchable-component").offsetWidth - elem.offsetWidth)/2)+"px";
      elem.style.top = ((document.querySelector(".touchable-component").offsetHeight + 30 - elem.offsetHeight)/2)+"px";

      console.log(document.querySelector(".touchable-component").offsetHeight);
    }

    $scope.debout = function()
    {
      var elem = document.querySelector(".about");
      elem.className = "about bounceOut animated";
    }

  }];

  return {
    restrict: 'AE',
    replace: 'true',
    templateUrl: 'module/template/player.html',
    controller: controller,
    link: function(scope, elem, attrs) {

        var cmp = document.querySelector(".main-player-component");

        scope.kaliver_videoTitle = attrs.vTitle,
        scope.kaliver_vSrc,
        scope.kaliver_vAutoplay,
        scope.kaliver_vPreload,
        scope.kaliver_vDuration = "00:00",
        scope.kaliver_vTimelapse = "00:00";

      scope.contextMenu = false;

      //document.addEventListener( "contextmenu", function(e) {
      //  console.log(e);
      //});

      if (typeof(attrs.vUrl)!=="undefined")
      {
        scope.kaliver_vSrc = attrs.vUrl;
      }

      if (typeof(attrs.vAutoplay)!=="undefined")
      {
        scope.kaliver_vAutoplay = attrs.vAutoplay || attrs.vAutoplay=='true' ? true : false;
      }

      if (typeof(attrs.vPreload)!=="undefined")
      {
        scope.kaliver_vPreload = attrs.vPreload || attrs.vPreload=='true' ? true : false;
      }

      (function() {

        cmp.addEventListener( "contextmenu", function(e) {

          createContextMenu(e, function(element){
            e.preventDefault();
            //scope.contextMenu = true;
            element.style.display = "block";
          });
        });


        cmp.addEventListener("click", function(){
          if (document.querySelector(".context-menu").style.display=='block')
          {
            //scope.contextMenu = false;
            document.querySelector(".context-menu").style.display = 'none';
          }
        });

      })();

      function createContextMenu(e, being)
      {
        //console.log(e);
        var cmElement = document.querySelector(".context-menu");
        cmElement.style.top = e.layerY+"px";
        cmElement.style.left = e.layerX+"px";

        return being(cmElement);
      }

      //scope.kText = "kPlayer offers you the best light-weight quality of HTML5 Player with";
      //scope.kText += " high stability of Video Playback.<br/>";
      //scope.kText += "kPlayer is most efficient HTML5 video player for AngularJS and usecase is simple as";
      //scope.kText += " typical directive.<br/><br/>";
      //scope.kText += "Kaliver Player solo developed by <span style='font-weight: bold;'>Shariar Shaikot</span>"

    }
  };
});
