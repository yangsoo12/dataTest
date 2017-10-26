
$(document).ready(function () {
  var timeData = [],
    temperatureData = [],
    humidityData = [],
  pm2Data = [],
  pm10Data = [];
 //---------yanji start 1/2------------
  
  //20170913
  var pm10Data = [],
      pm25Data = [];
  var result;
 // android 20170912 23:29
  var humilength = humidityData.length;
  // 20170913
  var templength = temperatureData.length;
  var pm10length = pm10Data.length;
  var pm25length = pm25Data.length;
	
  var rpmData = [];
  var rpmlength = rpmData.length;

  var tempimsi = 0;
  var humiimsi = 0;
   
   document.getElementById("pm2").innerHTML = "20";
   document.getElementById("pm10").innerHTML = "50";
   document.getElementById("temp").innerHTML = "70";
	
  //---------yanji end 1/2------------
  
  var data = {
    labels: timeData,
    datasets: [
      {
        fill: false,
        label: 'Temp',
        yAxisID: 'Temperature',
        borderColor: "rgba(255, 204, 0, 1)",
        pointBoarderColor: "rgba(255, 204, 0, 1)",
        backgroundColor: "rgba(255, 204, 0, 0.4)",
        pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
        pointHoverBorderColor: "rgba(255, 204, 0, 1)",
        data: temperatureData
      },
      {
        fill: false,
        label: 'pm2.5',
        yAxisID: 'pm2.5',
        borderColor: "rgba(255, 131, 131, 1)",
        pointBoarderColor: "rgba(255, 131, 131, 1)",
        backgroundColor: "rgba(255, 131, 131, 0.4)",
        pointHoverBackgroundColor: "rgba(255, 131, 131, 1)",
        pointHoverBorderColor: "rgba(255, 131, 131, 1)",
        data: pm2Data
      }
    ]
  }

  var basicOption = {
    title: {
      display: true,
      text: 'Temperature & pm2.5 Real-time Data',
      fontSize: 36
    },
    scales: {
      yAxes: [{
        id: 'Temperature',
        type: 'linear',
        scaleLabel: {
          labelString: 'Temp(C)',
          display: true
        },
        position: 'left',
      }, {
          id: 'pm2.5',
          type: 'linear',
          scaleLabel: {
            labelString: 'pm2.5(ug/m3)',
            display: true
          },
          position: 'right'
        }]
    }
  }

  //Get the context of the canvas element we want to select
  var ctx = document.getElementById("myChart").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: basicOption
  });

  var ws = new WebSocket('wss://' + location.host);
  ws.onopen = function () {
    console.log('Successfully connect WebSocket');
  }
  ws.onmessage = function (message) {
    console.log('receive message' + message.data);
    try {
      var obj = JSON.parse(message.data);
      if(!obj.time || !obj.params.pm10) {
        return;
      }
	  
      document.getElementById("pm2").innerHTML = obj.params.pm2;
  	  document.getElementById("pm10").innerHTML = obj.params.pm10;
	  document.getElementById("motion").innerHTML = obj.params.motion;
	  var time = obj.time;
	  var subS = time.substring(13,19);
	  var hourS = time.substring(11,13);
	  var vv = parseInt(hourS);
	  var timeS = "";
	  vv = vv - 3;
	  if(vv<0)
		{
		  vv = vv + 24;
		}

		if(vv<10)
		{
			timeS = "0" + vv.toString() + subS;
		}
		else
		{
			timeS = vv.toString() + subS;
		}
		if(obj.params.Temperature)
		{
		  timeData.push(timeS);
		  temperatureData.push(obj.params.Temperature);
		  tempimsi = obj.params.Temperature;
		  humiimsi = obj.params.Humidity;
		}
		else
		{
			timeData.push(timeS);
			document.getElementById("humi").innerHTML = humiimsi;
			var xxx = Math.floor((Math.random() * 2));
			temperatureData.push(tempimsi+xxx);
			document.getElementById("temp").innerHTML = tempimsi+xxx;
		}
     
      // only keep no more than 50 points in the line chart
      const maxLen = 10;
      var len = timeData.length;
      if (len > maxLen) {
        timeData.shift();
        temperatureData.shift();
      }

      if (obj.params.Humidity) {
        humidityData.push(obj.params.Humidity);
      }
      if (humidityData.length > maxLen) {
        humidityData.shift();
      }
	  if (obj.params.pm2) {
		  pm2Data.push(obj.params.pm2);
	  }
	  if (pm2Data.length > maxLen)
	  {
		  pm2Data.shift();
	  }
	 if(obj.params.pm2>100){
  document.getElementById("p2g5").innerHTML = "아주나쁨";
}else if(obj.params.pm2>50){
  document.getElementById("p2g5").innerHTML = "나쁨";
}else if(obj.params.pm2>15){
  document.getElementById("p2g5").innerHTML = "보통";
}else if(obj.params.pm2>0){
  document.getElementById("p2g5").innerHTML = "좋음";
}
if(obj.params.pm10>150){
  document.getElementById("p10g6").innerHTML = "아주나쁨";
}else if(obj.params.pm2>80){
  document.getElementById("p10g6").innerHTML = "나쁨";
}else if(obj.params.pm2>30){
  document.getElementById("p10g6").innerHTML = "보통";
}else if(obj.params.pm2>0){
  document.getElementById("p10g6").innerHTML = "좋음";
}
 if(obj.params.Temperature>30){
	document.getElementById("tempg7").innerHTML = "높음";
}else if(obj.params.Temperature>20){
	document.getElementById("tempg7").innerHTML = "쾌적";
}else if(obj.params.Temperature>0){
	document.getElementById("tempg7").innerHTML = "낮음";
}
      myLineChart.update();
      
 //---------yanji start 2/2------------
  //20170913 pm Data push    
      pm10Data.push(obj.params.pm10);
      pm25Data.push(obj.params.pm2);
      rpmData.push(obj.params.rpm);
      //android 20170912 23:29
//       if(humilength==0 || templength == 0 || pm10length ==0 || pm25length ==0){
           
//            }
//           }else{
//             humilength = humidityData.length;
//             templength = temperatureData.length;
//             pm10length = pm10Data.length;
//             pm25length = pm25Data.length;
//            insertDatas(pm25Data[pm25length],humidityData[humilength],temperatureData[templength],humidityData[humilength]);
//         }
      //20170913
    
     if((pm25length<pm25Data.length || pm25length == pm25Data.length)&&(pm10length<pm10Data.length || pm10length == pm10Data.length)&&(templength<temperatureData.length || templength == temperatureData.length)&&(humilength<humidityData.length || humilength == humidityData.length)&&(rpmlength<rpmData.length || rpmlength == rpmData.length)){
          pm25length = pm25Data.length;
          pm10length = pm10Data.length;
          humilength = humidityData.length;
          templength = temperatureData.length;
	  rpmlength = rpmData.length;
	     
          insertDatas(pm25Data[pm25length-1],pm10Data[pm10length-1],temperatureData[templength-1],humidityData[humilength-1], rpmData[rpmlength-1]);
                          
          }
     
      
      //android 20170912 23:29
      function insertDatas(p2,p1,t,h,r){
         var p2State;
         if(p2<16){
           p2State = "좋음";
         }else if(p2<51){
           p2State = "보통";
         }else if(p2<101){
           p2State = "나쁨";
         }else{
           p2State = "매우나쁨";
         }
         Ao.showResult(p2,p1,t,h,p2State,r);
      }
      
     
//---------yanji end 2/2------------
	       //-------------------- messaging ----------------------
	    
// console.log("teststart");
//   function send_notification()
//     {

//       console.log("send");
//      $.ajax({
//             type : 'POST',
//             url : "https://fcm.googleapis.com/fcm/send",
//             headers : {
//                 Authorization : 'key=AAAAo-ULW8U:APA91bFxJSCqUJRvASWcpBF-7Q2yZApk3KWF0fmC21bJi4Ou9CnTz1fDjXFXHAcBwZc6Iq5JZwyHqFagCWAKybwMYL6Tnyhga_b-LtM2JO_qNcS893Sxv7Jwi55SOhpHz_I_enr4s42Y'
//             },
//             contentType : 'application/json',
//             dataType: 'json',
//             data: JSON.stringify({"to": "/topics/news", "notification": {"title":"TestTestTest","body":"Test"}}),
//             success : function(response) {
//                 console.log(response);

//         console.log("testend1");
//             },
//             error : function(xhr, status, error) {
//                 console.log(xhr.error);

//         console.log("testend2");
//             }
//         });
// console.log("testend");
//     }

//       send_notification();
//     console.log("teststart2");
//     //-----------messaging-------------------------
      
    } catch (err) {
      console.error(err);
    }
  }
	
});
