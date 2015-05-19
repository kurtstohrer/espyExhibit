//drawLib.js
"use strict"

var app = app || {};

app.drawLib = {

    drawText: function (ctx,string, x, y, size, col, maxWidth) {
        ctx.save();
        ctx.font = size + 'px Lato';
        ctx.fillStyle = col;
        ctx.textAlign = 'center';
        ctx.fillText(string, x, y, maxWidth);
        ctx.restore();
    },
    drawLeftText: function (ctx, string, x, y, size, col, maxWidth) {
        ctx.save();
        ctx.font = size + 'px Lato';
        ctx.fillStyle = col;
        ctx.textAlign = 'Left';
        ctx.fillText(string, x, y, maxWidth);
        ctx.restore();
    },
    wrapText: function(ctx, string,x,y,lineHeight,col,maxWidth,size){
        ctx.save();
       
        var words = string.split(' ');
        var line = '';
        ctx.fillStyle = col;
        ctx.textAlign = 'center';
        ctx.font = size + 'px Lato';
       
        for(var n = 0; n < words.length; n++){
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
           
          }
          else {
           // numlines +=1;
            line = testLine;
          }

        }
        
        ctx.fillText(line, x, y);
      
      ctx.restore();
    },
    wrapTextLeft: function(ctx, string,x,y,lineHeight,col,maxWidth,size){
        ctx.save();
       
        var words = string.split(' ');
        var line = '';
        ctx.fillStyle = col;
        ctx.textAlign = 'left';
        ctx.font = size + 'px Lato';
       
        for(var n = 0; n < words.length; n++){
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
           
          }
          else {
           // numlines +=1;
            line = testLine;
          }

        }
        
        ctx.fillText(line, x, y);
      
      ctx.restore();
    },
    getWrapH: function(ctx,string,x,y,lineHeight,col,maxWidth,size){

                var oy  = y;
                var words = string.split(' ');
                var line = '';
               
                var numlines = 1;
                for(var n = 0; n < words.length; n++){
                  var testLine = line + words[n] + ' ';
                  var metrics = ctx.measureText(testLine);
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
                
             var he = (size+lineHeight) * numlines;

             return he;
              
             
    },


  //BASIC FUNCTIONS
  drawCircle: function (ctx,centerX, centerY, radius, col, alph) {

        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = alph;
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = col;
        ctx.fill();
        ctx.restore();
    },
    drawOutCircle: function (ctx,centerX, centerY, radius, col, alph,bc) {

        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = alph;
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = col;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = bc;
        ctx.stroke();
        ctx.restore();
    },
    drawCircShadow: function(ctx,centerX, centerY, radius, col, alph){
        ctx.save(); // Save the state of the context
        ctx.fillStyle = col; // Sets the fill color
        ctx.globalAlpha = alph;
        ctx.shadowOffsetX = 0; // Sets the shadow offset x, positive number is right
        ctx.shadowOffsetY = 5; // Sets the shadow offset y, positive number is down
        ctx.shadowBlur = 10; // Sets the shadow blur size
        ctx.shadowColor = col; // Sets the shadow color
        ctx.beginPath(); // Starts a shape path
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fill(); // Fills the path
        ctx.restore(); // Restore the state of the context
    },

    drawRect: function (ctx,x, y, w, h, col, alph) {
        ctx.save();
        ctx.globalAlpha = alph;
        ctx.fillStyle = col;
        ctx.fillRect(x, y, w, h);
        ctx.restore();
    },
    drawOutRect : function( ctx ,x, y, w, h, col, out)
    {
        ctx.save();
        ctx.fillStyle = col;
        ctx.strokeStyle = out;
        ctx.lineWidth = 1;
        ctx.fillRect(x,y,w,h);
        ctx.strokeRect(x,y,w,h);
        ctx.restore();
    },
    drawImage: function (ctx, image, x, y, w, h) {

        ctx.save();
        ctx.drawImage(image, x, y, w, h);
        ctx.restore();
    },
};