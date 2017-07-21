


$(document).ready(function(){
    $('.dial').knob(
        {
            'min':0,
            'max':100,
            'width':75,
            'height':75,
            'displayInput':true,
            'fgColor':"#00CED1",
            'release':function(v) {alert(v);}
        });
});