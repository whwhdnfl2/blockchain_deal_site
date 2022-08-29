const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/homepage', function(req,res){
  let today = new Date();   

  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  let hours = today.getHours(); // 시각
  let minutes = today.getMinutes(); // 분
  console.log(hours);
  console.log(minutes);

  var hour;
  if(minutes < 41){
    if(hours == 0){
      hours = 23;
      hour = String(hours);
    }
    else if(hours < 10){
      hours = hours - 1;
      hour = '0' + String(hours);
    }
    else{
      hours = hours - 1;
      hour = String(hours);
    }
  }
  else{
    if(hours < 10){
      hour = '0' + String(hours);
    }
    else{
      hour = String(hours);
    }
  }
  if(today.getHours() == 0 && minutes < 41){
    if(date > 1){
      date = date - 1;
    }
    else{
      if(month == 1 || month == 2 || month == 4 || month == 6 || month == 8 || month == 9 || month == 11){
        date = 31;
        month = month - 1;
      }
      else{
        date = 30;
        month = month - 1;
      }
    }
  }
  if(month < 10){
    month = '0' + String(month);
  }
  else{
    month = String(month);
  }
  if(date < 10){
    date = '0' + String(date);
  }
  else{
    date = String(date);
  }
  var day = month + date;
  
  var city = req.query.city;
  var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=7b6TymcgNgm%2FIwCtBC6t237ScezBqnDBuIWACCj%2BC3eM3Ey68V0dqPMpjaaIztbRfAhv%2Fx6ELxFgayyj35hTdQ%3D%3D&dataType=JSON&base_date=2022' + day + '&base_time=' + hour + '41';
  switch(city){
    case 'seoul': //광화문광장 기준
      url = url + "&nx=" + '60' + "&ny=" + '127';
      break;
    case 'busan': //부산대학교 기준
      url = url + "&nx=" + '98' + "&ny=" + '77';
      break;
    case 'daegu': //수성구 기준
      url = url + "&nx=" + '89' + "&ny=" + '90';
      break;
    case 'incheon': //중구 기준
      url = url + "&nx=" + '50' + "&ny=" + '124';
      break;
    case 'gwangju': //남구 기준
      url = url + "&nx=" + '59' + "&ny=" + '74';
      break;
    case 'daejeon': //중구 기준
      url = url + "&nx=" + '68' + "&ny=" + '100';
      break;
    case 'ulsan': //북구 기준
      url = url + "&nx=" + '103' + "&ny=" + '85';
      break;
  }
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': url,
    'headers': {
    }
  };
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body);
    console.log(url);
    res.send(response.body);
  });
})

app.get('/finedust', function (req, res) {
  var request = require('request');
  
  var city = req.query.city;
  var url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?pageNo=1&numOfRows=100&returnType=JSON&serviceKey=7b6TymcgNgm%2FIwCtBC6t237ScezBqnDBuIWACCj%2BC3eM3Ey68V0dqPMpjaaIztbRfAhv%2Fx6ELxFgayyj35hTdQ%3D%3D&ver=1.0&sidoName=';
  switch(city){
    case 'seoul':
      url = url + "%EC%84%9C%EC%9A%B8";
      break;
    case 'busan':
      url = url + "%EB%B6%80%EC%82%B0";
      break;
    case 'daegu':
      url = url + "%EB%8C%80%EA%B5%AC";
      break;
    case 'incheon':
      url = url + "%EC%9D%B8%EC%B2%9C";
      break;
    case 'gwangju':
      url = url + "%EA%B4%91%EC%A3%BC";
      break;
    case 'daejeon':
      url = url + "%EB%8C%80%EC%A0%84";
      break;
    case 'ulsan':
      url = url + "%EC%9A%B8%EC%82%B0";
      break;
  }
  var options = {
    'method': 'GET',
    'url': url,
    'headers': {
    }
  };
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body);
    console.log(url);
    res.send(response.body);
  });
})
app.get('/forecast', function(req,res) {
  let today = new Date();   

  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  let hours = today.getHours(); // 시각
  let minutes = today.getMinutes(); // 분
  

  var hour;
  if(minutes < 41){
    if(hours == 0){
      hours = 23;
      hour = String(hours);
    }
    else if(hours < 10){
      hours = hours - 1;
      hour = '0' + String(hours);
    }
    else{
      hours = hours - 1;
      hour = String(hours);
    }
  }
  else{
    if(hours < 10){
      hour = '0' + String(hours);
    }
    else{
      hour = String(hours);
    }
  }
  if(today.getHours() == 0 && minutes < 41){
    if(date > 1){
      date = date - 1;
    }
    else{
      if(month == 1 || month == 2 || month == 4 || month == 6 || month == 8 || month == 9 || month == 11){
        date = 31;
        month = month - 1;
      }
      else{
        date = 30;
        month = month - 1;
      }
    }
  }
  if(month < 10){
    month = '0' + String(month);
  }
  else{
    month = String(month);
  }
  if(date < 10){
    date = '0' + String(date);
  }
  else{
    date = String(date);
  }
  var day = month + date;
  
  var district = req.query.district;
  var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=7b6TymcgNgm%2FIwCtBC6t237ScezBqnDBuIWACCj%2BC3eM3Ey68V0dqPMpjaaIztbRfAhv%2Fx6ELxFgayyj35hTdQ%3D%3D&dataType=JSON&base_date=2022' + day + '&base_time=' + hour + '41';
  switch(district){
    case '중구': //중앙동 기준
      url = url + "&nx=" + '97' + "&ny=" + '74';
      break;
    case '서구': //부민동 기준
      url = url + "&nx=" + '97' + "&ny=" + '74';
      break;
    case '동구': //좌천동 기준
      url = url + "&nx=" + '98' + "&ny=" + '75';
      break;
    case '영도구': //동삼제1동 기준
      url = url + "&nx=" + '98' + "&ny=" + '73';
      break;
    case '진구': //당감제1동 기준
      url = url + "&nx=" + '97' + "&ny=" + '75';
      break;
    case '동래구': //명륜동 기준
      url = url + "&nx=" + '98' + "&ny=" + '77';
      break;
    case '남구': //우암동 기준
      url = url + "&nx=" + '98' + "&ny=" + '75';
      break;
    case '북구': //덕천동 기준
      url = url + "&nx=" + '97' + "&ny=" + '76';
      break;
    case '해운대구': //송정동 기준
      url = url + "&nx=" + '100' + "&ny=" + '76';
      break;
    case '사하구': //구평동 기준
      url = url + "&nx=" + '96' + "&ny=" + '73';
      break;
    case '금정구': //장전제1동 기준
      url = url + "&nx=" + '98' + "&ny=" + '77';
      break;
    case '강서구': //가락동 기준
      url = url + "&nx=" + '95' + "&ny=" + '76';
      break;
    case '연제구': //거제제1동 기준
      url = url + "&nx=" + '98' + "&ny=" + '76';
      break;
    case '수영구': //수영동 기준
      url = url + "&nx=" + '99' + "&ny=" + '76';
      break;
    case '사상구': //감전동 기준
      url = url + "&nx=" + '96' + "&ny=" + '75';
      break;
    case '기장군': //기장읍 기준
      url = url + "&nx=" + '100' + "&ny=" + '77';
      break;
    default:
      
  }
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': url,
    'headers': {
    }
  };
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body);
    console.log(url);
    res.send(response.body);
  });
    })


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))