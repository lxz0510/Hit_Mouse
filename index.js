//地鼠的坐标
const ROW = 2;
const COLUMN = 3; 
var myPoint = 0

//容纳地鼠的数组
var hole = [];

var imgarr = document.getElementsByTagName("img");
var start = document.getElementById("start")
var end = document.getElementById("end")
var point = document.getElementById("point")
var time = document.getElementById("back")


//设置元素的自定义dataset属性,用来对应下下标
var index = 0 ;
for(var i = 0 ; i < ROW ; i++){
    for(var j = 0 ; j < COLUMN ; j++){ 
        imgarr[index].dataset.row = i;
        imgarr[index].dataset.col = j;
        index++;
    }
} 
//分数

//创造地鼠出现
function create(){
    const x = getNumber(0,1)
    const y = getNumber(0,2)
    //把随机出现的地鼠放入容器中
    hole.push({
        x : x,
        y : y,
    })
    //接下来就是控制老鼠的出现
    appearMouse(x,y);
    
    //老鼠出现之后会有两种情况 1.被鼠标点到 消失 2.规定的时间到了，没有敲打到 消失
    for(var a = 0 ; a < imgarr.length ; a++){
        if(imgarr[a].dataset.row == x && imgarr[a].dataset.col == y && imgarr[a].style.opacity == "1"){
                imgarr[a].onclick = function(){
                    hit(x,y)
                }
        }
    }
    setTimeout(function(){
        for(let i = 0 ; i < imgarr.length ; i++){
            if(imgarr[i].dataset.row == x && imgarr[i].dataset.col == y && imgarr[i].style.opacity == "1"){
                imgarr[i].style.opacity = "0";
            }
        }
    },2000)

}

function appearMouse(x,y){
    for(var a = 0 ; a < imgarr.length ; a++){
        if(imgarr[a].dataset.row == x && imgarr[a].dataset.col == y ){
            imgarr[a].style.opacity = "1"
            
        }
    }
}
//敲击函数\
function hit(x,y){
    let hited = false;
    for(let i = 0 ; i < hole.length ; i++){
        if(x == hole[i].x && y == hole[i].y){
            hited = true
            break
        }
    }

    if(hited){
        for(var j = 0 ; j < imgarr.length ;j++){
            if(imgarr[j].dataset.row == x && imgarr[j].dataset.col == y && imgarr[j].style.opacity == "1"){
                imgarr[j].style.opacity = "0"
                myPoint++;
                console.log(myPoint)
                point.innerHTML = "当前分数:" + myPoint;
            }
        }
    }
}



start.onclick = function(){
    var timer = 60;
    clearInterval(click)
    // window.location = "www.baidu.com"
    var click =  setInterval(() => {
        timer--;
        time.style.width = timer * 5 + "px" ;
        if(timer == 0 ){
            clearInterval(click);
        }
        create()
        create()
    }, 700); 
}
/**
 * 
 * @param {number} min -最小值
 * @param {number} max -最大值
 * @return {number} -函数返回的闭区间的随机值
 */
function getNumber(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}
