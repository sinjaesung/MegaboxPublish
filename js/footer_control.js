wa1.addEventListener('click',waChange,false);
wa2.addEventListener('click',waChange,false);
wa3.addEventListener('click',waChange,false);
wa4.addEventListener('click',waChange,false);
wa5.addEventListener('click',waChange,false);
wa6.addEventListener('click',waChange,false);
wa7.addEventListener('click',waChange,false);
wa8.addEventListener('click',waChange,false);

var wa1box=document.getElementById('wa1box');
var wa2box=document.getElementById('wa2box');
var wa3box=document.getElementById('wa3box');
var wa4box=document.getElementById('wa4box');
var wa5box=document.getElementById('wa5box');
var wa6box=document.getElementById('wa6box');
var wa7box=document.getElementById('wa7box');
var wa8box=document.getElementById('wa8box');

for(var i=0; i<wa1box.children.length; i++){
    if(wa1box.children[i].tagName !== 'DIV'){
        wa1box.children[i].addEventListener('click',naChange,false);
    }
}
for(var i=0; i<wa2box.children.length; i++){
    if(wa2box.children[i].tagName !== 'DIV'){
        wa2box.children[i].addEventListener('click',naChange,false);
    }
}
for(var i=0; i<wa3box.children.length; i++){
    if(wa3box.children[i].tagName !== 'DIV'){
        wa3box.children[i].addEventListener('click',naChange,false);
    }
}
for(var i=0; i<wa4box.children.length; i++){
    if(wa4box.children[i].tagName !== 'DIV'){
        wa4box.children[i].addEventListener('click',naChange,false);
    }
}
for(var i=0; i<wa5box.children.length; i++){
    if(wa5box.children[i].tagName !== 'DIV'){
        wa5box.children[i].addEventListener('click',naChange,false);
    }
}
for(var i=0; i<wa6box.children.length; i++){
    if(wa6box.children[i].tagName !== 'DIV'){
        wa6box.children[i].addEventListener('click',naChange,false);
    }
}
for(var i=0; i<wa7box.children.length; i++){
    if(wa7box.children[i].tagName !== 'DIV'){
        wa7box.children[i].addEventListener('click',naChange,false);
    }
}
for(var i=0; i<wa8box.children.length; i++){
    if(wa8box.children[i].tagName !== 'DIV'){
        wa8box.children[i].addEventListener('click',naChange,false);
    }
}

function naChange(event){
    var target_id=event.target.id;
    console.log('target_id navwrrowww:',target_id);

    zido_box.style.backgroundImage='url("images/all/footer/'+target_id+'.png")';

    var target_parent=event.target.parentElement;

    for(var j=0; j<target_parent.children.length; j++){
        if(target_parent.children[j].id===target_id){
            target_parent.children[j].style.backgroundColor='rgba(10,106,82,1.0)';
        }else{
            target_parent.children[j].style.backgroundColor='transparent';
        }
    }
}
function waChange(event){
    var target_id=event.target.id;
    console.log('waChnagerss targetid:',target_id);
    var waboxs=document.getElementsByClassName('wabox');
    for(var j=0; j<waboxs.length; j++){
        var box_id=waboxs[j].id;
        box_id=box_id.replace('box','');
        if(target_id=== box_id){
            waboxs[j].style.display='block';
        }else{
            waboxs[j].style.display='none';
        }
    }

    zido_box.style.backgroundImage='url("images/all/footer/'+target_id+'.png")';

    var wa_btns=document.getElementsByClassName('wa_btn');

    for(var j=0; j<wa_btns.length; j++){
        if(wa_btns[j].id === target_id){
            wa_btns[j].style.backgroundColor='rgba(172,146,5,1.0)';
        }else{
            wa_btns[j].style.backgroundColor='transparent';
        }
    }
}