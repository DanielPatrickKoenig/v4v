var _vm;
(function(){
  Vue.options.delimiters = ['{%', '%}'];
  var mainVue = new Vue({
    el:"#drawingContainer",
    data:{
      modes:{DRAW:"draw",EDIT:"edit",SCALE:"scale"},
      labelMatrix:{x:"X Position",y:"Y Position",rx:"Horizontal Radius",ry:"Vertical Radius",arc:"Large Arc Flag",sweep:"Sweep Flag",angle:"Rotation"},
      rxArchDrag:-1,
      ryArchDrag:-1,
      rotationArchDrag:-1,
      items:["apples","Cheese","Farts"],
      points:[],
      selectedPoint:-3,
      selectedSubPoint:-1,
      currentMode:"draw",
      drawCommands:{M:"M",L:"L",C:"C",S:"S",T:"T",Q:"Q",V:"V",H:"H",A:"A",Z:"Z"},
      drawCommandPaths:{
        load:"M 70.622 32.102 v 26.452 c 0 2.375 -1.925 4.299 -4.299 4.299 H 15.771 c -2.374 0 -4.299 -1.925 -4.299 -4.299 V 32.102 c 0 -2.374 1.925 -4.298 4.299 -4.298 h 12.896 v 8.598 H 20.07 v 17.855 h 41.955 V 36.401 h -8.598 v -8.598 h 12.896 C 68.697 27.803 70.622 29.728 70.622 32.102 Z M 51.683 18.999 l -10.48 -10.48 l -10.48 10.48 h 6.181 v 30.333 h 8.598 V 18.999 H 51.683 Z",
        save:"M 70.622 32.102 v 26.452 c 0 2.375 -1.925 4.299 -4.299 4.299 H 15.771 c -2.374 0 -4.299 -1.925 -4.299 -4.299 V 32.102 c 0 -2.374 1.925 -4.298 4.299 -4.298 h 12.896 v 8.598 H 20.07 v 17.855 h 41.955 V 36.401 h -8.598 v -8.598 h 12.896 C 68.697 27.803 70.622 29.728 70.622 32.102 Z M 30.723 38.852 l 10.48 10.48 l 10.48 -10.48 h -6.181 V 8.518 h -8.598 v 30.333 H 30.723 Z",
        undo:"M 62.294 47.688 c 0 -12.658 -10.697 -23.205 -24.883 -25.573 V 11.756 L 18.617 26.995 l 18.794 15.239 v -9.65 c 12.621 2.091 22.07 10.592 22.07 20.768 c 0 3.417 -1.07 6.642 -2.962 9.502 C 60.15 58.58 62.294 53.347 62.294 47.688 Z",
        redo:"M 18.616 47.688 c 0 -12.658 10.697 -23.205 24.883 -25.573 V 11.756 l 18.794 15.239 L 43.499 42.233 v -9.65 c -12.621 2.091 -22.07 10.592 -22.07 20.768 c 0 3.417 1.07 6.642 2.962 9.502 C 20.76 58.58 18.616 53.347 18.616 47.688 Z",
        L:"M 28.923 8.518 h 11.628 v 42.624 h 16.015 v 11.711 H 28.923 V 8.518 Z",
        H:"M 19.736 8.518 h 11.711 v 20.939 h 19.242 V 8.518 h 11.711 v 54.335 H 50.689 V 41.251 H 31.447 v 21.602 H 19.736 V 8.518 Z",
        V:"M 15.391 8.518 h 11.854 l 13.741 36.127 L 54.751 8.518 h 11.871 L 46.05 62.853 H 35.881 L 15.391 8.518 Z",
        T:"M 22.736 8.518 h 36.541 v 11.545 H 46.821 v 42.79 H 35.11 v -42.79 H 22.736 V 8.518 Z",
        C:"M 62.649 11.415 v 13.242 c -5.876 -3.531 -11.022 -5.297 -15.436 -5.297 c -4.415 0 -7.945 1.518 -10.594 4.552 c -2.648 3.035 -3.973 7.117 -3.973 12.249 c 0 4.855 1.393 8.738 4.18 11.648 c 2.786 2.911 6.51 4.366 11.173 4.366 c 4.083 0 8.966 -1.641 14.649 -4.925 v 13.16 c -6.373 2.124 -11.684 3.187 -15.932 3.187 c -7.311 0 -13.519 -2.684 -18.622 -8.049 c -5.104 -5.366 -7.656 -11.911 -7.656 -19.636 c 0 -7.863 2.6 -14.519 7.801 -19.967 c 5.2 -5.448 11.525 -8.173 18.974 -8.173 C 52.014 7.773 57.159 8.987 62.649 11.415 Z",
        S:"M 57.083 13.442 L 49.8 21.429 c -3.834 -2.262 -6.594 -3.393 -8.276 -3.393 c -1.297 0 -2.414 0.49 -3.352 1.469 c -0.938 0.979 -1.407 2.144 -1.407 3.495 c 0 2.676 2.427 4.993 7.283 6.952 c 3.559 1.519 6.249 2.892 8.069 4.119 c 1.821 1.228 3.345 2.932 4.573 5.11 c 1.228 2.18 1.842 4.539 1.842 7.076 c 0 4.663 -1.883 8.719 -5.649 12.167 c -3.766 3.448 -8.214 5.173 -13.346 5.173 c -5.628 0 -11.187 -2.648 -16.677 -7.945 l 7.697 -8.98 c 3.448 3.559 6.676 5.339 9.683 5.339 c 1.407 0 2.758 -0.626 4.056 -1.878 c 1.296 -1.252 1.945 -2.566 1.945 -3.942 c 0 -2.834 -2.994 -5.333 -8.98 -7.495 c -3.421 -1.248 -5.849 -2.417 -7.283 -3.507 c -1.435 -1.09 -2.642 -2.676 -3.621 -4.759 c -0.98 -2.083 -1.469 -4.214 -1.469 -6.394 c 0 -4.827 1.573 -8.745 4.717 -11.752 c 3.146 -3.007 7.256 -4.511 12.332 -4.511 C 47.952 7.773 53 9.663 57.083 13.442 Z",
        Q:"M 60.68 55.555 l 6.687 7.712 l -7.909 5.011 l -6.096 -7.355 c -4.578 1.674 -8.673 2.51 -12.285 2.51 c -8.025 0 -14.608 -2.669 -19.751 -8.008 c -5.143 -5.338 -7.713 -12.187 -7.713 -20.546 c 0 -6.896 2.503 -13.124 7.511 -18.684 c 5.007 -5.559 11.635 -8.339 19.884 -8.339 c 7.724 0 14.228 2.648 19.512 7.943 c 5.282 5.296 7.924 11.818 7.924 19.567 C 68.443 43.31 65.855 50.039 60.68 55.555 Z M 45.7 51.97 l -5.727 -6.789 l 7.696 -5.006 l 5.282 6.192 c 2.134 -2.367 3.201 -5.837 3.201 -10.406 c 0 -5.259 -1.379 -9.45 -4.138 -12.575 c -2.759 -3.125 -6.429 -4.688 -11.008 -4.688 c -4.442 0 -8.069 1.55 -10.883 4.649 s -4.221 7.102 -4.221 12.007 c 0 4.987 1.35 9.086 4.05 12.296 s 6.118 4.815 10.25 4.815 C 41.746 52.466 43.578 52.301 45.7 51.97 Z",
        A:"M 36.47 8.518 h 9.072 l 22.135 54.335 H 55.892 l -4.349 -10.677 H 30.691 l -4.26 10.677 H 14.708 L 36.47 8.518 Z M 41.007 26.313 l -6.388 16.015 h 12.912 L 41.007 26.313 Z"
      },
      //suspendToggle:false,
      currentDrawCommand:"C",
      startingAnchor:undefined,
      reserveAnchor:undefined,
      pointSatelites:[],
      shapes:[],
      selectedShape:-1,
      tempShapePoints:[],
      shapeMoveOrigin:undefined,
      pointCreationOrigin:{x:0,y:0},
      shouldStartShape:true,
      controlDimensions:{width:120,height:120,sideRotationHandle:10,sideRadiusHandle:10,endPoint:8,anchorPoint:4,rx:{x:-16,y:22,length:32,baseWidth:6},ry:{x:-22,y:-16,length:32,baseWidth:6}},
      sidePanlEditing:false,
      controlPosition:{},
      loading:false,
      loadTypes:["file","string"],
      loadType:0,
      loadedString:"",
      loadedFile:"",
      saving:false,
      sizingCircles:[],
      selectedResizeHandle:-1,
      suspendSizeRead:false,
      startSize:{x:0,y:0,width:0,height:0},
      pointsResizingCopy:[],
      toggledPointIndex:-1
    },
    methods:{
      onToggleDirective:function(e){
        var self = this;
        var directiveToggles = document.getElementsByClassName("directive-toggle");
        for(var i = 0;i<directiveToggles.length;i++){
          if(directiveToggles[i] != e.currentTarget){
            directiveToggles[i].checked = false;
          }
        }
        self.$data.toggledPointIndex = e.currentTarget.checked ? Number(e.currentTarget.getAttribute("toggle_index")) : -1;
      },
      inportPath:function(_path){
        var self = this;
        self.$data.points = v4v.pathTransformer(_path).primedRawList();
        self.$data.shapes.push({points:v4v.pathTransformer(_path).primedRawList(),fill:"#00cc00",stroke:"transparent",strokeWidth:"0"});
        self.$data.selectedShape = self.$data.shapes.length-1;
      },
      onCheckArchClicked:function(e){
        var self = this;
        var pointIndex = Number(e.currentTarget.getAttribute("point-index"));
        var subIndex = Number(e.currentTarget.getAttribute("sub-index"));
        var attrName = e.currentTarget.getAttribute("attribute-name");
        self.$data.points[pointIndex][subIndex][attrName] = e.currentTarget.checked ? 1 : 0;
        mapToShapes(self.$data);
      },
      onStagePressed:function(e){
        var self = this;

        
        self.$data.pointCreationOrigin = {x:e.pageX,y:e.pageY};

        switch(self.$data.currentMode){
            case self.$data.modes.EDIT:
            case self.$data.modes.SCALE:{
              //mapToShapes(self.$data);
              //self.$data.showPoints = false;
              self.$data.shouldStartShape = true;
              self.$data.selectedShape = -1;
              self.$data.points = [];

              break;
            }
            case self.$data.modes.DRAW:
            {
              
              if(self.$data.points.length<1 || self.$data.shouldStartShape){
                //self.$data.points.push({x:e.pageX,y:e.pageY,back:{x:e.pageX,y:e.pageY},forward:{x:e.pageX,y:e.pageY}});
                self.$data.shouldStartShape = false;
                self.$data.points.push([{command:self.$data.drawCommands.M,x:e.pageX,y:e.pageY}]);
                self.$data.selectedShape = self.$data.shapes.length;

              }
              else{
                switch(self.$data.currentDrawCommand){
                  case self.$data.drawCommands.L:
                  case self.$data.drawCommands.T:{
                    self.$data.points.push([{command:self.$data.currentDrawCommand,x:e.pageX,y:e.pageY}]);
                    break;
                  }
                  case self.$data.drawCommands.C:
                  case self.$data.drawCommands.S:
                  case self.$data.drawCommands.Q:{
                    self.$data.points.push([]);
                    var pLong = self.$data.points.length-1;
                    if(self.$data.reserveAnchor!=undefined){
                      //self.$data.reserveAnchor.x = self.$data.points[pLong-1][self.$data.points[pLong-1].length-1].x;
                      //self.$data.reserveAnchor.y = self.$data.points[pLong-1][self.$data.points[pLong-1].length-1].y;
                      self.$data.points[pLong].push({x:self.$data.reserveAnchor.x,y:self.$data.reserveAnchor.y,command:self.$data.currentDrawCommand});
                      //self.$data.reserveAnchor = undefined;
                    }
                    self.$data.points[pLong].push({x:e.pageX,y:e.pageY});
                    if(self.$data.currentDrawCommand == self.$data.drawCommands.C){
                      self.$data.points[pLong].push({x:e.pageX,y:e.pageY});
                    }
                    
                    break;
                  }
                  // case self.$data.drawCommands.S:{
                  //   break;
                  // }
                  // case self.$data.drawCommands.Q:{
                  //   break;
                  // }
                  case self.$data.drawCommands.V:{
                    self.$data.points.push([{command:self.$data.currentDrawCommand,y:e.pageY}]);
                    break;
                  }
                  case self.$data.drawCommands.H:{
                    self.$data.points.push([{command:self.$data.currentDrawCommand,x:e.pageX}]);
                    break;
                  }
                  case self.$data.drawCommands.A:{
                    var lastPoint = self.$data.points[self.$data.points.length-1][self.$data.points[self.$data.points.length-1].length-1];
                    var dist = 50;
                    self.$data.points.push([{command:self.$data.currentDrawCommand,x:e.pageX,y:e.pageY,rx:dist,ry:dist,angle:0,arc:0,sweep:1}]);
                    break;
                  }
                }
              }
              self.$data.selectedPoint = self.$data.points.length-1;
              //self.$data.points.push({x:e.pageX,y:e.pageY,back:{x:e.pageX,y:e.pageY},forward:{x:e.pageX,y:e.pageY}});
              
            }
          }

          createSizingCircles(self.$data);

      },
      shapeSelected:function(e){
        var self = this;
        var index = Number(e.currentTarget.getAttribute("shape-index"));
        //onShapeSelected(index,self,e);
        switch(self.$data.currentMode){
          case self.$data.modes.EDIT:
          case self.$data.modes.SCALE:
          {
            //self.$data.movingShape = true;

            //console.log("shapeSelected");
            self.$data.shouldStartShape = true;
            self.$data.selectedShape = index;
            self.$data.shapeMoveOrigin = {x:e.pageX,y:e.pageY};

            self.$data.points = JSON.parse(JSON.stringify(self.$data.shapes[self.$data.selectedShape].points));//self.$data.shapes[self.$data.selectedShape].points;
            self.$data.tempShapePoints = JSON.parse(JSON.stringify(self.$data.points));
            
            break;
          }
        }
        createSizingCircles(self.$data);
        
      },
      onPointPress:function(e){
        var self = this;

        // if(self.$data.currentMode == "edit"){

        //   self.$data.selectedPoint = Number(e.currentTarget.getAttribute("point-index"));
        //   console.log(Number(e.currentTarget.getAttribute("point-index")));
        // }

        self.$data.selectedPoint = Number(e.currentTarget.getAttribute("point-index"));
        self.$data.selectedSubPoint = Number(e.currentTarget.getAttribute("sub-index"));

        switch(self.$data.currentMode){
          
          case self.$data.modes.DRAW:{
            if(self.$data.points[self.$data.selectedPoint][0].command==self.$data.drawCommands.M){
              //close shape
              //console.log("start clicked");

              if(self.$data.points[self.$data.points.length-1][0].command==self.$data.drawCommands.C){
                self.$data.points.push([{x:self.$data.reserveAnchor.x,y:self.$data.reserveAnchor.y,command:self.$data.drawCommands.C},{x:self.$data.startingAnchor.x,y:self.$data.startingAnchor.y},{x:self.$data.points[self.$data.selectedPoint][0].x,y:self.$data.points[self.$data.selectedPoint][0].y}]);
              }



              closeShape(self.$data);

            }
            break;
          }
          case self.$data.modes.EDIT:
          case self.$data.modes.SCALE:{
            //self.$data.selectedPoint = Number(e.currentTarget.getAttribute("point-index"));
            //self.$data.selectedSubPoint = Number(e.currentTarget.getAttribute("sub-index"));

            if(self.$data.selectedPoint>=0){
              switch(self.$data.points[self.$data.selectedPoint][0].command)
              {
                case self.$data.drawCommands.L:
                case self.$data.drawCommands.T:
                case self.$data.drawCommands.H:
                case self.$data.drawCommands.V:
                case self.$data.drawCommands.A:
                {
                  break;
                }
                case self.$data.drawCommands.M:{
                  if(self.$data.points[self.$data.selectedPoint+1] != undefined && self.$data.points[self.$data.selectedPoint+1][0].command == self.$data.drawCommands.C){
                    var p1 = self.$data.points[self.$data.selectedPoint+1][0];
                    self.$data.pointSatelites[0] = {point:p1,offset:{x:p1.x-self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].x,y:p1.y-self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].y},mode:"follow"};
                    if(self.$data.startingAnchor != undefined){
                      var p2 = self.$data.startingAnchor;
                      self.$data.pointSatelites[1] = {point:p2,offset:{x:p2.x-self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].x,y:p2.y-self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].y},mode:"follow"};
                    }
                  }
                  break;
                }
                case self.$data.drawCommands.C:
                case self.$data.drawCommands.S:
                case self.$data.drawCommands.Q:{
                  if(self.$data.selectedSubPoint == self.$data.points[self.$data.selectedPoint].length-1/*2*/){
                    var p1 = self.$data.points[self.$data.selectedPoint][self.$data.points[self.$data.selectedPoint].length-2];
                    
                    self.$data.pointSatelites[0] = {point:p1,offset:{x:p1.x-self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].x,y:p1.y-self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].y},mode:"follow"};
                    if(self.$data.points[self.$data.selectedPoint][0].command == self.$data.drawCommands.C){
                      if(self.$data.points[self.$data.selectedPoint+1]!=undefined && self.$data.points[self.$data.selectedPoint+1][0].command==self.$data.drawCommands.C){
                        var p2 = self.$data.points[self.$data.selectedPoint+1][0];
                        self.$data.pointSatelites[1] = {point:p2,offset:{x:p2.x-self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].x,y:p2.y-self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].y},mode:"follow"};
                      }
                      else if(self.$data.points[self.$data.selectedPoint+1]==undefined && self.$data.reserveAnchor != undefined){
                        var p2 = self.$data.reserveAnchor;
                        self.$data.pointSatelites[1] = {point:p2,offset:{x:p2.x-self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].x,y:p2.y-self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].y},mode:"follow"};
                      }
                    }
                    
                  }
                  else if (self.$data.points[self.$data.selectedPoint][0].command == self.$data.drawCommands.C){
                    var targetAnchor = self.$data.selectedSubPoint == 0 ? self.$data.points[self.$data.selectedPoint-1] : self.$data.points[self.$data.selectedPoint+1];
                    if(targetAnchor!=undefined && targetAnchor[0].command == self.$data.drawCommands.C){
                      var p1 = self.$data.selectedSubPoint == 0 ? self.$data.points[self.$data.selectedPoint-1][1] : self.$data.points[self.$data.selectedPoint+1][0];
                      var cp = self.$data.selectedSubPoint == 0 ? self.$data.points[self.$data.selectedPoint-1][2] : self.$data.points[self.$data.selectedPoint][2];
                      self.$data.pointSatelites = [
                        {point:p1,offset:{x:p1.x-self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].x,y:p1.y-self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].y},mode:"mirror",center:cp,dist:v4v.distance(p1.x,p1.y,cp.x,cp.y)}
                      ];
                    }
                    else if(targetAnchor!=undefined && targetAnchor[0].command == self.$data.drawCommands.M && self.$data.startingAnchor != undefined){
                      var p1 = self.$data.startingAnchor;
                      var cp = self.$data.points[self.$data.selectedPoint-1][0];
                      self.$data.pointSatelites = [
                        {point:p1,offset:{x:p1.x-self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].x,y:p1.y-self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].y},mode:"mirror",center:cp,dist:v4v.distance(p1.x,p1.y,cp.x,cp.y)}
                      ];
                    }
                    else if(targetAnchor==undefined && self.$data.reserveAnchor != undefined){
                      var p1 = self.$data.reserveAnchor;
                      var cp = self.$data.points[self.$data.selectedPoint][2];
                      self.$data.pointSatelites = [
                        {point:p1,offset:{x:p1.x-self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].x,y:p1.y-self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].y},mode:"mirror",center:cp,dist:v4v.distance(p1.x,p1.y,cp.x,cp.y)}
                      ];
                    }
                  }
                }
                
              }
            }
            else{
              if(self.$data.selectedPoint == -1){
                //console.log("selected reserve point - "+self.$data.points[self.$data.points.length-1][0].command);
                var cp = self.$data.points[self.$data.points.length-1][self.$data.points[self.$data.points.length-1].length-1];

                if(self.$data.points[self.$data.points.length-1][0].command == self.$data.drawCommands.C){
                  var p1 = self.$data.points[self.$data.points.length-1][1];
                  self.$data.pointSatelites = [
                    {point:p1,offset:{x:p1.x-self.$data.reserveAnchor.x,y:p1.y-self.$data.reserveAnchor.y},mode:"mirror",center:cp,dist:v4v.distance(p1.x,p1.y,cp.x,cp.y)}
                  ];
                }
                else if(self.$data.points[self.$data.points.length-1][0].command == self.$data.drawCommands.M){
                  var p1 = self.$data.startingAnchor;
                  self.$data.pointSatelites = [
                    {point:p1,offset:{x:p1.x-self.$data.reserveAnchor.x,y:p1.y-self.$data.reserveAnchor.y},mode:"mirror",center:cp,dist:v4v.distance(p1.x,p1.y,cp.x,cp.y)}
                  ];
                }
              }
              else if(self.$data.selectedPoint == -2){
                var cp = self.$data.points[0][0];
                if(self.$data.points.length > 1 && self.$data.points[1][0].command == self.$data.drawCommands.C){
                  var p1 = self.$data.points[1][0];
                  self.$data.pointSatelites = [
                    {point:p1,offset:{x:p1.x-self.$data.startingAnchor.x,y:p1.y-self.$data.startingAnchor.y},mode:"mirror",center:cp,dist:v4v.distance(p1.x,p1.y,cp.x,cp.y)}
                  ];
                }
                else if(self.$data.points.length == 1){
                  var p1 = self.$data.reserveAnchor;
                  self.$data.pointSatelites = [
                    {point:p1,offset:{x:p1.x-self.$data.startingAnchor.x,y:p1.y-self.$data.startingAnchor.y},mode:"mirror",center:cp,dist:v4v.distance(p1.x,p1.y,cp.x,cp.y)}
                  ];
                }
              }

            }


            break;
          }
        }
        createSizingCircles(self.$data);
      },
      onMouseMove:function(e){
        var self = this;
        mouseMoved(this,e);
        createSizingCircles(self.$data);
        moveResizeHandle(self.$data,{x:e.pageX,y:e.pageY});
        
      },
      onMouseUp:function(e){
        var self = this;
        mouseMoved(this,e);
        self.$data.selectedPoint = -3;
        self.$data.pointSatelites = [];
        self.$data.rxArchDrag = -1;
        self.$data.ryArchDrag = -1;
        self.$data.rotationArchDrag = -1;
        self.$data.tempShapePoints = [];
        self.$data.sidePanlEditing = false
        //self.$data.movingShape = false;


        mapToShapes(self.$data);

        

        createSizingCircles(self.$data);

        self.$data.suspendSizeRead = false;

        self.$data.selectedResizeHandle = -1;

        //console.log("UP!!");
      },
      serializePoints:function(pointList,_round){
        var self = this;
        var pointString = "";
        for(var i = 0;i<pointList.length;i++){
          pointString+=pointList[i][0].command;
          pointString+=" ";
          for(var j = 0;j<pointList[i].length;j++){
            if(pointList[i][j].rx != undefined){
              pointString+= _round ? Math.round(pointList[i][j].rx) : pointList[i][j].rx;
              pointString+=" ";
            }
            if(pointList[i][j].ry != undefined){
              pointString+= _round ? Math.round(pointList[i][j].ry) : pointList[i][j].ry;
              pointString+=" ";
            }
            if(pointList[i][j].angle != undefined){
              pointString+= _round ? Math.round(pointList[i][j].angle) : pointList[i][j].angle;
              pointString+=" ";
            }
            if(pointList[i][j].arc != undefined){
              pointString+= _round ? Math.round(pointList[i][j].arc) : pointList[i][j].arc;
              pointString+=" ";
            }
            if(pointList[i][j].sweep != undefined){
              pointString+= _round ? Math.round(pointList[i][j].sweep) : pointList[i][j].sweep;
              pointString+=" ";
            }
            if(pointList[i][j].x != undefined){
              pointString+= _round ? Math.round(pointList[i][j].x) : pointList[i][j].x;
              pointString+=" ";
            }
            if(pointList[i][j].y != undefined){
              pointString+= _round ? Math.round(pointList[i][j].y) : pointList[i][j].y;
              pointString+=" ";
            }
            //rx:Number(values[0]),ry:Number(values[1]),angle:Number(values[2]),arc:Number(values[3]),sweep:Number(values[4])
            
            
          }
          
        }
        return pointString;
      },
      getLastX:function(index){
        var self = this;
        var xVal = 0;
        for(var i = index-1;i>=0;i--){
          //console.log(i);
          if(self.$data.points[i][0].command.toUpperCase() != "V"){
            
            xVal = self.$data.points[i][self.$data.points[i].length-1].x;
            i=-1;
          }
        }
        return xVal;
      },
      getLastY:function(index){
        var self = this;
        var yVal = 0;
        for(var i = index-1;i>=0;i--){
          if(self.$data.points[i][0].command.toUpperCase() != "H"){
            
            yVal = self.$data.points[i][self.$data.points[i].length-1].y;
            i=-1;
          }
        }
        return yVal;
      },
      getHalfPoint:function(p,points,i){
        return halPoint(p,points,i);
      },
      sweepToggle:function(index){
        var self = this;
        self.$data.points[index][0].sweep = self.$data.points[index][0].sweep == 0 ? 1 : 0; 
        mapToShapes(self.$data);
        
      },
      arcToggle:function(index){
        var self = this;
        self.$data.points[index][0].arc = self.$data.points[index][0].arc == 0 ? 1 : 0; 
        mapToShapes(self.$data);
        
      },
      onRXPressed:function(index,_sidePanelID){
        var self = this;
        self.$data.sidePanlEditing = _sidePanelID != undefined;
        if(self.$data.sidePanlEditing){
          var controlElement = document.getElementById(_sidePanelID);
          self.$data.controlPosition = {x:controlElement.getBoundingClientRect().left,y:controlElement.getBoundingClientRect().top};
        }
        self.$data.rxArchDrag = index;
        //console.log(self.$data.rxArchDrag);
      },
      onRYPressed:function(index,_sidePanelID){
        var self = this;
        self.$data.sidePanlEditing = _sidePanelID != undefined;
        if(self.$data.sidePanlEditing){
          var controlElement = document.getElementById(_sidePanelID);
          self.$data.controlPosition = {x:controlElement.getBoundingClientRect().left,y:controlElement.getBoundingClientRect().top};
        }
        self.$data.ryArchDrag = index;
      },
      getRotationPosition:function(index,isX,inSidePanel,angleOffset){
        var _angleOffset = angleOffset!=undefined ? angleOffset : 0;
        var self = this;
        var radius = inSidePanel ? self.$data.controlDimensions.width*.4 : 40;
        var center = inSidePanel ? {x:self.$data.controlDimensions.width/2,y:self.$data.controlDimensions.height/2} : halPoint(self.$data.points[index],self.$data.points,index);
        //return isX ? self.$data.points[index].x : self.$data.points[index].y;
        return isX ? v4v.orbit(center.x,radius,self.$data.points[index][0].angle+_angleOffset,"cos") : v4v.orbit(center.y,radius,self.$data.points[index][0].angle+_angleOffset,"sin");
      },
      onRotationPressed:function(index,_sidePanelID){
        var self = this;
        self.$data.sidePanlEditing = _sidePanelID != undefined;
        if(self.$data.sidePanlEditing){
          var controlElement = document.getElementById(_sidePanelID);
          self.$data.controlPosition = {x:controlElement.getBoundingClientRect().left,y:controlElement.getBoundingClientRect().top};
        }
        
        self.$data.rotationArchDrag = index;
      },
      updatePoint:function(i,m,y,id){
        var self = this;
        self.$data.points[i][m][y] = document.getElementById(id).value;
      },
      onEnterTextValue:function(e){
        var self = this;

        //mapToShapes(self.$data);
        self.$data.shapes[self.$data.selectedShape].points = self.$data.points;
        setTimeout(function(){
          self.$data.shapes[self.$data.selectedShape].points = self.$data.points;
        },100);
        //onShapeSelected(self.$data.selectedShape,self)
      },
      loadDrawing:function(e){
        var self = this;
        switch(self.$data.loadType){
          case 0:{

            break;
          }
          case 1:{
            self.$data.points = v4v.pathTransformer(self.$data.loadedString).primedRawList();
            self.$data.shapes.push({points:self.$data.points,fill:"#00cc00",stroke:"transparent",strokeWidth:"0"});
            self.$data.selectedShape = self.$data.shapes.length-1;
            break;
          }
        }
        self.$data.loading = false;
        self.$data.saving = false;
        self.$data.loadedString = "";
      },
      saveDrawing:function(e){

        self.$data.loading = false;
        self.$data.saving = false;
      },
      cancelDialogue:function(e){
        var self = this;
        self.$data.loading = false;
        self.$data.saving = false;
        self.$data.loadedString = "";
      },
      onFileLoadChange:function(e){
        console.log(e);
      },
      onResizeHandlePressed:function(e){
        var self = this;
        self.$data.suspendSizeRead = true;
        self.$data.selectedResizeHandle = Number(e.currentTarget.getAttribute("handle_index"));
        self.$data.startSize = {x:document.getElementsByClassName("guide-path")[0].getBoundingClientRect().left,y:document.getElementsByClassName("guide-path")[0].getBoundingClientRect().top,width:document.getElementsByClassName("guide-path")[0].getBoundingClientRect().width,height:document.getElementsByClassName("guide-path")[0].getBoundingClientRect().height};

        self.$data.pointsResizingCopy = [];
        for(var p = 0;p<self.$data.points.length;p++){
          self.$data.pointsResizingCopy[p] = []
          for(var q = 0;q<self.$data.points[p].length;q++){
            self.$data.pointsResizingCopy[p][q] = {};
            if(self.$data.points[p][q].x != undefined){
              self.$data.pointsResizingCopy[p][q].x = self.$data.points[p][q].x;
            }
            if(self.$data.points[p][q].y != undefined){
              self.$data.pointsResizingCopy[p][q].y = self.$data.points[p][q].y;
            }

            if(self.$data.points[p][q].rx != undefined){
              self.$data.pointsResizingCopy[p][q].rx = self.$data.points[p][q].rx;
            }
            if(self.$data.points[p][q].ry != undefined){
              self.$data.pointsResizingCopy[p][q].ry = self.$data.points[p][q].ry;
            }
            
          }
        }
        console.log(self.$data.pointsResizingCopy);

      }
    }
  });

  

  createDirectivesMenu();
  

  _vm = mainVue;

  function createSizingCircles(_sd){
    //var pathEdges = document.getElementsByClassName("guide-path")[0].getBoundingClientRect();
    if(!mainVue.suspendSizeRead){
      _sd.sizingCircles = document.getElementsByClassName("guide-path").length>0 ? [
        {cx:document.getElementsByClassName("guide-path")[0].getBoundingClientRect().left,cy:document.getElementsByClassName("guide-path")[0].getBoundingClientRect().top},
        {cx:document.getElementsByClassName("guide-path")[0].getBoundingClientRect().right,cy:document.getElementsByClassName("guide-path")[0].getBoundingClientRect().top},
        {cx:document.getElementsByClassName("guide-path")[0].getBoundingClientRect().right,cy:document.getElementsByClassName("guide-path")[0].getBoundingClientRect().bottom},
        {cx:document.getElementsByClassName("guide-path")[0].getBoundingClientRect().left,cy:document.getElementsByClassName("guide-path")[0].getBoundingClientRect().bottom}
      ] : [];
    }
    
  }

  function moveResizeHandle(_sd,_pos){
    if(_sd.suspendSizeRead && _sd.selectedResizeHandle >= 0){
      _sd.sizingCircles[_sd.selectedResizeHandle].cx = _pos.x;
      _sd.sizingCircles[_sd.selectedResizeHandle].cy = _pos.y;
      switch(_sd.selectedResizeHandle){
        case 0:
        {
          _sd.sizingCircles[3].cx = _sd.sizingCircles[_sd.selectedResizeHandle].cx;
          _sd.sizingCircles[1].cy = _sd.sizingCircles[_sd.selectedResizeHandle].cy;

          break;
        }
        case 1:
        {
          _sd.sizingCircles[2].cx = _sd.sizingCircles[_sd.selectedResizeHandle].cx;
          _sd.sizingCircles[0].cy = _sd.sizingCircles[_sd.selectedResizeHandle].cy;
          break;
        }
        case 2:
        {
          _sd.sizingCircles[1].cx = _sd.sizingCircles[_sd.selectedResizeHandle].cx;
          _sd.sizingCircles[3].cy = _sd.sizingCircles[_sd.selectedResizeHandle].cy;
          break;
        }
        case 3:
        {
          _sd.sizingCircles[0].cx = _sd.sizingCircles[_sd.selectedResizeHandle].cx;
          _sd.sizingCircles[2].cy = _sd.sizingCircles[_sd.selectedResizeHandle].cy;
          break;
        }
      }
      var updatedWidth = _sd.sizingCircles[1].cx - _sd.sizingCircles[0].cx;
      var updatedHeight = _sd.sizingCircles[3].cy - _sd.sizingCircles[0].cy;

      var widthRatio = updatedWidth/_sd.startSize.width;
      var heightRatio = updatedHeight/_sd.startSize.height;



      for(var i = 0;i<_sd.pointsResizingCopy.length;i++){
        for(var j = 0;j<_sd.pointsResizingCopy[i].length;j++){
          if(_sd.pointsResizingCopy[i][j].x != undefined){
            _sd.points[i][j].x = ((_sd.pointsResizingCopy[i][j].x-_sd.startSize.x)*widthRatio)+_sd.sizingCircles[0].cx;
            
          }
          if(_sd.pointsResizingCopy[i][j].y != undefined){
            _sd.points[i][j].y = ((_sd.pointsResizingCopy[i][j].y-_sd.startSize.y)*heightRatio)+_sd.sizingCircles[0].cy;
          }
          if(_sd.pointsResizingCopy[i][j].rx != undefined){
            _sd.points[i][j].rx = _sd.pointsResizingCopy[i][j].rx*widthRatio;
            
          }
          if(_sd.pointsResizingCopy[i][j].ry != undefined){
            _sd.points[i][j].ry = _sd.pointsResizingCopy[i][j].ry*heightRatio;
          }
        }
      }
      //_sd.startSize

    }
    
  }

  function getScrollOffset(){
    return document.getElementById("drawingContainer").getBoundingClientRect().top;
  }

  function createDirectivesMenu(){
    var fg = v4v.flexGrid(5,5,document.getElementById("directiveMenu"),false);
    fg.setOffset(20,20);
    var sizefactor = .2;
    fg.setGrowth(50*sizefactor);
    fg.setRange(175*sizefactor);
    fg.setGridSize(200*sizefactor);
    
    var dfProperties = {x:0,y:0,w:150*.8,h:160*.8};
    var targetPaths = document.getElementById("directiveMenu").getElementsByTagName("path");
    var cols = 4;
    var h = 0;
    var v = 0;
    for(var i = 0;i<targetPaths.length;i++){
      fg.addFlexElement(h,v,v4v.distortionFrame(dfProperties.x,dfProperties.y,dfProperties.w*.9,dfProperties.h*.9),targetPaths[i].getAttribute('d'),{x:7,y:9}, targetPaths[i].getAttribute('class'));
      h++;
      if(h>=cols){
        h=0;
        v++;
      }
    }

    $("#directiveMenu").on("click",".flex-grid-border",function(e){

      var directive = $(this).attr("class").split("directive-")[1];
      switch(directive){
        case "save":
        {
          mainVue.saving = true;
          mainVue.loading = false;
          break;
        }
        case "load":
        {
          mainVue.saving = false;
          mainVue.loading = true;
          break;
        }
        case "undo":
        {
          break;
        }
        case "redo":
        {
          break;
        }
        default:
        {
          mainVue.currentDrawCommand = directive;
          break;
        }
      }
      
      //console.log(mainVue.currentDrawCommand);
    });

    // var menuButtons = document.getElementById("directiveMenu").getElementsByClassName("flex-grid-border");
    // console.log(menuButtons);
    // for(var j = 0;j<menuButtons.length;j++){
    //   menuButtons[j].addEventListener("click",function(e){
    //     var directive = e.currentTarget.getAttribute("class").split("directive-")[1];
    //     mainVue.currentDrawCommand = directive;
    //     console.log(mainVue.currentDrawCommand);
    //   });
    // }


  }

  function mapToShapes(_data){
    if(_data.selectedShape > -1){
      _data.shapes[_data.selectedShape] = {points:JSON.parse(JSON.stringify(_data.points)),fill:"#00cc00",stroke:"transparent",strokeWidth:"0"};
    }
  }

  function closeShape(_data){
    _data.points.push([{command:_data.drawCommands.Z}]);

    mapToShapes(_data);

    _data.selectedShape = -1;

    _data.points = [];
    _data.reserveAnchor = undefined;
    _data.startingAnchor = undefined;
    _data.selectedPoint = -3;
    _data.selectedSubPoint -1;
  }

  function halPoint(p,points,i){
    return {x:points[i][points[i].length-1].x,y:points[i][points[i].length-1].y}
    //return {x:p[0].x+((points[i-1][points[i-1].length-1].x-p[0].x)/2),y:p[0].y+((points[i-1][points[i-1].length-1].y-p[0].y)/2)}
  }

  function mouseMoved(self,e){
    var archEditing = self.$data.rxArchDrag >= 0 || self.$data.ryArchDrag >= 0 || self.$data.rotationArchDrag >= 0;
    if(self.$data.tempShapePoints.length>0){
      var xShift = self.$data.shapeMoveOrigin.x - e.pageX;
      var yShift = self.$data.shapeMoveOrigin.y - e.pageY;
      //console.log("{x:"+xShift.toString()+",y:"+yShift.toString()+"}");
      for(var i = 0;i<self.$data.points.length;i++){
        for(var j = 0;j<self.$data.points[i].length;j++){

          if(self.$data.points[i][j].x != undefined){
            //console.log("positioning X");
            self.$data.points[i][j].x = self.$data.tempShapePoints[i][j].x-xShift;
          }
          if(self.$data.points[i][j].y != undefined){
            //console.log("positioning Y");
            self.$data.points[i][j].y = self.$data.tempShapePoints[i][j].y-yShift;
          }
        }
      }

    }

    else if(self.$data.selectedPoint>-3 || archEditing){
      switch(self.$data.currentMode){
        case self.$data.modes.EDIT:
        case self.$data.modes.SCALE:{
          if(archEditing){
            //console.log(self.$data.rxArchDrag);
            if(self.$data.sidePanlEditing){

              if(self.$data.rxArchDrag >= 0){
                var _halfPoint = {x:self.$data.controlDimensions.sideRadiusHandle,y:self.$data.controlDimensions.sideRadiusHandle};
                var _pos = e.pageX-(_halfPoint.x+self.$data.controlPosition.x);
                if(_pos<0){
                  _pos = 0;
                }
                else if(_pos>self.$data.controlDimensions.width-(self.$data.controlDimensions.sideRadiusHandle*2)){
                  _pos = self.$data.controlDimensions.width-(self.$data.controlDimensions.sideRadiusHandle*2);
                }
                self.$data.points[self.$data.rxArchDrag][0].rx = _pos;
              }
              else if(self.$data.ryArchDrag >= 0){
                var _halfPoint = {x:self.$data.controlDimensions.sideRadiusHandle,y:self.$data.controlDimensions.sideRadiusHandle};
                var _pos = e.pageX-(_halfPoint.x+self.$data.controlPosition.x);
                if(_pos<0){
                  _pos = 0;
                }
                else if(_pos>self.$data.controlDimensions.width-(self.$data.controlDimensions.sideRadiusHandle*2)){
                  _pos = self.$data.controlDimensions.width-(self.$data.controlDimensions.sideRadiusHandle*2);
                }
                self.$data.points[self.$data.ryArchDrag][0].ry = _pos;
                //var _halfPoint = halPoint(self.$data.points[self.$data.ryArchDrag],self.$data.points,self.$data.ryArchDrag);
                //self.$data.points[self.$data.ryArchDrag][0].ry = Math.abs(e.pageY-_halfPoint.y);
              }
              else if(self.$data.rotationArchDrag >= 0){
                var _halfPoint = {x:self.$data.controlDimensions.width/2,y:self.$data.controlDimensions.height/2};
                self.$data.points[self.$data.rotationArchDrag][0].angle = v4v.angle(_halfPoint.x+self.$data.controlPosition.x,_halfPoint.y+self.$data.controlPosition.y-getScrollOffset(),e.pageX,e.pageY);
                //self.$data.points[self.$data.ryArchDrag][0].ry = Math.abs(e.pageY-_halfPoint.y);
              }
              
            }
            else{
              if(self.$data.rxArchDrag >= 0){
                var _halfPoint = halPoint(self.$data.points[self.$data.rxArchDrag],self.$data.points,self.$data.rxArchDrag);
                var _rx = (e.pageX-_halfPoint.x-self.$data.controlDimensions.rx.x)/(self.$data.controlDimensions.rx.length/(self.$data.controlDimensions.width-(self.$data.controlDimensions.sideRadiusHandle*2)));
                // if(_rx > self.$data.controlDimensions.width-(self.$data.controlDimensions.sideRadiusHandle*2)){
                //   _rx = self.$data.controlDimensions.width-(self.$data.controlDimensions.sideRadiusHandle*2);
                // }
                // else if(_rx < 0){
                //   _rx = 0;
                // }
                if(_rx < 0){
                  _rx = 0;
                }
                self.$data.points[self.$data.rxArchDrag][0].rx = _rx;

              }
              else if(self.$data.ryArchDrag >= 0){
                var _halfPoint = halPoint(self.$data.points[self.$data.ryArchDrag],self.$data.points,self.$data.ryArchDrag);
                var _ry = (self.$data.controlDimensions.width-(self.$data.controlDimensions.sideRadiusHandle*2))-((e.pageY-_halfPoint.y-self.$data.controlDimensions.ry.y)/(self.$data.controlDimensions.ry.length/(self.$data.controlDimensions.width-(self.$data.controlDimensions.sideRadiusHandle*2))));
                // if(_ry > self.$data.controlDimensions.width-(self.$data.controlDimensions.sideRadiusHandle*2)){
                //   _ry = self.$data.controlDimensions.width-(self.$data.controlDimensions.sideRadiusHandle*2);
                // }
                // else if(_ry < 0){
                //   _ry = 0;
                // }
                if(_ry < 0){
                  _ry = 0;
                }
                self.$data.points[self.$data.ryArchDrag][0].ry = _ry;
              }
              else if(self.$data.rotationArchDrag >= 0){
                var _halfPoint = halPoint(self.$data.points[self.$data.rotationArchDrag],self.$data.points,self.$data.rotationArchDrag);
                self.$data.points[self.$data.rotationArchDrag][0].angle = v4v.angle(_halfPoint.x,_halfPoint.y,e.pageX,e.pageY);
                //self.$data.points[self.$data.ryArchDrag][0].ry = Math.abs(e.pageY-_halfPoint.y);
              }
            }
            
          }
          else{
            var draggedPoint;
            if(self.$data.selectedPoint>=0){
              //self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].x = self.$data.points[self.$data.selectedPoint][0].command == self.$data.drawCommands.V ? e.pageY : e.pageX;
              if(self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].x != undefined){
                self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].x = e.pageX;
              }
              if(self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].y != undefined){
                self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint].y = e.pageY;
              }
              
              draggedPoint = self.$data.points[self.$data.selectedPoint][self.$data.selectedSubPoint];
            }
            else if(self.$data.selectedPoint==-1){
              self.$data.reserveAnchor.x = e.pageX;
              self.$data.reserveAnchor.y = e.pageY;
              draggedPoint = self.$data.reserveAnchor;
            }
            else if(self.$data.selectedPoint==-2){
              self.$data.startingAnchor.x = e.pageX;
              self.$data.startingAnchor.y = e.pageY;
              draggedPoint = self.$data.startingAnchor;
            }
            if(draggedPoint != undefined){
              for(var i = 0;i<self.$data.pointSatelites.length;i++){
                if(self.$data.pointSatelites[i].mode=="follow"){
                  self.$data.pointSatelites[i].point.x = self.$data.pointSatelites[i].offset.x + e.pageX;
                  self.$data.pointSatelites[i].point.y = self.$data.pointSatelites[i].offset.y + e.pageY;
                }
                // else if(self.$data.pointSatelites[i].mode=="mirror"){
                //   var angle = v4v.angle(draggedPoint.x,draggedPoint.y,self.$data.pointSatelites[i].center.x,self.$data.pointSatelites[i].center.y);
                //   self.$data.pointSatelites[i].point.x = v4v.orbit(self.$data.pointSatelites[i].center.x,self.$data.pointSatelites[i].dist,angle,"cos"); //self.$data.pointSatelites[i].offset.x + e.pageX;
                //   self.$data.pointSatelites[i].point.y = v4v.orbit(self.$data.pointSatelites[i].center.y,self.$data.pointSatelites[i].dist,angle,"sin");
                // }
                
              }
            }

          }
          
          
          // self.$data.points[self.$data.selectedPoint].x = e.pageX;
          // self.$data.points[self.$data.selectedPoint].y = e.pageY;
          break;
        }
        case self.$data.modes.DRAW:
        {
          switch(self.$data.currentDrawCommand){
            case self.$data.drawCommands.L:
            case self.$data.drawCommands.T:
            case self.$data.drawCommands.H:
            case self.$data.drawCommands.V:
            case self.$data.drawCommands.A:{
              break;
            }
            case self.$data.drawCommands.C:
            case self.$data.drawCommands.S:
            case self.$data.drawCommands.Q:{

              //console.log(self.$data.points.length);

              var lineToCurve = self.$data.points.length > 1 && self.$data.points[self.$data.selectedPoint-1][0].command != self.$data.drawCommands.C && self.$data.points[self.$data.selectedPoint-1][0].command != self.$data.drawCommands.S && self.$data.points[self.$data.selectedPoint-1][0].command != self.$data.drawCommands.Q;

              if((self.$data.points.length == 1 && self.$data.startingAnchor == undefined) || lineToCurve){
                self.$data.reserveAnchor = {x:0,y:0};
                if(self.$data.currentDrawCommand == self.$data.drawCommands.C && self.$data.startingAnchor == undefined){
                  //self.$data.startingAnchor = {x:0,y:0};
                  self.$data.startingAnchor = {x:self.$data.points[self.$data.selectedPoint][self.$data.points[self.$data.selectedPoint].length-1].x,y:self.$data.points[self.$data.selectedPoint][self.$data.points[self.$data.selectedPoint].length-1].y};


                  
                }
                if(self.$data.currentDrawCommand == self.$data.drawCommands.C || self.$data.currentDrawCommand == self.$data.drawCommands.S || self.$data.currentDrawCommand == self.$data.drawCommands.Q){
                  var maxDirectiveLength = self.$data.currentDrawCommand == self.$data.drawCommands.C ? 3 : 2;
                  if(lineToCurve && self.$data.points[self.$data.selectedPoint].length<maxDirectiveLength){

                    //########################### NEED TO POSITION ANCHOR PROPERLY FOR 'C' DIRECIVE ##############################
                    var jointCircles = document.getElementsByClassName("joint-circle");
                    var largeJoints = [];
                    for(var lj = 0;lj<jointCircles.length;lj++){
                      if(jointCircles[lj].getAttribute("r").toString() == self.$data.controlDimensions.endPoint.toString()){
                        largeJoints.push(jointCircles[lj]);
                      }
                    }
                    //document.getElementsByClassName("joint-circle")[]
                    //elf.$data.points[self.$data.selectedPoint].unshift({command:self.$data.currentDrawCommand,x:Number(largeJoints[largeJoints.length-2].getAttribute("cx")),y:Number(largeJoints[largeJointss.length-2].getAttribute("cy"))});
                    

                    self.$data.points[self.$data.selectedPoint].unshift({command:self.$data.currentDrawCommand,x:self.$data.pointCreationOrigin.x,y:self.$data.pointCreationOrigin.y});
                    self.$data.points[self.$data.selectedPoint].unshift({command:self.$data.currentDrawCommand,x:largeJoints[largeJoints.length-1].x,y:largeJoints[largeJoints.length-1].y});
                    

                    //self.$data.pointCreationOrigin
                  }
                }
                
              }
              else{
                // if(self.$data.points[self.$data.selectedPoint].length == 1 || (self.$data.points[self.$data.selectedPoint].length > 0 && self.$data.points[self.$data.selectedPoint][0].command != self.$data.drawCommands.C)){

                //   self.$data.reserveAnchor = {x:0,y:0};
                  
                // }

                if(self.$data.points[self.$data.selectedPoint].length == 1){

                  self.$data.reserveAnchor = {x:0,y:0};
                  
                }
                
              }

              var currPointsLong = self.$data.points[self.$data.selectedPoint].length-1;

              //var forwardPoint = self.$data.reserveAnchor!=undefined ? self.$data.reserveAnchor : {x:0,y:0};
              var forwardPoint = self.$data.reserveAnchor;

              forwardPoint.x = e.pageX;
              forwardPoint.y = e.pageY;

              if(self.$data.currentDrawCommand == self.$data.drawCommands.C){
                

                var backwardPoint =  self.$data.points[self.$data.selectedPoint][1] != undefined ? self.$data.points[self.$data.selectedPoint][1] : self.$data.startingAnchor;

                backwardPoint.x = self.$data.points[self.$data.selectedPoint][currPointsLong].x-(forwardPoint.x-self.$data.points[self.$data.selectedPoint][currPointsLong].x);
                backwardPoint.y = self.$data.points[self.$data.selectedPoint][currPointsLong].y-(forwardPoint.y-self.$data.points[self.$data.selectedPoint][currPointsLong].y);
              }

              //console.log(self.$data.points[self.$data.selectedPoint]);
              break;
            }
            // case self.$data.drawCommands.S:{
            //   break;
            // }
            // case self.$data.drawCommands.Q:{
            //   break;
            // }
            case self.$data.drawCommands.A:{
              break;
            }
          }
          break;
        }
      }        
    }

    mapToShapes(self.$data);
  }

  function onShapeSelected(index,self,e){
    switch(self.$data.currentMode){
      case self.$data.modes.EDIT:
      case self.$data.modes.SCALE:
      {
        //self.$data.movingShape = true;

        //console.log("shapeSelected");
        if(e!=undefined){
          self.$data.shouldStartShape = true;
          self.$data.selectedShape = index;
          self.$data.shapeMoveOrigin = {x:e.pageX,y:e.pageY};
        }
        

        self.$data.points = JSON.parse(JSON.stringify(self.$data.shapes[self.$data.selectedShape].points));//self.$data.shapes[self.$data.selectedShape].points;
        self.$data.tempShapePoints = JSON.parse(JSON.stringify(self.$data.points));
        
        break;
      }
    }
  }
  
})();