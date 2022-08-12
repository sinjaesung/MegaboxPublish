//t&m header 및 tmheader 네비게이션 관련 제어 스크립트
//1.관련 애니메이션 큐 전용 변수 및 함수들..
var tmheader_isWait=false;/*tmdetailwrap요소의 무브 관련 애니메이션 대기여부 변수*/
var tmheader_moveTask=[];//해더의 애니메이션 관련된 저장큐 배열
var tmheader_moveAni;//해더디테일 네비의 애니메이션 아이디 저장 전역변수


function tmheader_waiting_func(){ //tmheader네비 관련 대기여부 관련 함수
     //console.log('=======대기여부 웨이팅함수실행(자체 전역실행)=============');

     if(tmheader_moveTask.length>0){
          tmheader_isWait=true;
          //console.log('현재 대기함수가 하나이상 존재한다 대기하라!',isWait);
     }else{
          tmheader_isWait=false;
          //아무런 task가 없는 배열상태이기에...실행해도좋다.
          //console.log('현재 대기함수가 없기에 바로실행가능',isWait);
     }
     window.setTimeout(tmheader_waiting_func,1);//0.002초뒤 다시 본인 재귀호출
}

tmheader_waiting_func();

//2.타깃 tmheader navigation 뷰 요소의 최소 가능 marginLeft값 정의(문서로드시,리사이즈이벤트시)
var tmheader_least_marginLeft=null;
function initial_tmheader_mLeft(){

	console.log('문서로드시 최소 가능 헤더 네비 marginLeft값 설정');
	//문서로드시 당시의 환경상에서 tmheader_navi width값(100%위드값 매번 유동) 그리고 view_wrap 고정px값을 구한다. view_wrap이 항상 보통은 header_menu최대값 1920 pc기준값보다는 크기에.. header_menuwidth - view_Wrapwidth 할시에 view_wrap의 최소 가능한 marginLeft값을 구할수 있다. 그 이하로는 값을 제한한다.

	var tmheader_detailWidth=parseInt(window.getComputedStyle(tmheader_detail,null)['width']);//유동적인 width:100%값..tmheader_detail의 유동폭값을 구한다.
	var tmdetail_wrapWidth=parseInt(window.getComputedStyle(tmdetail_wrap,null)['width']);//2100px이상의 고정값 tmdetail_wrap 폭을 구한다.
	tmheader_least_marginLeft= tmheader_detailWidth - tmdetail_wrapWidth; //최소의 가능 left값을 정해놓는다.

	console.log('문서로드 당시의 최소가능 margin_left값:',tmheader_least_marginLeft);
}
initial_tmheader_mLeft();
window.addEventListener('resize',decide_tmheader_mLeft,false);

function decide_tmheader_mLeft(event){
	console.log('=======윈도우 브라우저창 스크린 resize변경 이벤트 발생=========');

	//리사이즈 당시때의 헤더메뉴의 width:100%폭값과 고정된 view_wrap의 값을 매번 갱신하여 최저가능 left값 구한다.
	var tmheader_detailWidth=parseInt(window.getComputedStyle(tmheader_detail,null)['width']);//유동적인 width:100%값..tmheader_detail의 유동폭값을 구한다.
	var tmdetail_wrapWidth=parseInt(window.getComputedStyle(tmdetail_wrap,null)['width']);//2100px이상의 고정값 tmdetail_wrap 폭을 구한다.
	tmheader_least_marginLeft= tmheader_detailWidth - tmdetail_wrapWidth; //최소의 가능 left값을 정해놓는다.

	console.log('문서로드 당시의 최소가능 margin_left값:',tmheader_least_marginLeft);
}

//3.마우스 클릭 관련 이벤트 좌측 누를시에 컨테이너요소를 -308px목표량 이동한다. 각 0.001초당(회당) 4px씩 77회(0.077초 지속시간) 호출된다.

tmh_left_btn.addEventListener('click',tmheader_leftmove,false);
tmh_right_btn.addEventListener('click',tmheader_rightmove,false);

var tmheader_movecount=0;//77회 호출은 둘다 고정이다.

function tmheader_leftmove(event){
	if(tmheader_isWait === false){
		//document.body.style.backgroundColor='transparent';
		tmheader_moveAni = window.setInterval(tmheader_move,1,'left');
		tmheader_moveTask.push(tmheader_moveAni);
	}else{
		//document.body.style.backgroundColor='#fe1020';
		console.log('setInterval 호출불가(실행중 애니존재)');
		return;//아무것도 하지 않는다.
	}

}
function tmheader_rightmove(event){
	if(tmheader_isWait === false){
		//document.body.style.backgroundColor='transparent';
		tmheader_moveAni = window.setInterval(tmheader_move,1,'right');
		tmheader_moveTask.push(tmheader_moveAni);
	}else{
		//document.body.style.backgroundColor='#fe1020';
		console.log('setInterval 호출불가(실행중 애니존재)');
		return;//setInterval 처리는 하지 않는다.
	}
}

function tmheader_move(direction){
	if(direction === 'left'){
		var original_left=parseInt(window.getComputedStyle(tmdetail_wrap,null)['marginLeft']);
		console.log('기존 marginLeft값:',original_left);
		var changed_left=original_left - 4;//각 회당 4px씩 좌측이동한다.
		changed_left = Math.max(tmheader_least_marginLeft,changed_left);//해당 최소값 이상의 값은 허용하며, 그 이하의 값은 허용하지 않는다.
		console.log('갱신 marginLeft값:',changed_left);

		tmdetail_wrap.style.marginLeft= changed_left + 'px';
	}else if(direction === 'right'){
		var original_left=parseInt(window.getComputedStyle(tmdetail_wrap,null)['marginLeft']);
		console.log('기존 marginLeft값:',original_left);
		var changed_left=original_left + 4;//각 회당 4px씩 우측이동하낟.
		changed_left = Math.min(0,changed_left);//0이상의 값은 허용하지 않고 그 이하는 허용한다. 그 이상으로 되는 경우 계속 0으로 제한한다.

		console.log('갱신 marginLeft값:',changed_left);

		tmdetail_wrap.style.marginLeft= changed_left + 'px';
	}
	tmheader_movecount++;
	console.log('tmheader_movecount값:',tmheader_movecount);
	if(tmheader_movecount === 77){

		tmheader_movecount=0;
		window.clearInterval(tmheader_moveAni);//애니메이션 중지한다.
		tmheader_moveTask.pop();//큐배열을 비운다.
	}
}

// ** tmheader_detail자체를 슬라이딩하는 제어 부분 제이쿼리로 제어
tm_menubar.addEventListener('click',tm_menudetail_Open,false);
tmheader_detailClose.addEventListener('click',tm_menudetail_Close,false);

//메뉴가 열릴때 기존 none->block,html기존visible->hidden의 처리를 우선 실행후(즉시실행) 애니메이팅한다. 제이쿼리로 한다.
function tm_menudetail_Open(event){
     $('#tmheader_detail').css({display:'block'});
     $('html').css({'overflow':'hidden'});
     $('#left_view').animate({
          left:0
     },{
          duration:100,//288거리를 100밀리초에 이동. 1밀리초당 2.88PX 속력 -288~0
          queue:false
     });
     $('#right_view').animate({
          right:0//-5544px ->>0 5544거리를 400밀리초에 이동..1밀리초당 14.xx px속력으로 더 빠름.
     },{
          duration:400,
          queue:false//간섭받지 않는 기존 대기열에 간섭받지 않고 실행
     });
}
//메뉴가 닫힐때는 기존 block->none, html기존 hidden->visible로 처리하는데 이 처리를 애니메이션을 마무리 짓고 해야만한다.
function tm_menudetail_Close(event){
     $('#left_view').animate({
          left:'-288px'
     },{
          duration:100,
          queue:false
     });
     $('#right_view').animate({
          right:'-5544px'//0~-5544로 다시 사라지게 처리
     },{
          duration:400,
          queue:false,
          complete:function(){
               //더 늦게 끝나는 right_view애니메이션이 끝났을때가 곧 모든 애니메이션이 끝난시점이고 이 시점에 콜백을 실행한다.
               $('#tmheader_detail').css({display:'none'});
               $('html').css({'overflow':'visible'});
               //애니 끝난시점에 html브라우저 스크롤바 복원하고,전체요소인 tmheader_detail은 다시 -100%위치 none으로 사라지게한다.
          }
     });
}
