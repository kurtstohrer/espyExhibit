"use strict";

var app = app || {};

app.keydown = [];



app.main = {
    //variables
    WIDTH: undefined,
    HEIGHT: undefined,

    canvas: undefined,
    ctx: undefined,
    exhibits: [],
    

    centralColEx:undefined,
    fhColEx:undefined,
    sciColEx: undefined,
    techColEx :undefined,

    tags: [],
    centerTags:[],
    tagCols: [],

    zones: [],

    matrix: [],
    mat2: [],
   
    textCol: {
        white: "#fff",
        light: "#DBE1E8",
        mid: "#9ea7b3",
        dark: "#5e6d81",
    },
    colors: {
        teal: "#3db4c8",
        gold: "#FFD464",
        alert: "#DE5B5B",
    },
    wholeMapLocations: [],

  
    currentCollider: [],
    dragging:undefined,
    taps: [],
    ltxs:[],
    ltys:[],
    tagImgs:[],
    zoneImgs: [],
    queued: [],
    tagimgSize:12,
    tagtextSize:12 ,
    bgZones:[],
    bgZoneImgs:[],
    row1:[],
    row2:[],
    row3:[],
    row4:[],
    row5:[],
    

    zoneColliders: undefined,

    curTag:[],
   
    init: function () {

        var t = this;
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        t.WIDTH = 1920;
        t.HEIGHT = 1080;
        t.canvas.width = t.WIDTH;
        t.canvas.height = t.HEIGHT;
        
       
        this.tapTimer = 30;
        this.taps = [{ x: 0, y: 0, }, { x: 100, y: 100, }];
       
        this.matrix = [1, 0, 0, 1, 0, 0];
        this.loadImages();
     
       




        this.initMap();
        t.initZones();
        this.initTags();

        for(var k = 0; k < this.tags.length; k++){
            var ta = this.tags[k];
            //this.tagImgs.push(new Image());
            var strlength = ta.name.length;
            var newWidth = (t.tagimgSize*4) + (strlength * t.tagtextSize/1.5);
            var newHeight = (t.tagimgSize*2);
           
            this.centerTags.push({x:ta.x, y:ta.y,name:ta.name, img:ta.img, w:newWidth, h: newHeight, selected:ta.selected});
        }   
        for(var i =0; i < t.zones.length; i++){
            t.zoneImgs.push(new Image());
            var zo = t.zones[i];
            t.bgZones.push({x:zo.x,y:zo.y,w:zo.w,img:zo.img,h:zo.h,state:zo.state});
            t.bgZoneImgs.push(new Image());
        }
        this.updateCenterTags();
        this.update();
       

        console.log("main.js init");
    },
   
    
    
    initMap: function () {
        
    },
    
   


    draw: function () {
       var t = this;
       var w = t.WIDTH;
       var h = t.HEIGHT;
       t.drawImage(t.mapImage,0,0,w,h);
       for(var d= 0; d < t.bgZones.length; d++){
            this.drawZone(t.bgZones[d],d,t.bgZoneImgs);
       }

       for(var i = 0; i < t.zones.length; i++){
            
            this.drawZone(t.zones[i],i,t.zoneImgs);
            
       }

       for(var k = 0; k < this.tags.length; k++){
                //var ta = this.tagCols[k];
                //this.drawTag(ta,k);

            }
        //this.drawCircle(this.techColEx.cx,this.techColEx.cy,this.techColEx.r,'black',.8);

    },
    update: function () {
        var t = this;
        requestAnimationFrame(this.update.bind(this));
        t.updateSelectedTag();
        t.draw();

    },
   
   
   

  
    checkCol: function (a, b) {
        var circle1 = { r: a.r, x: a.x, y: a.y };
        var circle2 = { r: b.r, x: b.x, y: b.y };
        var dx = (circle1.x) - (circle2.x);
        var dy = (circle1.y) - (circle2.y);
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < circle1.r + circle2.r) { return true; }
        else { return false; }
    },
   
    
    
    isPointinRect: function (pointX, pointY, rect) {
        return (rect.x <= pointX) && (rect.x + rect.w >= pointX) &&
                (rect.y <= pointY) && (rect.y + rect.h >= pointY);
    },
    isPointinCircle: function (x, y, c) {
        var dx = x - c.cx;
        var dy = y - c.cy;
        var distsq = dx * dx + dy * dy;
        var rsq = c.r * c.r;
        var dist = Math.floor(distsq);

        if (distsq < rsq) {
            return dist;

        }
        else {
            return false;
        }

    },
    getDistanceXY: function( point1, point2 ){
      var xs = 0;
      var ys = 0;
     
      xs = point2.x - point1.x;
      xs = xs * xs;
     
      ys = point2.y - point1.y;
      ys = ys * ys;
     
      return Math.sqrt( xs + ys );
    },
   
   
   
    
    
    
    updateSelectedTag: function(){
        for(var i = 0; i < this.tagCols.length; i ++){
            var ta = this.tagCols[i];
            if(ta.name == this.curTag[0]){
                ta.selected = true;
            }
            else{
                ta.selected = false;
            }
            if(this.dragging == false){
                ta.selected = false;
            }
            if(ta.selected == false){
                ta.x = ta.ox;
                ta.y = ta.oy;
              // console.log(ta.ox);

            }
        }
    },
    //run this function every time a tag is removed or pushed from centerTags
    updateCenterTags: function (){
        t.row1 = [];
        t.row2 = [];
        t.row3 = [];
        t.row4 = [];
        t.row5 = [];
        console.log(t.centerTags);
        t.centerTags.sort(function(a, b){
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });

        var ctLength = t.centerTags.length;
        var maxItemsinRow = Math.ceil(ctlength/5);
        for(var i = 0; i < t.centerTags.length; i++){
            var n = i+1;
            if(n < maxItemsinRow){
                t.row1.push(t.centerTags[i]);
            }
            if(n >= maxItemsinRow && < (maxItemsinRow *2)){
                t.row2.push(t.centerTags[i]);
            }
            if(n >= (maxItemsinRow *2) && < (maxItemsinRow *3)){
                t.row3.push(t.centerTags[i]);
            }
             if(n >= (maxItemsinRow *3) && < (maxItemsinRow *4)){
                t.row4.push(t.centerTags[i]);
            }
             if(n >= (maxItemsinRow *4) ){
                t.row5.push(t.centerTags[i]);
            }
        }
        console.log(t.row1);
        console.log(t.row2);
        console.log(t.row5);

    },


/*      

       

        //sort drawnTags by .name

            maxItemsinRow = math.ceil drawTags.length / 5;
           
        //get all tags for every maxItemsinRow drawnTags push into row arrays(5)
                            if(i+1 => maxItemsinRow){
                                row1.push
                            }
                            if(i+1 == maxItemsinRow * 3){
                                row2.push
                            }
                           ...............



        //function get row width (){get width of each row (each tag.w + 20)
        
        for each row run a loop
            row[i][0].x = 1920/2 - row[i].width/2;
            row[i][0].y = hardcoded num; for(var i = 1; i < drawnTags.length; i++){
                var ct = drawnTags[i];
                var pt = drawnTags[i-1];

                ct.x = pt.x + pt.w + 20;

        }

        for(var i = 1; i < row1.length; i++){
                var ct = row1[i];
                var pt = row[i-1];

                ct.x = pt.x + pt.w + 20;
                ct.y = pt.y;

        }


*/

    //events

    //DRAW FUNCTIONS

    loadImages: function () {

        this.mapImage = new Image();
        this.mapImage.src = "img/map.jpg";
        
    },
   
    
    
    
    drawTag: function(tag,i){
        var t = this;
        var size = tag.name.length;
        var ts = t.tagtextSize;
        var imgs = t.tagimgSize;
        t.tagImgs[i].src = 'img/Icons/' + tag.img;

        if(tag.selected == false){
            t.drawOutRect(tag.x,tag.y,tag.w,tag.h,'white',t.textCol.dark);
            t.drawImage(t.tagImgs[i],tag.x + imgs/2,tag.y + imgs/2,imgs,imgs);
            t.drawText(tag.name,tag.x +tag.w/2, tag.y + tag.h/1.5,ts,t.textCol.mid,tag.w);
            t.drawText("+",tag.x +tag.w - imgs, tag.y + tag.h/1.5,ts,t.colors.teal,imgs);
        }
        if(tag.selected == true){
            t.drawOutRect(tag.x,tag.y,tag.w,tag.h,t.colors.teal,t.textCol.dark);
            t.drawImage(t.tagImgs[i],tag.x + imgs/2,tag.y + imgs/2,imgs,imgs);
            t.drawText(tag.name,tag.x +tag.w/2, tag.y + tag.h/1.5,ts,'white',tag.w);
            t.drawText("+",tag.x +tag.w - imgs, tag.y + tag.h/1.5,ts,'white',imgs);
        }
    },
    drawZone: function(zone,i,imgArray){
        var t = this;
        var imgpath;
        switch(zone.state){
            case 'default':
                imgpath = 'img/zones/default/';
                break;
            case 'selected':
                imgpath = 'img/zones/selected/';
                break;
            case 'grey':
                imgpath = 'img/zones/grey/';
                break;
            case 'heatmap1':
                imgpath = 'img/zones/heatmap/one/';
                break;
            case 'heatmap2':
                imgpath = 'img/zones/heatmap/two/';
                break;
             case 'heatmap3':
                imgpath = 'img/zones/heatmap/three/';
                break;
             case 'heatmap4':
                imgpath = 'img/zones/heatmap/four/';
                break;
        }
       imgArray[i].src = imgpath + zone.img +'.png';
        t.drawImage(imgArray[i],zone.x,zone.y,zone.w,zone.h);
    },
    drawText: function (string, x, y, size, col, maxWidth) {
        this.ctx.save();
        this.ctx.font = size + 'px Lato';
        this.ctx.fillStyle = col;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(string, x, y, maxWidth);
        this.ctx.restore();
    },
    drawCircle: function (centerX, centerY, radius, col, alph) {

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.globalAlpha = alph;
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = col;
        this.ctx.fill();
        this.ctx.restore();
    },
    drawRect: function (x, y, w, h, col, alph) {
        this.ctx.save();
        this.ctx.globalAlpha = alph;
        this.ctx.fillStyle = col;
        this.ctx.fillRect(x, y, w, h);
        this.ctx.restore();
    },
    drawOutRect : function( x, y, w, h, col, out)
    {
        this.ctx.save();
        this.ctx.fillStyle = col;
        this.ctx.strokeStyle = out;
        this.ctx.lineWidth = 1;
        this.ctx.fillRect(x,y,w,h);
        this.ctx.strokeRect(x,y,w,h);
        this.ctx.restore();
    },
    drawImage: function (image, x, y, w, h) {

        this.ctx.save();
        this.ctx.drawImage(image, x, y, w, h);
        this.ctx.restore();
    },
    clearCanvas: function () {
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    },
    initTags: function (){

        var t = this;
        t.tags = [
            {
                name: "ART",
                x:undefined,
                y:undefined,
                img:"art.png",
                selected:false,
               

            },
            {
                name: "BUSINESS",
                x:undefined,
                y:undefined,
                img:"business.png",
                selected:false,
               

            },
            {
                name: "COMMUNICATION",
                x:undefined,
                y:undefined,
                img:"communication.png",
                selected:false,
               

            },
            {
                name: "COMMUNITY",
                x:undefined,
                y:undefined,
                img:"community.png",
                selected:false,
               
            },
            {
                name: "DANCE",
                x:undefined,
                y:undefined,
                img:"dance.png",
                selected:false,
               

            },
            {
                name: "DESIGN",
                x:undefined,
                y:undefined,
                img:"design.png",
                selected:false,
               

            },
            {
                name: "ENERGY",
                x:undefined,
                y:undefined,
                img:"energy.png",
                selected:false,
               

            },
            {
                name: "ENGINEERING",
                x:undefined,
                y:undefined,
                img:"engineering.png",
                selected:false,
                

            },
            {
                name: "ENVIRONMENT",
                x:undefined,
                y:undefined,
                img:"environment.png",
                selected:false,
               

            },
            {
                name: "GAMING",
                x:undefined,
                y:undefined,
                img:"gaming.png",
                selected:false,
               

            },
            {
                name: "GLOBAL",
                x:undefined,
                y:undefined,
                img:"global.png",
                selected:false,
               

            },
            {
                name: "HEALTH",
                x:undefined,
                y:undefined,
                img:"health.png",
                selected:false,
                

            },
            {
                name: "MUSIC",
                x:undefined,
                y:undefined,
                img:"music.png",
                selected:false,
               

            },
            {
                name: "SENIOR PROJECTS",
                x:undefined,
                y:undefined,
                img:"senior-projects.png",
                selected:false,
               

            },
            {
                name: "SCIENCE",
                x:undefined,
                y:undefined,
                img:"science.png",
                selected:false,
               
            },
            {
                name: "SOFTWARE",
                x:undefined,
                y:undefined,
                img:"software.png",
                selected:false,
                

            },
            {
                name: "STUDENT ORGANIZATIONS",
                x:undefined,
                y:undefined,
                img:"student-organizations.png",
                selected:false,
                

            },
            {
                name: "SUSTAINABILITY",
                x:undefined,
                y:undefined,
                img:"sustainability.png",
                selected:false,
               

            },
            {
                name: "TECHNOLOGY",
                x:undefined,
                y:undefined,
                img:"technology.png",
                selected:false,
               

            },
            {
                name: "PHOTOGRAPHY",
                x:undefined,
                y:undefined,
                img:"photography.png",
                selected:false,
               

            },
            {
                name: "MATH",
                x:undefined,
                y:undefined,
                img:"math.png",
                selected:false,
               

            },
            {
                name: "SPORTS",
                x:undefined,
                y:undefined,
                img:"sports.png",
                selected:false,
               

            },
            {
                name: "MULTIDISCIPLINARY",
                x:undefined,
                y:undefined,
                img:"multidisciplinary.png",
                selected:false,
                

            },
            {
                name: "STEM",
                x:undefined,
                y:undefined,
                img:"stem.png",
                selected:false,
               

            },
            {
                name: "ENTREPRENEURSHIP",
                x:undefined,
                y:undefined,
                img:"entrepreneurship.png",
                selected:false,
               

            },


        ];
    },
    initZones: function(){
        //states for zones
            //default,selected,heatmap1,heatmap2,heatmap3,heatmap4,grey
       this.zones = [ 
       {
            name:"Green Place",
            x: 324,
            y: 284,
            img: 'green-place',
            state: 'default',
            w: 261,
            h: 198,
            cx:453,
            cy:377,
            r:144,

        },
        {
            name:"Aritistic Alley",
            x: 876,
            y: 310,
            img: 'booth',
            state: 'default',
            w: 240,
            h: 135,
            cx:995,
            cy:367,
            r:127,

        },
        {
            name:"RIT Central",
            x: 1074,
            y: 292,
            img: 'eastman',
            state: 'default',
            w: 292,
            h: 509,
            cx:1232,
            cy:438,
            r:180,

        },
        {
            name:"Field House",
            x: 1352,
            y: 299,
            img: 'field-house',
            state: 'default',
            w: 387,
            h: 190,
             cx:1451,
            cy:402,
            r:134,

        },
         {
            name:"Engineering Park",
            x: 710,
            y: 324,
            img: 'eng',
            state: 'default',
            w: 208,
            h: 207,
            cx:815,
            cy:456,
            r:129,

        },
        {
            name:"Global Village",
            x: 504,
            y: 555,
            img: 'gv',
            state: 'default',
            w: 194,
            h: 239,
            cx:589,
            cy:675,
            r:142,

        },
        {
            name:"Computer Zone",
            x: 537,
            y: 396,
            img: 'gol',
            state: 'default',
            w: 168,
            h: 190,
            cx:640,
            cy:490,
            r:103,

        },
         {
            name:"Think Tank",
            x: 919,
            y: 441,
            img: 'think',
            state: 'default',
            w: 147,
            h: 90,
            cx:987,
            cy:475,
            r:82,

        },
         {
            name:"Business District",
            x: 887,
            y: 636,
            img: 'low',
            state: 'default',
            w: 123,
            h: 96,
            cx:945,
            cy:685,
            r:72,

        },
        {
            name:"Innovation Center",
            x: 604,
            y: 564,
            img: 'mag',
            state: 'default',
            w: 99,
            h: 104,
            cx:650,
            cy:616,
            r:58,

        },
         {
            name:"Science Center",
            x: 713,
            y: 497,
            img: 'sci',
            state: 'default',
            w: 274,
            h: 198,
            cx:924,
            cy:576,
            r:83,

        },
         {
            name:"Technology Quarter",
            x: 587,
            y: 232,
            img: 'sus',
            state: 'default',
            w: 270,
            h: 171,
            cx:785,
            cy:305,
            r:85,

        },
         {
            name:"Information Station",
            x: 995,
            y: 498,
            img: 'wal',
            state: 'default',
            w: 130,
            h: 115,
            cx:1057,
            cy:547,
            r:81,

        },



        ];

        this.fhColEx = {
            name:"Field House",
            cx: 1620,
            cy: 404,
            r: 134,
        }
        this.centralColEx = {
            name:"RIT Central",
            cx: 1227,
            cy: 700,
            r: 108,
        }
        this.sciColEx = {
            name:"Science Center",
            cx: 791,
            cy: 625,
            r: 96,
        }
        this.techColEx = {
            name:"Technology Quarter",
            cx: 650,
            cy: 362,
            r: 70,
        }

    }

};



var el = document.getElementsByTagName("canvas")[0];
var mc = new Hammer(el);
mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
mc.get('pinch').set({ enable: true });


mc.on("panleft panright panup pandown pinchin pinchout", function (ev) {
    switch (ev.type) {
        case "panleft":
            
            break;
        case "panright":
            
        case "panup":
           
            break;
        case "pandown":
            
            break;
        case "pinchin":
           
            break;
        case "pinchout":
            
            break;
    }
});
function getTapPos(event) {

    var t = app.main;

    var doubleTap = false;
    var x;
    var y;
    event.preventDefault();//prevent window zoom
    this.userisInZone = false;

    var touches = event.changedTouches;
    x = touches[0].pageX; //get touch x relative to window
    y = touches[0].pageY; //get touch y relative to window
    //console.log(x,y);
    var m = t.matrix;
    t.curTag.shift();
    //var newX = x * t.matrix[0] + y * t.matrix[2] + (t.matrix[4] * -1);//convert x based on screen pan
    //var newY = x * t.matrix[1] + y * t.matrix[3] + (t.matrix[5] * -1);//convert y based on screen pan
    t.ltxs = [x,x];
    t.ltys = [y,y];
    

    
    t.taps.shift();//shift out fist element in taps array so there are only ever 2
    t.taps.push({ x: x, y: y });// push new tap x/y to taps array
    var touchedCircles = [];//touched Circles array to tell if any building colliders were touched
    var tapsDist = t.getDistanceXY(t.taps[0], t.taps[1]);//get the distance between taps
    if (tapsDist < 50 && t.tapTimer >= 0) {//check for Double Tap
        doubleTap = true;//if it is within the distance and withing the time then doubletap = true
    }
    for(var k = 0; k < t.tagCols.length; k++){
       var ta = t.tagCols[k];
        if(t.isPointinRect(x,y,ta)){
           
                t.curTag.shift();
           if(ta.selected == false){
               
                t.curTag.push(ta.name);

            }
            
            }
            else{

            }
        }
    var extras = [t.fhColEx,t.centralColEx,t.sciColEx,t.techColEx];
    for(var h = 0 ; h < extras.length; h++){
        var ex = extras[h];
        if (t.isPointinCircle(x, y, ex) ) { // if map is not zoomed out check for a slected zone
                var distance = t.isPointinCircle(x, y, ex);
               
                touchedCircles.push({ name: ex.name, dist:distance,});//push name and distance of zone
            }
    }

    
    for (var i = 0; i < t.zones.length; i++) {
            var zc = t.zones[i];
            if (t.isPointinCircle(x, y, zc) ) { // if map is not zoomed out check for a slected zone
                var distance = t.isPointinCircle(x, y, zc);
               
                touchedCircles.push({ name: zc.name, dist:distance,});//push name and distance of zone
            }
        }
      ///  console.log(touchedCircles);
    touchedCircles.sort(function (a, b) { return parseFloat(a.dist) - parseFloat(b.dist) });//sort touchedCircls by dist (low-high)
    if(touchedCircles.length > 0){
        for(var j = 0; j < t.zones.length; j++){
           
                if(t.zones[j].name == touchedCircles[0].name){
                    
                    switch(t.zones[j].state){
                        case 'default':
                            t.zones[j].state = 'selected';
                            break;
                        case 'selected':
                            t.zones[j].state = 'default';
                            break;
                    }
                }
        }
    }
    t.tapTimer = 30;//reset tap timer
}
function handleDrag(evt){
    //console.log('draggin');
     var t = app.main;
     t.dragging = true;
     var timer = 10;
    var touches = evt.changedTouches;
     for (var i=0; i < touches.length; i++) {
    
       // var idx = ongoingTouchIndexById(touches[i].identifier);
       
        
          var x  = touches[i].pageX;
          var y =  touches[i].pageY;
          t.ltys.shift();
          t.ltxs.shift();
          t.ltys.push(y);
          t.ltxs.push(x);
    
    //console.log(t.ltxs);
    }
    var xdist = t.ltxs[1] - t.ltxs[0];
    var ydist = t.ltys[1] - t.ltys[0];

    for(var j = 0; j < t.tagCols.length; j++){
            var ta = t.tagCols[j];
            if(ta.selected == true){
                ta.x += xdist;
                ta.y += ydist;
            }
    }
  
    //console.log(xdist);
}
window.onload = function () {

    //startup();

    window.addEventListener("touchstart", getTapPos, false);
    
    window.addEventListener("touchmove", handleDrag, false);
       
      



    app.main.init();
}
