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
    exInfo: [],
    centralColEx:undefined,
    fhColEx:undefined,
    sciColEx: undefined,
    techColEx :undefined,

    tags: [],
    centerTags:[],
    tagCols: [],
    currentInfos:[],

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
        darkTeal:"#448d8d",
    },
    wholeMapLocations: [],
    canScroll:undefined,
  
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
    phoneCol:undefined,
    exCol:undefined,
    user:undefined,
    prefs:undefined,
    prefTags:[],
    prefCols:[],
    prefImgs:[],

    zoneColliders: undefined,
    dePerfCol:undefined,
    curTag:[],
    zoneBtns: undefined,
    zbtnImgs:[],
    currentZone:[],
    pathImg:undefined,
    heatMapBtn: undefined,
    state:undefined,
    activeUser: undefined,
    allUserXYs:[],
    totalNumUsers: undefined,
    visitedBtn: undefined,
    recoBtn:undefined,
    pastUserXYs:[],
    searchTags:[],
    exTags:[],
    exCols:[],
    exImgs:[],
    toPref:undefined,
    exInfoImgs:[],
    curInfo:[],
    cINFO:[],
    exState:undefined,
    backBtn:undefined,
    shuffedArray:undefined,
    prefsCollier:undefined,
    drawDir:undefined,


    init: function () {

        var t = this;
        this.canvas = document.getElementById('map');
        this.ctx = this.canvas.getContext('2d');
        
        t.WIDTH = 1920;
        t.HEIGHT = 1080;
        t.canvas.width = t.WIDTH;
        t.canvas.height = t.HEIGHT;
        t.exState = "tabs";
       
        this.tapTimer = 30;
        this.taps = [{ x: 0, y: 0, }, { x: 100, y: 100, }];
       
        this.matrix = [1, 0, 0, 1, 0, 0];
        this.loadImages();
        
        t.phoneCol = {
            w:219,
            h:314,
            x:t.WIDTH - 70 - 219,
            y:t.HEIGHT - 35 - 314,
        };
         t.prefsCollier = {
            w:440,
            h:314,
            x:t.WIDTH - 70 - 400,
            y:t.HEIGHT - 35 - 314 ,
        };
        t.exCol = {
            w:365,
            h:550,
            x:70,
            y:t.HEIGHT - 550,

        }
        t.dePerfCol ={
            w:t.WIDTH/3,
            h: t.HEIGHT -850,
            x: (t.WIDTH/2) - ((t.WIDTH/3)/2),
            y: 850,
        }
        t.backBtn = {
            x:70,
            y:t.exCol.y -40,
            w:32,
            h:32,
        }
        //console.log(t.phoneCol);
        //TODO: set this to the user that is currently at the Exhibit
        t.user = {
            interest:[],
        }

        t.prefs = t.user.interest;
        t.canScroll = false;
        t.activeUser = true;
        
       t.drawDir = false;

        t.exhibits = [{
            name:'Teting123',
            tags:['Art','Gaming','Science'],
            x: 0,
            y: 0,
            zone: "Global Village",
            location: "SUS-12",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum malesuada varius erat, sit amet ornare nunc. Quisque condimentum dapibus elementum. Suspendisse ut mollis erat. Nunc eu leo augue. Ut tempor, mi sit amet viverra pulvinar, eros est porttitor nulla, non venenatis odio turpis vel nisl. Nullam laoreet tellus finibus, facilisis tortor vel, scelerisque est. Nam sed augue quis lorem aliquet pellentesque vel eget nibh. Aliquam sed vulputate nunc. Curabitur nec ullamcorper justo. Aenean non est ac quam luctus fermentum eget ut ante.",
            radius: 0,
            time:'All Day',
            ratings: [],
            exhibitors: ['Kurt Stohrer','bobs Friend','Kurt Stohrer','bobs Friend','Kurt Stohrer','bobs Friend','Kurt Stohrer','bobs Friend'],
            code: "1lkihgn77",
            img: "irrelevnt",
            ageGroup:'all',

        },
        {
            name:'Espy',
            tags:['Senior Projects','Communication','Design','Technology'],
            x: 0,
            y: 0,
            zone: "Artistic Alley",
            location: "BOOTH-A",
            description: "Espy is a dynamic and interactive wayfinding experience for ImagineRIT. Through a mobile app that people download, Espy tracks the attendee's location in order to learn about their interests as they move around the festival and attend different events. The Espy mobile app then gives attendees recommendations for events to visit based on their interests. At our exhibit, attendees can further explore the festival through an interactive map display.",
            radius: 0,
            time:'All Day',
            ratings: [],
            exhibitors: ['Kat Pillman', 'Andrew Bernardo', 'Sarah Armstrong', 'Erving Romero', 'Kurt Stohrer', 'Melody Kelly', 'Jordan Detota', 'Brandon McAlees'],
            code: "ES11PY",
            img: "irrelevnt",
            ageGroup:'all',

        },
         {
            name:'Teting789',
            tags:['Design','Software','Technology'],
            x: 0,
            y: 0,
            zone: "Artistic Alley",
            location: "gs-12",
            description: "yet this is a another fucking test",
            radius: 0,
            time:'All Day',
            ratings: [],
            exhibitors: ['bob','bobs Friend', 'rick too'],
            code: "1lalalala",
            img: "irrelevnt",
            ageGroup:'all',

        } ];

        for(var s = 0; s < t.exhibits.length; s++){
            var ex = t.exhibits[s];
            var color = '#FFF';
            var dist;
            switch(ex.zone) {
                case 'Green Place':
                    color = "#4BE530";
                    dist = 5;
                    break;
                case 'Business District':
                    color = "#3DB549";
                    dist = 4;
                    break;
                case 'Field House':
                    color = "#3C91E5";
                     dist = 6;
                    break;
                case 'Computer Zone':
                    color = "#07C2AF";
                     dist =4;
                    break;
                case 'Tech Quarter':
                    color = "#3AC7E8";
                     dist =2 ;
                    break;
                case 'Innovation Center':
                    color = "#354AA5";
                     dist = 5;
                    break;
                case 'Global Village':
                    color = "#EC6A80";
                    dist =7 ;
                    break;
                case 'Think Tank':
                    color = "#D11E1E";
                     dist = 1;
                    break;
                case 'Engineering Park':
                    color = "#F27935";
                     dist = 2;
                    break;
                case 'Info Section':
                    color = "#ED9A37";
                    dist = 2;
                    break;
                case 'RIT Center':
                    color = "#F4C031";
                     dist = 4;
                    break;
                case 'Science Center':
                    color = "#F7EF4A";
                     dist = 2;
                    break;
                case 'Artistic Alley':
                    color = "#A053BC";
                     dist = 0;
                    break;
            }
            t.exInfoImgs.push(new Image());
            var imgpath = ex.tags[0].replace(/ /g, "-");
                imgpath = imgpath.toLowerCase();
                imgpath = imgpath +".png";

            var size = 100;
           
            t.exInfo.push({
                 name:ex.name,
                 tags:ex.tags,
                 x: t.exCol.x,
                 y: t.exCol.y ,
                 ox: t.exCol.x,
                 oy: t.exCol.y,
                 lx: ex.x,
                 ly: ex.y,
                 zone: ex.zone,
                 location: ex.location,
                 description: ex.description,
                 radius: ex.radius,
                 time: ex.time,
                 ratings: ex.ratings,
                 exhibitors: ex.exhibitors,
                 code: ex.code,
                 img: imgpath,
                 color: color,
                 h:70,
                 w:t.exCol.w,
                 selected:false,
                 dist:JSON.stringify(dist),
                 forBtn: {
                    w: 48,
                    h:48,
                    x: t.exCol.x + t.exCol.w - 48,
                    y: t.exCol.y + 40,
                 },
                 ageGroup:ex.ageGroup,


            });

        }
        //console.log(t.exInfo);

        t.initZones();
        this.initTags();
        this.zoneBtns = [
        {
            name:'tags',
            x:-100,
            y:-100,
            img:'tags',
            offx: -10,
            offy: -50,
            selected:false,
            draw:false,
            popTimer: 5,
            oPop: 5,
            r:24,


        },
         {
            name:'exhibits',
            x:-100,
            y:-100,
            img:'exhibits',
            offx: 50,
            offy: -30,
            selected:false,
            draw:false,
            popTimer: 10,
            oPop: 15,
            r:24,

        },
         {
            name:'nav',
            x:-100,
            y:-100,
            img:'nav',
            offx: 50,
            offy: 30,
            selected:false,
            draw:false,
            popTimer: 15,
            oPop: 25,
            r:24,
        },

        ];
        t.heatMapBtn = {
            x:1740,
            y:661,
            r:24,
            img:t.heatmapImg,
            cx:1740,
            cy:661,
            selected: false,
            name:'heatbutton',
            txt:"Heat Map",

        }
         t.visitedBtn = {
                x:undefined,
                y:undefined,
                r:24,
                selected:false,
                cx:undefined,
                cy:undefined,
                img:t.visitImg,
                name:'visited',
                txt:'Visited',
                oi:t.visitImg,
                
            }
        t.recoBtn = {
                x:undefined,
                y:undefined,
                r:24,
                selected:false,
                cx:undefined,
                cy:undefined,
                img:t.recoImg,
                name:'reco',
                txt: 'Recommended',
                oi:t.recoImg,
                
            }

        t.pathImg = new Image();
        for(var i =0; i < t.zones.length; i++){
            t.zoneImgs.push(new Image());
            var zo = t.zones[i];
            t.bgZones.push({x:zo.x,y:zo.y,w:zo.w,img:zo.img,h:zo.h,state:zo.state});
            t.bgZoneImgs.push(new Image());
        }
        for(var j = 0; j < t.zoneBtns.length; j++){
            t.zbtnImgs.push(new Image());
        }
         t.toPref = false;
        this.resetTags();
        this.updateCenterTags();
        t.state = "default";
        //console.log(t.tagCols);
        t.shuffedArray = t.shuffleArray(t.exInfo);
       t.handleCurrentInfo();
        this.update();
         //TODO: set this to all of the last x's and y's of each user  do this everytime heatmap state is active
        t.allUserXYs = [];
       
        for(var v = 0; v < 500; v ++){
                var x = Math.floor(Math.random() * t.WIDTH) + 324;
                var y = Math.floor(Math.random() * 700) + 284;
                t.allUserXYs.push({x:x,y:y});
        }
        for(var f = 0; f < 700; f++){
                var x = Math.floor(Math.random() * t.WIDTH) + t.WIDTH/2;
                var y = Math.floor(Math.random() * 700) + 284;
                t.pastUserXYs.push({x:x,y:y});
        }
        this.totalNumUsers = t.allUserXYs.length;
        t.recco();
       // console.log(t.totalNumUsers);
        console.log("main.js init");
    },
   
    
    
    getCorrectXY: function (v) {
        var n;
        
        if(v == "x"){

        }

        if(v == "y"){
            
        }
        
    },
    
   


    draw: function () {
       var t = this;
       var w = t.WIDTH;
       var h = t.HEIGHT;
       t.drawImage(t.mapImage,0,0,w,h);
       t.drawImage(t.phoneZone,t.phoneCol.x,t.phoneCol.y,t.phoneCol.w,t.phoneCol.h);
       //t.drawRect(t.dePerfCol.x,t.dePerfCol.y,t.dePerfCol.w,t.dePerfCol.h,"#000",1);

       
       if(t.exState == 'tabs'){
            for(var w = 0; w < t.currentInfos.length; w++){
                t.drawExInfoBar(t.currentInfos[w],w);
            }
        }
         
        if(t.exState == 'PDP'){
            
            if(t.cINFO.length > 0){
                

                t.drawExbDetail(t.cINFO[0],0);
            }
        }
       t.drawImage(t.hideImg,0,0,1920,1080);
       for(var d= 0; d < t.bgZones.length; d++){
            this.drawZone(t.bgZones[d],d,t.bgZoneImgs);
       }

       for(var i = 0; i < t.zones.length; i++){
            
            this.drawZone(t.zones[i],i,t.zoneImgs);
            
       }

       if(t.activeUser == true){
            var btns = [t.heatMapBtn,t.visitedBtn,t.recoBtn];
            for(var b = 0; b < btns.length; b++){
                var but = btns[b];
                t.drawBtn(but,but.r,but.img);
                t.drawText(but.txt,but.x,but.y + (but.r + 25),15,t.textCol.mid,100);
                
            }
       }
       if(t.activeUser == false){
            t.drawBtn(t.heatMapBtn,t.heatMapBtn.r,t.heatMapBtn.img);
            t.drawText(t.heatMapBtn.txt, t.heatMapBtn.x,t.heatMapBtn.y + (t.heatMapBtn.r + 25),15,t.textCol.mid,100);
       }
       for(var k = 0; k < this.tagCols.length; k++){
                          var ta = this.tagCols[k];
                            this.drawTag(ta,k);

        }
        for(var m = 0; m < t.exCols.length; m++){
            var ex = t.exCols[m];
            this.drawTag(ex,m);

        }
         for(var p = 0; p < this.prefCols.length; p++){
                          var ta = this.prefCols[p];
                            this.drawPrefTags(ta,p);

                        }
        if(t.state == "default"){
                   
                   
                    
                    if(t.zoneBtns[2].selected == true){
                        var cur = t.getSelectedZone();
                       if(cur.img != 'booth'){
                            t.pathImg.src = 'img/paths/' + cur.img +'.png';
                            t.drawImage(t.pathImg,0,0,t.WIDTH,t.HEIGHT);
                        }
                        
                    }
                    for(var z = 0; z < t.zoneBtns.length; z++){

                        var zb = t.zoneBtns[z];
                        
                        if(zb.popTimer <= 0){
                            t.drawZoneBtn(zb,24,z);
                        }

                    }
        }
        if(t.state == 'heatmap'){
             t.drawImage(t.heatmapKey,t.heatMapBtn.x - 25, t.heatMapBtn.y - 125, 50,150 );
             t.drawText("Heat Map", t.heatMapBtn.x ,t.heatMapBtn.y + (t.heatMapBtn.r + 25),15,t.textCol.mid,100);
             
        }
        if(t.exState == 'PDP'){
            t.drawImage(t.backImg,t.backBtn.x,t.backBtn.y,t.backBtn.w,t.backBtn.h);
           
            
        }
        if(t.drawDir == true){
          this.drawImage(t.dragExImg,t.exCol.x-10,t.exCol.y,t.exCol.w+20,t.exCol.h);
            
        }
        t.drawImage(t.userLocImg,945,336,26,30);
       
      
        //this.drawCircle(this.techColEx.cx,this.techColEx.cy,this.techColEx.r,'black',.8);

    },
    update: function () {
        var t = this;
        requestAnimationFrame(this.update.bind(this));
       // console.log(t.curInfo[0]);
       // t.getSelectedZone();
       //console.log(t.getCurrentInfo());
        t.updateInfoCards();
        if(t.canScroll == false){
            t.handleCurrentInfo();
        }
        if(t.getCurrentInfo() != undefined){
           t.cINFO.shift();

           //console.log(t.getCurrentInfo());
           t.cINFO.push(t.getCurrentInfo());
           t.cINFO[0].y = t.exCol.y;
           //console.log(t.cINFO[0].name);
        }
        t.updateSearchtags();
        t.handleVistedMode();
        t.handleActiveUser();
        t.handleHeatMap();
        t.updateZones();
         t.setZonesforInfo();
        t.updateZoneBtns();
        t.handleTagCollisons();
        t.updateSelectedTag();
        if(this.dragging == false){
            t.updateCenterTags();
            t.updateUserPrefTags();
            t.updateExTags();

        }
       
        t.draw();

    },
    handleCurrentInfo: function(){
        var t = this;
        t.currentInfos = [];
        t.curInfo = [];

        if(t.searchTags.length < 1){
             

            for(var i = 0; i < t.shuffedArray.length; i ++){
                t.currentInfos.push(t.shuffedArray[i]);

            }
        }
        if(t.searchTags.length >0 && t.zoneBtns[0].selected == false){
            //console.log('morethan1');
            for(var i = 0; i < t.exInfo.length; i++){
                var ex = t.exInfo[i];
                for(var j= 0; j < ex.tags.length; j++){
                    var tag = ex.tags[j];
                    //console.log(tag);
                    for(var k = 0; k < t.searchTags.length; k++){
                        var term = t.searchTags[k];
                       
                        if(t.currentInfos.indexOf(ex) <= -1){
                             if(tag == term.name){
                                        t.currentInfos.push(ex);
                                   
                                }
                        }
                    }
                }
                
            }
        }
        if(t.getSelectedZone() && t.zoneBtns[0].selected == true){
             t.currentInfos = [];

            var curZone = t.getSelectedZone();
                curZone = curZone.name;
            for(var b = 0; b < t.exInfo.length; b++){
                var ex = t.exInfo[b];
                if(ex.zone == curZone){
                    t.currentInfos.push(ex);
                }
            }
            
       }


       if(t.getSelectedZone() && t.zoneBtns[1].selected == true){
            t.currentInfos = [];
            var curZone = t.getSelectedZone();
                curZone = curZone.name;
            for(var b = 0; b < t.exInfo.length; b++){
                var ex = t.exInfo[b];
                if(ex.zone == curZone){
                    t.currentInfos.push(ex);
                }
            }
       }
       if(t.recoBtn.selected == true && t.prefs.length > 0){
       
             var rArray  = t.recco();
            t.currentInfos = [];

            for(var c = 0; c < t.exInfo.length; c++){
                var curInf = t.exInfo[c];
                for(var g = 0; g < 2; g++){
                    if(curInf.code == rArray[g].code){
                        t.currentInfos.push(curInf);
                    }
                }
            }
           
            //console.log(t.currentInfos);
       }


      t.setInfoXYs();
      if(t.cINFO.length > 0){
         t.cINFO[0].y = t.exCol.y;
      }
       //console.log(t.currentInfos.length);
    },
   setInfoXYs: function(){
    var t = this;
         for(var q = 0; q < t.currentInfos.length; q++){
            var size = 100;
            var fsize =  1;
            var ci = t.currentInfos[q];
            var inx = q + 1;
                ci.y = t.exCol.y - 70;
                ci.y = ci.y +(size * inx);
                ci.oy = ci.y;
                ci.forBtn.y = t.exCol.y + 30;
                ci.forBtn.y = ci.y +(fsize * inx);
                
       }        
   },
   setZonesforInfo: function(){
    var t = this;

    /// DO THIS. FOR CUR INFO
    if(t.getSelectedZone() == undefined && t.state == 'FIX'){
        var tagsToCheck = t.curInfo[0].tags;
         for(var i = 0; i < tagsToCheck.length; i++){
                var ci  = tagsToCheck[i];

                for(var j = 0; j < t.zones.length; j++){
                    var zo = t.zones[j];
                    if(ci.zone == zo.name){
                        //console.log('t');
                        zo.state = 'hightlighted';
                    }
                }
        }
    }
   // else{
       
    //}
   },
   recco: function (){
    var t = this;
    
    var recArray = [];
    if(t.prefs.length > 0){
       
        for(var i = 0; i < t.shuffedArray.length; i ++){
             var n = 0;
                var sh = t.shuffedArray[i];
                for( var k = 0; k <sh.tags.length; k++){
                    var ka = sh.tags[k];
                    for(var j = 0; j < t.prefs.length; j++){
                        var pr = t.prefs[j];
                       
                        if(pr.name == ka ){
                            console.log('jess');
                            n+= 50;


                        }
                    }
             }
             recArray.push({code:sh.code, val:n});
        }
        recArray.sort((function(a,b) { return parseFloat(b.val) - parseFloat(a.val) }));
        //console.log(recArray);
        return recArray;
    }
   },
   handleHeatMap: function(){
    var t = this;
    var extras = [t.fhColEx,t.centralColEx,t.sciColEx,t.techColEx];
    var hmNAvg = 0;
    var numZones = t.zones.length;

              
    if(t.state == 'heatmap'){
        for(var i = 0; i < t.zones.length; i ++){
              var zone = t.zones[i];
              zone.hmN = 0;
          
              for(var j = 0; j < t.allUserXYs.length; j++){
                    var au = t.allUserXYs[j];
                    if(t.isPointinCircle(au.x,au.y,zone)){
                        zone.hmN ++;
                    }
              } 
            for(var h = 0 ; h < extras.length; h++){
                    var ex = extras[h]; 

                for(var k = 0; k < t.allUserXYs.length; k++){
                    var au = t.allUserXYs[k];
                    if(t.isPointinCircle(au.x,au.y,ex)){
                       if(ex.name == zone.name){
                            zone.hmN ++;

                       }
                    }
               } 
            }
              //console.log(zone.hmN);
              hmNAvg += zone.hmN;
        }
        hmNAvg = Math.floor(hmNAvg/numZones);
        //console.log(hmNAvg);
        var qAvg = Math.ceil(hmNAvg/4);
        for(var z = 0; z < t.zones.length; z++){
            var zo = t.zones[z];
            zo.state = 'heatmap1';
            if(zo.hmN <= hmNAvg - (qAvg*2)){
                zo.state = 'heatmap1';
            }
            if(zo.hmN > hmNAvg - (qAvg*2) && zo.hmN <= qAvg ){
                zo.state = 'heatmap2';
            }
            if(zo.hmN > qAvg && zo.hmN <= hmNAvg + qAvg){
                zo.state = 'heatmap3';
            }
            if(zo.hmN > hmNAvg + (qAvg*2)){
                zo.state = 'heatmap4';
            }
            //console.log(zo.state);
        }

    }

   },
 handleVistedMode: function(){
    var t = this;
    var extras = [t.fhColEx,t.centralColEx,t.sciColEx,t.techColEx];
    var hmNAvg = 0;
    var numZones = t.zones.length;

              
    if(t.state == 'visited'){
        for(var i = 0; i < t.zones.length; i ++){
              var zone = t.zones[i];
              zone.hmN = 0;
          
              for(var j = 0; j < t.allUserXYs.length; j++){
                    var au = t.pastUserXYs[j];
                    if(t.isPointinCircle(au.x,au.y,zone)){
                        zone.hmN ++;
                    }
              } 
            for(var h = 0 ; h < extras.length; h++){
                    var ex = extras[h]; 

                for(var k = 0; k < t.allUserXYs.length; k++){
                    var au = t.pastUserXYs[k];
                    if(t.isPointinCircle(au.x,au.y,ex)){
                       if(ex.name == zone.name){
                            zone.hmN ++;

                       }
                    }
               } 
            }
              //console.log(zone.hmN);
              if(zone.hmN != 0){
                hmNAvg += zone.hmN;
               }
        }
        hmNAvg = Math.floor(hmNAvg/numZones);
        //console.log(hmNAvg);
        var qAvg = Math.ceil(hmNAvg/4);
        for(var z = 0; z < t.zones.length; z++){
            var zo = t.zones[z];
            if(zo.hmN == 0){
                zo.state = 'grey';
            }

            if(zo.hmN > 0 && zo.hmN <= hmNAvg - (qAvg*2)){
                zo.state = 'heatmap1';
            }
            if(zo.hmN > hmNAvg - (qAvg*2) && zo.hmN <= qAvg ){
                zo.state = 'heatmap2';
            }
            if(zo.hmN > qAvg && zo.hmN <= hmNAvg + qAvg){
                zo.state = 'heatmap3';
            }
            if(zo.hmN > hmNAvg + (qAvg*2)){
                zo.state = 'heatmap4';
            }
            //console.log(zo.state);
        }

    }

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
    rectCol: function(rect1,rect2){
            if (rect1.x < rect2.x + rect2.w &&
               rect1.x + rect1.w > rect2.x &&
               rect1.y < rect2.y + rect2.h &&
               rect1.h + rect1.y > rect2.y) {
            return true;
        }
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
   
   updateSearchtags: function(){
   var t = this;

   /* if(t.exState == 'PDP'){
        

        for(var i = 0; i < t.searchTags.length; i++){
            var st = t.searchTags[i];
            
                if(st.prefd == true){
                    t.prefs.push(st);
                }
                
        }

        for(var f = 0; f < t.cINFO[0].tags.length; f++){
            var fu = t.cINFO[0].tags[f];

            if(t.prefs.indexOf(fu) > -1){
                t.searchTags.push({name: fu, prefd: true, selected:false});
                var ind = t.pref.indexOf(fu);
                t.prefs.splice(ind,q);
               

            }
            else{
                 t.searchTags.push({name: fu, prefd:false, selected:false});
            }
        }
    }
    */





   },
   
    
    
    
    updateSelectedTag: function(){
        
       var t = this;
       t.doSelect(t.tagCols,true,false);
       t.doSelect(t.prefCols,true,false);
       t.doSelect(t.exCols,false,false);
       
    },

    doSelect: function (tagArray,draw,dont){
        var t = this;
         for(var i = 0; i < tagArray.length; i ++){
            var ta = tagArray[i];
             ta.selected = false;
            if(ta.name == this.curTag[0]){
                ta.selected = true;
                
            }
            else{
                ta.selected = false;
                 //t.drawDir = dont;
            }
            if(this.dragging == false && ta.x != ta.ox && ta.y != ta.oy){
                ta.selected = false;
            }
            if(ta.selected == false){
                ta.x = ta.ox;
                ta.y = ta.oy;
             

            }
            if(this.dragging == false && ta.x == ta.ox && ta.y == ta.oy){
             //ta.selected = false
            }

            
        }
        
    },
    updateInfoCards: function(){
        var t = this;

        for(var i = 0; i < t.currentInfos.length; i ++){
            var info = t.currentInfos[i];
            info.selected = false;
            if(info.code == t.curInfo[0] && this.dragging == false){
               
                    info.selected = true;
                
              
               
            }
        }
        if(this.dragging == true){
            t.curInfo.shift();
        }
    },
     updateCenterTags: function (){
        var t = this;

        t.tagCols = [];
        t.row1 = [];
        t.row2 = [];
        t.row3 = [];
        t.row4 = [];
        t.row5 = [];
       
     
         t.prefCols = [];
       
        t.moveToNewArray(t.centerTags,t.prefs,t.prefTags);
        t.moveToNewArray(t.centerTags,t.searchTags,t.exTags);
         t.centerTags.sort(function(a, b){
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });
          var rowsToPush = [t.row1,t.row2,t.row3,t.row4,t.row5];
        //console.log(t.centerTags.length);
        var ctLength = t.centerTags.length;
        var maxItemsinRow = Math.ceil(ctLength/5);
        //console.log(maxItemsinRow);
        for(var i = 0; i < t.centerTags.length; i++){
            var n = i+1;
            
            var r = rowsToPush[0];
            rowsToPush.push(r);
            r.push(t.centerTags[i]);
            rowsToPush.shift();
        }
        


       var ySpace = 44;
       var r1y = 850;
       var r2y = r1y + ySpace;
       var r3y = r2y + ySpace;
       var r4y = r3y + ySpace;
       var r5y = r4y + ySpace;

       t.setRowTagsXY(t.row1,r1y,'c');
       t.setRowTagsXY(t.row2,r2y,'c');
       t.setRowTagsXY(t.row3,r3y,'c');
       t.setRowTagsXY(t.row4,r4y,'c');
       t.setRowTagsXY(t.row5,r5y,'c');
      
      t.pushTagsToDraw(t.row1,t.tagCols);
      t.pushTagsToDraw(t.row2,t.tagCols);
      t.pushTagsToDraw(t.row3,t.tagCols);
      t.pushTagsToDraw(t.row4,t.tagCols);
      t.pushTagsToDraw(t.row5,t.tagCols);
        
       for(var j = 0 ; j < t.tagCols.length; j++){
            this.tagImgs.push(new Image());
           // t.tagCols[j].selected = false;
        }


    },
    resetTags: function (){
        var t = this;
        t.centerTags = [];
        for(var k = 0; k < this.tags.length; k++){
            var ta = this.tags[k];
            var strlength = ta.name.length;
            var newWidth = (t.tagimgSize*4) + (strlength * t.tagtextSize/1.5);
            var newHeight = (t.tagimgSize*2);
           
            this.centerTags.push({x:ta.x, y:ta.y,name:ta.name, img:ta.img, w:newWidth, h: newHeight, selected:false, prefd:t.toPref});
        }   
    },
    handleActiveUser: function(){
        var t = this;
        if(t.activeUser == true){
            t.heatMapBtn.y  = 471;
            t.heatMapBtn.cy = 471;

            t.recoBtn.x = 1740;
            t.recoBtn.y = 661;
            t.recoBtn.cx = t.recoBtn.x;
            t.recoBtn.cy = t.recoBtn.y;

            t.visitedBtn.x = 1740;
            t.visitedBtn.y = 566;
            t.visitedBtn.cx = t.visitedBtn.x;
            t.visitedBtn.cy = t.visitedBtn.y;


        }
        if(t.activeUser == false){
            t.heatMapBtn.y  = 661;
            t.recoBtn.x = undefined;
            t.recoBtn.y = undefined;
            t.recoBtn.cx = t.recoBtn.x;
            t.recoBtn.cy = t.recoBtn.y;

            t.visitedBtn.x = undefined;
            t.visitedBtn.y = undefined;
            t.visitedBtn.cx = t.visitedBtn.x;
            t.visitedBtn.cy = t.visitedBtn.y;

            
        }
    },
    updateUserPrefTags: function(){
        var t = this;

        var row1 = [];
        var row2 = [];
        var row3 = [];
        var row4 = [];
        var row5 = [];
        var row6 = [];
        var row7 = [];
        var row8 = [];

        t.prefCols = [];


    
        var pLength = t.prefTags.length;
        var maxItemsinRow = Math.ceil(pLength/6);
       // console.log(maxItemsinRow);
        var rowsToPush = [row1,row2,row3,row4,row5,row6];

        for(var i = 0; i < t.prefTags.length; i++){
            //var n = i+1;
            var r = rowsToPush[0];
            rowsToPush.push(r);
            r.push(t.prefTags[i]);
            rowsToPush.shift();
         }

       var ySpace = 44;
       var r1y = t.phoneCol.y + 40;
       var r2y = r1y + ySpace;
       var r3y = r2y + ySpace;
       var r4y = r3y + ySpace;
       var r5y = r4y + ySpace;
       var r6y = r5y + ySpace;
      // var r7y = r6y + ySpace;
       //var r8y = r7y + ySpace;
      

       //console.log(t.prefCols);


       t.setRowTagsXY(row1,r1y,'p');
       t.setRowTagsXY(row2,r2y,'p');
       t.setRowTagsXY(row3,r3y,'p');
       t.setRowTagsXY(row4,r4y,'p');
       t.setRowTagsXY(row5,r5y,'p');
       t.setRowTagsXY(row6,r6y,'p');
      // t.setRowTagsXY(row7,r7y,'p');
       //t.setRowTagsXY(row8,r8y,'p');
      
       // console.log(t.prefCols);
      
       t.pushTagsToDraw(row1,t.prefCols);
       t.pushTagsToDraw(row2,t.prefCols);
       t.pushTagsToDraw(row3,t.prefCols);
       t.pushTagsToDraw(row4,t.prefCols);
       t.pushTagsToDraw(row5,t.prefCols);
       t.pushTagsToDraw(row6,t.prefCols);
       //t.pushTagsToDraw(row7,t.prefCols);
       //t.pushTagsToDraw(row8,t.prefCols);
     
        
        for(var j = 0 ; j < t.prefCols.length; j++){
            this.prefImgs.push(new Image());
           
        }
       
    },
    //update the search Terms
       updateExTags: function(){
        var t = this;

        var row1 = [];
        var row2 = [];
        var row3 = [];
        var row4 = [];
       

        t.exCols = [];


        var pLength = t.exTags.length;
        var maxItemsinRow = Math.ceil(pLength/6);
      
        var rowsToPush = [row1,row1,row2,row2,row3,row3,row4,row4];

        for(var i = 0; i < t.exTags.length; i++){
          
            var r = rowsToPush[0];
            rowsToPush.push(r);
            r.push(t.exTags[i]);
            rowsToPush.shift();
         }
            var ySpace = 34;
         if(t.exState == 'PDP'){
            var r1y = t.exCol.y - 80;
            
            
         }
         else{
           var r1y = t.exCol.y - 20;
         }
        var r2y = r1y - ySpace;
        var r3y = r2y - ySpace;
        var r4y = r3y - ySpace;
     
       t.setRowTagsXY(row1,r1y,'e');
       t.setRowTagsXY(row2,r2y,'e');
       t.setRowTagsXY(row3,r3y,'e');
       t.setRowTagsXY(row4,r4y,'e');
       t.pushTagsToDraw(row1,t.exCols);
       t.pushTagsToDraw(row2,t.exCols);
       t.pushTagsToDraw(row3,t.exCols);
       t.pushTagsToDraw(row4,t.exCols);
    
        for(var j = 0 ; j < t.exCols.length; j++){
            this.exImgs.push(new Image());
           
        }
       
    },
    //prefs/searchtagas to new array as objects to be sorted
    moveToNewArray: function(tArray,rArray,nArray){
        for(var i = 0; i < tArray.length; i++){
            var ta = tArray[i];
            for(var j = 0; j < rArray.length; j++){
                var ra = rArray[j];
                
                if(ra.name == ta.name){
                    nArray.push({
                        x:ta.x,
                        y:ta.y,
                        name:ra.name,
                        img:ta.img,
                        selected: ra.selected,
                        ox: ta.x,
                        oy: ta.y,
                        w: ta.w,
                        h: ta.h,
                        prefd: ra.prefd,
             });
                    

                    tArray.splice(i, 1);
                    
                }

            }


        }
        

    },
  //get the current width of each row so that position on screen is correct
    getRowWidth: function (row){
        var width = 0;
        for(var i =0; i < row.length; i++){
            width += row[i].w;
           
            width += 20;
            
        }

        return width;
    },
    //set the XYs for each tag to  be pushed
    setRowTagsXY: function(row , y, type){
        var t = this;
        if(row.length > 0){
            //c is for center
            if(type == 'c'){
                var rowWidth = this.getRowWidth(row);
                row[0].x = (this.WIDTH/2) - (rowWidth/2);
                row[0].y = y;
                for(var i = 1; i < row.length; i++){
                    var p = i-1;
                    var ct = row[i];
                    var pt = row[p];
                    ct.x = pt.x + pt.w + 20;
                    ct.y = y;
                }
            }
            //p is for prefrences
            if(type == 'p'){
                var rowWidth = t.getRowWidth(row);

                row[0].x = t.phoneCol.x - 10 - row[0].w;
                row[0].y = y;
                for(var i = 1; i < row.length; i++){
                    var p = i-1;
                    var ct = row[i];
                    var pt = row[p];
                    ct.x = pt.x - ct.w - 20;
                    ct.y = y;
                }
            }
            if(type == 'e'){
                var rowWidth = t.getRowWidth(row);

                row[0].x = 70;
                row[0].y = y;
                for(var i = 1; i < row.length; i++){
                    var p = i-1;
                    var ct = row[i];
                    var pt = row[p];
                    ct.x = pt.x + pt.w + 10;
                    ct.y = y;
                }
            }
        }
    },
    //push the sortesd tags into thier draw array
    pushTagsToDraw: function (row,array){
        for(var i = 0; i < row.length; i++){
            var r = row[i];
            array.push({
                x:r.x,
                y:r.y,
                name:r.name,
                img:r.img,
                selected: r.selected,
                ox: r.x,
                oy: r.y,
                w: r.w,
                h: r.h,
                prefd: r.prefd,
            });
        }
    },
    //Handle colllisons for tags...
    handleTagCollisons: function(){
        var t = this;
        //console.log(t.prefs.length);
        for(var i = 0; i < t.tagCols.length; i++){
             var tag = t.tagCols[i];
             if(t.rectCol(tag,t.prefsCollier)){
                //console.log('Push to player Pref');
                if(t.dragging == false && t.activeUser == true){
                    tag.selected = false;
                    tag.prefd = true;

                    t.prefs.push({name: tag.name, prefd:true , selected:false});
                   
                    t.updateCenterTags();
                    t.updateUserPrefTags();
                   
                    
                }
             }
             if(t.rectCol(tag,t.exCol)){
               // console.log(t.searchTags.length);
                if(t.dragging == false ){
                    tag.selected = false;
                    if(t.searchTags.length <= 7 && t.exState != 'PDP'){
                        t.searchTags.push({name:tag.name , prefd:false , selected:false});
                    }
                    t.updateCenterTags();
                    t.updateExTags();
                    t.toPref = false;
                    t.handleCurrentInfo();
                }
             }

        }
         for(var k = 0; k < t.exCols.length; k++){
             var tag = t.exCols[k];
             if(this.dragging == false && tag.x != tag.ox && tag.y != tag.ox){
                //console.log(tag.prefd);
                if(tag.prefd == true){
                     t.prefs.push({name: tag.name, prefd:true , selected:false});
                     

                }
                for(var e = 0; e < t.searchTags.length; e++){
                    if(t.searchTags[e].name == tag.name && t.exState == 'tabs'){
                            

                            t.searchTags.splice(e,1);
                            t.resetTags();
                             t.exTags = [];
                             t.exCols = [];
                    }
                }
                t.prefTags = [];
                 t.prefCols = [];
                  

                t.updateCenterTags();
                t.updateUserPrefTags();
                t.updateExTags();
               // t.updateUserPrefTags();
             }

        }
        for(var j = 0; j < t.prefCols.length; j++){

             var tag = t.prefCols[j];
             if(t.rectCol(tag,t.dePerfCol)){
                //console.log('Remove Pref from Pref');
                if(t.dragging == false && tag.x != tag.ox){
                     //console.log('Remove Pref from Pref');
                    for(var p = 0; p < t.prefs.length; p ++){
                       //console.log("name before if:" + t.prefs[p].name);

                        if(t.prefs[p].name == tag.name){
                           // console.log("name after if:" +t.prefs[p].name);
                            tag.selected = false;
                            t.prefs.splice(p,1);
                            t.resetTags();
                             t.prefTags = [];
                             t.prefCols = [];
                             t.exCols = [];
                             t.exTags = [];
                            
                  
                             break;

                        }
                    }
                    //t.prefs.push(tag.name);
                  

                }
             }
             if(t.rectCol(tag,t.exCol)){
                if(t.dragging == false && tag.x != tag.ox){
                    
                            tag.prefd = true;
                            if(t.searchTags.length <= 7 && t.exState != 'PDP'){
                                t.searchTags.push({name:tag.name , prefd:true , selected:false});
                            
                            t.exCols = [];
                            t.exTags = [];
                             
                            for(var v = 0; v < t.prefs.length; v++){
                               
                                if(t.prefs[v].name == tag.name){
                                    //console.log('pref is same');
                                  
                                   // console.log(t.prefs[v].name);
                                    t.prefs.splice(v,1);

                                    
                                    t.resetTags();
                                    t.prefTags = [];
                                    t.prefCols = [];
                               
                 
                                    break;

                            

                                }
                           
                          
                        
                            }
                          
                        }
                          
                        
                    
                }
             }
            
        }
    },

    
    //if a zone is selected (clicked on) get it
    getSelectedZone: function (){
        var t = this;
        var curSelected; 
        for(var i =0; i < t.zones.length; i++){
            if(t.zones[i].state == "selected"){
                curSelected = t.zones[i];
            }
        }
        return curSelected;
       
    },
    //gets the current clicked on info button
     getCurrentInfo: function (){
        var t = this;
        //console.log(t.curInfo);
        var curSelected; 
        if(t.curInfo.length > 0){
            //console.log(t.curInfo);
            for(var i =0; i < t.currentInfos.length; i++){
                if(t.currentInfos[i].code == t.curInfo[0]){
                    t.currentInfos[i].y = t.exCol.y;
                    curSelected = t.currentInfos[i];
                    //console.log(curSelected);
                }
            }
        }
        else{
            curSelected = undefined;
        }
        return curSelected;
       
    },
    //update zone butttons
    updateZoneBtns: function (){
        var t = this;
        for(var k = 0; k < t.zoneBtns.length; k++){
                var zb = t.zoneBtns[k];
                zb.popTimer -- ;
                 zb.cx = zb.x;
                zb.cy = zb.y;

            }
       
        if( t.getSelectedZone()){
            var cur = t.getSelectedZone();
            for(var i = 0; i < t.zoneBtns.length; i++){
                var zb = t.zoneBtns[i];

                    zb.x = cur.cp.x + zb.offx;
                    zb.y = cur.cp.y + zb.offy;
                    
                    if(cur.img == 'booth'){
                          t.zoneBtns[2].x = undefined;
                        t.zoneBtns[2].y = undefined;
                    }
                     zb.cx = zb.x;
                    zb.cy = zb.y;

            }
          }
          else{
             for(var i = 0; i < t.zoneBtns.length; i++){
                var zb = t.zoneBtns[i];

                    zb.x = -100;
                    zb.y = -100;
                     zb.cx = zb.x;
                    zb.cy = zb.y;
                    zb.selected = false;

            }
          }
          


    },
    //Update teh states of each zones (correct the image)
    updateZones: function (){
        var t = this;
        if(t.state == 'default'){
        for(var i =0; i < t.zones.length; i ++){
            var zo = t.zones[i];
           if(t.currentZone.length > 0){
                if(zo.name == t.currentZone[0].name){
                    //console.log(zo.name);
                    zo.state = 'selected'
                }
                else{
                    zo.state = 'default';
                }
            }
            if(t.currentZone.length <= 0){
               
                    zo.state = 'default';
            }
            if(t.exState == "PDP"){
                    zo.state = 'default';
                    if(zo.name == t.cINFO[0].zone){
                        zo.state = 'hightlighted';
                    }
            }
            if(t.recoBtn.selected == true){
                 for(var q = 0; q < t.currentInfos.length; q++){
                    var ci = t.currentInfos[q];
                    for(var z = 0 ; z < t.zones.length; z++){
                       
                        if(ci.zone == t.zones[z].name){
                            // console.log(ci.zone, t.zones[z].name);
                            t.zones[z].state = 'hightlighted';
                           
                        }
                    }

            }
            }
        }
    }

    },

    shuffleArray: function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
        return array;
    },
    //DRAW FUNCTIONS

    loadImages: function () {

        this.mapImage = new Image();
        this.mapImage.src = "img/map.jpg";

        this.phoneZone = new Image();
        this.phoneZone.src = "img/misc/phonezone.png";

        this.heatmapImg = new Image();
        this.heatmapImg.src = "img/btns/dark/heatmap.png";

        this.heatmapKey = new Image();
        this.heatmapKey.src = "img/misc/heatmap-key.png";

        this.recoImg = new Image();
        this.recoImg.src = "img/btns/dark/recommended.png";

        this.visitImg = new Image();
        this.visitImg.src = "img/btns/dark/visited.png";

        this.xImg = new Image();
        this.xImg.src = "img/btns/white/X.png";

        this.lgImg = new Image();
        this.lgImg.src = "img/lowerdGrad.png";

        this.backImg = new Image();
        this.backImg.src = "img/misc/back.png";

        this.forImg = new Image();
        this.forImg.src = "img/misc/forward.png";

        this.distanceImg = new Image();
        this.distanceImg.src = "img/misc/distance.png";
        
        this.locationImg = new Image();
        this.locationImg.src = "img/misc/location.png";
        
        this.userImg = new Image();
        this.userImg.src = "img/misc/user.png";
        
        this.timeImg = new Image();
        this.timeImg.src = "img/misc/time.png";
        
        this.hideImg = new Image();
        this.hideImg.src = "img/hide.png";

        this.userLocImg = new Image();
        this.userLocImg.src = "img/misc/userLoc.png";

        this.dragExImg = new Image();
        this.dragExImg.src = "img/misc/dragEx.png";

        
    },
   
    drawZoneBtn: function(btn,rad,i) {
        var t = this;
        var bgCol = 'white';
        var bor  = t.colors.teal;
        var imgPath;
        var shadowColor = 'black';
        switch(btn.selected){
            case false:
                bgCol = "white";
                bor  = t.colors.teal;
                imgPath = 'img/btns/dark/';
                break;
            case true:
                bgCol = t.colors.teal;
                bor  = t.colors.darkTeal;
                imgPath = 'img/btns/white/';
                break;

        }
        var imgS = rad + rad/3;
        t.zbtnImgs[i].src = imgPath + btn.img + '.png';
        t.drawCircShadow(btn.x,btn.y,rad,shadowColor,.2);
        t.drawOutCircle(btn.x,btn.y,rad,bgCol,.9,bor);
        t.drawImage(t.zbtnImgs[i],btn.x - imgS/2, btn.y - imgS/2, imgS,imgS);

    },
    drawBtn: function(btn,rad,img) {
        var t = this;
        var bgCol = 'white';
        var bor  = t.colors.teal;
        var image;
        var shadowColor = 'black';

        switch(btn.selected){
            case false:
                bgCol = "white";
                bor  = t.colors.teal;
                image = img;
                break;
            case true:
                bgCol = t.colors.teal;
                bor  = t.colors.darkTeal;
                image = t.xImg;
                break;

        }
        var imgS = rad + rad/3;
      
        
        t.drawOutCircle(btn.x,btn.y,rad,bgCol,.9,bor);
        t.drawImage(image,btn.x - imgS/2, btn.y - imgS/2, imgS,imgS);

    },
    
    
    drawTag: function(tag,i){
        var t = this;

        var ts = t.tagtextSize;
        var imgs = t.tagimgSize;
        
        var name = tag.name.toUpperCase();
        if(tag.selected == false ){
            t.tagImgs[i].src = 'img/Icons/dark/' + tag.img;
            t.drawOutRect(tag.x,tag.y,tag.w,tag.h,'white',t.textCol.dark);
            t.drawImage(t.tagImgs[i],tag.x + imgs/2,tag.y + imgs/2,imgs,imgs);
            t.drawText(name,tag.x +tag.w/2, tag.y + tag.h/1.5,ts,t.textCol.mid,tag.w);
            t.drawText("+",tag.x +tag.w - imgs, tag.y + tag.h/1.5,ts,t.colors.teal,imgs);
        }
        /*if(tag.selected == false && tag.prefd == true){
            t.tagImgs[i].src = 'img/Icons/white/' + tag.img;
            t.drawOutRect(tag.x,tag.y,tag.w,tag.h,t.colors.gold,t.colors.gold);
            t.drawImage(t.tagImgs[i],tag.x + imgs/2,tag.y + imgs/2,imgs,imgs);
            t.drawText(name,tag.x +tag.w/2, tag.y + tag.h/1.5,ts,'white',tag.w);
            t.drawText("x",tag.x +tag.w - imgs, tag.y + tag.h/1.5,ts,'white',imgs);
        }*/
        if(tag.selected == true){
            t.tagImgs[i].src = 'img/Icons/white/' + tag.img;
            t.drawOutRect(tag.x,tag.y,tag.w,tag.h,t.colors.teal,t.textCol.dark);
            t.drawImage(t.tagImgs[i],tag.x + imgs/2,tag.y + imgs/2,imgs,imgs);
            t.drawText(name,tag.x +tag.w/2, tag.y + tag.h/1.5,ts,'white',tag.w);
            t.drawText("+",tag.x +tag.w - imgs, tag.y + tag.h/1.5,ts,'white',imgs);
        }
    },
    drawPrefTags: function(tag,i){
        var t = this;
        var ts = t.tagtextSize;
        var imgs = t.tagimgSize;
        
        var name = tag.name.toUpperCase();
        if(tag.selected == false){
            t.tagImgs[i].src = 'img/Icons/white/' + tag.img;
            t.drawOutRect(tag.x,tag.y,tag.w,tag.h,t.colors.gold,t.colors.gold);
            t.drawImage(t.tagImgs[i],tag.x + imgs/2,tag.y + imgs/2,imgs,imgs);
            t.drawText(name,tag.x +tag.w/2, tag.y + tag.h/1.5,ts,'white',tag.w);
            t.drawText("x",tag.x +tag.w - imgs, tag.y + tag.h/1.5,ts,'white',imgs);
        }
        if(tag.selected == true){
             t.tagImgs[i].src = 'img/Icons/white/' + tag.img;
            t.drawOutRect(tag.x,tag.y,tag.w,tag.h,t.colors.teal,t.textCol.dark);
            t.drawImage(t.tagImgs[i],tag.x + imgs/2,tag.y + imgs/2,imgs,imgs);
            t.drawText(name,tag.x +tag.w/2, tag.y + tag.h/1.5,ts,'white',tag.w);
            t.drawText("x",tag.x +tag.w - imgs, tag.y + tag.h/1.5,ts,'white',imgs);
        }
    },
    drawExInfoBar:function(info,i){
        var t = this;
        t.exInfoImgs[i].src = 'img/Icons/white/' +info.img;
        var w = t.exCol.w;
        var size = info.h;
        t.drawRect(info.x,info.y,size,size,info.color);
        t.drawImage(t.exInfoImgs[i],info.x + (size *.1),info.y + (size *.1),size * .8,size *.8);
        t.drawText(info.name,info.w/2 + size,info.y +25, 20,t.textCol.dark,info.w - 90);
        t.drawImage(t.forImg, info.forBtn.x,info.forBtn.y,info.forBtn.w,info.forBtn.h);
        var tags = info.tags.join(' - ');
         t.wrapText(tags,info.w/2 + size+10,info.y +50, 15,t.textCol.mid,info.w - 90,15);
    },
    drawExbDetail:function(info ,i){
        var t = this;
        t.exInfoImgs[i].src = 'img/Icons/white/' +info.img;
        var w = t.exCol.w;
        var size = 96;
        var ec = info;
        t.drawRect(ec.x,ec.y + 30,size,size,info.color);
        t.drawImage(t.exInfoImgs[i],ec.x + (size *.1),ec.y + (size *.1) + 30,size * .8,size *.8);
        t.wrapText(info.name,info.w/2 + size,ec.y + 35 + 35, 15,t.textCol.dark,info.w - 90,30);

        var newPeps = info.exhibitors.join(' - ');
        t.wrapText(newPeps, info.w/2 + size,ec.y +size + 40 + 30, 15,t.textCol.mid, info.w, 17);
        var nh = t.getWrapH(newPeps, info.w/2 + size,ec.y +size + 40 + 30, 15,t.textCol.dark, info.w, 17);
        //console.log(nh);
        t.wrapText(info.description,info.w/2 + size,ec.y + size + 40 + 30 + 36 + nh ,20,t.textCol.mid,info.w,15);
         nh = nh + t.getWrapH(info.description,info.w/2 + size,ec.y + size + 40 + 30 + 36 + nh ,20,t.textCol.mid,info.w,15);
         nh = nh + 122;

         t.drawImage(t.distanceImg,115,ec.y + size + 40 + 30 + 36 + nh,30,30);
         //getDistance
         t.drawText('~ ' + info.dist +' min',115 + size,ec.y + size + 40 + 30 + 36 + nh + 22, 20, t.textCol.mid, info.w/2);
         t.drawImage(t.timeImg,115,ec.y + size + 40 + 30 + 36 + nh + 44 + 15,30,30);
         t.drawText(info.time,115 + size,ec.y + size + 40 + 30 + 36 + nh + 44 + 15 + 22, 20, t.textCol.mid, info.w/2);
         //get time
         t.drawImage(t.locationImg,ec.w/2+size ,ec.y + size + 40 + 30 + 36 + nh,30,30);
         t.drawText(info.location,ec.w/2+size + size, ec.y + size + 40 + 30 + 36 + nh + 22, 20, t.textCol.mid, info.w/2);
         t.drawImage(t.userImg,ec.w/2 + size,ec.y + size + 40 + 30 + 36 + nh + 44 + 15,30,30);
        t.drawText(info.ageGroup,ec.w/2+size + size, ec.y + size + 40 + 30 + 36 + nh + 44 + 15 + 22, 20, t.textCol.mid, info.w/2);
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
             case 'hightlighted':
                imgpath = 'img/zones/selected/';
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
    wrapText: function(string,x,y,lineHeight,col,maxWidth,size){
        this.ctx.save();
       
        var words = string.split(' ');
        var line = '';
        this.ctx.fillStyle = col;
        this.ctx.textAlign = 'center';
        this.ctx.font = size + 'px Lato';
       
        for(var n = 0; n < words.length; n++){
          var testLine = line + words[n] + ' ';
          var metrics = this.ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            this.ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
           
          }
          else {
           // numlines +=1;
            line = testLine;
          }

        }
        
        this.ctx.fillText(line, x, y);
      
      this.ctx.restore();
    },
    getWrapH: function(string,x,y,lineHeight,col,maxWidth,size){

                var oy  = y;
                var words = string.split(' ');
                var line = '';
               
                var numlines = 1;
                for(var n = 0; n < words.length; n++){
                  var testLine = line + words[n] + ' ';
                  var metrics = this.ctx.measureText(testLine);
                  var testWidth = metrics.width;
                  if (testWidth > maxWidth && n > 0) {
                    
                    line = words[n] + ' ';
                    y += lineHeight;
                    numlines +=1;
                  }
                  else {
                   // numlines +=1;
                    line = testLine;
                  }

                }
                
             var he = size * numlines;

             return he;
              
             
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
    drawOutCircle: function (centerX, centerY, radius, col, alph,bc) {

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.globalAlpha = alph;
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = col;
        this.ctx.fill();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = bc;
        this.ctx.stroke();
        this.ctx.restore();
    },
    drawCircShadow: function(centerX, centerY, radius, col, alph){
             this.ctx.save(); // Save the state of the context
              this.ctx.fillStyle = col; // Sets the fill color
               this.ctx.globalAlpha = alph;
              this.ctx.shadowOffsetX = 0; // Sets the shadow offset x, positive number is right
             this.ctx.shadowOffsetY = 5; // Sets the shadow offset y, positive number is down
              this.ctx.shadowBlur = 10; // Sets the shadow blur size
              this.ctx.shadowColor = col; // Sets the shadow color
              this.ctx.beginPath(); // Starts a shape path
              this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
             this.ctx.fill(); // Fills the path
              this.ctx.restore(); // Restore the state of the context
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
                name: "Art",
                x:undefined,
                y:undefined,
                img:"art.png",
                selected:false,
               

            },
            {
                name: "Business",
                x:undefined,
                y:undefined,
                img:"business.png",
                selected:false,
               

            },
            {
                name: "Communication",
                x:undefined,
                y:undefined,
                img:"communication.png",
                selected:false,
               

            },
            {
                name: "Community",
                x:undefined,
                y:undefined,
                img:"community.png",
                selected:false,
               
            },
            {
                name: "Dance",
                x:undefined,
                y:undefined,
                img:"dance.png",
                selected:false,
               

            },
            {
                name: "Design",
                x:undefined,
                y:undefined,
                img:"design.png",
                selected:false,
               

            },
            {
                name: "Energy",
                x:undefined,
                y:undefined,
                img:"energy.png",
                selected:false,
               

            },
            {
                name: "Engineering",
                x:undefined,
                y:undefined,
                img:"engineering.png",
                selected:false,
                

            },
            {
                name: "Enviorment",
                x:undefined,
                y:undefined,
                img:"environment.png",
                selected:false,
               

            },
            {
                name: "Gaming",
                x:undefined,
                y:undefined,
                img:"gaming.png",
                selected:false,
               

            },
            {
                name: "Global",
                x:undefined,
                y:undefined,
                img:"global.png",
                selected:false,
               

            },
            {
                name: "Health",
                x:undefined,
                y:undefined,
                img:"health.png",
                selected:false,
                

            },
            {
                name: "Music",
                x:undefined,
                y:undefined,
                img:"music.png",
                selected:false,
               

            },
            {
                name: "Senior Projects",
                x:undefined,
                y:undefined,
                img:"senior-projects.png",
                selected:false,
               

            },
            {
                name: "Science",
                x:undefined,
                y:undefined,
                img:"science.png",
                selected:false,
               
            },
            {
                name: "Software",
                x:undefined,
                y:undefined,
                img:"software.png",
                selected:false,
                

            },
            {
                name: "Student Organizations",
                x:undefined,
                y:undefined,
                img:"student-organizations.png",
                selected:false,
                

            },
            {
                name: "Sustainability",
                x:undefined,
                y:undefined,
                img:"sustainability.png",
                selected:false,
               

            },
            {
                name: "Technology",
                x:undefined,
                y:undefined,
                img:"technology.png",
                selected:false,
               

            },
            {
                name: "Photography",
                x:undefined,
                y:undefined,
                img:"photography.png",
                selected:false,
               

            },
            {
                name: "Math",
                x:undefined,
                y:undefined,
                img:"math.png",
                selected:false,
               

            },
            {
                name: "Sports",
                x:undefined,
                y:undefined,
                img:"sports.png",
                selected:false,
               

            },
            {
                name: "Multidisciplinary",
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
                name: "Entrepreneurship",
                x:undefined,
                y:undefined,
                img:"entrepreneurship.png",
                selected:false,
               

            },


        ];
    },
    initZones: function(){
        //states for zones
            //default,selected,heatmap1,heatmap2,heatmap3,heatmap4,grey,hightlighted
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
            cp:{x: 464, y:382 },
            hmN:0,

        },
        {
            name:"Artistic Alley",
            x: 876,
            y: 310,
            img: 'booth',
            state: 'default',
            w: 240,
            h: 135,
            cx:995,
            cy:367,
            r:127,
            cp:{x: 984, y:357 },
             hmN:0,

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
            cp:{x: 1232, y: 503},
             hmN:0,

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
            cp:{x: 1496, y:406 },
             hmN:0,

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
            cp:{x:806 , y:474 },
             hmN:0,

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
            cp:{x:556 , y:705 },
             hmN:0,

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
            cp:{x: 638, y:478 },
             hmN:0,

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
            cp:{x:974 , y:468 },
             hmN:0,

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
            cp:{x: 923, y:687 },
             hmN:0,

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
            cp:{x:660 , y: 623},
             hmN:0,

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
            cp:{x: 859, y: 595},
             hmN:0,

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
            cp:{x:707 , y:330 },
             hmN:0,

        },
         {
            name:"Info Section",
            x: 995,
            y: 498,
            img: 'wal',
            state: 'default',
            w: 130,
            h: 115,
            cx:1057,
            cy:547,
            r:81,
            cp:{x:1050 , y:535 },
             hmN:0,

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
    t.currentZone.shift();
    var touches = event.changedTouches;
    x = touches[0].pageX; //get touch x relative to window
    y = touches[0].pageY; //get touch y relative to window
   // console.log(x,y);
    var m = t.matrix;
    t.curTag = [];
    //var newX = x * t.matrix[0] + y * t.matrix[2] + (t.matrix[4] * -1);//convert x based on screen pan
    //var newY = x * t.matrix[1] + y * t.matrix[3] + (t.matrix[5] * -1);//convert y based on screen pan
    t.ltxs = [x,x];
    t.ltys = [y,y];
    // console.log(t.currentInfos);

    t.canScroll = false;
    t.taps.shift();//shift out fist element in taps array so there are only ever 2
    t.taps.push({ x: x, y: y });// push new tap x/y to taps array
    var touchedCircles = [];//touched Circles array to tell if any building colliders were touched
    var tapsDist = t.getDistanceXY(t.taps[0], t.taps[1]);//get the distance between taps
    if (tapsDist < 50 && t.tapTimer >= 0) {//check for Double Tap
        doubleTap = true;//if it is within the distance and withing the time then doubletap = true
    }
    if(t.isPointinRect(x,y,t.exCol)){
        t.canScroll = true;

    }

    for(var p = 0; p < t.prefCols.length; p++){
       var ta = t.prefCols[p];
        if(t.isPointinRect(x,y,ta)){
           
                t.curTag.shift();
           if(ta.selected == false){
               
                t.curTag.push(ta.name);

            }
            
            }
            else{

            }
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
    for(var g = 0; g < t.exCols.length; g++){
       var ta = t.exCols[g];
        if(t.isPointinRect(x,y,ta)){
           
                t.curTag.shift();
           if(ta.selected == false){
               
                t.curTag.push(ta.name);

            }
            
            }
            else{

            }
        }
    for(var w = 0; w < t.currentInfos.length; w++){
       var ta = t.currentInfos[w];
        if(t.isPointinRect(x,y,ta)){
          
           //if(ta.selected == false){
               
           // }
             if(t.isPointinRect(x,y,ta.forBtn) && t.exState == 'tabs'){

                //console.log('Its a Hit')
                t.exState = "PDP";
                 t.curInfo.shift();
                if(ta.selected == false){
               
                    t.curInfo.push(ta.code);
                    console.log(t.curInfo);
                }
           
            }
            else{

            }
        }
    }
    if(t.isPointinRect(x,y,t.backBtn)){
         t.curInfo.shift();
         t.cINFO = [];
         t.handleCurrentInfo();
         t.exState = 'tabs';

       

    }
    var extras = [t.fhColEx,t.centralColEx,t.sciColEx,t.techColEx];
    for(var h = 0 ; h < extras.length; h++){
        var ex = extras[h];
        if (t.isPointinCircle(x, y, ex) ) {
                var distance = t.isPointinCircle(x, y, ex);
               
                touchedCircles.push({ name: ex.name, dist:distance,});
            }
    }
    
     for(var q = 0; q < t.zoneBtns.length; q++){
                var zb = t.zoneBtns[q];
             if (t.isPointinCircle(x, y, zb) ) { 
                var distance = t.isPointinCircle(x, y, zb);
                touchedCircles.push({ name: zb.name, dist:distance,});
            }
    }


    for (var i = 0; i < t.zones.length; i++) {
            var zc = t.zones[i];
            if (t.isPointinCircle(x, y, zc) ) { 
                var distance = t.isPointinCircle(x, y, zc);                                                                 
               
                touchedCircles.push({ name: zc.name, dist:distance,});
            }
        }
    var btns = [t.heatMapBtn,t.visitedBtn,t.recoBtn];
    
    for(var f = 0; f < btns.length; f++){
        var but = btns[f];
        if(t.isPointinCircle(x,y,but)){
        var distance = t.isPointinCircle(x, y, but); 
           /// console.log('heatmap hit');

            touchedCircles.push({ name: but.name, dist:distance,});
        }
    }
    

      ///  console.log(touchedCircles);
    touchedCircles.sort(function (a, b) { return parseFloat(a.dist) - parseFloat(b.dist) });//sort touchedCircls by dist (low-high)
    //console.log(touchedCircles);
    if(touchedCircles.length > 0){
        t.state = 'default';
        for(var j = 0; j < t.zones.length; j++){
             
                if(t.zones[j].name == touchedCircles[0].name  ){
                        
                            switch(t.zones[j].state){
                                case 'default':
                                    t.currentZone.push(t.zones[j]);
                                     for(var w = 0; w < t.zoneBtns.length; w++){
                                        var zb = t.zoneBtns[w];        
                                        zb.popTimer  = zb.oPop;
                                    }
                                      break;
                                case 'selected':
                                    t.currentZone.push(t.zones[j]);;
                                      break;
                            }

                   
                           
                                
            }
            else{
                //t.setZonetoDef();
            }
        
            
        }
        for(var w = 0; w < t.zoneBtns.length; w++){
                var zb = t.zoneBtns[w];
               if(zb.name == touchedCircles[0].name ){
                    t.currentZone.push(t.getSelectedZone());      
                            switch(zb.selected){
                                case true:
                                     zb.selected = false;
                                      break;
                                case false:
                                    zb.selected = true;
                                      break;
                            }
              t.handleCurrentInfo();               
                                
            }

            else{
                zb.selected = false;
            }
            
        }
        if(t.zoneBtns[1].name == touchedCircles[0].name){
           t.exTags = [];
            t.exCols =[];
            console.log(t.searchTags);
            for(var h = 0; h < t.searchTags.length; h++){
                var la = t.searchTags[h];

                var pos =  t.searchTags.map(function(e) { return e.name; }).indexOf(la);
                if(pos > -1){
                    console.log(pos);
                    if(la.prefd == true){
                        t.prefs.push(la);
                    }
                        t.searchTags.splice(h,1);
                    }
                t.resetTags();
                t.prefTags = [];
                t.prefCols =[];
                t.updateCenterTags();
                t.updateExTags();
                t.updateUserPrefTags();
                    
            
            }
           
        }
        if(t.zoneBtns[0].name == touchedCircles[0].name){
            t.searchTags = [];
            t.exTags = [];
            t.exCols =[];
            for(var e = 0; e < t.currentInfos.length; e++){
                var ci = t.currentInfos[e];

                    for(var i = 0; i < ci.tags.length; i++){
                      
                      var pos = t.searchTags.map(function(e) { return e.name; }).indexOf(ci.tags[i]);
                      var prefpos = t.prefs.map(function(e) { return e.name; }).indexOf(ci.tags[i]);
                     // console.log(pos);
                      //console.log(prefpos);
                        if(pos <= -1){
                            if(prefpos >-1){
                                t.prefs.splice(prefpos,1);
                                t.searchTags.push({name:ci.tags[i], prefd:true, selected:false});
                                
                            }
                            else{
                                t.searchTags.push({name:ci.tags[i], prefd:false, selected:false});
                            }
                        }
                    

                    }
                    //console.log(t.searchTags);
           
           }
            t.resetTags();
            t.prefTags = [];
            t.prefCols =[];
            t.updateCenterTags();
            t.updateExTags();
            t.updateUserPrefTags();
           
            //t.handleCurrentInfo();
              
        }
        if(t.heatMapBtn.name == touchedCircles[0].name){
            //console.log('HEAT MAP MODE');
            t.state = 'heatmap';
            t.recoBtn.selected = false;
            t.visitedBtn.selected = false;
        }
        if(t.recoBtn.name == touchedCircles[0].name){
            //console.log('HEAT MAP MODE');
            //t.state = 'heatmap';
            switch(t.recoBtn.selected){
                case true:
                    t.recoBtn.selected = false;
                    t.state = 'default';
                    break;
                case false:
                    t.recoBtn.selected = true;
                    t.visitedBtn.selected = false;
                    
                    break;
            }
            
        }
         if(t.visitedBtn.name == touchedCircles[0].name){
           switch(t.visitedBtn.selected){
                case true:
                    t.visitedBtn.selected = false;
                    t.state = 'default';
                    break;
                case false:
                    t.visitedBtn.selected = true;
                    t.recoBtn.selected = false;
                    t.state = 'visited';
                    break;
            }
        }
    }
    //console.log(t.currentZone);
    t.tapTimer = 30;//reset tap timer
    //console.log(t.prefs);

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
    for(var k = 0; k < t.prefCols.length; k++){
            var ta = t.prefCols[k];
            if(ta.selected == true){
                ta.x += xdist;
                ta.y += ydist;
            }
    }
    for(var g = 0; g < t.exCols.length; g++){
            var ta = t.exCols[g];
            if(ta.selected == true){
                ta.x += xdist;
                ta.y += ydist;
            }

    }
    if(t.canScroll == true){
        var l = t.currentInfos.length - 1;
     for(var w = 0; w < t.currentInfos.length; w++){
            var ta = t.currentInfos[w];
            //if(ta.selected== true){
                
                var prev = w - 1;
                //ta.x += xdist;
           
               t.currentInfos[w].y += ydist;
                t.currentInfos[w].forBtn.y += ydist;
        }
        if(t.currentInfos.length > 0){
            if(t.exState == 'PDP'){
                if(t.currentInfos[0].y > t.HEIGHT + 25){
                    t.handleCurrentInfo();
                    //t.canScroll =false;

                }
                if(t.currentInfos[l].y < t.exCol.y - t.exCol.h){
                    t.handleCurrentInfo();
                    // t.canScroll = false;
                }
            }
            else{

                if(t.currentInfos[0].y > t.HEIGHT + 25){
                    t.handleCurrentInfo();
                    //t.canScroll =false;

                }
                if(t.currentInfos[l].y < t.exCol.y - 95){
                    t.handleCurrentInfo();
                    // t.canScroll = false;
                }
            }
        }
    }
    //console.log(xdist);
}
function handleTouchEnd(evt){
     evt.preventDefault();
     var t =app.main;
     t.dragging = false;
}
window.onload = function () {

    //startup();
    var t =app.main;
    window.addEventListener("touchstart", getTapPos, false);
    
    window.addEventListener("touchmove", handleDrag, false);
    window.addEventListener("touchend", handleTouchEnd, false);
   
      app.main.init();

      setInterval(function(){ t.shuffedArray = t.shuffleArray(t.exInfo); }, 20000);
       
     

}

