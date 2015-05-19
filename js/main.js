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
    seld:undefined,
    topText:undefined,
    curretTagType:undefined,
    justPressed:undefined,

    init: function () {

        var t = this;
        this.canvas = document.getElementById('map');
        this.ctx = this.canvas.getContext('2d');
        
        t.WIDTH = 1920;
        t.HEIGHT = 1080;
        t.canvas.width = t.WIDTH;
        t.canvas.height = t.HEIGHT;

        loadAssets();
        t.exState = "tabs";
        
        this.tapTimer = 30;
        this.taps = [{ x: 0, y: 0, }, { x: 100, y: 100, }];
       
        this.matrix = [1, 0, 0, 1, 0, 0];
     
        t.justPressed = false;
        


        t.prefs = [];
        t.canScroll = false;
        t.activeUser = false;
        t.seld = false;
       t.drawDir = false;
       t.exhibits = exDB;
         //console.log(app.main.exhibits);

        for(var s = 0; s < t.exhibits.length; s++){
            var ex = t.exhibits[s];
            var color = t.textCol.mid;
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
                case 'RIT Central':
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
            var imgpath;
           
            
            if(ex.tags == undefined){
                ex.tags = [];
                 //imgpath = "multidisciplinary.png";
               
            }
            else{
                if(ex.tags != undefined){
                    imgpath = ex.tags[0].replace(/ /g, "-");
                    imgpath = imgpath.toLowerCase();
                    imgpath = imgpath +".png";
                }
            }
            if(imgpath == ".png"){
                imgpath = "multidisciplinary.png";
            }
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

       t.topText = "Featured Exhibits";
        this.update();
         //TODO: set this to all of the last x's and y's of each user  do this everytime heatmap state is active
        t.allUserXYs = [];

       
      
        for(var f = 0; f < 700; f++){
                var x = Math.floor(Math.random() * t.WIDTH) + 324;
                var y = Math.floor(Math.random() * 700) + 284;
                t.pastUserXYs.push({x:x,y:y});
        }
        this.totalNumUsers = t.allUserXYs.length;
        t.recco();
       
    },

    noCollider: function (){
      var t = this;
      if(t.zoneBtns[0].selected == true){
        for(var i = 0; i < t.zones.length; i++){
            var zo = t.zones[i];
            zo.r = 0;
        }
        var extras = [t.fhColEx,t.centralColEx,t.sciColEx,t.techColEx];
        for(var h = 0 ; h < extras.length; h++){
            var ex = extras[h];
           ex.r = 0;
        }
      }
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
       var dl = app.drawLib;
       var w = t.WIDTH;
       var h = t.HEIGHT;
       //draw background
       dl.drawImage(t.ctx,t.mapImage,0,0,w,h);
       //draw phone zone outline
       dl.drawImage(t.ctx,t.phoneZone,t.phoneCol.x,t.phoneCol.y,t.phoneCol.w,t.phoneCol.h);
      //draw current info in tabs view
      if(t.exState == 'tabs'){
            for(var w = 0; w < t.currentInfos.length; w++){
                t.drawExInfoBar(t.currentInfos[w],w);
            }
        }
      //draw current info in PDP mode
      if(t.exState == 'PDP'){
            if(t.cINFO.length > 0){
                t.drawExbDetail(t.cINFO[0],0);
            }
        }
        //draw top hald of baground to hide the info scroll
       dl.drawImage(t.ctx,t.hideImg,0,0,1920,1080);
       //draw zones background layer
       for(var d= 0; d < t.bgZones.length; d++){
            this.drawZone(t.bgZones[d],d,t.bgZoneImgs);
       }
       //draw zoones foreground(changing) layer
       for(var i = 0; i < t.zones.length; i++){
            this.drawZone(t.zones[i],i,t.zoneImgs);
        }
        // draw buttons for an active user
        if(t.activeUser == true){
            var btns = [t.heatMapBtn,t.visitedBtn,t.recoBtn];
            for(var b = 0; b < btns.length; b++){
                var but = btns[b];
                t.drawBtn(but,but.r,but.img);
                dl.drawText(t.ctx,but.txt,but.x,but.y + (but.r + 25),15,t.textCol.mid,100);
            }
       }
       // if there is no active user draw heatmap button
       if(t.activeUser == false){
            t.drawBtn(t.heatMapBtn,t.heatMapBtn.r,t.heatMapBtn.img);
            dl.drawText(t.ctx,t.heatMapBtn.txt, t.heatMapBtn.x,t.heatMapBtn.y + (t.heatMapBtn.r + 25),15,t.textCol.mid,100);
       }
       //draw zone buttons and paths
       if(t.state == "default"){
            if(t.zoneBtns[2].selected == true){
                var cur = t.getSelectedZone();
                if(cur.img != 'booth'){
                    t.pathImg.src = 'img/paths/' + cur.img +'.png';
                    dl.drawImage(t.ctx,t.pathImg,0,0,t.WIDTH,t.HEIGHT);
                }
            }
            for(var z = 0; z < t.zoneBtns.length; z++){
                var zb = t.zoneBtns[z];
                if(zb.popTimer <= 0){
                    t.drawZoneBtn(zb,24,z);
                }
            }
        }
        //draw Heatmap key
        if(t.state == 'heatmap'){
             dl.drawImage(t.ctx,t.heatmapKey,t.heatMapBtn.x - 25, t.heatMapBtn.y - 125, 50,150 );
             dl.drawText(t.ctx,"Heat Map", t.heatMapBtn.x ,t.heatMapBtn.y + (t.heatMapBtn.r + 25),15,t.textCol.mid,100);
             
        }
        //draw backbutton when in PDP mode
        if(t.exState == 'PDP'){
            dl.drawImage(t.ctx,t.backImg,t.backBtn.x,t.backBtn.y,t.backBtn.w,t.backBtn.h);
            dl.drawLeftText(t.ctx,t.topText ,70 + 10 + t.backBtn.w,t.exCol.y - 15, 25,t.textCol.dark,t.exCol.w);
        }
        //draw 
        if(t.exState == 'tabs'){
             var l = t.exCols.length;
             l = l -1;
            if(t.searchTags.length < 0){
                 dl.drawLeftText(t.ctx,t.topText ,70 ,t.exCol.y - 15, 25,t.textCol.dark,t.exCol.w);
            }
            else{
                if(t.exCols.length > 0 && t.zoneBtns[0].selected == false){
                     dl.drawImage(t.ctx,t.backImg,t.backBtn.x,t.backBtn.y,t.backBtn.w,t.backBtn.h);
                     dl.drawLeftText(t.ctx,t.topText ,70 + 10 + 30,t.exCols[l].y - 15, 25,t.textCol.dark,t.exCol.w);
                
                }
            else if(t.zoneBtns[0].selected == false && t.zoneBtns[1].selected == false){
                    dl.drawLeftText(t.ctx,t.topText ,70 ,t.exCol.y - 15, 25,t.textCol.dark,t.exCol.w);
                }
            }
            if(t.zoneBtns[0].selected == true ){
               if(l == 0){
                   dl.drawImage(t.ctx,t.backImg,t.backBtn.x,t.backBtn.y - 20,t.backBtn.w,t.backBtn.h);
                    dl.drawLeftText(t.ctx,t.topText ,70 + 10 + 30,t.exCols[l].y - 15, 25,t.textCol.dark,t.exCol.w);
                }
                   
                else if(l > 0){
                     dl.drawImage(t.ctx,t.backImg,t.backBtn.x,t.backBtn.y,t.backBtn.w,t.backBtn.h);
                    dl.drawLeftText(t.ctx,t.topText ,70 + 10 + 30,t.exCols[l].y - 15, 25,t.textCol.dark,t.exCol.w);
                }
                else{
                     dl.drawImage(t.ctx,t.backImg,t.backBtn.x,t.backBtn.y,t.backBtn.w,t.backBtn.h);
                    dl.drawLeftText(t.ctx,t.topText ,70 + 10 + t.backBtn.w,t.exCol.y - 15, 25,t.textCol.dark,t.exCol.w);
                }
               
            }
            if(t.zoneBtns[1].selected == true ){
                    dl.drawImage(t.ctx,t.backImg,t.backBtn.x,t.backBtn.y,t.backBtn.w,t.backBtn.h);
                    dl.drawLeftText(t.ctx,t.topText ,70 + 10 + t.backBtn.w,t.exCol.y - 15, 25,t.textCol.dark,t.exCol.w);
                }
            
                   

        }
        //draw user location PIN
        dl.drawImage(t.ctx,t.userLocImg,945,336,26,30);
        var tagToDraw = undefined;
        var indx = undefined;
        //draw center tags
         for(var k = 0; k < this.tagCols.length; k++){
            
                var ta = this.tagCols[k];
                    this.drawTag(ta,k);
             
                if(ta.selected == true){
                   tagToDraw = ta;
                   indx = k;
                }
        }
        //draw exhibit tags
        for(var m = 0; m < t.exCols.length; m++){

            var ex = t.exCols[m];
            this.drawTag(ex,m);
            if(ex.selected == true){
               
                   tagToDraw = ex;
                   indx = m;

                }
        }
        //draw prfeered tags
        for(var p = 0; p < this.prefCols.length; p++){
                var ta = this.prefCols[p];
                    this.drawPrefTags(ta,p);
                if(ta.selected == true){
                   tagToDraw = ta;
                   indx = p;
                }

        }
      //draw drag here directions
      if(t.drawDir == true){
         t.drawDirection();
      }
      //draw phone messgage for active user
      if(t.activeUser == true){
         dl.wrapText(t.ctx,'TAP HERE TO REMOVE EMULATED PHONE',t.phoneCol.x + t.phoneCol.w/2,t.phoneCol.y + t.phoneCol.h/3, 30,t.textCol.dark, t.phoneCol.w/1.5,25);
      }
      //draw phone message for no active user
      if(t.activeUser == false){
         dl.wrapText(t.ctx,'TAP HERE TO EMULATE A DETECTED PHONE',t.phoneCol.x + t.phoneCol.w/2,t.phoneCol.y + t.phoneCol.h/3, 30,t.textCol.dark, t.phoneCol.w/1.5,25);
      }
      //draw the header
      dl.drawImage(t.ctx,t.headerImg,t.WIDTH/2 - 320,70,640,100);
      //draw a slected tag above emverything else
      if(tagToDraw != undefined){
             this.drawTag(tagToDraw,indx);
      }
        

    },
    update: function () {
        var t = this;
        requestAnimationFrame(this.update.bind(this));

        t.updateZones();
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
       // t.updateSearchtags();
        t.handleVistedMode();
        t.handleActiveUser();
        t.handleHeatMap();
       
        t.setZonesforInfo();
        t.updateZoneBtns();
        t.handleTagCollisons();
        t.updateSelectedTag();
        t.updateForText();
        if(this.dragging == false){
            t.updateCenterTags();
            t.updateUserPrefTags();
            t.updateExTags();

        }
        t.updateREX();
        t.noCollider();
      
        t.draw();
        //console.log(t.justPressed);

    },
    //updtae th elocation of the echibit collider for touch
    updateREX: function(){
            var t = this;
            var l = t.exCols.length;
                l = l-1;
            if(l >= 0 ){
                t.rexCol.y = t.exCols[l].oy;
                t.rexCol.h = t.HEIGHT - t.exCols[l].oy;
            }
            else{
                t.rexCol = {
                    x:70,
                    w:t.exCol.w,
                    y:t.exCol.y,
                    h:t.exCol.h,

                };
            }
            
    },
    //udate the backbuttons location
    updateForText: function(){
        var t = this;
        var l = t.exCols.length;
            l = l-1;
        if(t.zoneBtns[0].selected == true && l > 0){
             var curZone = t.getSelectedZone();
                t.topText = curZone.name;
                 t.backBtn = {
                    x:70,
                    y:t.exCols[l].y -40,
                    w:32,
                    h:32,
                }
        }
        else{
            t.backBtn = {
                x:70,
                y:t.exCol.y -40,
                w:32,
                h:32,
            }
        }
        if(t.zoneBtns[0].selected == false && l > -1){
            
                 t.backBtn = {
                    x:70,
                    y:t.exCols[l].y -40,
                    w:32,
                    h:32,
                }
        }
    },
    containsAll: function(needles,haystack){
        var searchNames = [];
        for(var j = 0; j < needles.length; j++){
            searchNames.push(needles[j].name);
        }
        //console.log(searchNames);
        for(var i = 0; i < needles.length; i ++){
            
            if($.inArray(searchNames[i],haystack) == -1) return false;
        }
          return true;
    },
    checkfortags: function(a,b){
        var n = 0;
        var sn = [];
        for(var j = 0; j < b.length; j++){
            sn.push(b[j].name);
        }
        //console.log(sn);
        for(var i = 0; i < a.tags.length; i++){
            var tag = a.tags[i];
            //console.log(tag);
                if(sn.indexOf(tag) > -1){
                    //console.log(tag);
                    n++;
                }
           
        }
        //console.log(n);
        if(n > 0 ){
            return true;
        }
        else{
            return false;
        }
    },
    containsAny: function(array1, array2) {
      var sn = [];
      //console.log(array1);
        for(var j = 0; j < array1.length; j++){
            
            sn.push(array1[j].name);
        }
         //console.log(array2);
         //console.log(sn);
      for (var i=0; i<array2.length; i++) {

          for (var w=0; w<sn.length; w++) {
           // console.log(sn[w]);
              if (array2[i] == sn[w]) return true;
          }
      }
      return false;
    }, 
    //handle what shows up  in the exhibit info section
    handleCurrentInfo: function(){
        var t = this;
        t.currentInfos = [];
        t.curInfo = [];

        //if there is nothing to sort by set info to random exhibits
        if(t.searchTags.length < 1 ){
            //limit to 20
             for(var i = 0; i < 20; i ++){
                t.currentInfos.push(t.shuffedArray[i]);
            }
        }
        //if there are search terms and the tag button has not been clicked
        //filter the tags byt the searchterm
        if(t.searchTags.length > 0 && t.zoneBtns[0].selected == false){
            
            for(var i = 0; i < t.exInfo.length; i++){
                var ex = t.exInfo[i];
                if(t.containsAll(t.searchTags,ex.tags)){
                         t.currentInfos.push(ex);

                   }
                
            }


        }
        

        if(t.getSelectedZone() && t.zoneBtns[0].selected == true ){
           t.tagBtnInfos();
           if(t.searchTags.length <= 0){
              t.zoneBtns[0].selected = false;
           }
          
        }
            
          

       if(t.getSelectedZone() && t.zoneBtns[1].selected == true){
           t.addAllBoothsInZone();
       }

       
       if(t.recoBtn.selected == true && t.prefs.length > 0){
       
            var rArray  = t.recco();
            t.currentInfos = [];

            for(var c = 0; c < t.exInfo.length; c++){
                var curInf = t.exInfo[c];
                for(var g = 0; g < 10; g++){
                    if(curInf.code == rArray[g].code){
                        t.currentInfos.push(curInf);
                    }
                }
            }
           
           
       }


      t.setInfoXYs();
      if(t.cINFO.length > 0){
         t.cINFO[0].y = t.exCol.y;
      }
       //console.log(t.currentInfos.length);
    },
    tagBtnInfos: function (){
      var t = this;
         if(t.searchTags.length > 0){
            //add the exhibits
            var curZone = t.getSelectedZone();
             for(var i = 0; i < t.exInfo.length; i++){
                var ex = t.exInfo[i];
                if(t.containsAny(t.searchTags,ex.tags)){
                    if(ex.zone == curZone.name){
                         t.currentInfos.push(ex);
                       }

                   }
                
            }
          }
        },
    addAllBoothsInZone: function(){
      var t = this;
       t.currentInfos = [];
       var curZone = t.getSelectedZone();
           curZone = curZone.name;
           for(var b = 0; b < t.exInfo.length; b++){
               var ex = t.exInfo[b];
               if(ex.zone == curZone){
                  t.currentInfos.push(ex);
                }
            }
    },
    setAllZoneTags: function(){

      var t = this;
      var curZone = t.getSelectedZone();
      for(var i = 0 ; i < t.exInfo.length; i ++){
          var ex  = t.exInfo[i];
          if(ex.zone == curZone.name){
           
              for(var j = 0; j < ex.tags.length; j ++){
                var curtag = ex.tags[j];
               
                var pos = t.searchTags.map(function(e) { return e.name; }).indexOf(curtag);
                var prefPos = t.prefs.map(function(e) { return e.name; }).indexOf(curtag);
               if( pos <= -1){

                if(prefPos > -1){
                  t.prefs.splice(prefPos,1);
                  t.searchTags.push({name:curtag , prefd:true , selected:false});
                }
                else{

                }
                 //console.log(ex.tags[j]);
                 t.searchTags.push({name:curtag , prefd:false , selected:false});
               }
          
          }
        }
      }
     
      
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
    if(t.exCols > 0){
      //  console.log('gothere');
    for(var i = 0; i < this.currentInfos.length; i++){
        var ci = this.currentInfos[i];
        for(var z =0; z< t.zones.length; z++){
            if (ci.zone == t.zones[z].name){

                t.zones[z].state = "highlighted";
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
            if(zo.name == 'Artistic Alley'){
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
            }
            else{
                zo.state = 'grey';
            }
            //console.log(zo.state);
        }

    }
    if(t.state == 'default'){
        t.visitedBtn.selected = false;
    }

   },
   clearSearch: function (){
    var t = this;
         //var pos = t.searchTags.map(function(e) { return e.name; }).indexOf(ci.tags[i]);
         t.resetTags();
         t.exCols =[];
         t.exTags = [];
         t.prefTags = [];
         t.prefCols=[];

         for(var i = 0; i < t.searchTags.length; i++){
               // console.log(t.searchTags[i].prefd);
                var ser = t.searchTags[i];
                if(ser.prefd == true){
                    var pos = t.prefs.map(function(e) { return e.name; }).indexOf(ser.name);
                    //console.log(t.prefs)
                    if(pos <= -1){
                       t.prefs.push({name:ser.name , prefd:true, selected:false});
                    }
                }
                //var pos = t.searchTags.map(function(e) { return e.name; }).indexOf(ser.name);
                t.searchTags.shift();
                t.resetTags();
                var sl = t.searchTags.length;
                    sl = sl-1;
                if(i >= sl){
                        t.searchTags = [];
                         t.exCols =[];
                         t.exTags = [];
                         t.prefTags = [];
                         t.prefCols = [];
                         t.resetTags();

                }
         }
         //t.searchTags = [];
         //console.log(t.searchTags);
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
   
  
   
    
    
    
    updateSelectedTag: function(){
        
       var t = this;
       t.doSelect(t.tagCols,true,false,'c');
       t.doSelect(t.prefCols,true,false,'p');
       t.doSelect(t.exCols,false,false,'e');
       if(t.curTag < 1){
        t.drawDir = false;
       }
    
      
    },

    doSelect: function (tagArray,draw,dont,type){
        var t = this;
         for(var i = 0; i < tagArray.length; i ++){
            var ta = tagArray[i];
             ta.selected = false;
            if(ta.name == this.curTag[0]){
                ta.selected = true;
               
            }
            else{
               
               // ta.selected = false;
                 //t.drawDir = dont;
            }
            if(this.dragging == false && ta.x != ta.ox && ta.y != ta.oy){
                //ta.selected = false;
                // t.drawDir = dont;
            }
            if(ta.selected == false){
                ta.x = ta.ox;
                ta.y = ta.oy;
                //t.drawDir = dont;
             

            }
            if(ta.selected == true){
                 t.drawDir = draw;
                 t.canScroll = false;
                 t.currentTagType = type;
            }
            if(this.dragging == false && ta.x == ta.ox && ta.y == ta.oy){
             //ta.selected = false
              //t.drawDir = dont
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
           
            this.centerTags.push({x:ta.x, y:ta.y,name:ta.name, img:ta.img, w:newWidth, h: newHeight, selected:t.undefined, prefd:t.toPref});
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
        var rowsToPush = [row1,row2,row3,row4,row5,row6];

        for(var i = 0; i < t.prefTags.length; i++){
           
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
     


       t.setRowTagsXY(row1,r1y,'p');
       t.setRowTagsXY(row2,r2y,'p');
       t.setRowTagsXY(row3,r3y,'p');
       t.setRowTagsXY(row4,r4y,'p');
       t.setRowTagsXY(row5,r5y,'p');
       t.setRowTagsXY(row6,r6y,'p');
     
      
       t.pushTagsToDraw(row1,t.prefCols);
       t.pushTagsToDraw(row2,t.prefCols);
       t.pushTagsToDraw(row3,t.prefCols);
       t.pushTagsToDraw(row4,t.prefCols);
       t.pushTagsToDraw(row5,t.prefCols);
       t.pushTagsToDraw(row6,t.prefCols);
      
     
        
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
        var row5 = [];
        var row6 = [];
        var row7 = [];
        var row8 = [];
        var row9 = [];
        var row10 = [];
        var row11 = [];
        var row12 = [];
        var row13 = [];
       

        t.exCols = [];


        var pLength = t.exTags.length;
        var maxItemsinRow = Math.ceil(pLength/6);
      
        var rowsToPush = [row1,row1,row2,row2,row3,row3,row4,row4,row5,row5,row6,row6,row7,row7,row8,row8,row9,row9,row10,row10,row11,row11,row12,row12,row13,row13];

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
        var r5y = r4y - ySpace;
        var r6y = r5y - ySpace;
        var r7y = r6y - ySpace;
        var r8y = r7y - ySpace;
        var r9y = r8y - ySpace;
        var r10y = r9y - ySpace;
        var r11y = r10y - ySpace;
        var r12y = r11y - ySpace;
        var r13y = r12y - ySpace;

     
        t.setRowTagsXY(row1,r1y,'e');
        t.setRowTagsXY(row2,r2y,'e');
        t.setRowTagsXY(row3,r3y,'e');
        t.setRowTagsXY(row4,r4y,'e');
        t.setRowTagsXY(row5,r5y,'e');
        t.setRowTagsXY(row6,r6y,'e');
        t.setRowTagsXY(row7,r7y,'e');
        t.setRowTagsXY(row8,r8y,'e');
        t.setRowTagsXY(row9,r9y,'e');
        t.setRowTagsXY(row10,r10y,'e');
        t.setRowTagsXY(row11,r11y,'e');
        t.setRowTagsXY(row12,r12y,'e');
        t.setRowTagsXY(row13,r13y,'e');
       


       t.pushTagsToDraw(row1,t.exCols);
       t.pushTagsToDraw(row2,t.exCols);
       t.pushTagsToDraw(row3,t.exCols);
       t.pushTagsToDraw(row4,t.exCols);
       t.pushTagsToDraw(row5,t.exCols);
       t.pushTagsToDraw(row6,t.exCols);
       t.pushTagsToDraw(row7,t.exCols);
       t.pushTagsToDraw(row8,t.exCols);
       t.pushTagsToDraw(row9,t.exCols);
       t.pushTagsToDraw(row10,t.exCols);
       t.pushTagsToDraw(row11,t.exCols);
       t.pushTagsToDraw(row12,t.exCols);
       t.pushTagsToDraw(row13,t.exCols);
    
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
            var sel;
           // console.log(r.selected);
            if(row[i].name == this.curTag[0]){
                var sel = true;
            }
            else{
                if(r.selected != undefined){
                    sel = r.selected;
                }
                else{
                    sel = false;
                }
                
            }
            array.push({
                x:r.x,
                y:r.y,
                name:r.name,
                img:r.img,
                selected: sel,
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
                    t.curTag = [];
                   
                    
                }
             }
             if(t.rectCol(tag,t.rexCol)){
               // console.log(t.searchTags.length);
                if(t.dragging == false ){
                    tag.selected = false;
                    if(t.searchTags.length <= 7 && t.exState != 'PDP' && t.zoneBtns[0].selected == false ){
                        t.searchTags.push({name:tag.name , prefd:false , selected:false});
                         t.topText = 'Browse Tags';
                    }
                    t.updateCenterTags();
                    t.updateExTags();
                    t.toPref = false;
                    t.seld = false;
                    t.handleCurrentInfo();
                    t.curTag = [];
                }
             }

        }
         for(var k = 0; k < t.exCols.length; k++){
             var tag = t.exCols[k];
             if(this.dragging == false && tag.x != tag.ox && tag.y != tag.ox){
                //console.log(tag.prefd); t.updateInfoCards();

               
                if(tag.prefd == true){
                     t.prefs.push({name: tag.name, prefd:true , selected:false});
                     

                }
                for(var e = 0; e < t.searchTags.length; e++){
                    if(t.searchTags[e].name == tag.name && t.exState == 'tabs' ){
                            
                            //console.log(t.searchTags);
                            t.searchTags.splice(e,1);
                            t.resetTags();
                             t.exTags = [];
                             t.exCols = [];
                              t.updateCenterTags();
                             t.updateUserPrefTags();
                            t.updateExTags();
                             if(t.searchTags.length < 0 && t.zoneBtns[0].selected == false){
                                t.topText = "Featured Exhibits";
                                t.currentInfos = [];
                              
                             }
                             if(t.zoneBtns[0].selected == true){

                             }
                              
                            

                    }
                }
                if(t.searchTags.length <= 0){
                        t.topText = "Featured Exhibits";
                 }
                t.prefTags = [];
                 t.prefCols = [];
                   t.curTag = [];

               

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
                             t.curTag = [];
                  
                             break;

                        }
                    }
                    //t.prefs.push(tag.name);
                  

                }
             }
             if(t.rectCol(tag,t.exCol)){
                if(t.dragging == false && tag.x != tag.ox){
                    
                            tag.prefd = true;
                            if(t.searchTags.length <= 7 && t.exState != 'PDP' && t.zoneBtns[0].selected == false){
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
                                     t.curTag = [];
                 
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
                    if(t.exState == 'PDP'){
                        t.zoneBtns[0].x = undefined;
                        t.zoneBtns[0].y = undefined;
                        t.zoneBtns[1].x = undefined;
                        t.zoneBtns[1].y = undefined;
                        t.zoneBtns[2].x -= 50;
                        t.zoneBtns[2].y -= 25;

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
          
            if(t.currentZone.length <= 0){
                    
                    zo.state = 'default';

            }
            if(t.exState == "PDP"){
                    zo.state = 'default';
                if(t.cINFO.length > 0){
                    if(zo.name == t.cINFO[0].zone){
                        zo.state = 'selected';
                    }
                }
            }
            if(t.recoBtn.selected == true){
                if(t.prefs.length > 0){
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
        if(t.searchTags.length > 0 && t.recoBtn.selected == false && t.zoneBtns[0].selected == false){

            for(var y = 0 ; y < t.zones.length; y++){
                   t.zones[y].state = 'grey';
              }
                
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
        
         if(t.currentZone.length > 0){
                if(zo.name == t.currentZone[0].name){
                    //console.log(zo.name);
                    zo.state = 'selected'
                }
                else{
                    zo.state = 'default';
                }
            }
        }
        if(t.exState == 'PDP'){
           for(var y = 0 ; y < t.zones.length; y++){
                  if(t.zones[y].state == 'default'){
                    t.zones[y].state = 'grey';
                  }
              }
        }
        t.setZonesforInfo();
    }
    if(t.zoneBtns[0].selected == false && t.searchTags.length > 0){
        t.currentZone = [];
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

   
   
     drawZoneBtn: function(btn,rad,i) {
        var t = this;
        var dl = app.drawLib;
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
        dl.drawCircShadow(t.ctx,btn.x,btn.y,rad,shadowColor,.2);
        dl.drawOutCircle(t.ctx,btn.x,btn.y,rad,bgCol,.9,bor);
        dl.drawImage(t.ctx,t.zbtnImgs[i],btn.x - imgS/2, btn.y - imgS/2, imgS,imgS);

    },
    drawBtn: function(btn,rad,img) {
        var t = this;
        var dl = app.drawLib;
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
      
        
        dl.drawOutCircle(t.ctx,btn.x,btn.y,rad,bgCol,.9,bor);
        dl.drawImage(t.ctx,image,btn.x - imgS/2, btn.y - imgS/2, imgS,imgS);

    },
    drawDirection: function (){
        var t = this;
        var dl = app.drawLib;
       if(t.exState == 'tabs'){
            dl.wrapText(t.ctx,'DRAG HERE TO BROWSE EXHIBITS',t.exCol.x+t.exCol.w/2 + 10,t.exCol.y + t.exCol.h/3 + 50,30, t.textCol.dark, t.exCol.w/1.5,25);
        }
        if(t.activeUser == true){
            // this.drawRect(t.prefsCollier.x - 50,t.prefsCollier.y + 20,t.phoneCol.w+20,t.prefsCollier.h,'#fff',.5);
            if(t.currentTagType == 'c'){
                dl.wrapText(t.ctx,'DRAG HERE TO ADD INTEREST',t.prefsCollier.x - 50 + 100 ,t.prefsCollier.y + t.prefsCollier.h/3 + 50,30, t.textCol.dark, t.exCol.w/1.5,25);
            }
            if(t.currentTagType == 'p'){
                dl.wrapText(t.ctx,'DRAG HERE TO REMOVE FROM INTEREST',t.dePerfCol.x + t.dePerfCol.w/2 , t.dePerfCol.y + t.dePerfCol.h/3,30, t.textCol.dark, t.exCol.w/1.5,25);
            }

           
      }
        
        
    },
    
    drawTag: function(tag,i){
        var t = this;
        var dl = app.drawLib;
        var ts = t.tagtextSize;
        var imgs = t.tagimgSize;
        if(t.drawDir == true && t.currentTagType == 'p'){
             this.ctx.globalAlpha = .3;
        }
        var name = tag.name.toUpperCase();
        if(tag.selected == false ){
            t.tagImgs[i].src = 'img/Icons/dark/' + tag.img;
            dl.drawOutRect(t.ctx,tag.x,tag.y,tag.w,tag.h,'white',t.textCol.dark);
            dl.drawImage(t.ctx,t.tagImgs[i],tag.x + imgs/2,tag.y + imgs/2,imgs,imgs);
            dl.drawText(t.ctx,name,tag.x +tag.w/2, tag.y + tag.h/1.5,ts,t.textCol.mid,tag.w);
            dl.drawText(t.ctx,"+",tag.x +tag.w - imgs, tag.y + tag.h/1.5,ts,t.colors.teal,imgs);
        }
        if(tag.selected == true){
            t.tagImgs[i].src = 'img/Icons/white/' + tag.img;
            dl.drawOutRect(t.ctx,tag.x,tag.y,tag.w,tag.h,t.colors.teal,t.textCol.dark);
            dl.drawImage(t.ctx,t.tagImgs[i],tag.x + imgs/2,tag.y + imgs/2,imgs,imgs);
            dl.drawText(t.ctx,name,tag.x +tag.w/2, tag.y + tag.h/1.5,ts,'white',tag.w);
            dl.drawText(t.ctx,"+",tag.x +tag.w - imgs, tag.y + tag.h/1.5,ts,'white',imgs);
        }
        if(t.drawDir == true && t.currentTagType == 'p'){
             this.ctx.globalAlpha = 1;
        }
    },
    drawPrefTags: function(tag,i){
        var t = this;
        var dl = app.drawLib;
        var ts = t.tagtextSize;
        var imgs = t.tagimgSize;
        if(t.drawDir == true){
             this.ctx.globalAlpha = .4;
        }
        var name = tag.name.toUpperCase();
        if(tag.selected == false){
            t.tagImgs[i].src = 'img/Icons/white/' + tag.img;
            dl.drawOutRect(t.ctx,tag.x,tag.y,tag.w,tag.h,t.colors.gold,t.colors.gold);
            dl.drawImage(t.ctx,t.tagImgs[i],tag.x + imgs/2,tag.y + imgs/2,imgs,imgs);
            dl.drawText(t.ctx,name,tag.x +tag.w/2, tag.y + tag.h/1.5,ts,'white',tag.w);
            dl.drawText(t.ctx,"x",tag.x +tag.w - imgs, tag.y + tag.h/1.5,ts,'white',imgs);
        }
        if(tag.selected == true){
             t.tagImgs[i].src = 'img/Icons/white/' + tag.img;
            dl.drawOutRect(t.ctx,tag.x,tag.y,tag.w,tag.h,t.colors.teal,t.textCol.dark);
            dl.drawImage(t.ctx,t.tagImgs[i],tag.x + imgs/2,tag.y + imgs/2,imgs,imgs);
            dl.drawText(t.ctx,name,tag.x +tag.w/2, tag.y + tag.h/1.5,ts,'white',tag.w);
            dl.drawText(t.ctx,"x",tag.x +tag.w - imgs, tag.y + tag.h/1.5,ts,'white',imgs);
        }
        if(t.drawDir == true){
             this.ctx.globalAlpha = 1;
        }
    },
    drawExInfoBar:function(info,i){

        var t = this;
        var dl = app.drawLib;
         if(t.drawDir == true){
             this.ctx.globalAlpha = .2;
        }
        t.exInfoImgs[i].src = 'img/Icons/white/' +info.img;
        var w = t.exCol.w;
        var size = info.h;
        var ttsize = 13;
        dl.drawRect(t.ctx,info.x,info.y,size,size,info.color);
        dl.drawImage(t.ctx,t.exInfoImgs[i],info.x + (size *.1),info.y + (size *.1),size * .8,size *.8);
        dl.drawLeftText(t.ctx,info.name,150,info.y +15, 15,t.textCol.dark,info.w - 135);
        dl.drawImage(t.ctx,t.forImg, info.forBtn.x,info.forBtn.y,info.forBtn.w,info.forBtn.h);
        var tags = info.tags.join(', ');
        if(info.tags.length >5){
            ttsize = 15;
            tags = info.tags[0] +', '+ info.tags[1]+', '+info.tags[2]+', '+ info.tags[3]+', '+info.tags[4]+'....';
        }
         dl.wrapTextLeft(t.ctx,tags,150,info.y +40, 15,t.textCol.mid,info.w - 130,ttsize);
          if(t.drawDir == true){
             this.ctx.globalAlpha = 1;
        }
    },
    drawExbDetail:function(info ,i){
        var t = this;
        var dl = app.drawLib;
        t.exInfoImgs[i].src = 'img/Icons/white/' +info.img;
        var w = t.exCol.w;
        var size = 96;
        var ec = info;
        dl.drawRect(t.ctx,ec.x,ec.y + 30,size,size,info.color);
        dl.drawImage(t.ctx,t.exInfoImgs[i],ec.x + (size *.15),ec.y + (size *.15) + 30,size * .7,size *.7);
        dl.wrapTextLeft(t.ctx,info.name,180,ec.y + 47, 20,t.textCol.dark,info.w - 120,20);

        var newPeps = info.exhibitors.join(' - ');
        dl.wrapText(t.ctx,newPeps, info.w/2 + size,ec.y +size + 40 + 30, 15,t.textCol.mid, info.w, 15);
        var nh = dl.getWrapH(t.ctx,newPeps, info.w/2 + size,ec.y +size + 40 + 30, 15,t.textCol.dark, info.w, 17);
        //console.log(nh);
        dl.wrapText(t.ctx,info.description,info.w/2 + size,ec.y + size + 40 + 30 + 36 + nh ,20,t.textCol.mid,info.w,15);
        var nh2 = dl.getWrapH(t.ctx,info.description,info.w/2 + size,ec.y + size + 40 + 30 + 36 + nh ,20,t.textCol.mid,info.w,15);
       
        nh = nh + nh2;

        dl.drawImage(t.ctx,t.distanceImg,115,ec.y + size + 40 + 30 + 36 + nh,30,30);
        //getDistance
        dl.drawText(t.ctx,'~ ' + info.dist +' min',115 + size,ec.y + size + 40 + 30 + 36 + nh + 22, 20, t.textCol.mid, info.w/2);
        dl.drawImage(t.ctx,t.timeImg,115,ec.y + size + 40 + 30 + 36 + nh + 44 + 15,30,30);
        dl.drawText(t.ctx,info.time,115 + size,ec.y + size + 40 + 30 + 36 + nh + 44 + 15 + 22, 20, t.textCol.mid, info.w/2);
        //get time
        dl.drawImage(t.ctx,t.locationImg,ec.w/2+size ,ec.y + size + 40 + 30 + 36 + nh,30,30);
        dl.wrapText(t.ctx,info.location,ec.w/2+size + size, ec.y + size + 40 + 30 + 36 + nh + 22, 12, t.textCol.mid, info.w/3);
        dl.drawImage(t.ctx,t.userImg,ec.w/2 + size,ec.y + size + 40 + 30 + 36 + nh + 44 + 15,30,30);
        dl.drawText(t.ctx,"All",ec.w/2+size + size, ec.y + size + 40 + 30 + 36 + nh + 44 + 15 + 22, 20, t.textCol.mid, info.w/2);
    },
    
    drawZone: function(zone,i,imgArray){
        var t = this;
        var imgpath;
        var dl = app.drawLib;
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
        dl.drawImage(t.ctx,imgArray[i],zone.x,zone.y,zone.w,zone.h);
    },
  
    clearCanvas: function () {
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    },

};
    





window.onload = function () {

    //startup();
    var t =app.main;
    window.addEventListener("touchstart", getTapPos, false);
    
    window.addEventListener("touchmove", handleDrag, false);
    window.addEventListener("touchend", handleTouchEnd, false);

   
      app.main.init();
        t.allUserXYs =[];
        for(var v = 0; v < 500; v ++){
                var x = Math.floor(Math.random() * t.WIDTH) + 324;
                var y = Math.floor(Math.random() * 700) + 284;
                t.allUserXYs.push({x:x,y:y});
        }

      setInterval(function(){ t.shuffedArray = t.shuffleArray(t.exInfo); }, 60000);
       
       setInterval(function(){
        t.allUserXYs =[];
        for(var v = 0; v < 500; v ++){
                var x = Math.floor(Math.random() * t.WIDTH) + 324;
                var y = Math.floor(Math.random() * 700) + 284;
                t.allUserXYs.push({x:x,y:y});
        }
    }, 60000);
}

