(function(){

  var app = angular.module('MTapp.controllers', []);

  app.controller('mainCtrl', function($scope) {
  //var uniq = require('uniq');
  //  $scope.test = uniq([1,2,3]);
  });

  app.controller('twilioCtrl', function($scope,$http) {
    $scope.token=null;
    $scope.callStatus='';
    $scope.Connection=null;
    $scope.GetToken = function(){
      $http.get('http://178.62.173.162:1337/ionictoken').success(function(token){
        $scope.token=token;
      })
    };
    $scope.initTwilioDivice = function(){
            if($scope.token){
              Twilio.Device.setup($scope.token);
              Twilio.Device.incoming(function(connection){
                if (confirm('Accept incoming call from ' +
                            connection.parameters.From + '?'))
                {
                      $scope.Connection = connection;
                      connection.accept();
                      $scope.callStatus='Call in progress';
                }
              });
              Twilio.Device.disconnect(function(connection){
                $scope.callStatus='Awaiting incoming call...';
              });
              }
            else{
              console.log("no token:" + $scope.token)
            }


            var onConnection = function(connection){
              if (confirm('Accept incoming call from ' +
                          connection.parameters.From + '?'))
              {
                    $scope.Connection = connection;
                    connection.accept();
                    $scope.callStatus='Call in progress';
              }
            };

            var onDisconnect=function(connection){
              $scope.callStatus='Awaiting incoming call...';
            };

    };
    $scope.MakeACall = function(){
      $scope.Connection = Twilio.Device.connect(
        {
          CallerId:'+97243741132',
          //PhoneNumber:'+972544637999',
          callMaker:'ionic',
          call_reciver_name:'ohad'
        }
      );

    };


  });



}());
