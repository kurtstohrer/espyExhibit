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
    t.state = 'default';
    if(t.isPointinRect(x,y,t.exCol)){
        t.canScroll = true;


    }
    else{
        if(t.recoBtn.selected == true){
           
        }
        
       
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
                t.clearSearch();
                //console.log('Its a Hit')
                t.currentZone.shift();
                t.exState = "PDP";
                t.topText = ta.name;
                 t.curInfo.shift();
                if(ta.selected == false){
               
                    t.curInfo.push(ta.code);
                    //console.log(t.curInfo);
                }
           
            }
            else{

            }
        }
    }
    if(t.isPointinRect(x,y,t.phoneCol)){
        switch (t.activeUser){
            case true:
                t.activeUser = false;
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
                     t.prefs = [];
                        t.prefTags =[];
                        t.prefCols = [];
                break;
            case false:
                t.activeUser = true;
                break;

        }

    }
    if(t.isPointinRect(x,y,t.backBtn)){
         if(t.exState == 'PDP' || t.zoneBtns[1].selected == true || t.zoneBtns[0].selected == true || t.zoneBtns[0].selected == false && t.searchTags.length > 0){
                 //t.searchTags = [];
                t.curInfo.shift();
                t.cINFO = [];
                t.clearSearch();
                t.searchTags = [];
                t.exCols = [];
                t.exTags = [];
                t.resetTags();
                  t.handleCurrentInfo();
                t.updateInfoCards();
                t.updateExTags();
                
                

            
                t.zoneBtns[1].selected = false;
               t.zoneBtns[0].selected = false;
               initZones();
                t.exState = 'tabs';
                t.topText = 'Featured Exhibits';
                 t.currentZone.shift();
       }
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
        if(t.exState == 'tabs'   ){
            //t.state = 'default';
   
       t.currentZone.shift();
       t.topText = 'Featured Exhibits';
   
        for(var j = 0; j < t.zones.length; j++){
             
                if(t.zones[j].name == touchedCircles[0].name  ){
                         t.recoBtn.selected = false;

                     
                            switch(t.zones[j].state){
                                case 'default':
                                    t.currentZone.push(t.zones[j]);
                                     for(var w = 0; w < t.zoneBtns.length; w++){
                                        var zb = t.zoneBtns[w];        
                                        zb.popTimer  = zb.oPop;
                                    }
                                      break;
                                case 'selected':
                                 
                                    t.currentZone.push(t.zones[j]);
                                   
                                      break;
                            }
                        

                   
                           
                                
            }
            else{
              

            }
        
            
        }
    
        
    }
        for(var w = 0; w < t.zoneBtns.length; w++){

                var zb = t.zoneBtns[w];

               if(zb.name == touchedCircles[0].name ){
                    t.currentZone.push(t.getSelectedZone());     
                    var curZone = t.getSelectedZone(); 
                            switch(zb.selected){
                                case true:

                                     zb.selected = false;
                                      t.topText = 'Featured Exhibits';
                                          

                                      break;
                                case false:

                                    zb.selected = true;

                                     t.topText = curZone.name;
                                      break;
                            }
                 
                                   
            }

            else{
               zb.selected = false;

            }
            
        }
         if(t.zoneBtns[2].name == touchedCircles[0].name){
             for(var f = 0; f < 30; f++){
                 t.clearSearch();
                 t.exTags = [];
                t.exCols =[];
            }
            t.topText = 'Featured Exhibits';

        }
        if(t.exState == 'tabs'){
        if(t.zoneBtns[1].name == touchedCircles[0].name ){
          

          // console.log(t.searchTags);
            for(var h = 0; h < t.searchTags.length; h++){
                var la = t.searchTags[h];
                


                var pos =  t.searchTags.map(function(e) { return e.name; }).indexOf(la);
                if(pos > -1){
                    console.log(pos);
                    if(la.prefd == true){
                        t.prefs.push(la);
                        t.resetTags();
                       
                    }
                        t.searchTags.splice(h,1);
                        t.resetTags();

                        
                    }
                t.resetTags();
                t.prefTags = [];
                t.prefCols =[];

                    
            
            }
             for(var f = 0; f < 30; f++){
                 t.clearSearch();
                 t.exTags = [];
                 t.exCols =[];
            }
           
           
        }
        if(t.zoneBtns[0].name == touchedCircles[0].name){
            console.log(t.zoneBtns[0].selected);
            t.clearSearch();
            if(t.zoneBtns[0].selected == true){
             t.setAllZoneTags();
            }
            if(t.zoneBtns[0].selected == false){
             initZones();
            }

        }
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
                    t.topText = "Featured Exhibits"
                    //t.recoBtn.selected = false;
                    //t.currentInfos = [];
                     //t.cINFO = [];
                   
                    break;
                case false:
                    t.recoBtn.selected = true;
                    t.visitedBtn.selected = false;
                    t.topText = "Recommended Exhibits"
                   // t.currentInfos = [];
                   
                    t.exState = "tabs";
                    
                    
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
                t.currentInfos[w].forBtn.y = t.currentInfos[w].y;
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