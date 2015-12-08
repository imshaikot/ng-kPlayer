# kPlayer

  AngularJS Directive for simple and light-weight HTML5 Video Player.
  
  Review the example project, its ver easy to implement to your ng-project because Kaliver Player offers you the simplest and lieght weight system to initiate Video Playback on your app with a standard design and all probable customized functionality for your web based media player.
  
# Installation

Its very simple to install Kaliver Player on your ng app - just copy the module/ directory to your project root and import those JS files to your main index.html before initializing your main app.js


      <script src="module/ng-player.js"></script>
      <script src="module/date.js"></script>
	
Make a service dependence to your ng config as "KaliverPlayer" --- That's you're all set use the kaliver player 


# Simple Usage

			<ng-player
				v-title="Horizon Hobby At The F3Expo"
				v-autoplay="false"
				v-preload="true"
				v-url="http://52.11.132.219/cache/mp4:/61055e7197b7c7a40ce2986becbf6b9d.mp4">
			</ng-player>
Isn't it?


N.B: Currently Kaliver Player only supports WebKit and Mozilla browser and I'm still working to make it a stable version and work around all possible platforms including mobile devices.
Make sure you will only try to play videos that officially support by HTML5 - because I can only support for HLS (HTTP Live Streaming) with H.264 quality as well as Streaming on Demand support.

  
  
