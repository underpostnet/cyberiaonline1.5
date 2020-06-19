function f(div, css){

  return parseFloat($(div).css(css).replace('px', ''));

}

function random(min, max){

  return Math.floor(Math.random() * (max - min + 1) ) + min;

}

function isJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function getID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
};

function wsLoad(){

  var time = 100;
  var log = true;
  var url = 'wss://www.cyberiaonline.com/cyon';
  var sucess = false;

  socket = new WebSocket(url);

  setInterval(function(){

    if(!sucess){

      if(socket.readyState==0){
        //WebSocket.CONNECTING
        if(log){console.log('ws server connecting -> state:0');}

      }

      if(socket.readyState==1){
        //WebSocket.OPEN
        sucess = true;
        if(log){console.log('ws server on -> state:1');}

      }

      if(socket.readyState==2){
        //WebSocket.CLOSING
        if(log){console.log('ws server closing -> state:2');}

      }

      if(socket.readyState==3){
        //WebSocket.CLOSED
        if(log){console.log('ws server closed -> state:3');}

        setTimeout(function(e){

          location.reload();

        }, 5000);

      }

    }

  }, time);

}

function isMobile(){
  return (
    (navigator.userAgent.match(/Android/i)) ||
    (navigator.userAgent.match(/webOS/i)) ||
    (navigator.userAgent.match(/iPhone/i)) ||
    (navigator.userAgent.match(/iPod/i)) ||
    (navigator.userAgent.match(/iPad/i)) ||
    (navigator.userAgent.match(/Opera Mini/i)) ||
    (navigator.userAgent.match(/IEMobile/i)) ||
    (navigator.userAgent.match(/BlackBerry/i))

  );
}

function joyLoad(){

  var sizeJoy = 160;

  $('#joy').css('position', 'absolute');
  $('#joy').css('width', (sizeJoy+'px'));
  $('#joy').css('height', (sizeJoy+'px'));
  $('#joy').css('transform', 'translate(-50%, -50%)');
  $('#joy').css('left', '50%');
  $('#joy').css('top', '50%');

  var radio = 50;

  var joyStage = new Konva.Stage({

    container: 'joy',
    width: sizeJoy,
    height: sizeJoy

  });

  var joyLayer = new Konva.Layer();

  var joyCircleContent = new Konva.Circle({
    x: joyStage.width() / 2,
    y: joyStage.height() / 2,
    radius: radio,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4
  });

  var joyCircle = new Konva.Circle({
    x: joyStage.width() / 2,
    y: joyStage.height() / 2,
    radius: 20,
    fill: 'blue',
    stroke: 'black',
    strokeWidth: 4,
    draggable: true,
    dragBoundFunc: function(pos) {

      var ystate = pos.y-(sizeJoy/2);
      var xstate = pos.x-(sizeJoy/2);

      //console.log('y: '+ystate);
      //console.log('x: '+xstate);

      dragJoy = true;

      var orizontal = xstate;
      var vertical = ystate;

      var directionHorizontalLimitPos = sizeJoy / 10;
      var directionHorizontalLimitNeg = directionHorizontalLimitPos * -1;
      var directionVerticalLimitPos = sizeJoy / 10;
      var directionVerticalLimitNeg = directionVerticalLimitPos * -1;


      if(vertical >= directionVerticalLimitNeg && vertical <= directionVerticalLimitPos)
      {
        dragJoyDir = 'C';
      }
      if(vertical < directionVerticalLimitNeg)
      {
        dragJoyDir = 'N';
      }
      if(vertical > directionVerticalLimitPos)
      {
        dragJoyDir = 'S';
      }

      if(orizontal < directionHorizontalLimitNeg)
      {
        if(dragJoyDir === 'C')
        {
          dragJoyDir = 'W';
        }
        else
        {
          dragJoyDir += 'W';
        }
      }
      if(orizontal > directionHorizontalLimitPos)
      {
        if(dragJoyDir === 'C')
        {
          dragJoyDir = 'E';
        }
        else
        {
          dragJoyDir += 'E';
        }
      }

      console.log(dragJoyDir);

      var x = joyStage.width() / 2;
      var y = joyStage.height() / 2;
      var radius = radio;
      var scale =
      radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
      if (scale < 1)
      return {
        y: Math.round((pos.y - y) * scale + y),
        x: Math.round((pos.x - x) * scale + x)
      };
      else return pos;
    }
  });

  joyCircle.on('dragend', function() {

    joyCircle.x((joyStage.width() / 2));
    joyCircle.y((joyStage.height() / 2));
    joyLayer.draw();
    dragJoy = false;
    console.log('drag end');
    stopSprite(0);
    sendws(0, 'stopmov');

  });

  joyLayer.add(joyCircleContent);

  joyLayer.add(joyCircle);

  joyStage.add(joyLayer);

}

function mapLoad(){

  $('.map').css('background', 'rgb(0, 48, 16)');
  $('.map').css('width', (fdim+'00%'));
  $('.map').css('height', (fdim+'00%'));
  $('.map').css('position', 'absolute');

  var mapColor = ['rgb(172, 39, 171)', 'rgb(38, 219, 237)', 'rgb(93, 233, 107)'];

  var xs = 0;
  var ys = 0;

  for(var y=0;y<(dim*fdim);y++){

    for(var x=0;x<(dim*fdim);x++){

      var style='background: '+mapColor[random(0, 2)]+';position: absolute; width: '+(100/(dim*fdim))+'%; height: '+(100/(dim*fdim))+'%; top: '+ys+'%; left: '+xs+'%';
      $('.map').append('<div style="'+style+'" class="node'+(x+1)+'-'+(y+1)+'"></div>');

      xs = xs + (100/(dim*fdim));

    }

    xs = 0;
    ys = ys + (100/(dim*fdim));

  }

  $('.centerPlayer').css('background', 'none');
  $('.centerPlayer').css('width', ((100/(dim))+'%'));
  $('.centerPlayer').css('height', ((100/(dim))+'%'));
  $('.centerPlayer').css('position', 'absolute');
  $('.centerPlayer').css('transform', 'translate(-50%, -50%)');
  $('.centerPlayer').css('left', '50%');
  $('.centerPlayer').css('top', '50%');

}

function fullChangeSprite(ind){

  $('.'+users[ind].id+'-02').css('display', 'none');
  $('.'+users[ind].id+'-04').css('display', 'none');
  $('.'+users[ind].id+'-06').css('display', 'none');
  $('.'+users[ind].id+'-08').css('display', 'none');

  $('.'+users[ind].id+'-12').css('display', 'none');
  $('.'+users[ind].id+'-14').css('display', 'none');
  $('.'+users[ind].id+'-16').css('display', 'none');
  $('.'+users[ind].id+'-18').css('display', 'none');

  $('.'+users[ind].id+'-'+users[ind].sprite).css('display', 'inline');

}

function changeSprite(ind, sprite){

  $('.'+users[ind].id+'-'+users[ind].sprite).css('display', 'none');
  users[ind].sprite = sprite;
  $('.'+users[ind].id+'-'+users[ind].sprite).css('display', 'inline');

}

function mov(x, y, sprite){

  $('.map').css('left', (((100*((x*-1)+     (((dim-1)/2)+1)        ))/(dim))+'%'));
  $('.map').css('top', (((100*((y*-1)+     (((dim-1)/2)+1)        ))/(dim))+'%'));

  changeSprite(0, sprite);

}

function keyLoad(){

  window.addEventListener('keydown',function(e){
    keyState[e.keyCode] = true;
    key = e.keyCode;
    console.log(e.keyCode);
  },true);
  window.addEventListener('keyup',function(e){
    keyState[e.keyCode] = false;
    stopSprite(0);
    sendws(0, 'stopmov');
    console.log('key end')
  },true);

}

function stopSprite(ind){

  if(users[ind].sprite=='12'){

    changeSprite(ind, '02');

  }

  if(users[ind].sprite=='14'){

    changeSprite(ind, '04');

  }

  if(users[ind].sprite=='16'){

    changeSprite(ind, '06');

  }

  if(users[ind].sprite=='18'){

    changeSprite(ind, '08');

  }

}

function sendws(ind, state){

  users[ind].state = state;
  socket.send(JSON.stringify(users[ind]));

}

function limitMov(ind){

  if(users[ind].xpos<1){

    users[ind].xpos=1;

  }

  if(users[ind].xpos>(dim*fdim)){

    users[ind].xpos=(dim*fdim);

  }

  if(users[ind].ypos<1){

    users[ind].ypos=1;

  }

  if(users[ind].ypos>(dim*fdim)){

    users[ind].ypos=(dim*fdim);

  }

}

function loadUser(ind){

  //(100/(dim*fdim))

  var xs = (100/(dim*fdim))*(users[ind].xpos-1);
  var ys = (100/(dim*fdim))*(users[ind].ypos-1);

  var style='position: absolute; width: '+(100/(dim*fdim))+'%; height: '+(100/(dim*fdim))+'%; background: black; color: white; left: '+xs+'%; top: '+ys+'%;';

  $('.map').append('<div style="'+style+'" class="user'+users[ind].id+'"></div>');

  var styleImg='width: 100%; height: 100%; display: none;';

  $('.user'+users[ind].id).append('<img style="'+styleImg+'" class="'+users[ind].id+'-02"  src="assets/clases/'+users[ind].clase+'/02.gif">');
  $('.user'+users[ind].id).append('<img style="'+styleImg+'" class="'+users[ind].id+'-04"  src="assets/clases/'+users[ind].clase+'/04.gif">');
  $('.user'+users[ind].id).append('<img style="'+styleImg+'" class="'+users[ind].id+'-06"  src="assets/clases/'+users[ind].clase+'/06.gif">');
  $('.user'+users[ind].id).append('<img style="'+styleImg+'" class="'+users[ind].id+'-08"  src="assets/clases/'+users[ind].clase+'/08.gif">');
  $('.user'+users[ind].id).append('<img style="'+styleImg+'" class="'+users[ind].id+'-12"  src="assets/clases/'+users[ind].clase+'/12.gif">');
  $('.user'+users[ind].id).append('<img style="'+styleImg+'" class="'+users[ind].id+'-14"  src="assets/clases/'+users[ind].clase+'/14.gif">');
  $('.user'+users[ind].id).append('<img style="'+styleImg+'" class="'+users[ind].id+'-16"  src="assets/clases/'+users[ind].clase+'/16.gif">');
  $('.user'+users[ind].id).append('<img style="'+styleImg+'" class="'+users[ind].id+'-18"  src="assets/clases/'+users[ind].clase+'/18.gif">');

  $('.'+users[ind].id+'-'+users[ind].sprite).css('display', 'inline');

}

function movUser(ind){

  var xs = (100/(dim*fdim))*(users[ind].xpos-1);
  var ys = (100/(dim*fdim))*(users[ind].ypos-1);

  $('.user'+users[ind].id).css('left', (xs+'%'));
  $('.user'+users[ind].id).css('top', (ys+'%'));

}

function loadMainUser(ind){

  var styleImg='width: 100%; height: 100%; display: none;';

  $('.centerPlayer').append('<img style="'+styleImg+'" class="'+users[ind].id+'-02"  src="assets/clases/'+users[ind].clase+'/02.gif">');
  $('.centerPlayer').append('<img style="'+styleImg+'" class="'+users[ind].id+'-04"  src="assets/clases/'+users[ind].clase+'/04.gif">');
  $('.centerPlayer').append('<img style="'+styleImg+'" class="'+users[ind].id+'-06"  src="assets/clases/'+users[ind].clase+'/06.gif">');
  $('.centerPlayer').append('<img style="'+styleImg+'" class="'+users[ind].id+'-08"  src="assets/clases/'+users[ind].clase+'/08.gif">');
  $('.centerPlayer').append('<img style="'+styleImg+'" class="'+users[ind].id+'-12"  src="assets/clases/'+users[ind].clase+'/12.gif">');
  $('.centerPlayer').append('<img style="'+styleImg+'" class="'+users[ind].id+'-14"  src="assets/clases/'+users[ind].clase+'/14.gif">');
  $('.centerPlayer').append('<img style="'+styleImg+'" class="'+users[ind].id+'-16"  src="assets/clases/'+users[ind].clase+'/16.gif">');
  $('.centerPlayer').append('<img style="'+styleImg+'" class="'+users[ind].id+'-18"  src="assets/clases/'+users[ind].clase+'/18.gif">');

  $('.'+users[ind].sprite).css('display', 'inline');
  $('.centerPlayer').css('display', 'block');

}

//variables globales

var users = new Array();

var socket;

var platform = null;

var keyState = {};

var dragJoy = false;
var dragJoyDir = '';

var dim = 19;
var fdim = 1;

//Protect Functions

//document.oncontextmenu = function(){ return false; }

document.ondragstart = function(){ return false; }

document.onselectstart = function(){ return false; }
