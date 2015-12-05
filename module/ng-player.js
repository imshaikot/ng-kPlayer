/**
 * Created by abuhena on 11/26/15.
 */
var directive_app = angular.module('KaliverPlayer', []);

directive_app.directive('ngPlayer', function() {

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
        console.log($scope.fsSeekBarSize);
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
      console.log(document.mozFullScreenElement);
      if (document.mozFullScreenElement != null)
      {
        var getSide = 10;//(screen.width - 640) / 2;

        document.querySelector(".player-control").style.width = (window.innerWidth - (getSide * 2))+"px";
        document.querySelector(".player-control").style.marginLeft = "-"+getSide+"px";
        document.querySelector(".player-control").style.marginRight = getSide+"px";
        document.querySelector(".player-control").style.marginTop = (window.innerHeight - 160)+"px";
        document.querySelector(".player-control").style.position = "relative";
        document.querySelector(".player-control").style.top = "0px";
        document.querySelector(".player-control").style.left = "-20px";

        //
        document.querySelector(".progress-bar-x").style.width = ((window.innerWidth - (getSide * 2)) - 20)+"px";
        $scope.fsSeekBarSize = ((window.innerWidth - (getSide * 2)) - 20);
        console.log($scope.fsSeekBarSize);
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
        document.querySelector("#big-pause-btn").style.marginTop = ((window.innerHeight - 75)/2) +"px";
        document.querySelector("#big-pause-btn").style.fontSize = "150px";
        document.querySelector("#big-play-btn").style.marginTop = ((window.innerHeight - 75)/2) +"px";
        document.querySelector("#big-play-btn").style.fontSize = "150px";

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
        if ($scope.dragging)
        {
          $scope.updateBar(e.pageX)
        }
      }

      $scope.context.onmouseout = function()
      {
        $scope.dragging = false;
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

  }];

  return {
    restrict: 'AE',
    replace: 'true',
    templateUrl: 'module/template/player.html',
    controller: controller,
    link: function(scope, elem, attrs) {

        scope.kaliver_videoTitle = attrs.vTitle,
        scope.kaliver_vSrc,
        scope.kaliver_vAutoplay,
        scope.kaliver_vPreload,
        scope.kaliver_vDuration = "00:00",
        scope.kaliver_vTimelapse = "00:00";

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

    }
  };
});
