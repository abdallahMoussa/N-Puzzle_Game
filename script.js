$(function(){
    var pattern1 = [[16,2,1,15,11],[9,7,8,24,5],[22,12,18,14,19],[21,10,4,17,3],[23,20,6,13,'']],
        pattern2 = [[15,22,4,2,8],[6,7,3,9,10],[1,12,20,5,23],[11,17,14,16,18],[21,24,13,19,'']],
        pattern3 = [[14,2,3,4,15],[5,10,13,21,17],[8,11,20,22,6],[7,16,23,9,24],[18,19,12,1,'']],
        pattern4 = [[10,2,22,4,12],[8,19,1,17,7],[20,3,11,14,15],[24,16,18,13,6],[21,5,23,9,'']],
        pattern5 = [[13,7,22,4,16],[17,2,24,9,10],[5,20,1,21,6],[11,23,18,19,12],[15,3,14,8,'']];
    
    let paterns=[pattern1,pattern2,pattern3,pattern4,pattern5]

    let random =window.localStorage.getItem('index')
    if(random ==null){
   
        random=0
        window.localStorage.setItem('index',random)
    }else{
        random++;
        random %=5;
        window.localStorage.setItem('index',random)
    }
   
    var Nums = paterns[random];

    Nums.map((r,i) =>{
        $('.gameBoard').append(`<div class="row"></div>`)
        r.map((c,j)=>{  
            $($('.row')[i]).append(`<div class="cell">${c}</div>`)
           
        })  
    })
    $('.cell').last().attr('id','active')
    
    var row , col ;
    $('.cell').on("click",function(){

        row = $('#active').parent().index();
        col = $('#active').index();
        
        if( $(this).index() == col  ){ // moving vertical
                replaceActiveWith($(this).parent().index())
        }else if( $(this).parent().index() == row ){ // moving horizontal
            col > $(this).index()?
             $('#active').insertBefore(this): // go left
             $('#active').insertAfter(this) // go right
        }
        checkFinishing();
    })

    const replaceActiveWith = (target )=>{
        let cell;
        let count = Math.abs(target - row);
        let direc = target < row; // moving direction
            while(count--){
                row = $('#active').parent().index()
                
                direc ? cell = $('.cell')[5*(row-1)+col]: // go up
                 cell = $('.cell')[5*(row+1)+col]; // go down

                $('#active').clone().insertBefore(cell);
                let oldOne =$($('.row')[row]).find('#active')
                $(cell).insertBefore(oldOne);
                $(oldOne).remove()
            }
    }

    let h = $('#hours') , hours = 0;
    let s = $('#seconds') , seconds = 0 ;
    let m = $('#minutes') , minutes = 0 ;
   
    const time = ()=>{
        seconds++;
        seconds > 9 ? s.text(seconds) : s.text('0'+seconds)
        if(seconds==59){
            seconds=0;
            minutes++;
            if(minutes==60){
                minutes =0 ;
                h++
                hours > 9 ? h.text(h) : h.text('0'+h);
            }
            minutes > 9 ? m.text(minutes) : m.text('0' + minutes) 
        }
    }

    var intervalTime;
    let flag = true;
    $('#play').click(()=>{
        if(flag){
            $('#play').text('pause');
            $('.cell').css({color:'rgb(3,3,50)'})
            $('.cover').fadeOut()
            intervalTime = setInterval(time , 1000)
        }else{
            $('#play').text('start')
            $('.cell').css({color:'transparent'})
            $('.cover').fadeIn()
            clearInterval(intervalTime)
        }
        flag=!flag
        
    })
    const checkFinishing = ()=>{
        let board = Array.from($('.cell')).map(c=>$(c).text()) // get values from board
        let check = board.filter((c,i)=> c==i+1).length   // checking if the tha value in its position
        
        if(check == 24 ){
         
            $('.winning').fadeIn();
            clearInterval(intervalTime);
            $('#score').text(`${hours>9?hours:'0'+hours}:${minutes>9?minutes:'0'+minutes}:${seconds>9?seconds:'0'+seconds}`)
        }
    }

    $('.winning').find('button').click(()=>window.location.reload())
    
})