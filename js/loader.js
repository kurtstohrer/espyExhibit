 function loadAssets(){
    loadImages();
    initTags();
    initZones();
    loadBtns();
 }



 function initTags(){

        var t = app.main;
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
                name: "Environment",
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
                name: "Food",
                x:undefined,
                y:undefined,
                img:"food.png",
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
                name: "Student Organization",
                x:undefined,
                y:undefined,
                img:"student-organization.png",
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
    }
    
    function initZones(){
       
       var t = app.main;
       t.zones = [ 
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
            name:"Tech Quarter",
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

        t.fhColEx = {
            name:"Field House",
            cx: 1620,
            cy: 404,
            r: 134,
        }
        t.centralColEx = {
            name:"RIT Central",
            cx: 1227,
            cy: 700,
            r: 108,
        }
        t.sciColEx = {
            name:"Science Center",
            cx: 791,
            cy: 625,
            r: 96,
        }
        t.techColEx = {
            name:"Technology Quarter",
            cx: 650,
            cy: 362,
            r: 70,
        }

    }




  function loadImages () {
        var t = app.main;

        t.mapImage = new Image();
        t.mapImage.src = "img/map.jpg";

        t.phoneZone = new Image();
        t.phoneZone.src = "img/misc/phonezone.png";

        t.heatmapImg = new Image();
        t.heatmapImg.src = "img/btns/dark/heatmap.png";

        t.heatmapKey = new Image();
        t.heatmapKey.src = "img/misc/heatmap-key.png";

        t.recoImg = new Image();
        t.recoImg.src = "img/btns/dark/recommended.png";

        t.visitImg = new Image();
        t.visitImg.src = "img/btns/dark/visited.png";

        t.xImg = new Image();
        t.xImg.src = "img/btns/white/X.png";

        t.lgImg = new Image();
        t.lgImg.src = "img/lowerdGrad.png";

        t.backImg = new Image();
        t.backImg.src = "img/misc/back.png";

        t.forImg = new Image();
        t.forImg.src = "img/misc/forward.png";

        t.distanceImg = new Image();
        t.distanceImg.src = "img/misc/distance.png";
        
        t.locationImg = new Image();
        t.locationImg.src = "img/misc/location.png";
        
        t.userImg = new Image();
        t.userImg.src = "img/misc/user.png";
        
        t.timeImg = new Image();
        t.timeImg.src = "img/misc/time.png";
        
        t.hideImg = new Image();
        t.hideImg.src = "img/hide.png";

        t.userLocImg = new Image();
        t.userLocImg.src = "img/misc/userLoc.png";

        t.dragExImg = new Image();
        t.dragExImg.src = "img/misc/dragEx.png";

        t.headerImg = new Image();
        t.headerImg.src = "img/Heading.png";

        
    }

    function loadBtns(){
        var t = app.main;

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
        t.rexCol = {
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

         t.zoneBtns = [
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
            oPop: 10,
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
            oPop: 15,
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
    }