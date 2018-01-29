/*
VERSION: 0.1.4
v4v.js
author: Dan Koenig, dpkoenig27@gmail.com
license Copyright (c) 2017, Dan Koenig
Free to use under the WTFPL license
*/


// Math Utils Begin
//alert("hello");
var v4v = (function() {
    function V4V(){
        var loaded = function(e){alert("hi");}

        this.ready = function(f)
        {
            window.addEventListener("load",f);
        }

        this.distance = function (x1, y1, x2, y2)
        {
            return getDistance(x1, y1, x2, y2);
        }
        function getDistance(x1, y1, x2, y2) {

            var distx = x2 - x1;
            var disty = y2 - y1;
            return Math.sqrt(Math.pow(distx, 2) + Math.pow(disty, 2));
        }

        this.angle = function (x1, y1, x2, y2)
        {
            return getAngle(x1, y1, x2, y2);
        }
        function getAngle(x1, y1, x2, y2) {

            var distx = x2 - x1;
            var disty = y2 - y1;
            var masterdist = getDistance(x1, y1, x2, y2);
            var primary_anglex = distx / masterdist;
            var anglex = Math.asin(primary_anglex) * 180 / Math.PI;
            var primary_angley = disty / masterdist;
            var angley = Math.asin(primary_angley) * 180 / Math.PI;
            var resultVal;
            if (disty < 0) {
                resultVal = anglex;
            }
            else if (disty >= 0 && distx >= 0) {
                resultVal = angley + 90;
            }
            else if (disty >= 0 && distx < 0) {
                resultVal = (angley * -1) - 90;
            }
            return resultVal;
        }

        this.orbit = function (_center, _radius, _angle, orbitType)
        {
            return getOrbit(_center, _radius, _angle, orbitType);
        }
        function getOrbit(_center, _radius, _angle, orbitType) {

            var _num1 = _center;
            var _num2 = _radius;
            var _num3 = _angle;
            var theCent = _num1;
            var radius = _num2;
            var angle = _num3 - 90;
            var ot = orbitType;
            var resultVal;
            if (ot == "cos") {
                resultVal = theCent + (Math.cos((angle) * (Math.PI / 180)) * radius);
            }
            if (ot == "sin") {
                resultVal = theCent + (Math.sin((angle) * (Math.PI / 180)) * radius);
            }
            return resultVal;
        }

        this.intersection = function(_tl,_tr,_br,_bl,double)
        {
            return getIntersection(_tl,_tr,_br,_bl,double);
        }

        function getIntersection(_tl,_tr,_br,_bl,double)
        {
            if(double)
            {
                //_tl.x*=2;
                //_tl.y*=2;
                _tr.x*=2;
                _tr.y*=2;
                _br.x*=2;
                _br.y*=2;
                _bl.x*=2;
                _bl.y*=2;
            }
            var a1 = _br.y - _tl.y;
            var b1 = _tl.x - _br.x;
            var a2 = _bl.y - _tr.y;
            var b2 = _tr.x - _bl.x;
            
            var denom = a1 * b2 - a2 * b1;
            //alert(_br.y);
            //if (denom == 0) return null;
            
            var c1 = _br.x * _tl.y - _tl.x * _br.y;
            var c2 = _bl.x * _tr.y - _tr.x * _bl.y;
            
            var p = {x:(b1 * c2 - b2 * c1)/denom, y:(a2 * c1 - a1 * c2)/denom};
            
            //if (getDistance(p, _br) > getDistance(_tl, _tr)) return null;
            //if (getDistance(p, _tl) > getDistance(_tl, _tr)) return null;
            //if (getDistance(p, _bl) > getDistance(_br, _bl)) return null;
            //if (getDistance(p, _tr) > getDistance(_br, _bl)) return null;
            
            return p;
        }
        /*
        this.hex = function(rgbString)
        {
            return rgbToHex(rgbString);
        }
        function rgbToHex(rgbString) {
            var colorValue;
            if (rgbString.split("(").length > 1) {
                var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                delete (parts[0]);
                for (var i = 1; i <= 3; ++i) {
                    parts[i] = parseInt(parts[i]).toString(16);
                    if (parts[i].length == 1) parts[i] = '0' + parts[i];
                }
                colorValue = parts.join('').toUpperCase();
            }
            else if (rgbString.split("#").length > 1) {
                colorValue = rgbString.split("#")[1];
            }
            return colorValue;

        }
        //*/


        //*

        this.curvePlot = function(_startPoint, _endPoint, _anchorPoint, _ratio)
        {
            return plotToCurve(_startPoint, _endPoint, _anchorPoint, _ratio);
        }
        function plotToCurve(_startPoint, _endPoint, _anchorPoint, _ratio) {
            var plotX = plotToLine(_startPoint.x, _endPoint.x, _anchorPoint.x, _ratio);
            var plotY = plotToLine(_startPoint.y, _endPoint.y, _anchorPoint.y, _ratio);
            var curvePoint = { x: plotX, y: plotY };
            return curvePoint;
        }

        this.linePlot = function (_startPoint, _endPoint, _anchorPoint, _ratio)
        {
            return plotToLine(_startPoint, _endPoint, _anchorPoint, _ratio);
        }
        function plotToLine(_startPoint, _endPoint, _anchorPoint, _ratio) {
            var _centerPoint = _startPoint + ((_endPoint - _startPoint) * _ratio);
            var _curveRat;
            var _realRat;
            var _pointA;
            var _pointB;

            if (_ratio <= .5) {
                _curveRat = 1 - _ratio;
                _realRat = _ratio * 2;
                _pointA = _startPoint;
                _pointB = _anchorPoint;
            }
            else {
                _curveRat = 1 - (1 - _ratio);
                _realRat = _ratio;
                _pointA = _anchorPoint + (_anchorPoint - _endPoint);
                _pointB = _endPoint;
            }
            var basePoint = _pointA + ((_pointB - _pointA) * _realRat);
            //trace(_curveRat);
            var curvePoint = _centerPoint + ((basePoint - _centerPoint) * _curveRat);
            return curvePoint;
        }

        this.pointPlot = function (_points)
        {
            return pointPath(_points);
        }
        function pointPath(_points) {
            var breaks = [];
            var totalDistance = 0;;
            breaks.push({ x: _points[0].x, y: _points[0].y, dist: totalDistance });
            for (var i = 1; i < _points.length; i++) {
                var dist = getDistance(_points[i].x, _points[i].y, _points[i - 1].x, _points[i - 1].y);
                totalDistance += dist;
                breaks.push({ x: _points[i].x, y: _points[i].y, dist: totalDistance });
            }
            return breaks;
        }

        this.pathPlot = function (_ratio, _points)
        {
            return plotToPath(_ratio, _points);
        }
        function plotToPath(_ratio, _points) {
            var _path = pointPath(_points);
            var totalDistance = _path[_path.length - 1].dist;
            var _fullRat = totalDistance * _ratio;
            var _section = -1;
            for (var i = 1; i < _path.length; i++) {
                if (_fullRat <= _path[i].dist && _fullRat > _path[i - 1].dist) {
                    _section = i - 1;
                }
            }
            var cData = _path[Number(_section)];
            var nData = _path[Number(_section + 1)];
            var base = nData.dist - cData.dist;
            var diff = _fullRat - cData.dist;
            var _newRat = diff / base;
            var newPoint = { x: cData.x + ((nData.x - cData.x) * _newRat), y: cData.y + ((nData.y - cData.y) * _newRat) };
            //trace(newPoint.x);
            return newPoint;
        }

        this.curvedPathPlot = function(_ratio, _points, _anchors)
        {
            return plotToCurvedPath(_ratio, _points, _anchors);
        }
        function plotToCurvedPath(_ratio, _points, _anchors) {

            var newPoint;
            if(_ratio == 0){
                newPoint = {x:_points[0].x, y:_points[0].y};
            }
            else{
                var _path = pointPath(_points);
                var totalDistance = _path[_path.length-1].dist;
                var _fullRat = totalDistance*_ratio;
                var _section = -1;
                for(var i = 1;i<_path.length;i++){
                    if(_fullRat <= _path[i].dist && _fullRat > _path[i-1].dist){
                        _section = i-1;
                    }
                }
                var cData = _path[0];
                var nData = _path[1];
                var base = nData.dist-cData.dist;
                var diff = _fullRat-cData.dist;
                var _newRat = diff/base;
                var currentAnchor = _anchors[0];
                
                //var newPoint:Object = {x:cData.x+((nData.x-cData.x)*_newRat), y:cData.y+((nData.y-cData.y)*_newRat)};
                newPoint = plotToCurve(cData,nData,currentAnchor,_newRat);
                if(_section == -1){
                    newPoint = {x:_points[_points.length-1].x, y:_points[_points.length-1].y};
                }
            }
            //trace(newPoint.x);
            return newPoint;
        }

        this.wavePlot = function(_startPoint, _path, _ratio)
        {
            return plotToWave(_startPoint, _path, _ratio);
        }
        function plotToWave(_startPoint, _path, _ratio) {
            var _fullRat = _ratio * _path.length;
            var _newRat = Math.floor(_fullRat);
            var section = -1;
            for (var i = 0; i < _path.length; i++) {
                if (i == _newRat) {
                    section = i;
                }
            }
            //trace(section);
            var starter;
            var masterRatio;
            if (section == 0) {
                starter = _startPoint;
                masterRatio = _fullRat - _newRat;
            }
            else {
                starter = { x: _path[section - 1].cX, y: _path[section - 1].cY };
                masterRatio = _fullRat - _newRat;
            }
            var tempSec = section;
            if (section < 0) {
                tempSec = _path.length - 1;
            }
            var anchor = { x: _path[tempSec].aX, y: _path[tempSec].aY };
            var ender = { x: _path[tempSec].cX, y: _path[tempSec].cY };

            //trace(masterRatio);
            var mark = plotToCurve(starter, ender, anchor, masterRatio);
            if (section < 0) {
                //trace("finished");
                mark = { x: ender.x, y: ender.y };
            }
            return mark;
        }

        this.eventPoint = function(e)
        {
            return createPoint(e);
        }
        function createPoint(e) {
            return { x: e.pageX, y: e.pageY };
        }

        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        this.hex = function (r, g, b)
        {
            return rgbToHex(r, g, b);
        }
        function rgbToHex(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

        //Math utils End



        //*/


        // charts begin

        this.symbolFrames = function(_stage, _shapes, _vals, _total, _color, _title, _x, _y, _width, _height, _showPercentage){
            return new SymbolFrames(_stage, _shapes, _vals, _total, _color, _title, _x, _y, _width, _height, _showPercentage);
        }

        function SymbolFrames(_stage, _shapes, _val, _total, _color, _title, _x, _y, _width, _height, _showPercentage){
            var _txt = v4v.text(_stage,0,0,_title);
            var titleOffset = _txt.getElement().getBoundingClientRect().height+25;
            _txt.attr("y",_txt.getElement().getBoundingClientRect().height+10);
            _txt.attr("x",(_width/2)-(_txt.getElement().getBoundingClientRect().width/2));
            var group = v4v.g(_stage, _x, _y);
            var shapeIndex = Math.round((_shapes.length-1)*(_val/_total));
            if(_shapes[shapeIndex].toLowerCase().split("url(").length>1){
                //console.log(_shapes[i].split("url(").join("").split(")").join(""));
                shape = v4v.image(_stage,{x:0,y:0,width:100,height:100,href:_shapes[shapeIndex].split("url(").join("").split(")").join("")});

            }
            else{
                shape = v4v.path(_stage,{},[{x:0,y:0,r:0},{x:1,y:0,r:0},{x:0,y:2,r:0}]);
                shape.attr("d",_shapes[shapeIndex]);
                shape.attr("fill",_color);
            }
            group.getElement().appendChild(shape.getElement());

            var targetSize = _height-titleOffset;
            var scaleValue = (targetSize*.75)/group.getElement().getBoundingClientRect().height;
            // shape.attr("stroke",outline);
            // shape.attr("stroke-width",outlineWidth/scaleValue);
            var scaleAttr = "scale("+scaleValue.toString()+","+scaleValue.toString()+")";
            var targetXPos = (_width/2)-((group.getElement().getBoundingClientRect().width*scaleValue)/2);
            var targetYPos = titleOffset;
            var translateAttr = "translate("+targetXPos+","+targetYPos+")";
            group.attr("transform",translateAttr+" "+scaleAttr);
        }

        this.symbolStack = function(_stage, _vals, _shapes, _colors, _title, _labels, _x, _y, _width, _height, _valScale, _showPercentage){
            return new SymbolStack(_stage, _vals, _shapes, _colors, _title, _labels, _x, _y, _width, _height, _valScale, _showPercentage);
        }

        function SymbolStack(_stage, _vals, _shapes, _colors, _title, _labels, _x, _y, _width, _height, _valScale, _showPercentage){
            var valScale = _valScale == undefined ? 1 : _valScale;
            var _txt = v4v.text(_stage,0,0,_title);
            var titleOffset = _txt.getElement().getBoundingClientRect().height+25;
            _txt.attr("y",_txt.getElement().getBoundingClientRect().height+10);
            _txt.attr("x",(_width/2)-(_txt.getElement().getBoundingClientRect().width/2));
            var symbolSize = _width/10;
            //console.log(_vals);
            var topGroup = v4v.g(_stage,0,0);
            var groups = [];
            var innerGroups = [];
            var labelItems = [];
            var widestGroup = 0;
            if(_shapes.join == undefined){
                var tempStape = [];
                for(var si = 0;si<_vals.length;si++){
                    tempStape.push(_shapes);
                }
                _shapes = tempStape;
            }
            for(var i = 0;i<_vals.length;i++){
                var gX = ((_width*.7)/(_vals.length+.5))*(i+.4);
                var gY = _height;
                var group = v4v.g(_stage, gX+(gX/2), gY*.95);
                groups.push(group);
                var innerGroup = v4v.g(_stage, 0, 0);
                innerGroups.push(innerGroup);
                topGroup.getElement().appendChild(group.getElement());
                group.getElement().appendChild(innerGroup.getElement());
                var h = 0;
                var v = 0;
                var wFootPrint = ((_width*1.2)/(_vals.length));
                var cols = Math.ceil(wFootPrint/symbolSize);
                var symbolFootprint = symbolSize*1.5;
                var labelText = v4v.text(_stage,0,10,_labels[i]);
                var labelGroup = v4v.g(_stage, 0, 0);
                labelGroup.getElement().appendChild(labelText.getElement());
                labelItems.push(labelGroup);
                labelText.attr("x",labelText.getElement().getBoundingClientRect().width/-2);
                
                //console.log(Math.round(_vals[i]*_valScale));
                for(var j = 0;j<Math.round(_vals[i]*_valScale);j++){
                    var shape;
                    if(_shapes[i].toLowerCase().split("url(").length>1){
                        //console.log(_shapes[i].split("url(").join("").split(")").join(""));
                        shape = v4v.image(_stage,{x:0,y:0,width:100,height:100,href:_shapes[i].split("url(").join("").split(")").join("")});

                    }
                    else{
                        shape = v4v.path(_stage,{},[{x:0,y:0,r:0},{x:1,y:0,r:0},{x:0,y:2,r:0}]);
                        shape.attr("d",_shapes[i]);
                    }

                    

                    //var shape = v4v.image(_stage,{x:0,y:0,width:100,height:100,href:"https://www.nature.org/cs/groups/webcontent/@web/@indiana/documents/media/jwn-mallard-duck.jpg"});

                    var subGroup = v4v.g(_stage, symbolSize*h, symbolSize*(v*-1));
                    subGroup.getElement().appendChild(shape.getElement());
                    innerGroup.getElement().appendChild(subGroup.getElement());
                    shape.attr("fill",_colors[i]);
                    var shapeWide = shape.getElement().getBoundingClientRect().width;
                    var shapeHigh = shape.getElement().getBoundingClientRect().height;
                    var largeDim = shapeWide<shapeHigh ? shapeHigh : shapeWide;
                    var symbolScale = symbolSize/largeDim;
                    shape.attr("transform","scale("+symbolScale+","+symbolScale+")");
                    subGroup.attr("transform","translate("+(symbolFootprint*h).toString()+","+((symbolFootprint*((v+1)*-1))).toString()+")");
                    h++;
                    if(h>cols){
                        h=0;
                        v++;
                    }
                    
                }
                //labelText.attr("x",(innerGroup.getElement().getBoundingClientRect().width/2).toString());
                //labelGroup.attr("transform","translate("+(innerGroup.getElement().getBoundingClientRect().width/2).toString()+",0)");
                group.attr("transform","translate("+(gX+(gX/2)).toString()+","+(gY*.95).toString()+")");
                if(innerGroup.getElement().getBoundingClientRect().width>widestGroup){
                    widestGroup = innerGroup.getElement().getBoundingClientRect().width;
                }
                innerGroup.getElement().appendChild(labelGroup.getElement());


                //gX+(gX/2), gY*.85
            }
            var proportions = [];
            var highestG = 0;
            for(var k = 0;k<groups.length;k++){
                var gWide = groups[k].getElement().getBoundingClientRect().width;
                var gHigh = groups[k].getElement().getBoundingClientRect().height;
                var gSize = gWide>gHigh ? gWide : gHigh;
                gSize = gHigh;
                if(gSize>highestG){
                    highestG = gSize;
                }
            }
            var ratio = 1;
            if(highestG>(_height*.75)){
                ratio = (_height*.75)/highestG;
                
            }
            for(var l = 0;l<innerGroups.length;l++){
                innerGroups[l].attr("transform","scale("+ratio.toString()+","+ratio.toString()+")");
                var modifiedRatio = .7/ratio;
                labelItems[l].attr("transform","scale("+modifiedRatio.toString()+","+modifiedRatio.toString()+") translate("+((widestGroup/modifiedRatio)/2).toString()+",0)");
                //labelGroup.attr("transform","translate("+(innerGroup.getElement().getBoundingClientRect().width/2).toString()+",0)");

            }

            var tgRect = topGroup.getElement().getBoundingClientRect();
            var svgRect = _stage.getElement().getBoundingClientRect();
            var leftEdge = tgRect.left-svgRect.left;
            var rightEdge = (svgRect.left+svgRect.width) - (tgRect.left+tgRect.width);
            
            //var trueLeft = tgRect.left-_stage.getElement().getBoundingClientRect().left;
            //var leftOffset = trueLeft-((_width/2)-(tgRect.width/2));
            //console.log(leftOffset);
            topGroup.attr("transform","translate("+((rightEdge-leftEdge)/2)+",0)");
        }


        this.portionFill = function(_stage, _shape, _values ,_colors, _x, _y, _labels, _title, _width, _height, _outline, _outlineWidth, _showPercentage){
            return new PortionFill(_stage, _shape, _values ,_colors, _x, _y, _labels,_title, _width, _height,_outline, _outlineWidth, _showPercentage);
        }


        function PortionFill(_stage, _shape, _values ,_colors, _x, _y, _labels, _title, _width, _height,_outline, _outlineWidth, _showPercentage){
            var outline = _outline == undefined ? "transparent" : _outline;
            var outlineWidth = _outlineWidth == undefined ? 1 : _outlineWidth;
            var _txt = v4v.text(_stage,0,0,_title);
            var titleOffset = _txt.getElement().getBoundingClientRect().height+25;
            _txt.attr("y",_txt.getElement().getBoundingClientRect().height+10);
            _txt.attr("x",(_width/2)-(_txt.getElement().getBoundingClientRect().width/2));

            var defID = "grad"+Math.random().toString().split(".").join("")+Math.random().toString().split(".").join("")+Math.random().toString().split(".").join("");
            var group = v4v.g(_stage, _x, _y);

            var shape = v4v.path(_stage,{},[{x:0,y:0,r:0},{x:1,y:0,r:0},{x:0,y:2,r:0}]);
            shape.attr("d",_shape);
            
            group.getElement().appendChild(shape.getElement());

            var valueSum = 0;
            for(var i = 0;i<_values.length;i++){
                valueSum+=_values[i];
            }

            var matrix = [];
            var cumulation = 0;
            for(var j = 0;j<_values.length;j++){

                matrix.push({offset:cumulation.toString()+"%", stopColor:_colors[j]});
                cumulation+=(_values[j]/valueSum)*100;
                matrix.push({offset:cumulation.toString()+"%", stopColor:_colors[j]});
            }

            var defList = [{type:"linear", attributes:{id:defID, x1:"0%", y1:"100%", x2:"0%", y2:"0%"}, matrix:matrix}];

            var defs = v4v.defs(_stage,defList);

            shape.attr("fill","url(#"+defID+")");

            var targetSize = _height-titleOffset;
            var scaleValue = (targetSize*.75)/group.getElement().getBoundingClientRect().height;
            shape.attr("stroke",outline);
            shape.attr("stroke-width",outlineWidth/scaleValue);
            var scaleAttr = "scale("+scaleValue.toString()+","+scaleValue.toString()+")";
            var targetXPos = (_width/2)-((group.getElement().getBoundingClientRect().width*scaleValue)/2);
            var targetYPos = titleOffset;
            var translateAttr = "translate("+targetXPos+","+targetYPos+")";
            group.attr("transform",translateAttr+" "+scaleAttr);

            var legend = v4v.g(_stage,0,0);
            var labelHeight = 24;
            var rectSize = 14;
            for(var k = 0;k<_labels.length;k++){
                var lbl = v4v.text(_stage,rectSize+2,(k+.5)*labelHeight,_labels[k]);
                legend.getElement().appendChild(lbl.getElement());
                var rect = v4v.rect(_stage,{x:0,y:k*labelHeight,width:rectSize,height:rectSize,fill:_colors[k]});
                legend.getElement().appendChild(rect.getElement());
            }

            legend.attr("transform","translate("+(_width-(legend.getElement().getBoundingClientRect().width*1.2)).toString()+","+titleOffset+")");



        }

        this.singleMetricPortionFill = function(_stage, _shape, _value, _total, _color,_x,_y,_title,_width,_height,_outlineWidth,_showPercentage){
            return new SingleMetricPortionFill(_stage, _shape, _value, _total, _color,_x,_y,_title,_width,_height,_outlineWidth,_showPercentage);
        }

        function SingleMetricPortionFill(_stage, _shape, _value, _total, _color,_x,_y,_title,_width,_height,_outlineWidth,_showPercentage){
            return v4v.portionFill(_stage,_shape,[_value,_total-_value],[_color,"transparent"],_x,_y,[],_title,_width,_height,_color,_outlineWidth,_showPercentage);

        }

        this.guage = function(_stage, _value, _colors, _x, _y, _label, _size, _inset, _max, _min, _showPercentage){
            return new Guage(_stage,_value,_colors,_x,_y, _label, _size, _inset, _max, _min, _showPercentage);
        }


        function Guage(_stage, _val ,_colors, _x, _y, _label, _size, _inset, _max, _min, _showPercentage){
            var showPercentage = _showPercentage;
            var max = _max == undefined ? 100 : _max;
            var min = _min == undefined ? 0 : _min;
            var _value = ((_val-min)/(max-min))*100;
            var labels = [];
            var group = new G(_stage, _x, _y);
            var knotches = 51;
            var startAngle = 110;
            var angleTotal = startAngle*2;
            var innerRad = (_size/2)-_inset;
            var outerRad = _size/2;
            var knotchOffset = .51;
            var initailPoints = [{x:0,y:0,r:0},{x:0,y:1,r:0},{x:1,y:0,r:0}];

            

            for(var i = 1;i<knotches;i++){
                var colorIndex = Math.ceil((i/knotches)*_colors.length-1);
                var pathChunk = new Path(_stage, initailPoints);
                pathChunk.attr("fill",_colors[colorIndex]);
                pathChunk.attr("d", _stage.getLineString([
                    {x:getOrbit(0,innerRad, (startAngle*-1)+((angleTotal/knotches)*(i-knotchOffset)),"cos"),y:getOrbit(0,innerRad, (startAngle*-1)+((angleTotal/knotches)*(i-knotchOffset)),"sin")},
                    {x:getOrbit(0,innerRad, (startAngle*-1)+((angleTotal/knotches)*(i+knotchOffset)),"cos"),y:getOrbit(0,innerRad, (startAngle*-1)+((angleTotal/knotches)*(i+knotchOffset)),"sin")},
                    {x:getOrbit(0,outerRad, (startAngle*-1)+((angleTotal/knotches)*(i+knotchOffset)),"cos"),y:getOrbit(0,outerRad, (startAngle*-1)+((angleTotal/knotches)*(i+knotchOffset)),"sin")},
                    {x:getOrbit(0,outerRad, (startAngle*-1)+((angleTotal/knotches)*(i-knotchOffset)),"cos"),y:getOrbit(0,outerRad, (startAngle*-1)+((angleTotal/knotches)*(i-knotchOffset)),"sin")}
                ]));
                
                group.getElement().appendChild(pathChunk.getElement());
            }

            var needle = new Path(_stage, initailPoints);
            var needleAngle = startAngle*-1;
            needle.attr("d", _stage.getLineString([
                {x:getOrbit(0,innerRad*.7, needleAngle,"cos"),y:getOrbit(0,innerRad*.7, needleAngle,"sin")},
                {x:getOrbit(0,innerRad*.05, needleAngle+90,"cos"),y:getOrbit(0,innerRad*.05, needleAngle+90,"sin")},
                {x:getOrbit(0,innerRad*.05, needleAngle+180,"cos"),y:getOrbit(0,innerRad*.05, needleAngle+180,"sin")},
                {x:getOrbit(0,innerRad*.05, needleAngle-90,"cos"),y:getOrbit(0,innerRad*.05, needleAngle-90,"sin")}
            ]));
            group.getElement().appendChild(needle.getElement());

            var textLabel = new Text(_stage, 0,0,_label);

            group.getElement().appendChild(textLabel.getElement());

            textLabel.attr("x", textLabel.getElement().getBoundingClientRect().width/-2);
            textLabel.attr("y", innerRad*.52);

            var textValueLabel = new Text(_stage, 0,0,"0");

            group.getElement().appendChild(textValueLabel.getElement());

            textValueLabel.attr("y", innerRad*.8);

            

            this.setLabels = function(_lables){
                labels = _labels;

            }

            this.getElement = function(){
                return group.getElement();
            }

            this.update = function(_updatedValue, _updatedMax, _updatedMin){

                if(_updatedMax != undefined){
                    max = _updatedMax;
                }
                if(_updatedMin != undefined){
                    min = _updatedMin;
                }
                //console.log(max);
                var targetRatio = max-min == 0 ? 0 : ((_updatedValue-min)/(max-min));
                var updatedValue = targetRatio*100;
                animationPoint.animate({x:(startAngle*-1) + ((startAngle*2)*(updatedValue/100))}, 1000, "in", function(){}, onMotion);


            }

            var animationPoint = new Point(needleAngle,0,0);
            this.update(_val);
            

            function onMotion(){
                needleAngle = animationPoint.x;
                needle.attr("d", _stage.getLineString([
                    {x:getOrbit(0,innerRad*.7, needleAngle,"cos"),y:getOrbit(0,innerRad*.7, needleAngle,"sin")},
                    {x:getOrbit(0,innerRad*.05, needleAngle+90,"cos"),y:getOrbit(0,innerRad*.05, needleAngle+90,"sin")},
                    {x:getOrbit(0,innerRad*.05, needleAngle+180,"cos"),y:getOrbit(0,innerRad*.05, needleAngle+180,"sin")},
                    {x:getOrbit(0,innerRad*.05, needleAngle-90,"cos"),y:getOrbit(0,innerRad*.05, needleAngle-90,"sin")}
                ]));
                textLabel.attr("x", textLabel.getElement().getBoundingClientRect().width/-2);
                var displayMax = showPercentage ? 100 : max;
                var displayMin = showPercentage ? 0 : min;
                var displaySuffix = showPercentage ? "%" : "";
                textValueLabel.getElement().textContent = Math.round((((animationPoint.x+startAngle)/(startAngle*2))*(displayMax-displayMin))-displayMin).toString()+displaySuffix;
                textValueLabel.attr("x", textValueLabel.getElement().getBoundingClientRect().width/-2);
            }



        }

        this.bar = function(_stage, _values, _colors, _x, _y, _label, _labels, _width, _height, _marginLeft, _max, _showPercentage){
            return new Bar(_stage,_values,_colors,_x,_y, _label, _labels, _width, _height, _marginLeft, _max, _showPercentage);
        }

        function Bar(_stage, _vals, _colors, _x, _y, _label, _labels, _width, _height, _marginLeft, _max, _showPercentage){

            //var chartID = "bar_"+Math.random().toString().split(".").join("")+Math.random().toString().split(".").join("")+Math.random().toString().split(".").join("");

            var showPercentage = _showPercentage;
            var max = _max == undefined ? 100 : _max;
            var _values = processValues();
            
            var group = new G(_stage, _x, _y);
            var initailPoints = [{x:0,y:0,r:0},{x:0,y:1,r:0},{x:1,y:0,r:0}];
            var chartWidth = _width;
            var chartHeight = _height;
            var maxVal = 100;
            var marginLeft = _marginLeft;
            var topMargin = 25;
            var txtElements = [];
            var txtValueElements = [];
            var barElements = [];

            //var animationPoint = new Point(_start,0,0);

            var animationPoints = createAnimationPoints();

            this.update = function(_updatedValues, _updatedMax, _updatedMin){
                //console.log(_updatedMax);

                if(_updatedMax != undefined){
                    max = _updatedMax;
                    if(!_showPercentage){
                        maxText.getElement().textContent = max.toString(); 
                    }
                }
                if(_updatedMin != undefined){
                    min = _updatedMin;
                    
                    if(!_showPercentage){
                        minText.getElement().textContent = min.toString();
                    } 
                }
                var updatedValues = processValues();
                var displayValues = showPercentage ? processValues() : _vals;
                for(var i = 0;i<_values.length;i++){
                    var bar = barElements[i];
                    var txt = txtElements[i];
                    var valTxt = txtValueElements[i];
                    //var displayValues = showPercentage ? processValues() : _vals;
                    animateBar(bar, valTxt, animationPoints[i].x, marginLeft+(updatedValues[i]*((chartWidth-marginLeft)/maxVal)), (i*(chartHeight/updatedValues.length))+topMargin,((i+.5)*(chartHeight/updatedValues.length))+topMargin,displayValues[i],animationPoints[i]);
                }
            }

            function createAnimationPoints(){
                var pnts = [];
                for(var i = 0;i<_values.length;i++){
                    pnts.push(new Point(marginLeft,0,0));
                }
                return pnts;
            }

            function processValues(){
                var _vList = [];
                for(var i = 0;i<_vals.length;i++){
                    var targetRatio = max == 0 ? 0 : _vals[i]/max;
                    _vList.push(Math.round(targetRatio*100));
                }
                return _vList;
            }

            function animateBar(_bar, _valLabel, _start, _end, _top,_bottom,_realValue, animationPoint){
                

                animationPoint.animate({x:_end,y:_realValue}, 1000, "in", function(){}, function(){
                    _bar.attr("d",_stage.getPathString([
                        {x:marginLeft-1,y:_top,r:0},
                        {x:marginLeft-1,y:_bottom,r:0},
                        {x:animationPoint.x ,y:_bottom,r:5},
                        {x:animationPoint.x,y:_top,r:5}
                    ],0));
                    if(animationPoint.y == 0){
                        _bar.attr("fill","transparent");
                    }
                    else{
                        _bar.attr("fill",_bar.attr("permfill"));
                        
                    }
                    _valLabel.attr("x",Number(animationPoint.x+3).toString());
                    var valueSuffix = showPercentage ? "%" : "";
                    _valLabel.getElement().textContent = animationPoint.y.toString().split(".")[0].split(",")[0]+valueSuffix;
                });


            }

            var vLine1 = new Rect(_stage,marginLeft,0,chartWidth-marginLeft,_height).attr("fill","rgba(0,0,0,.0)");
            group.getElement().appendChild(vLine1.getElement());

            for(var i = 0;i<_values.length;i++){
                var bar = new Path(_stage, initailPoints);
                //bar.attr("id",);
                bar.attr("fill",_colors[i]);
                bar.attr("permfill",_colors[i]);
                bar.attr("d",_stage.getLineString([
                    {x:marginLeft,y:(i*(chartHeight/_values.length))+topMargin},
                    {x:marginLeft,y:((i+.5)*(chartHeight/_values.length))+topMargin},
                    {x:marginLeft+(_values[i]*((chartWidth-marginLeft)/maxVal)) ,y:((i+.5)*(chartHeight/_values.length))+topMargin},
                    {x:marginLeft+(_values[i]*((chartWidth-marginLeft)/maxVal)),y:(i*(chartHeight/_values.length))+topMargin}
                ]));
                barElements.push(bar);
                group.getElement().appendChild(bar.getElement());
                var txt = new Text(_stage, 0, ((i+.5)*(chartHeight/_values.length))-3+topMargin, _labels[i]);
                group.getElement().appendChild(txt.getElement());
                txtElements.push(txt);
                txt.attr("x",marginLeft-txt.getElement().getBoundingClientRect().width-5);

                var valTxt = new Text(_stage,0,((i+.5)*(chartHeight/_values.length))-3+topMargin,"0");
                group.getElement().appendChild(valTxt.getElement());
                valTxt.attr("fill",bar.attr("fill"));
                txtValueElements.push(valTxt);
            }
            this.update(_values);
            var titleTxt = new Text(_stage,0,40,_label);
            titleTxt.attr("style","font-weight:bold;font-size:14px;");
            group.getElement().appendChild(titleTxt.getElement())

            var minText;
            var maxText;

            if(!_showPercentage){
                minText = new Text(_stage,marginLeft,40,"0");
                minText.attr("style","font-size:14px;");

                maxText = new Text(_stage,marginLeft,40,max.toString());
                maxText.attr("style","font-size:14px;");
            }
            
            //group.getElement().appendChild(titleTxt.getElement());
            //titleTxt.attr("fill",bar.attr("fill"));

            setTimeout(function(){
                for(var j = 0;j<txtElements.length;j++){
                    txtElements[j].attr("x",marginLeft-txtElements[j].getElement().getBoundingClientRect().width-5);
                }

                titleTxt.attr("y",titleTxt.getElement().getBoundingClientRect().height/1.6);
                var hLine = new Rect(_stage,0,titleTxt.getElement().getBoundingClientRect().height/1.3,_width,.5).attr("fill","#dddddd");
                group.getElement().appendChild(hLine.getElement());
                
                
                var vLine2 = new Rect(_stage,marginLeft+(maxVal*((chartWidth-marginLeft)/maxVal)),titleTxt.getElement().getBoundingClientRect().height/1.3,.5,_height).attr("fill","transparent");
                group.getElement().appendChild(vLine2.getElement());

                if(!_showPercentage){
                    group.getElement().appendChild(minText.getElement());
                    minText.attr("y",titleTxt.attr("y"));
                    minText.attr("x",marginLeft-minText.getElement().getBoundingClientRect().width/2);

                    group.getElement().appendChild(maxText.getElement());
                    maxText.attr("y",titleTxt.attr("y"));
                    maxText.attr("x",vLine2.attr("x")-maxText.getElement().getBoundingClientRect().width/2);
                }

                vLine1.attr("y",titleTxt.getElement().getBoundingClientRect().height/1.3);
                vLine1.attr("fill","rgba(0,0,0,.03)")
                

                //titleTxt.attr("x",(_width/2)-(titleTxt.getElement().getBoundingClientRect().width/2));
            },100);

            
        }


        this.column = function(_stage, _values, _colors, _x, _y, _label){
            return new Column(_stage,_values,_colors,_x,_y, _label);
        }

        function Column(_stage, _values, _colors, _x, _y, _label){
            var group = new G(_stage, _x, _y);
            var initailPoints = [{x:0,y:0,r:0},{x:0,y:1,r:0},{x:1,y:0,r:0}];
            var chartWidth = 380;
            var chartHeight = 200;
            var maxVal = 100;
            for(var i = 0;i<_values.length;i++){
                var bar = new Path(_stage, initailPoints);
                bar.attr("fill",_colors[i]);
                bar.attr("d",_stage.getLineString([
                    {x:i*(chartWidth/_values.length),y:chartHeight},
                    {x:(i+.5)*(chartWidth/_values.length),y:chartHeight},
                    {x:(i+.5)*(chartWidth/_values.length),y:chartHeight-(_values[i]*(chartHeight/maxVal))},
                    {x:i*(chartWidth/_values.length),y:chartHeight-(_values[i]*(chartHeight/maxVal))}
                ]));
                group.getElement().appendChild(bar.getElement());
            }
        }

        // charts end


        // editing start

        this.resizorWithRotation = function(_stage, _element, _handler,_offset,_deleteHandler,_infoHandler){
            return new ResizorWithRotation(_stage, _element,_handler,_offset,_deleteHandler,_infoHandler);
        }

        function ResizorWithRotation(_stage, _element,_handler,_offset,_deleteHandler,_infoHandler){
            var _enableDelete = _deleteHandler != undefined;
            var _enableInfo = _infoHandler != undefined;
            var shapeAngle = 0;
            var refCenter = {x:100,y:100};

            var whCenter = {x:_element.getBoundingClientRect().left-_offset.x+(_element.getBoundingClientRect().width/2),y:_element.getBoundingClientRect().top-_offset.y+(_element.getBoundingClientRect().height/2)};

            var attributeManifest = {rotation:"v4vrotationattrubute",tl:"v4vtloffsetattribute",tr:"v4vtroffsetattribute",br:"v4vbroffsetattribute",bl:"v4vbloffsetattribute"};

            if(_element.getAttribute(attributeManifest.rotation) == undefined){
                _element.setAttribute(attributeManifest.rotation, 0);
                _element.setAttribute(attributeManifest.tl, "-50_-50");
                _element.setAttribute(attributeManifest.tr, "50_-50");
                _element.setAttribute(attributeManifest.br, "50_50");
                _element.setAttribute(attributeManifest.bl, "-50_50");
                _element.setAttribute("v4vdideditshapeattribute","false");
            }

            var _editAddon = /*_element.getAttribute("v4vdideditshapeattribute") == "true" ? 180 : */0;

            shapeAngle = Number(_element.getAttribute(attributeManifest.rotation))+_editAddon;

            //console.log(_element.getAttribute("v4vdideditshapeattribute"));
            

            // var handles = _element.getAttribute("v4vdideditshapeattribute") == "true" ? 
            //     {
            //         tl:new Circle(_stage, whCenter.x+Number(_element.getAttribute(attributeManifest.br).split("_")[0]), whCenter.y+Number(_element.getAttribute(attributeManifest.br).split("_")[1]), 8),
            //         tr:new Circle(_stage, whCenter.x+Number(_element.getAttribute(attributeManifest.bl).split("_")[0]), whCenter.y+Number(_element.getAttribute(attributeManifest.bl).split("_")[1]), 8),
            //         br:new Circle(_stage, whCenter.x+Number(_element.getAttribute(attributeManifest.tl).split("_")[0]), whCenter.y+Number(_element.getAttribute(attributeManifest.tl).split("_")[1]), 8),
            //         bl:new Circle(_stage, whCenter.x+Number(_element.getAttribute(attributeManifest.tr).split("_")[0]), whCenter.y+Number(_element.getAttribute(attributeManifest.tr).split("_")[1]), 8),
            //         r:new Circle(_stage, 0, 0, 8)

            //     } : {
            //         tl:new Circle(_stage, whCenter.x+Number(_element.getAttribute(attributeManifest.tl).split("_")[0]), whCenter.y+Number(_element.getAttribute(attributeManifest.tl).split("_")[1]), 8),
            //         tr:new Circle(_stage, whCenter.x+Number(_element.getAttribute(attributeManifest.tr).split("_")[0]), whCenter.y+Number(_element.getAttribute(attributeManifest.tr).split("_")[1]), 8),
            //         br:new Circle(_stage, whCenter.x+Number(_element.getAttribute(attributeManifest.br).split("_")[0]), whCenter.y+Number(_element.getAttribute(attributeManifest.br).split("_")[1]), 8),
            //         bl:new Circle(_stage, whCenter.x+Number(_element.getAttribute(attributeManifest.bl).split("_")[0]), whCenter.y+Number(_element.getAttribute(attributeManifest.bl).split("_")[1]), 8),
            //         r:new Circle(_stage, 0, 0, 8)

            //     };

            var handles = {
                tl:new Circle(_stage, whCenter.x+Number(_element.getAttribute(attributeManifest.tl).split("_")[0]), whCenter.y+Number(_element.getAttribute(attributeManifest.tl).split("_")[1]), 8),
                tr:new Circle(_stage, whCenter.x+Number(_element.getAttribute(attributeManifest.tr).split("_")[0]), whCenter.y+Number(_element.getAttribute(attributeManifest.tr).split("_")[1]), 8),
                br:new Circle(_stage, whCenter.x+Number(_element.getAttribute(attributeManifest.br).split("_")[0]), whCenter.y+Number(_element.getAttribute(attributeManifest.br).split("_")[1]), 8),
                bl:new Circle(_stage, whCenter.x+Number(_element.getAttribute(attributeManifest.bl).split("_")[0]), whCenter.y+Number(_element.getAttribute(attributeManifest.bl).split("_")[1]), 8),
                r:new Circle(_stage, 0, 0, 8)

            };

            _element.setAttribute("v4vdideditshapeattribute","false");

            //handles.r.attr("cx", Number(handles.br.attr("cx"))+((Number(handles.bl.attr("cx"))-Number(handles.br.attr("cx")))/2));
            //handles.r.attr("cy", Number(handles.br.attr("cy"))+((Number(handles.bl.attr("cy"))-Number(handles.br.attr("cy")))/2));

            positionRotationHandle(true);

            //handles.r = new Circle(_stage, _element.getBoundingClientRect().left + (_element.getBoundingClientRect().width/2) -_offset.x, _element.getBoundingClientRect().top+_element.getBoundingClientRect().height-_offset.y, 8);



            // var handles = {
            //     tl:new Circle(_stage, _element.getBoundingClientRect().left-_offset.x, _element.getBoundingClientRect().top-_offset.y, 8),
            //     tr:new Circle(_stage, _element.getBoundingClientRect().left+_element.getBoundingClientRect().width-_offset.x, _element.getBoundingClientRect().top-_offset.y, 8),
            //     br:new Circle(_stage, _element.getBoundingClientRect().left+_element.getBoundingClientRect().width-_offset.x, _element.getBoundingClientRect().top+_element.getBoundingClientRect().height-_offset.y, 8),
            //     bl:new Circle(_stage, _element.getBoundingClientRect().left-_offset.x, _element.getBoundingClientRect().top+_element.getBoundingClientRect().height-_offset.y, 8),
            //     r:new Circle(_stage, _element.getBoundingClientRect().left + (_element.getBoundingClientRect().width/2) -_offset.x, _element.getBoundingClientRect().top+_element.getBoundingClientRect().height-_offset.y, 8)

            // };

            handles.tl.attr("fill","#cc0000");
            handles.tr.attr("fill","#00cc00");
            handles.br.attr("fill","#0000cc");
            handles.bl.attr("fill","#cccccc");
            handles.tl.Drag(dragTL);
            handles.tr.Drag(dragTR);
            handles.br.Drag(dragBR);
            handles.bl.Drag(dragBL);
            handles.r.Drag(dragR);

            var currentAngleData = getAngleData();
            

            handles.tl.getElement().addEventListener("mousedown",function(e){
                
                currentAngleData = getAngleData();
                
            });

            handles.tr.getElement().addEventListener("mousedown",function(e){
                
                currentAngleData = getAngleData();
                
            });

            handles.br.getElement().addEventListener("mousedown",function(e){
                
                currentAngleData = getAngleData();
                
            });

            handles.bl.getElement().addEventListener("mousedown",function(e){
                
                currentAngleData = getAngleData();
                
            });

            handles.r.getElement().addEventListener("mousedown",function(e){
                
                currentAngleData = getAngleData();
                //addOffset = false;
                
            });

            

            function setDimensionAttributes(center){
                _element.setAttribute("v4vdideditshapeattribute","true");
                _element.setAttribute(attributeManifest.rotation,shapeAngle);
                var _tl = {x:Number(handles.tl.attr("cx"))-center.x,y:Number(handles.tl.attr("cy"))-center.y};
                var _tr = {x:Number(handles.tr.attr("cx"))-center.x,y:Number(handles.tr.attr("cy"))-center.y};
                var _br = {x:Number(handles.br.attr("cx"))-center.x,y:Number(handles.br.attr("cy"))-center.y};
                var _bl = {x:Number(handles.bl.attr("cx"))-center.x,y:Number(handles.bl.attr("cy"))-center.y};
                _element.setAttribute(attributeManifest.tl,_tl.x.toString()+"_"+_tl.y.toString());
                _element.setAttribute(attributeManifest.tr,_tr.x.toString()+"_"+_tr.y.toString());
                _element.setAttribute(attributeManifest.br,_br.x.toString()+"_"+_br.y.toString());
                _element.setAttribute(attributeManifest.bl,_bl.x.toString()+"_"+_bl.y.toString());
            }

            function getAngleData(){
                var elementCenterPoint = getCenterPoint();
                var angleOffset = 180;

                return {
                    c:elementCenterPoint, 
                    tl:{
                        a:getAngle(elementCenterPoint.x,elementCenterPoint.y,Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy")))-shapeAngle+angleOffset,
                        d:getDistance(elementCenterPoint.x,elementCenterPoint.y,Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy")))
                    },
                    tr:{
                        a:getAngle(elementCenterPoint.x,elementCenterPoint.y,Number(handles.tr.attr("cx")),Number(handles.tr.attr("cy")))-shapeAngle+angleOffset,
                        d:getDistance(elementCenterPoint.x,elementCenterPoint.y,Number(handles.tr.attr("cx")),Number(handles.tr.attr("cy")))
                    },
                    br:{
                        a:getAngle(elementCenterPoint.x,elementCenterPoint.y,Number(handles.br.attr("cx")),Number(handles.br.attr("cy")))-shapeAngle+angleOffset,
                        d:getDistance(elementCenterPoint.x,elementCenterPoint.y,Number(handles.br.attr("cx")),Number(handles.br.attr("cy")))
                    },
                    bl:{
                        a:getAngle(elementCenterPoint.x,elementCenterPoint.y,Number(handles.bl.attr("cx")),Number(handles.bl.attr("cy")))-shapeAngle+angleOffset,
                        d:getDistance(elementCenterPoint.x,elementCenterPoint.y,Number(handles.bl.attr("cx")),Number(handles.bl.attr("cy")))
                    }
                };
            }

            

            

            //var _intersection = 

            //handles.r.attr("cx",_intersection.x);
            //handles.r.attr("cy",_intersection.y);

            var deleteButton;
            var deletePoly;
            if(_enableDelete){
                deleteButton = new Text(_stage, 0, 0, "X");
                deleteButton.attr("style","font-family:Arial;");
                deletePoly = new Path(_stage,getDeletePoints());
                deletePoly.attr("fill",'transparent');
                //deletePoly.attr("stroke",'rgba(255,0,0,.4)');
                positionDelete();
                deletePoly.getElement().addEventListener("click",deleteClicked);
            }

            var infoButton;
            var infoPoly;

            if(_enableInfo){
                infoButton = new Text(_stage, 0, 0, "E");
                infoButton.attr("style","font-family:Arial;");
                infoPoly = new Path(_stage,getInfoPoints());
                infoPoly.attr("fill",'transparent');
                //deletePoly.attr("stroke",'rgba(255,0,0,.4)');
                positionInfo();
                infoPoly.getElement().addEventListener("click",infoClicked);
            }

            function rePlot(rawPoint){
                return {
                    x:getOrbit(currentAngleData.c.x,getDistance(rawPoint.x,rawPoint.y,refCenter.x,refCenter.y),getAngle(rawPoint.x,rawPoint.y,refCenter.x,refCenter.y)+shapeAngle,"cos"),
                    y:getOrbit(currentAngleData.c.y,getDistance(rawPoint.x,rawPoint.y,refCenter.x,refCenter.y),getAngle(rawPoint.x,rawPoint.y,refCenter.x,refCenter.y)+shapeAngle,"sin")
                }
            }

            function positionRotationHandle(suspendData){
                handles.r.attr("cx", Number(handles.br.attr("cx"))+((Number(handles.bl.attr("cx"))-Number(handles.br.attr("cx")))/2));
                handles.r.attr("cy", Number(handles.br.attr("cy"))+((Number(handles.bl.attr("cy"))-Number(handles.br.attr("cy")))/2));
                if(!suspendData){
                    currentAngleData = getAngleData();
                }
                
            }

            function getReferencePoint(handle){
                return {
                    x:getOrbit(refCenter.x,getDistance(currentAngleData.c.x,currentAngleData.c.y,Number(handle.attr("cx")),Number(handle.attr("cy"))),getAngle(Number(handle.attr("cx")),Number(handle.attr("cy")),currentAngleData.c.x,currentAngleData.c.y)-shapeAngle,"cos"),
                    y:getOrbit(refCenter.y,getDistance(currentAngleData.c.x,currentAngleData.c.y,Number(handle.attr("cx")),Number(handle.attr("cy"))),getAngle(Number(handle.attr("cx")),Number(handle.attr("cy")),currentAngleData.c.x,currentAngleData.c.y)-shapeAngle,"sin")
                };
            }

            function dragTL(){

                

                var refPoint = getReferencePoint(handles.tl);

                var rawTR = {
                    x:refCenter.x+(refCenter.x-refPoint.x),
                    y:refPoint.y
                };

                var rawBR = {
                    x:rawTR.x,
                    y:refCenter.y+(refCenter.y-rawTR.y)
                };

                var rawBL = {
                    x:refCenter.x+(refCenter.x-rawBR.x),
                    y:rawBR.y
                };

                var realTR = rePlot(rawTR);
                var realBR = rePlot(rawBR);
                var realBL = rePlot(rawBL);

                

                handles.tr.attr("cx", realTR.x);
                handles.tr.attr("cy", realTR.y);

                handles.br.attr("cx", realBR.x);
                handles.br.attr("cy", realBR.y);

                handles.bl.attr("cx", realBL.x);
                handles.bl.attr("cy", realBL.y);

                positionRotationHandle();
                

                positionDelete();
                positionInfo();
                setDimensionAttributes(currentAngleData.c);
                _handler(_element,Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy")),getDistance(Number(handles.tr.attr("cx")),Number(handles.tr.attr("cy")),Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy"))), getDistance(Number(handles.bl.attr("cx")),Number(handles.bl.attr("cy")),Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy"))),shapeAngle);
                

            }
            function dragTR(){
                var refPoint = getReferencePoint(handles.tr);

                var rawTL = {
                    x:refCenter.x+(refCenter.x-refPoint.x),
                    y:refPoint.y
                };

                var rawBL = {
                    x:rawTL.x,
                    y:refCenter.y+(refCenter.y-rawTL.y)
                };

                var rawBR = {
                    x:refCenter.x+(refCenter.x-rawBL.x),
                    y:rawBL.y
                };

                var realTL = rePlot(rawTL);
                var realBR = rePlot(rawBR);
                var realBL = rePlot(rawBL);

                

                handles.tl.attr("cx", realTL.x);
                handles.tl.attr("cy", realTL.y);

                handles.br.attr("cx", realBR.x);
                handles.br.attr("cy", realBR.y);

                handles.bl.attr("cx", realBL.x);
                handles.bl.attr("cy", realBL.y);

                positionRotationHandle();
                

                positionDelete();
                positionInfo();
                setDimensionAttributes(currentAngleData.c);
                /*
                handles.tl.attr("cy",handles.tr.attr("cy"));
                handles.br.attr("cx",handles.tr.attr("cx"));
                positionDelete();
                //*/
                _handler(_element,Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy")),getDistance(Number(handles.tr.attr("cx")),Number(handles.tr.attr("cy")),Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy"))), getDistance(Number(handles.bl.attr("cx")),Number(handles.bl.attr("cy")),Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy"))),shapeAngle);
                
            }
            function dragBR(){
                var refPoint = getReferencePoint(handles.br);

                var rawBL = {
                    x:refCenter.x+(refCenter.x-refPoint.x),
                    y:refPoint.y
                };

                var rawTL = {
                    x:rawBL.x,
                    y:refCenter.y+(refCenter.y-rawBL.y)
                };

                var rawTR = {
                    x:refCenter.x+(refCenter.x-rawTL.x),
                    y:rawTL.y
                };

                var realBL = rePlot(rawBL);
                var realTL = rePlot(rawTL);
                var realTR = rePlot(rawTR);

                

                handles.bl.attr("cx", realBL.x);
                handles.bl.attr("cy", realBL.y);

                handles.tl.attr("cx", realTL.x);
                handles.tl.attr("cy", realTL.y);

                handles.tr.attr("cx", realTR.x);
                handles.tr.attr("cy", realTR.y);

                positionRotationHandle();
                

                positionDelete();
                positionInfo();
                setDimensionAttributes(currentAngleData.c);
                // handles.bl.attr("cy",handles.br.attr("cy"));
                // handles.tr.attr("cx",handles.br.attr("cx"));
                // positionDelete();
                //_handler(_element,Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy")),Number(handles.tr.attr("cx"))-Number(handles.tl.attr("cx")),Number(handles.br.attr("cy"))-Number(handles.tr.attr("cy")));
                _handler(_element,Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy")),getDistance(Number(handles.tr.attr("cx")),Number(handles.tr.attr("cy")),Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy"))), getDistance(Number(handles.bl.attr("cx")),Number(handles.bl.attr("cy")),Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy"))),shapeAngle);
                
            }
            function dragBL(){
                var refPoint = getReferencePoint(handles.bl);

                var rawBR = {
                    x:refCenter.x+(refCenter.x-refPoint.x),
                    y:refPoint.y
                };

                var rawTR = {
                    x:rawBR.x,
                    y:refCenter.y+(refCenter.y-rawBR.y)
                };

                var rawTL = {
                    x:refCenter.x+(refCenter.x-rawTR.x),
                    y:rawTR.y
                };

                var realBR = rePlot(rawBR);
                var realTR = rePlot(rawTR);
                var realTL = rePlot(rawTL);

                

                handles.br.attr("cx", realBR.x);
                handles.br.attr("cy", realBR.y);

                handles.tr.attr("cx", realTR.x);
                handles.tr.attr("cy", realTR.y);

                handles.tl.attr("cx", realTL.x);
                handles.tl.attr("cy", realTL.y);

                positionRotationHandle();
                

                positionDelete();
                positionInfo();
                setDimensionAttributes(currentAngleData.c);
                // handles.br.attr("cy",handles.bl.attr("cy"));
                // handles.tl.attr("cx",handles.bl.attr("cx"));
                // positionDelete();
                //_handler(_element,Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy")),Number(handles.tr.attr("cx"))-Number(handles.tl.attr("cx")),Number(handles.br.attr("cy"))-Number(handles.tr.attr("cy")));
                _handler(_element,Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy")),getDistance(Number(handles.tr.attr("cx")),Number(handles.tr.attr("cy")),Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy"))), getDistance(Number(handles.bl.attr("cx")),Number(handles.bl.attr("cy")),Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy"))),shapeAngle);
            }

            function dragR(){



                var rAngle = getAngle(Number(handles.r.attr("cx")), Number(handles.r.attr("cy")),currentAngleData.c.x, currentAngleData.c.y);

                

                shapeAngle = rAngle;

                handles.tl.attr("cx",getOrbit(currentAngleData.c.x,currentAngleData.tl.d,currentAngleData.tl.a+rAngle-180,"cos"));
                handles.tl.attr("cy",getOrbit(currentAngleData.c.y,currentAngleData.tl.d,currentAngleData.tl.a+rAngle-180,"sin"));

                handles.tr.attr("cx",getOrbit(currentAngleData.c.x,currentAngleData.tr.d,currentAngleData.tr.a+rAngle-180,"cos"));
                handles.tr.attr("cy",getOrbit(currentAngleData.c.y,currentAngleData.tr.d,currentAngleData.tr.a+rAngle-180,"sin"));

                handles.br.attr("cx",getOrbit(currentAngleData.c.x,currentAngleData.br.d,currentAngleData.br.a+rAngle-180,"cos"));
                handles.br.attr("cy",getOrbit(currentAngleData.c.y,currentAngleData.br.d,currentAngleData.br.a+rAngle-180,"sin"));

                handles.bl.attr("cx",getOrbit(currentAngleData.c.x,currentAngleData.bl.d,currentAngleData.bl.a+rAngle-180,"cos"));
                handles.bl.attr("cy",getOrbit(currentAngleData.c.y,currentAngleData.bl.d,currentAngleData.bl.a+rAngle-180,"sin"));

                positionRotationHandle();
                setDimensionAttributes(currentAngleData.c);

                // handles.br.attr("cy",handles.bl.attr("cy"));
                // handles.tl.attr("cx",handles.bl.attr("cx"));
                positionDelete();

                positionInfo();
                // _handler(_element,Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy")),Number(handles.tr.attr("cx"))-Number(handles.tl.attr("cx")),Number(handles.br.attr("cy"))-Number(handles.tr.attr("cy")));
                _handler(_element,Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy")),getDistance(Number(handles.tr.attr("cx")),Number(handles.tr.attr("cy")),Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy"))), getDistance(Number(handles.bl.attr("cx")),Number(handles.bl.attr("cy")),Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy"))),shapeAngle);
                
            }

            function getCenterPoint(){
                return getIntersection({x:Number(handles.tl.attr("cx")),y:Number(handles.tl.attr("cy"))},{x:Number(handles.tr.attr("cx")),y:Number(handles.tr.attr("cy"))},{x:Number(handles.br.attr("cx")),y:Number(handles.br.attr("cy"))},{x:Number(handles.bl.attr("cx")),y:Number(handles.bl.attr("cy"))});
            }

            function positionDelete(){
                if(_enableDelete){
                    deleteButton.attr("x",Number(handles.tl.attr("cx"))+(Number(handles.tr.attr("cx")-handles.tl.attr("cx"))/2)-(deleteButton.getElement().getBoundingClientRect().width/2));
                    deleteButton.attr("y",Number(handles.tl.attr("cy"))+(Number(handles.tr.attr("cy")-handles.tl.attr("cy"))/2)-(deleteButton.getElement().getBoundingClientRect().height/2));
                    //deleteButton.attr("y",Number(handles.tl.attr("cy"))+(deleteButton.getElement().getBoundingClientRect().height/2));
                    deletePoly.attr("d",_stage.getLineString(getDeletePoints()));
                }
            }

            function positionInfo(){
                if(_enableInfo){
                    infoButton.attr("x",Number(handles.tr.attr("cx"))+(Number(handles.br.attr("cx")-handles.tr.attr("cx"))/2)-(infoButton.getElement().getBoundingClientRect().width/2));
                    infoButton.attr("y",Number(handles.tr.attr("cy"))+(Number(handles.br.attr("cy")-handles.tr.attr("cy"))/2)-(infoButton.getElement().getBoundingClientRect().height/2));
                    //deleteButton.attr("y",Number(handles.tl.attr("cy"))+(deleteButton.getElement().getBoundingClientRect().height/2));
                    infoPoly.attr("d",_stage.getLineString(getInfoPoints()));
                }
            }

            this.remove = function(){
                removeResizor();
            }

            this.delete = function(){
                deleteClicked();
            }

            function removeResizor(){
                if(handles != undefined){
                    handles.tl.remove();
                    handles.tr.remove();
                    handles.br.remove();
                    handles.bl.remove();
                    handles.r.remove();
                    if(_enableDelete){
                        deleteButton.remove();
                        deletePoly.remove();
                    }
                    if(_enableInfo){
                        infoButton.remove();
                        infoPoly.remove();
                    }
                    handles = undefined;
                }
                
            }

            function getDeletePoints(){
                return [
                {x:Number(deleteButton.attr("x")),y:Number(deleteButton.attr("y"))-deleteButton.getElement().getBoundingClientRect().height},
                {x:Number(deleteButton.attr("x"))+deleteButton.getElement().getBoundingClientRect().width,y:Number(deleteButton.attr("y"))-deleteButton.getElement().getBoundingClientRect().height},
                {x:Number(deleteButton.attr("x"))+deleteButton.getElement().getBoundingClientRect().width,y:Number(deleteButton.attr("y"))},
                {x:Number(deleteButton.attr("x")),y:Number(deleteButton.attr("y"))}];
            }

            function getInfoPoints(){
                return [
                {x:Number(infoButton.attr("x")),y:Number(infoButton.attr("y"))-infoButton.getElement().getBoundingClientRect().height},
                {x:Number(infoButton.attr("x"))+infoButton.getElement().getBoundingClientRect().width,y:Number(infoButton.attr("y"))-infoButton.getElement().getBoundingClientRect().height},
                {x:Number(infoButton.attr("x"))+infoButton.getElement().getBoundingClientRect().width,y:Number(infoButton.attr("y"))},
                {x:Number(infoButton.attr("x")),y:Number(infoButton.attr("y"))}];
            }

            function deleteClicked(){
                _element.parentNode.removeChild(_element);
                removeResizor();
                if(_deleteHandler != undefined){
                    _deleteHandler();
                }
                
            }

            function infoClicked(){
                // _element.parentNode.removeChild(_element);
                // removeResizor();
                _infoHandler();
            }
            
        }


        this.resizor = function(_stage, _element, _handler,_offset,_enableDelete){
            return new Resizor(_stage, _element,_handler,_offset,_enableDelete);
        }

        function Resizor(_stage, _element,_handler,_offset,_enableDelete){

            var handles = {
                tl:new Circle(_stage, _element.getBoundingClientRect().left-_offset.x, _element.getBoundingClientRect().top-_offset.y, 8),
                tr:new Circle(_stage, _element.getBoundingClientRect().left+_element.getBoundingClientRect().width-_offset.x, _element.getBoundingClientRect().top-_offset.y, 8),
                br:new Circle(_stage, _element.getBoundingClientRect().left+_element.getBoundingClientRect().width-_offset.x, _element.getBoundingClientRect().top+_element.getBoundingClientRect().height-_offset.y, 8),
                bl:new Circle(_stage, _element.getBoundingClientRect().left-_offset.x, _element.getBoundingClientRect().top+_element.getBoundingClientRect().height-_offset.y, 8)

            };
            handles.tl.Drag(dragTL);
            handles.tr.Drag(dragTR);
            handles.br.Drag(dragBR);
            handles.bl.Drag(dragBL);

            var deleteButton;
            var deletePoly;
            if(_enableDelete){
                deleteButton = new Text(_stage, 0, 0, "X");
                deleteButton.attr("style","font-family:Arial;");
                deletePoly = new Path(_stage,getDeletePoints());
                deletePoly.attr("fill",'transparent');
                //deletePoly.attr("stroke",'rgba(255,0,0,.4)');
                positionDelete();
                deletePoly.getElement().addEventListener("click",deleteClicked);
            }

            function dragTL(){
                handles.tr.attr("cy",handles.tl.attr("cy"));
                handles.bl.attr("cx",handles.tl.attr("cx"));
                positionDelete();
                _handler(_element,Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy")),Number(handles.tr.attr("cx"))-Number(handles.tl.attr("cx")),Number(handles.br.attr("cy"))-Number(handles.tr.attr("cy")));

            }
            function dragTR(){
                handles.tl.attr("cy",handles.tr.attr("cy"));
                handles.br.attr("cx",handles.tr.attr("cx"));
                positionDelete();
                _handler(_element,Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy")),Number(handles.tr.attr("cx"))-Number(handles.tl.attr("cx")),Number(handles.br.attr("cy"))-Number(handles.tr.attr("cy")));
                
            }
            function dragBR(){
                handles.bl.attr("cy",handles.br.attr("cy"));
                handles.tr.attr("cx",handles.br.attr("cx"));
                positionDelete();
                _handler(_element,Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy")),Number(handles.tr.attr("cx"))-Number(handles.tl.attr("cx")),Number(handles.br.attr("cy"))-Number(handles.tr.attr("cy")));
                
            }
            function dragBL(){
                handles.br.attr("cy",handles.bl.attr("cy"));
                handles.tl.attr("cx",handles.bl.attr("cx"));
                positionDelete();
                _handler(_element,Number(handles.tl.attr("cx")),Number(handles.tl.attr("cy")),Number(handles.tr.attr("cx"))-Number(handles.tl.attr("cx")),Number(handles.br.attr("cy"))-Number(handles.tr.attr("cy")));
                
            }

            function positionDelete(){
                if(_enableDelete){
                    deleteButton.attr("x",Number(handles.tl.attr("cx"))+(Number(handles.tr.attr("cx")-handles.tl.attr("cx"))/2)-(deleteButton.getElement().getBoundingClientRect().width/2));
                    deleteButton.attr("y",Number(handles.tl.attr("cy"))+(deleteButton.getElement().getBoundingClientRect().height/2));
                    deletePoly.attr("d",_stage.getLineString(getDeletePoints()));
                }
            }

            this.remove = function(){
                removeResizor();
            }

            function removeResizor(){
                if(handles != undefined){
                    handles.tl.remove();
                    handles.tr.remove();
                    handles.br.remove();
                    handles.bl.remove();
                    if(_enableDelete){
                        deleteButton.remove();
                        deletePoly.remove();
                    }
                    handles = undefined;
                }
                
            }

            function getDeletePoints(){
                return [
                {x:Number(deleteButton.attr("x")),y:Number(deleteButton.attr("y"))-deleteButton.getElement().getBoundingClientRect().height},
                {x:Number(deleteButton.attr("x"))+deleteButton.getElement().getBoundingClientRect().width,y:Number(deleteButton.attr("y"))-deleteButton.getElement().getBoundingClientRect().height},
                {x:Number(deleteButton.attr("x"))+deleteButton.getElement().getBoundingClientRect().width,y:Number(deleteButton.attr("y"))},
                {x:Number(deleteButton.attr("x")),y:Number(deleteButton.attr("y"))}];
            }

            function getInfoPoints(){
                return [
                {x:Number(infoButton.attr("x")),y:Number(infoButton.attr("y"))-infoButton.getElement().getBoundingClientRect().height},
                {x:Number(infoButton.attr("x"))+infoButton.getElement().getBoundingClientRect().width,y:Number(infoButton.attr("y"))-infoButton.getElement().getBoundingClientRect().height},
                {x:Number(infoButton.attr("x"))+infoButton.getElement().getBoundingClientRect().width,y:Number(infoButton.attr("y"))},
                {x:Number(infoButton.attr("x")),y:Number(infoButton.attr("y"))}];
            }

            function deleteClicked(){
                _element.parentNode.removeChild(_element);
                removeResizor();
            }
            
        }

        this.resizableStage = function(_stage,_addHandler,_selectHandler,_resizeHandler,_deleteHandler,_deselectHandler,_infoHandler){
            return new ResizeableStage(_stage,_addHandler,_selectHandler,_resizeHandler,_deleteHandler,_deselectHandler,_infoHandler);
        }

        function ResizeableStage(_stage,_addHandler,_selectHandler,_resizeHandler,_deleteHandler,_deselectHandler,_infoHandler){
            var dims = {w:_stage.getElement().getBoundingClientRect().width,h:_stage.getElement().getBoundingClientRect().height};
            var svgID = Math.random().toString().split(".").join("")+Math.random().toString().split(".").join("")+Math.random().toString().split(".").join("");
            var bgBath = v4v.path(_stage,{fill:"transparent"},[{x:0,y:0,r:0},{x:1,y:0,r:0},{x:0,y:1,r:0}]);
            bgBath.attr("d",_stage.getLineString([{x:0,y:0},{x:dims.w,y:0},{x:dims.w,y:dims.h},{x:0,y:dims.h}]));
            bgBath.getElement().addEventListener("mousedown",function(){
                if(resizor != undefined){
                    resizor.remove();
                    resizor = undefined;
                    if(_deselectHandler != undefined && currentMarker != undefined){
                        _deselectHandler(currentMarker.getAttribute("markerid"));
                    }
                    currentMarker = undefined;

                    //document.getElementById("id_field_"+svgID).value = "";
                }
            });
            var angleMax = 360;
            var vMax = 10;
            var vMin = vMax*-1;
            var sizeRatio = .14;
            var vRatio = -4;
            var resizor;
            var angleOffset = 90;
            var currentMarker;
            function getDimensions(_el){
                return {
                    p:_el.parentNode.getAttribute("transform"),
                    c:_el.getAttribute("transform"),
                    width:Number(_el.getAttribute("width")),
                    height:Number(_el.getAttribute("height")),
                    center:{x:_el.getBoundingClientRect().left+(_el.getBoundingClientRect().width/2)-_stage.getElement().getBoundingClientRect().left,y:_el.getBoundingClientRect().top+(_el.getBoundingClientRect().height/2)-_stage.getElement().getBoundingClientRect().top},
                    x:_el.getBoundingClientRect().left,
                    y:_el.getBoundingClientRect().top,
                };
                
            }
            function onResize(_element, x, y, width, height, rotation,suspendHandler){
                console.log(_element);
                _element.parentNode.setAttribute("transform","translate(0,0)");
                _element.parentNode.setAttribute("translatex","0");
                _element.parentNode.setAttribute("translatey","0");
                _element.setAttribute("transform","rotate("+rotation+" "+x+" "+y+") translate("+x.toString()+","+y.toString()+")");
                //_element.setAttribute("transform","translate("+x.toString()+","+y.toString()+")")
                //_element.setAttribute("x",x);
                //_element.setAttribute("y",y);
                _element.setAttribute("width",width);
                _element.setAttribute("height",height);
                if(_resizeHandler != undefined && !suspendHandler){
                    _resizeHandler(currentMarker.getAttribute("markerid"),getDimensions(currentMarker));
                }   
            }

            this.update = function(_element, x, y, width, height, rotation){
                onResize(_element, x, y, width, height, rotation);
            }
            // document.getElementById("id_field_"+svgID).addEventListener("keyup",function(e){
            //     if(currentMarker != undefined){
            //         currentMarker.setAttribute("markerid",document.getElementById("id_field_"+svgID).value);
            //         output();
            //     }
            // });
            

            this.add = function(_data,_elementID){
                addItem(_data,_elementID);
            }

            this.delete = function(){
                resizor.delete();
            }

            this.applyControls = function(_elementID){
                addControls(_elementID);
            }

            function addItem(_data,_elementID){
                if(_elementID != undefined){
                    if(_addHandler != undefined){
                        var rectangles = _stage.getElement().getElementsByTagName("rect");
                        var markerRect;
                        for(var i = 0;i<rectangles.length;i++){
                            if(rectangles[i].getAttribute("markerid") == _elementID){
                                markerRect = rectangles[i];
                            }
                        }
                        _addHandler(_elementID,getDimensions(markerRect));
                    }

                }
                else{
                    addControls();
                    // var marker = v4v.rect(_stage, {x:0,y:0,width:100,height:100,fill:"rgba(236,183,0,.3)",stroke:"rgba(255,0,0,.6)",markerid:Math.random().toString().split(".").join("")});
                    
                    // var markerShell = v4v.g(_stage,{id:"markershell_"+svgID,translatex:"0",translatey:"0"});
                    // markerShell.getElement().appendChild(marker.getElement());
                    // markerShell.Drag(function(_obj,_el){
                    //     if(_resizeHandler != undefined){
                            
                    //         _resizeHandler(_el.getElementsByTagName("rect")[0].getAttribute("markerid"),getDimensions(_el.getElementsByTagName("rect")[0]));
                    //     }
                    // });
                    // onMarkerDown();
                    // currentMarker = marker.getElement();
                    // if(_addHandler != undefined){
                    //     _addHandler(marker.attr("markerid"),getDimensions(marker.getElement()));
                    // }
                    // onMarkerSelected(currentMarker);
                    // marker.getElement().addEventListener("click", function(e){

                    //     currentMarker = e.currentTarget;
                        
                    //     onMarkerSelected(currentMarker);

                    // });

                    // marker.getElement().addEventListener("mousedown", onMarkerDown); 
                }
                

                
            }

            function addControls(_elementID){
                console.log(_elementID);
                var _suspendEvents = _elementID != undefined;
                var _markerID = _elementID == undefined ? Math.random().toString().split(".").join("") : _elementID;
                var marker = v4v.rect(_stage, {x:0,y:0,width:100,height:100,fill:"rgba(236,183,0,.3)",stroke:"rgba(255,0,0,.6)",markerid:_markerID});
                    
                var markerShell = v4v.g(_stage,{id:"markershell_"+svgID,translatex:"0",translatey:"0"});
                markerShell.getElement().appendChild(marker.getElement());
                markerShell.Drag(function(_obj,_el){
                    if(_resizeHandler != undefined){
                        
                        _resizeHandler(_el.getElementsByTagName("rect")[0].getAttribute("markerid"),getDimensions(_el.getElementsByTagName("rect")[0]));
                    }
                });
                if(!_suspendEvents){
                    onMarkerDown();
                    currentMarker = marker.getElement();
                    if(_addHandler != undefined){
                        _addHandler(marker.attr("markerid"),getDimensions(marker.getElement()));
                    }
                    onMarkerSelected(currentMarker);
                }
                
                marker.getElement().addEventListener("click", function(e){

                    currentMarker = e.currentTarget;
                    
                    onMarkerSelected(currentMarker);

                });

                marker.getElement().addEventListener("mousedown", onMarkerDown); 
            }

            function onMarkerSelected(cm){
                //resizor = v4v.resizor(_stage, cm ,onResize,{x:_stage.getElement().getBoundingClientRect().left,y:_stage.getElement().getBoundingClientRect().top},true);
                var markerShellElement = document.getElementById("markershell_"+svgID);
                var markerShellOffset = {x:Number(markerShellElement.getAttribute("translatex")),y:Number(markerShellElement.getAttribute("translatey"))};
                //console.log(markerShellOffset);
                var resizorOffset = {x:_stage.getElement().getBoundingClientRect().left,y:_stage.getElement().getBoundingClientRect().top};
                var deleteMethod = _deleteHandler!=undefined  ? function(){ _deleteHandler(currentMarker.getAttribute("markerid")); } : _deleteHandler;
                var infoMethod = _infoHandler!=undefined  ? function(){ _infoHandler(currentMarker.getAttribute("markerid")); } : _infoHandler;
                resizor = new ResizorWithRotation(_stage, cm ,onResize,resizorOffset,deleteMethod,infoMethod);
                //currentMarker = e.currentTarget;
                //document.getElementById("id_field_"+svgID).value = cm.getAttribute("markerid");
                if(_selectHandler != undefined){
                    _selectHandler(cm.getAttribute("markerid"),getDimensions(cm));
                }
            }

            function onMarkerDown(e){
                if(resizor != undefined){
                    resizor.remove();
                    resizor = undefined;
                    currentMarker = undefined;
                    
                    
                    //document.getElementById("id_field_"+svgID).value = "";
                }
            }

            //document.getElementsByClassName("touch-point-output-button")[0].addEventListener("click",output);

            // document.getElementsByTagName("body")[0].addEventListener("mouseup",function(){
            //     setTimeout(output,100);
            // });

            //document.getElementsByTagName("body")[0].addEventListener("mousemove",output);

            // function output(){
            //     var markers = _stage.getElement().getElementsByTagName("rect");
            //     var markerPoints = [];
            //     for(var i = 0;i<markers.length;i++){
            //         var _x = Number(markers[i].getAttribute('x'))+(Number(markers[i].getAttribute('width'))/2);

            //         var _y = Number(markers[i].getAttribute('y'))+(Number(markers[i].getAttribute('height'))/2);

            //         markerPoints.push({
            //             angle:((_x/dims.w)*360)+angleOffset,
            //             vertical:(((_y/dims.h)*(vMax-vMin))-vMax)*vRatio,
            //             height:Number(markers[i].getAttribute('height')*sizeRatio),
            //             width:Number(markers[i].getAttribute('width')*sizeRatio),
            //             trackingID:markers[i].getAttribute('markerid')
            //         });
            //     }



            //     //console.log(JSON.stringify(markerPoints));

            //     document.getElementById("output_"+svgID).innerHTML = JSON.stringify(markerPoints);
            // }


            //_stage.getElement().style.backgroungImage = "url('"+img+"')";
        }

        // editing end


        //Stage Begin

        function getAttributeReplacementPairs() {
            return [
                { i: "stopColor", o: "stop-color" },
                { i: "cssClass", o: "class" },
                { i: "strikeWidth", o: "strike-width" },
                { i: "fillRule", o: "fill-rule" }

            ];
        }

        this.stage = function(_element, _x, _y, _width, _height, _container, _id)
        {
            return new SVGStage(_element, _x, _y, _width, _height, _container, _id);
        }
        function SVGStage(_element,_x, _y, _width, _height, _container, _id) {

            var x;
            var y;
            var width;
            var height;

            if(_element!=undefined){
                x = _element == false ? _x : _element.getBoundingClientRect().left;
                y = _element == false ? _y : _element.getBoundingClientRect().top;
                width = _element == false ? _width : _element.getBoundingClientRect().width;
                height = _element == false ? _height : _element.getBoundingClientRect().height;
            }
            this.getWidth = function () {
                return width;
            }

            this.getHeight = function () {
                return height;
            }

            this.getX = function () {
                return x;
            }

            this.getY = function () {
                return y;
            }

            this.makeXHTML = function (tag, attrs) {
                attrs.xmlns = 'http://www.w3.org/1999/xhtml';
                var el = document.createElement(tag);
                for (var k in attrs) {
                    var kName = k;
                    for (var i = 0; i < getAttributeReplacementPairs().length; i++) {
                        if (kName == getAttributeReplacementPairs()[i].i) {
                            kName = getAttributeReplacementPairs()[i].o;
                        }
                    }
                    el.setAttribute(kName, attrs[k]);
                }
                return el;
            }

            this.makeSVG = function (tag, attrs) {
                attrs.xmlns = 'http://www.w3.org/2000/svg';
                var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
                for (var k in attrs) {
                    var kName = k;
                    for (var i = 0; i < getAttributeReplacementPairs().length; i++) {
                        if (kName == getAttributeReplacementPairs()[i].i) {
                            kName = getAttributeReplacementPairs()[i].o;
                        }
                    }
                    el.setAttribute(kName, attrs[k]);
                }
                return el;
            }
            if(_element!=undefined){
                var elementID = _element == false ? _id : _element.getAttribute('id');
                if (elementID == false) {
                    elementID = Math.random().toString() + Math.random().toString() + Math.random().toString();
                }
                //var

                if (_container == null || _container == undefined) {
                    _container = document.getElementsByTagName("body")[0];
                }

                var svgEl = _element == false ? this.makeSVG("svg", { id: elementID, width: _width, height: _height, style: "position:absolute; top:" + _y.toString() + "px; left:" + _x.toString() + "px;" }) : _element;
                if(_element == false){
                    _container.appendChild(svgEl);
                }
                
            }
            var currentPoints = [];
            var currentAnchors = [];

            this.getElement = function () {
                return svgEl;
            }

            /*
             
             if (_scale == null)
             {
             scale = _scale;
             }
             var chart = d3.select(cssClassName);
             chart.attr("width", "100%");
             chart.attr("height", "600");
             
             var x = d3.scale.linear().range([0, scale]);
             */
            function serializeProperties(pList) {
                var pString = "";
                for (var p in pList) {
                    pString += " " + p + "='" + pList[p] + "'";
                }
                var pString;
            }

            this.add = function (el) {
                el.place(this);
            }

            this.setProperty = function (element, property, value) {
                element.setAttribute(property, value);
            }


            this.createDefs = function (defList) {

                var el = this.makeSVG('defs', {});
                document.getElementById(elementID).appendChild(el);
                for (var i = 0; i < defList.length; i++) {
                    var gType = "linearGradient";
                    switch (defList[i].type) {
                        case "linear":
                            {
                                gType = "linearGradient";
                                break;
                            }
                        case "radial":
                            {
                                gType = "radialGradient";
                                break;
                            }
                    }

                    var gEl = this.makeSVG(gType, defList[i].attributes);
                    el.appendChild(gEl);

                    for (var j = 0; j < defList[i].matrix.length; j++) {
                        var gradEl = this.makeSVG("stop", defList[i].matrix[j]);
                        gEl.appendChild(gradEl);
                    }
                }
                return el;

                //return chart.append("circle").attr("cx", _x).attr("cy", _y).attr("r", _r);

            }

            this.createFilter = function(_type, id, attrs){
                var el = this.makeSVG('filter', {id:id});
                document.getElementById(elementID).appendChild(el);
                var filterNode = this.makeSVG(_type, attrs);
                el.appendChild(filterNode);
                return el;

            }

            this.createText = function (_x, _y, _t) {

                var el = this.makeSVG('text', { x: _x, y: _y, value: _t });
                document.getElementById(elementID).appendChild(el);
                el.textContent = _t;
                return el;

                //return chart.append("circle").attr("cx", _x).attr("cy", _y).attr("r", _r);

            }

            this.createCircle = function (_x, _y, _r) {

                var el = this.makeSVG('circle', { cx: _x, cy: _y, r: _r });
                document.getElementById(elementID).appendChild(el);
                return el;

                //return chart.append("circle").attr("cx", _x).attr("cy", _y).attr("r", _r);

            }

            this.createG = function (_x, _y) {

                var el = this.makeSVG('g', { transform:"translate("+_x+","+_y+")" });
                document.getElementById(elementID).appendChild(el);
                return el;

                //return chart.append("circle").attr("cx", _x).attr("cy", _y).attr("r", _r);

            }



            this.createElipse = function (_x, _y, _width, _height) {

                var el = this.makeSVG('ellipse', { cx: _x, cy: _y, rx: _width, ry: _height });
                document.getElementById(elementID).appendChild(el);
                return el;

                //return chart.append("ellipse").attr("cx", _x).attr("cy", _y).attr("rx", _width).attr("ry", _height);

            }

            this.createRect = function (_x, _y, _width, _height, _cornerRadius) {
                var el = this.makeSVG('rect', { x: _x, y: _y, width: _width, height: _height });
                document.getElementById(elementID).appendChild(el);
                return el;


                //return chart.append("rect").attr("x", _x).attr("y", _y).attr("width", _width).attr("height", _height).attr("rx", _cornerRadius).attr("ry", _cornerRadius);

            }

            this.createForeignObject  = function (_x, _y, _width, _height) {
                var el = this.makeSVG('foreignObject', { x: _x, y: _y, width: _width, height: _height/*, requiredExtensions:"http://www.w3.org/1999/xhtml"*/ });
                //el.setAttribute("xmlns","http://www.w3.org/1999/xhtml");
                document.getElementById(elementID).appendChild(el);
                return el;
            }

            this.createImage = function (_x, _y, _width, _height, _href) {
                var el = this.makeSVG('image', { x: _x, y: _y, width: _width, height: _height, href:_href});
                //el.setAttribute("xmlns","http://www.w3.org/1999/xhtml");
                document.getElementById(elementID).appendChild(el);
                return el;
            }

            this.createLine = function (_x1, _y1, _x2, _y2) {
                var el = this.makeSVG('line', { x1: _x1, y1: _y1, x2: _x2, y2: _y2 });
                document.getElementById(elementID).appendChild(el);
                return el;

                //return chart.append("line").attr("x1", _x1).attr("y1", _y1).attr("x2", _x2).attr("y2", _y2);
            }

            this.getLineString = function (_points, close){
                var _lineString = "M"+_points[0].x.toString()+","+_points[0].y.toString();
                for(var i = 0;i<_points.length;i++){
                    _lineString+="L"+_points[i].x.toString()+","+_points[i].y.toString();
                }
                if(close){
                    _lineString+="Z";
                }
                return _lineString;
            }

            this.getPathString = function (_points, _radius) {
                var poligonRadius = _radius;
                var pointString = "";



                //var curveEnd = getCurveEnd(0,1,poligonRadius, _points);


                for (var i = 0; i < _points.length; i++) {

                    var nextPoint = i == _points.length - 1 ? 0 : i + 1;
                    var previousPoint = i == 0 ? _points.length - 1 : i - 1;
                    var curveStartPoints;
                    var curveEndPoints;





                    if (i > 0) {
                        curveStartPoints = getCurveEnd(i, previousPoint, poligonRadius, _points);
                        pointString += "L" + curveStartPoints.x + "," + curveStartPoints.y;
                        pointString += "C";
                        pointString += curveStartPoints.x + "," + curveStartPoints.y;

                        currentPoints.push({ x: curveStartPoints.x, y: curveStartPoints.y });


                        pointString += "," + _points[i].x + "," + _points[i].y;

                        var ca1 = { x: _points[i].x + ((curveStartPoints.x - _points[i].x) / 2), y: _points[i].y + ((curveStartPoints.y - _points[i].y) / 2) };
                        currentAnchors.push(ca1);
                        var ca2 = { x: _points[i].x + ((curveStartPoints.x - _points[i].x) / 2), y: _points[i].y + ((curveStartPoints.y - _points[i].y) / 2) };
                        currentAnchors.push(ca2);
                        //currentAnchors.push({x:_points[i].x, y:_points[i].y});


                        var curveEndPoints = getCurveEnd(i, nextPoint, poligonRadius, _points);
                        pointString += "," + curveEndPoints.x + "," + curveEndPoints.y;

                        //currentPoints.push({x:curveEndPoints.x, y:curveEndPoints.y});

                        //prefix = "L";
                    }
                    else {
                        //pointString += "M";

                        curveStartPoints = getCurveEnd(i, previousPoint, poligonRadius, _points);
                        pointString += "M" + curveStartPoints.x + "," + curveStartPoints.y;



                        pointString += "C";
                        pointString += curveStartPoints.x + "," + curveStartPoints.y;

                        currentPoints.push({ x: curveStartPoints.x, y: curveStartPoints.y });

                        pointString += "," + _points[i].x + "," + _points[i].y;

                        //currentAnchors.push({x:_points[i].x, y:_points[i].y});


                        var curveEndPoints = getCurveEnd(i, nextPoint, poligonRadius, _points);
                        pointString += "," + curveEndPoints.x + "," + curveEndPoints.y;


                    }


                }
                return pointString;
            }

            this.getPoints = function () {

                return currentPoints;
            }

            this.getAnchors = function () {

                return currentAnchors;
            }

            this.createPoligon = function (_points) {

                var path = this.makeSVG('path', { d: this.getPathString(_points, 1) });
                document.getElementById(elementID).appendChild(path);
                return path;
                //return chart.append("path").attr("d", this.getPathString(_points, 12)).attr("fill", "black");
            }

            this.stageID = function () {
                return elementID;
            }




            function getCurveEnd(num1, num2, radius, corners) {
                var tmpRad = radius;
                var radStartDistance = getDistance(corners[num1].x, corners[num1].y, corners[num2].x, corners[num2].y);
                if (tmpRad > radStartDistance / 2) {
                    tmpRad = radStartDistance / 2;
                }
                if (corners[num1].r != null) {
                    tmpRad = corners[num1].r;
                }
                var radStartAngle = getAngle(corners[num1].x, corners[num1].y, corners[num2].x, corners[num2].y);
                var radStart = { x: null, y: null };
                radStart.x = Math.round(getOrbit(corners[num1].x, tmpRad, radStartAngle, "cos"));
                radStart.y = Math.round(getOrbit(corners[num1].y, tmpRad, radStartAngle, "sin"));
                return radStart;
            }





        }
        //Stage End


        //2D Shapes Begin
        this.point = function (_x, _y, _r, _ref)
        {
            return new Point(_x, _y, _r, _ref);
        }
        function Point(_x, _y, _r, _ref) {
            var _type;
            if (_type == undefined || _type == null || _type == "") {
                _type = ",";
            }
            var data = { x: _x, y: _y, r: _r, type: _type, ref:_ref };

            this.x = data.x;
            this.y = data.y;
            this.r = data.r;
            this.ref = _ref;
            this.type = data.type;

            this.animate = function (_attributes, _time, _easType, _handler, _motionHandler) {
                return Animate(this, this, _attributes, _easType, _time, _handler, _motionHandler, true);
            }

            this.attr = function (property, value) {
                return Attr(this, data, property, value, true);
            }

            this.getData = function () {
                return data;
            }

            this.encode = function () {
                return this.type + this.x.toString() + "," + this.y.toString();
            }

            this.decode = function (_encoding) {
                var encodingSplit = _encoding.split("");
                this.type = encodingSplit[0];
                var encoding = "";
                for (var i = 1; i < encodingSplit.length; i++) {
                    encoding += encodingSplit[i];
                }
                var commaSplit = encoding.split(",");
                this.x = Number(commaSplit[0]);
                this.y = Number(commaSplit[0]);

            }
        }

        this.text = function (_stage, x, y, _text) {
            return new Text(_stage, x, y, _text);
        }
        function Text(_stage, x, y, _text) {
            var stage = _stage;
            var element = stage.createText(x, y, _text);

            this.attr = function (property, value) {
                return Attr(this, element, property, value);
            }
            this.animate = function (_attributes, _time, _type, _handler, _motionHandler) {
                return Animate(this, element, _attributes, _type, _time, _handler, _motionHandler)
            }
            this.selecitonOffset = { x: 0, y: 0 };
            this.isDragging;
            var dragProperties = { x: "cx", y: "cy" };
            this.Drag = function (_handler) {
                enableDrag(stage, this, element, dragProperties, _handler);
            }

            this.remove = function () {
                element.parentNode.removeChild(element);
                //element.remove();
            }

            this.getElement = function(){ 
                return element;
            }

        }

        function applyAttributes(_obj, attrs)
        {
            for (var k in attrs) {
                var kName = k;
                for (var i = 0; i < getAttributeReplacementPairs().length; i++) {
                    if (kName == getAttributeReplacementPairs()[i].i) {
                        kName = getAttributeReplacementPairs()[i].o;
                    }
                }
                _obj.attr(kName, attrs[k]);
            }
        }

        this.g = function (_stage, attrs)
        {
            var _g = new G(_stage, 0, 0);
            applyAttributes(_g, attrs);
            return _g;

            //return new Circle(_stage, cx, cy, r);
        }
        function G(_stage, _x, _y) {
            var stage = _stage;
            var element = stage.createG(_x,_y);

            this.attr = function (property, value) {
                return Attr(this, element, property, value);
            }
            this.animate = function (_attributes, _time, _type, _handler, _motionHandler) {
                return Animate(this, element, _attributes, _type, _time, _handler, _motionHandler)
            }
            this.selecitonOffset = { x: 0, y: 0 };
            this.isDragging;
            var dragProperties = { x: "translatex", y: "translatey" };
            this.Drag = function (_handler) {
                enableDrag(stage, this, element, dragProperties, _handler);
            }

            this.remove = function () {
                element.parentNode.removeChild(element);
                //element.remove();
            }

            this.getElement = function(){ 
                return element;
            }

        }

        this.circle = function (_stage, attrs)
        {
            var _cir = new Circle(_stage, 0, 0, 100);
            applyAttributes(_cir, attrs);
            return _cir;

            //return new Circle(_stage, cx, cy, r);
        }
        function Circle(_stage, cx, cy, r) {
            var stage = _stage;
            var element = stage.createCircle(cx, cy, r);

            this.attr = function (property, value) {
                return Attr(this, element, property, value);
            }
            this.animate = function (_attributes, _time, _type, _handler, _motionHandler) {
                return Animate(this, element, _attributes, _type, _time, _handler, _motionHandler)
            }
            this.selecitonOffset = { x: 0, y: 0 };
            this.isDragging;
            var dragProperties = { x: "cx", y: "cy" };
            this.Drag = function (_handler) {
                enableDrag(stage, this, element, dragProperties, _handler);
            }

            this.remove = function () {
                element.parentNode.removeChild(element);
                //element.remove();
            }

            this.getElement = function(){ 
                return element;
            }

        }

        this.ellipse = function (_stage, attrs) {
            var _ell = new Ellipse(_stage, 0, 0, 100, 100);
            applyAttributes(_ell, attrs);
            return _ell;
            //return new Ellipse(_stage, cx, cy, r1, r2);
        }
        function Ellipse(_stage, cx, cy, r1, r2) {


            var stage = _stage;
            var element = stage.createElipse(cx, cy, r1, r2);



            this.attr = function (property, value) {
                return Attr(this, element, property, value);
            }
            this.animate = function (_attributes, _time, _type, _handler, _motionHandler) {
                return Animate(this, element, _attributes, _type, _time, _handler, _motionHandler)
            }

            this.selecitonOffset = { x: 0, y: 0 };
            this.isDragging;
            var dragProperties = { x: "cx", y: "cy" };
            this.Drag = function (_handler) {
                enableDrag(stage, this, element, dragProperties, _handler);
            }
            this.remove = function () {
                element.parentNode.removeChild(element);
                //element.remove();
            }

            this.getElement = function(){ 
                return element;
            }

        }

        this.line = function (_stage, attrs)
        {
            var _lin = new Line(_stage, 0, 100, 0, 100);
            applyAttributes(_lin, attrs);
            return _lin;

            //return new Line(_stage, x1, y1, x2, y2);
        }
        function Line(_stage, x1, y1, x2, y2) {
            var stage = _stage;
            var element = stage.createLine(x1, y1, x2, y2);

            this.attr = function (property, value) {
                return Attr(this, element, property, value);
            }
            this.animate = function (_attributes, _time, _type, _handler, _motionHandler) {
                return Animate(this, element, _attributes, _type, _time, _handler, _motionHandler)
            }
            this.remove = function () {
                element.parentNode.removeChild(element);
                //element.remove();
            }

            this.getElement = function(){ 
                return element;
            }

        }

        this.rect = function (_stage, attrs) {
            var _rect = new Rect(_stage, 0, 0, 100, 100, 0);
            applyAttributes(_rect, attrs);
            return _rect;
            //return new Rect(_stage, _x, _y, _width, _height, _cornerRadius);
        }
        function Rect(_stage, _x, _y, _width, _height, _cornerRadius) {
            var stage = _stage;
            var element = stage.createRect(_x, _y, _width, _height, _cornerRadius);

            this.attr = function (property, value) {
                return Attr(this, element, property, value);
            }
            this.animate = function (_attributes, _time, _type, _handler, _motionHandler) {
                return Animate(this, element, _attributes, _type, _time, _handler, _motionHandler)
            }

            this.selecitonOffset = { x: 0, y: 0 };
            this.isDragging;
            var dragProperties = { x: "x", y: "y" };
            this.Drag = function (_handler) {
                enableDrag(stage, this, element, dragProperties, _handler);
            }
            this.remove = function () {
                element.parentNode.removeChild(element);
                //element.remove();
            }

            this.getElement = function(){ 
                return element;
            }
        }

        this.foreignObject  = function (_stage, attrs) {
            var _fo = new ForeignObject(_stage, 0, 0, 100, 100);
            applyAttributes(_fo, attrs);
            return _fo;
            //return new Rect(_stage, _x, _y, _width, _height, _cornerRadius);
        }
        function ForeignObject (_stage, _x, _y, _width, _height) {
            var stage = _stage;
            var element = stage.createForeignObject(_x, _y, _width, _height);

            this.attr = function (property, value) {
                return Attr(this, element, property, value);
            }
            this.animate = function (_attributes, _time, _type, _handler, _motionHandler) {
                return Animate(this, element, _attributes, _type, _time, _handler, _motionHandler)
            }

            this.selecitonOffset = { x: 0, y: 0 };
            this.isDragging;
            var dragProperties = { x: "x", y: "y" };
            this.Drag = function (_handler) {
                enableDrag(stage, this, element, dragProperties, _handler);
            }
            this.remove = function () {
                element.parentNode.removeChild(element);
                //element.remove();
            }

            this.getElement = function(){ 
                return element;
            }
        }

        this.image  = function (_stage, attrs) {
            var _fo = new V4VImage(_stage, 0, 0, 100, 100);
            applyAttributes(_fo, attrs);
            return _fo;
            //return new Rect(_stage, _x, _y, _width, _height, _cornerRadius);
        }
        function V4VImage (_stage, _x, _y, _width, _height, _href) {
            var stage = _stage;
            var element = stage.createImage(_x, _y, _width, _height);

            this.attr = function (property, value) {
                return Attr(this, element, property, value);
            }
            this.animate = function (_attributes, _time, _type, _handler, _motionHandler) {
                return Animate(this, element, _attributes, _type, _time, _handler, _motionHandler)
            }

            this.selecitonOffset = { x: 0, y: 0 };
            this.isDragging;
            var dragProperties = { x: "x", y: "y" };
            this.Drag = function (_handler) {
                enableDrag(stage, this, element, dragProperties, _handler);
            }
            this.remove = function () {
                element.parentNode.removeChild(element);
                //element.remove();
            }

            this.getElement = function(){ 
                return element;
            }
        }

        this.polygon = function (_stage, attrs, _points)
        {
            var _poly = new Polygon(_stage, _points);
            applyAttributes(_poly, attrs);
            return _poly;
            //return new Polygon(_stage, _points);
        }

        function Polygon(_stage, _points) {
            this.points = _points;
            var stage = _stage;
            var element = stage.createPoligon(this.points);



            this.attr = function (property, value) {
                return Attr(this, element, property, value);
            }
            this.animate = function (_attributes, _time, _type, _handler, _motionHandler) {
                return Animate(stage, this, element, _attributes, _type, _time, _handler, _motionHandler)
            }

            this.transform = function (newPoints, _time, _type, _timeOffset, onComplete, onChange) {
                if (_timeOffset == undefined || _timeOffset == null) {
                    _timeOffset = 0;
                }
                return _animatePoints(stage, this, this.points, newPoints, _time, _type, _timeOffset, onComplete, onChange);
            }
            this.remove = function () {
                element.parentNode.removeChild(element);
                //element.remove();
            }

            this.getElement = function(){ 
                return element;
            }

        }

        this.path = function (_stage, attrs, _points)
        {
            
            if(attrs == undefined){
                attrs = {};
            }
            if(_points != undefined){
                var dVal = _stage.getPathString(_points);
                attrs.d = dVal+"z";
            }
            
            var _path = new Path(_stage, attrs, _points);
            applyAttributes(_path, attrs);
            return _path;
        }
        function Path(_stage, points) {
            var stage = _stage;
            var element = stage.createPoligon(points);

            this.attr = function (property, value) {
                return Attr(this, element, property, value);
            }
            this.animate = function (_attributes, _time, _type, _handler, _motionHandler) {
                return Animate(this, element, _attributes, _type, _time, _handler, _motionHandler)
            }
            this.remove = function () {
                element.parentNode.removeChild(element);
                //element.remove();
            }

            this.getElement = function(){ 
                return element;
            }

        }

        this.filter = function(_stage, _type, _id, filter){
            return new Filter(_stage, _type, _id, filter);
        }
        function Filter(_stage, _type, _id, attrs){
            return _stage.createFilter(_type, _id, attrs);
        }

        this.defs = function (_stage, _defList)
        {
            return new Defs(_stage, _defList);
        }
        function Defs(_stage, _defList) {
            _stage.createDefs(_defList);
        }

        function Attr(_sender, _element, property, value, isObject) {
            var val = _sender;
            if (value != null) {
                if (isObject) {
                    _element[property] = value;
                }
                else {
                    _element.setAttribute(property, value);
                }

            }
            else {
                if (isObject) {
                    val = _element[property];
                }
                else {
                    val = _element.getAttribute(property);
                }
            }
            return val;
        }

        function Animate(_sender, _element, _attributes, _type, _time, _handler, _motionHandler, isObject) {
            var aCount = getAttributeCount(_attributes);
            var n = 0;
            var handler = function () { };
            var motionHandler = function () { };
            for (var a in _attributes) {
                n++;
                if (n == aCount && _handler != undefined && _handler != null) {
                    handler = _handler;
                }
                if (_motionHandler != undefined && _motionHandler != null) {
                    motionHandler = _motionHandler;
                }
                var _attrs = {};
                _attrs[a] = _attributes[a];


                switch (_type) {

                    case "in":
                        {
                            new Ease()._in(_element, _attrs, _time, handler, motionHandler, isObject);
                            break;
                        }
                    case "out":
                        {
                            new Ease().out(_element, _attrs, _time, handler, motionHandler, isObject);
                            break;
                        }
                    case "inOut":
                        {
                            new Ease().inOut(_element, _attrs, _time, handler, motionHandler, isObject);
                            break;
                        }
                    case "spring":
                        {
                            new Ease().waveIn(_element, _attrs, _time, handler, motionHandler, isObject);
                            break;
                        }
                    case "bounce":
                        {
                            new Ease().bounce(_element, _attrs, _time, handler, motionHandler, isObject);
                            break;
                        }
                    case "bounceBack":
                        {
                            new Ease().bounceBack(_element, _attrs, _time, handler, motionHandler, isObject);
                            break;
                        }
                    default:
                        {
                            new Ease().linear(_element, _attrs, _time, handler, motionHandler, isObject);
                            break;
                        }
                }
            }
            return _sender;
        }

        function getAttributeCount(_attributes) {
            var n = 0;
            for (var a in _attributes) {
                n++;
            }
            return n;
        }

        function _animatePoints(stage, _polygon, _points, newPoints, _time, _type, _timeOffset, onComplete, onChange) {
            if (onComplete == undefined || onComplete == null) {
                onComplete = function () { }
            }
            if (onChange == undefined || onChange == null) {
                onChange = function () { }
            }

            if (_points.length > newPoints.length) {
                for (var j = newPoints.length; j < _points.length; j++) {
                    var addedPoint = new Point("normal", newPoints[0].x, newPoints[0].y, newPoints[0].r);
                    newPoints.push(addedPoint);

                }

            }

            for (var i = 0; i < newPoints.length; i++) {
                if (_points.length - 1 < i) {
                    var addedPoint = new Point("normal", _points[0].x, _points[0].y, _points[0].r);
                    _points.push(addedPoint);
                }


                var endHandler = i == newPoints.length - 1 ? function () { _removeRedundantPoints(stage, _polygon, _polygon.points, newPoints); onComplete(); } : function () { }
                var changeHandler = i == newPoints.length - 1 ? function () { _polygon.attr('d', stage.getPathString(_polygon.points)); onChange(); } : function () { }


                _points[i].animate({ x: newPoints[i].x, y: newPoints[i].y, r: newPoints[i].r }, _time + (i * _timeOffset), _type, endHandler, changeHandler);



            }
            return _polygon;


        }

        function _removeRedundantPoints(stage, _polygon, _points, newPoints) {

            var n = 0;
            for (var i = _points.length - 1; i >= 1; i--) {
                if (Math.round(newPoints[i].x) == Math.round(newPoints[0].x) && Math.round(newPoints[i].y) == Math.round(newPoints[0].y)) {
                    _points.pop(newPoints[i]);
                    n++;
                }
            }
            _polygon.attr('d', stage.getPathString(_points));


        }

        function onDown(stage, container, element, e, dragProperties) {
            container.isDragging = true;
            container.selecitonOffset = { x: Number(container.attr(dragProperties.x)) - e.pageX, y: Number(container.attr(dragProperties.y)) - e.pageY };
        }

        function onMove(stage, container, element, e, dragProperties, handler) {
            if (container.isDragging) {
                container.attr(dragProperties.x, Number(container.selecitonOffset.x) + Number(e.pageX));
                container.attr(dragProperties.y, Number(container.selecitonOffset.y) + Number(e.pageY));
                if(dragProperties.x == "translatex" && dragProperties.y == "translatey"){
                    container.attr("transform", "translate("+(Number(container.selecitonOffset.x) + Number(e.pageX)).toString()+","+(Number(container.selecitonOffset.y) + Number(e.pageY)).toString()+")");
                }
                if (handler != null && handler != undefined) {
                    handler({ x: Number(container.selecitonOffset.x) + Number(e.pageX), y: Number(container.selecitonOffset.y) + Number(e.pageY) },element);
                }
            }
        }

        function onUp(stage, container, element, e, dragProperties, handler) {
            container.isDragging = false;
            if (handler != null && handler != undefined) {
                //handler(dragProperties);
            }
        }

        function enableDrag(stage, container, element, dragProperties, handler) {
            element.ontouchstart = function (e) {

                onDown(stage, container, element, e, dragProperties);
                //_mouseDown(e);
                element.ontouchmove = function (e) {
                    onMove(stage, container, element, e, dragProperties, handler);

                }

                element.ontouchend = function (e) {
                    //_mouseUp(e);
                    onUp(stage, container, element, e, dragProperties, handler);
                }
            }

            element.onmousedown = function (e) {
                onDown(stage, container, element, e, dragProperties);
                stage.getElement().onmousemove = function (e) {
                    onMove(stage, container, element, e, dragProperties, handler);

                }
                stage.getElement().onmouseup = function (e) {
                    onUp(stage, container, element, e, dragProperties, handler);

                }

            }


        }
        //2D Shapes End

        //Ease begin

        var easeRegistry = [];


        this.ease = function()
        {
            return new Ease();
        }
        function Ease() {



            function removeRegistration(r) {
                var er = [];
                for (var i = 0; i < easeRegistry.length; i++) {
                    if (easeRegistry[i].t == r.t && easeRegistry[i].p == r.p && easeRegistry[i].id == r.id) {

                    }
                    else {
                        er.push(easeRegistry[i]);
                    }

                }
                easeRegistry = er;
            }

            function disableDuplicates(r) {

                for (var i = 0; i < easeRegistry.length; i++) {
                    //alert("disableDuplicates");
                    if (easeRegistry[i].t == r.t && easeRegistry[i].p == r.p && easeRegistry[i].id != r.id) {
                        //alert("found it");
                        easeRegistry[i].v = false;
                    }

                }

            }

            function getRegistration() {
                var r;
                //alert(easeID);
                for (var i = 0; i < easeRegistry.length; i++) {
                    //alert(easeRegistry[i].id);
                    if (easeRegistry[i].id == easeID) {

                        r = easeRegistry[i];
                    }
                }
                return r;
            }

            var easeID = Math.random().toString() + Math.random().toString() + Math.random().toString();

            var interval = 33;

            this.linear = function (target, properties, time, handler, motionHandler, isObject) {
                easeElement("linear", target, properties, time, handler, motionHandler, isObject);

            }

            this._in = function (target, properties, time, handler, motionHandler, isObject) {
                easeElement("in", target, properties, time, handler, motionHandler, isObject);

            }

            this.out = function (target, properties, time, handler, motionHandler, isObject) {
                easeElement("out", target, properties, time, handler, motionHandler, isObject);

            }

            this.inOut = function (target, properties, time, handler, motionHandler, isObject) {
                easeElement("inOut", target, properties, time, handler, motionHandler, isObject);

            }

            this.waveIn = function (target, properties, time, handler, motionHandler, isObject) {
                easeElement("spring", target, properties, time, handler, motionHandler, isObject);

            }

            this.bounce = function (target, properties, time, handler, motionHandler, isObject) {
                easeElement("bounce", target, properties, time, handler, motionHandler, isObject);

            }

            this.bounceBack = function (target, properties, time, handler, motionHandler, isObject) {
                easeElement("bounceBack", target, properties, time, handler, motionHandler, isObject);

            }

            function easeElement(_type, target, properties, time, handler, motionHandler, isObject) {

                var steps = time / interval;

                var stepMatrix = getStepMatrix(steps, _type);

                //alert(stepMatrix);
                stepMatrix.push(1);

                for (var k in properties) {
                    var easeRegistration = { t: target, p: k, v: true, id: easeID };
                    easeRegistry.push(easeRegistration);
                    disableDuplicates(easeRegistration);

                    var currentValue = isObject ? target[k] : Number(target.getAttribute(k));

                    var targetValue = properties[k];
                    var diff = targetValue - currentValue;
                    var j = 0;
                    var animateMethod = function () {
                        if (isObject) {
                            target[k] = Number(currentValue + (diff * stepMatrix[j]));
                        }
                        else {
                            target.setAttribute(k, Number(currentValue + (diff * stepMatrix[j])));
                        }
                        motionHandler(target);
                        j++;
                        var reg = getRegistration();
                        var inProgress = j < stepMatrix.length;
                        if (inProgress && reg != undefined && reg.v) {
                            setTimeout(animateMethod, interval);
                        }
                        else {
                            if (!inProgress) {
                                handler(target);
                                //alert("what???");
                            }
                            //
                            removeRegistration(reg);
                        }

                    }
                    setTimeout(animateMethod, interval);


                }
            }


            function getStepMatrix(steps, _type) {
                var pastThreshhold = false;
                var n = 0;
                var stepMatrix = [];
                for (var i = 0; i < steps; i++) {
                    var _n = i * (100 / steps);

                    switch (_type) {

                        case "in":
                            {
                                _n = Math.round(getOrbit(n, 100, (90 / steps) * i, "cos"));
                                break;
                            }
                        case "out":
                            {
                                _n = 100 - (Math.round(getOrbit(n, 100, (-90 / steps) * i, "cos")) * -1);
                                break;
                            }
                        case "inOut":
                            {
                                _n = Math.round(getOrbit(n, 50, ((180 / steps) * i) - 90, "cos")) + 50;
                                break;
                            }
                        case "spring":
                            {
                                _n = 100 - Math.round(getOrbit(n, 100 - ((100 / steps) * i), (((-360) / steps) * i) - 90, "cos")) * -1;
                                break;
                            }
                        case "bounce":
                            {
                                var _n = 100 - Math.round(getOrbit(n, 100 - ((100 / steps) * i), (((-360) / steps) * i) - 90, "cos")) * -1;
                                if (_n > 100) {
                                    _n = 200 - _n;
                                }
                                break;
                            }
                        case "bounceBack":
                            {
                                var _n = 100 - Math.round(getOrbit(n, 100 - ((100 / steps) * i), (((-720) / steps) * i) - 90, "cos")) * -1;
                                if (_n > 100) {
                                    pastThreshhold = true;
                                }

                                if (pastThreshhold) {
                                    if (_n < 100) {
                                        _n = 200 - _n;
                                    }
                                }
                                break;
                            }
                    }
                    stepMatrix.push(_n / 100);
                }
                if (_type == "out") {
                    stepMatrix = stepMatrix.reverse();
                }
                return stepMatrix;
            }


        }

        this.flexPoint = function(_x, _y, _range, _growth, _suspendMotion){
            return new FlexPoint(_x, _y, _range, _growth, _suspendMotion);
        }

        function FlexPoint(_x, _y, _range, _growth, _suspendMotion)
        {
            var suspendMotion = _suspendMotion;
            var pointLocation = {x:_x, y:_y};
            var activePointLocation;
            var range = _range;
            var growth = _growth;
            var mousePos = {x:0,y:0};
            var easePosition = {x:_x, y:_y};
            
            this.setMousePos = function (_mousePos)
            {
                mousePos = _mousePos;
            }
            
            this.reposition = function(_mousePos)
            {
                mousePos = _mousePos;
                if(!suspendMotion){
                    var pAngle = v4v.angle(mousePos.x, mousePos.y,pointLocation.x, pointLocation.y);
                    var avtiveXVal = v4v.orbit(pointLocation.x, growth, pAngle, "cos");
                    var avtiveYVal = v4v.orbit(pointLocation.y, growth, pAngle, "sin");
                    activePointLocation = {x:avtiveXVal,y:avtiveYVal};
                    var pointToTarget = pointLocation;
                    if(v4v.distance(pointLocation.x, pointLocation.y, mousePos.x, mousePos.y)<range)
                    {
                        pointToTarget = activePointLocation;
                    }
                    var updatedX = easePosition.x + ((pointToTarget.x-easePosition.x)/5);
                    var updatedY = easePosition.y + ((pointToTarget.y-easePosition.y)/5);
                    easePosition.x = updatedX.toString().toLowerCase() == "nan" ? easePosition.x : updatedX;
                    easePosition.y = updatedY.toString().toLowerCase() == "nan" ? easePosition.y : updatedY;
                    if(easePosition.x.toString().toLowerCase()=="nan" || easePosition.y.toString().toLowerCase()=="nan"){
                        alert("Not a Number!!!!!");
                    }
                }
            }
            
            this.getPosition = function()
            {
                return easePosition;
            }
            
        }

        this.distortionFrame = function(x, y, width, height){
            return new DistortionFrame(x, y, width, height);
        }

        function DistortionFrame(x, y, width, height)
        {
            var defaultRadius = 10;
            var wide = width*2;
            var high = height*2;
            var top = y;
            var left = x;
            var stage;

            var currentAngle;
            
            var oraginParams = {tl:{x:x, y:y, r:defaultRadius}, tr:{x:x+width, y:y, r:defaultRadius}, br:{x:x+width, y:y+height, r:defaultRadius}, bl:{x:x, y:y+height, r:defaultRadius}};
            var currentParams = {tl:{x:x, y:y, r:defaultRadius}, tr:{x:x+width, y:y, r:defaultRadius}, br:{x:x+width, y:y+height, r:defaultRadius}, bl:{x:x, y:y+height, r:defaultRadius}};
            
            this.getCurrentParams = function ()
            {
                return currentParams;
            }
            
            this.setTL = function(x, y)
            {
                currentParams.tl = {x:x, y:y, r:defaultRadius};
            }
            
            this.setTR = function(x, y)
            {
                currentParams.tr = {x:x, y:y, r:defaultRadius};
            }
            
            this.setBR = function(x, y)
            {
                currentParams.br = {x:x, y:y, r:defaultRadius};
            }
            
            this.setBL = function(x, y)
            {
                currentParams.bl = {x:x, y:y, r:defaultRadius};
            }
            
            this.getOraginPoints = function()
            {
                return [oraginParams.tl, oraginParams.tr, oraginParams.br, oraginParams.bl];
            }
            
            this.getCurrentPoints = function()
            {
                return [currentParams.tl, currentParams.tr, currentParams.br, currentParams.bl];
            }
            
            this.getRatio = function(val, start, end)
            {
                return (val-start)/(end-start);
            }
            
            this.plotSide = function(x, y, _op1, _op2, _cp1, _cp2, isVertical, pRatio)
            {
                
                var pos = {x:0, y:0, r:0};
                
                var dist = !isVertical ? v4v.distance(_cp1.x,0,_cp2.x,0) : v4v.distance(0,_cp1.y,0,_cp2.y);
                var cDist = !isVertical ? v4v.distance(x,0,_cp2.x,0) : v4v.distance(0,y,0,_cp2.y);
                
                
                
                //var pRatio = !isInside ? dist/(dist+cDist) : (dist+cDist)/dist;
                
                var ratio = isVertical ? this.getRatio(y,_op1.y, _op2.y) : this.getRatio(x,_op1.x, _op2.x);
                ratio = ratio*(pRatio);
                pos.x = _cp1.x+((_cp2.x-_cp1.x)*ratio);
                pos.y = _cp1.y+((_cp2.y-_cp1.y)*ratio);
                
                
                
                return pos;
            }
            
            this.plot = function(_x,_y)
            {
                _x += left;
                _y += top;
                
                var scaleFactor = .8;
                
                var xStandard = ((currentParams.br.x-currentParams.bl.x)+(currentParams.tr.x-currentParams.tl.x))/2;
                var yStandard = ((currentParams.bl.y-currentParams.tl.y)+(currentParams.br.y-currentParams.tr.y))/2;
                
                var ratioModifierX = ((currentParams.tr.x-currentParams.tl.x)/xStandard)*scaleFactor;
                var ratioModifierY = ((currentParams.bl.y-currentParams.tl.y)/yStandard)*scaleFactor;
                
                ratioModifierX = 1;
                ratioModifierY = 1;
                
                var xRatio = this.getRatio(_x, oraginParams.tl.x, oraginParams.tr.x) * ratioModifierY;
                var yRatio = this.getRatio(_y, oraginParams.tl.y, oraginParams.bl.y) * ratioModifierX;
                
                var oFactor = 1;
                var cFactor = 1;
                
                var otr = {x:oraginParams.tr.x*oFactor, y:oraginParams.tr.y*oFactor};
                var ctr = this.doubleDistance(currentParams.tr);
                
                var obr = {x:oraginParams.br.x*oFactor, y:oraginParams.br.y*oFactor};
                var cbr = this.doubleDistance(currentParams.br);
                
                var obl = {x:oraginParams.bl.x*oFactor, y:oraginParams.bl.y*oFactor};
                var cbl = this.doubleDistance(currentParams.bl);

                
                var leftPoint = this.plotSide(_x, _y, oraginParams.tl, obl, currentParams.tl, cbl, true, ratioModifierX);
                var rightPoint = this.plotSide(_x, _y, otr, obr, ctr, cbr, true, ratioModifierX);
                var topPoint = this.plotSide(_x, _y, oraginParams.tl, otr, currentParams.tl, ctr, false, ratioModifierY);
                var bottomPoint = this.plotSide(_x, _y, obl, obr, cbl, cbr, false, ratioModifierY);
                
                var iPoint = {x:leftPoint.x+((rightPoint.x-leftPoint.x)*xRatio),y:topPoint.y+((bottomPoint.y-topPoint.y)*yRatio), r:0};
                
                var p = this.getIntersection(currentParams.tl, topPoint, iPoint, leftPoint);
                p = iPoint;
                
                
                return {vPoints:[[leftPoint, rightPoint],[topPoint, bottomPoint]], point:{x:p.x,y:p.y,r:0}};
                
            }
                                      
            this.doubleDistance = function(point)
            {
                var angle = v4v.angle(currentParams.tl.x, currentParams.tl.y, point.x, point.y);
                var distance = v4v.distance(currentParams.tl.x, currentParams.tl.y, point.x, point.y)*1;
                return {x:v4v.orbit(currentParams.tl.x, distance, angle, "cos"), y:v4v.orbit(currentParams.tl.y, distance, angle, "sin")};
            
            }
            
            this.getTLBoxV = function(_x,_y)
            {
                var x = _x + left;
                var y = _y + top;
                return {x:currentParams.tl.x, y:currentParams.tl.y, wide:x-currentParams.tl.x, high:y-currentParams.tl.y};
            }
            /*
            this.processPoints = function(points)
            {
                var rPoints = [];
                for(var i = 0;i<points.length;i++)
                {
                    rPoints.push(df.plot(points[i].x, points[i].y).point);
                }
                return rPoints;
            }
            //*/
            
            
            this.getIntersection = function(_tl,_tr,_br,_bl,double)
            {
                if(double)
                {
                    //_tl.x*=2;
                    //_tl.y*=2;
                    _tr.x*=2;
                    _tr.y*=2;
                    _br.x*=2;
                    _br.y*=2;
                    _bl.x*=2;
                    _bl.y*=2;
                }
                var a1 = _br.y - _tl.y;
                var b1 = _tl.x - _br.x;
                var a2 = _bl.y - _tr.y;
                var b2 = _tr.x - _bl.x;
                
                var denom = a1 * b2 - a2 * b1;
                //alert(_br.y);
                //if (denom == 0) return null;
                
                var c1 = _br.x * _tl.y - _tl.x * _br.y;
                var c2 = _bl.x * _tr.y - _tr.x * _bl.y;
                
                var p = {x:(b1 * c2 - b2 * c1)/denom, y:(a2 * c1 - a1 * c2)/denom};
                
                //if (v4v.distance(p, _br) > v4v.distance(_tl, _tr)) return null;
                //if (v4v.distance(p, _tl) > v4v.distance(_tl, _tr)) return null;
                //if (v4v.distance(p, _bl) > v4v.distance(_br, _bl)) return null;
                //if (v4v.distance(p, _tr) > v4v.distance(_br, _bl)) return null;
                
                return p;
            }
            
            this.getCenterPoint = function ()
            {
                return this.getIntersection(currentParams.tl, currentParams.tr, currentParams.br, currentParams.bl);
            }

            this.plotSideCenters = function()
            {
                //var centerPoint = this.getIntersection(currentParams.tl, currentParams.tr, currentParams.br, currentParams.bl);
                var centerPoint = this.getCenterPoint();
                var tlDist = v4v.distance(currentParams.tl.x, currentParams.tl.y, centerPoint.x, centerPoint.y);
                var trDist = v4v.distance(currentParams.tr.x, currentParams.tr.y, centerPoint.x, centerPoint.y);
                var brDist = v4v.distance(currentParams.br.x, currentParams.br.y, centerPoint.x, centerPoint.y);
                var blDist = v4v.distance(currentParams.bl.x, currentParams.bl.y, centerPoint.x, centerPoint.y);
                
                var topRatio = tlDist/(tlDist+trDist);
                var leftRatio = tlDist/(tlDist+blDist);
                var rightRatio = trDist/(trDist+brDist);
                var bottomRatio = blDist/(blDist+brDist);
                
                topRatio -= .5-topRatio;
                leftRatio -= .5-leftRatio;
                rightRatio -= .5-rightRatio;
                bottomRatio -= .5-bottomRatio;
                
                var sideCenters = {
                    top:{x:currentParams.tl.x+((currentParams.tr.x-currentParams.tl.x)*topRatio),y:currentParams.tl.y+((currentParams.tr.y-currentParams.tl.y)*topRatio)},
                    left:{x:currentParams.tl.x+((currentParams.bl.x-currentParams.tl.x)*leftRatio),y:currentParams.tl.y+((currentParams.bl.y-currentParams.tl.y)*leftRatio)},
                    right:{x:currentParams.tr.x+((currentParams.br.x-currentParams.tr.x)*rightRatio),y:currentParams.tr.y+((currentParams.br.y-currentParams.tr.y)*rightRatio)},
                    bottom:{x:currentParams.bl.x+((currentParams.br.x-currentParams.bl.x)*bottomRatio),y:currentParams.bl.y+((currentParams.br.y-currentParams.bl.y)*bottomRatio)}
                };
                
                
                
                return sideCenters;
            }
            
            this.perspectivePlot = function(_x, _y)
            {
                var x = _x + oraginParams.tl.x;
                var y = _y + oraginParams.tl.y;
                var oraginRatios = {
                    top:(x-oraginParams.tl.x)/(oraginParams.tr.x-oraginParams.tl.x),
                    left:(y-oraginParams.tl.y)/(oraginParams.bl.y-oraginParams.tl.y),
                    right:(y-oraginParams.tr.y)/(oraginParams.br.y-oraginParams.tr.y),
                    bottom:(x-oraginParams.bl.x)/(oraginParams.br.x-oraginParams.bl.x)
                };
                
                
                var sideCenters = this.plotSideCenters();
                
                
                var top = v4v.curvedPathPlot(oraginRatios.top, [currentParams.tl, currentParams.tr], [sideCenters.top]);
                var left = v4v.curvedPathPlot(oraginRatios.left, [currentParams.tl, currentParams.bl], [sideCenters.left]);
                var right = v4v.curvedPathPlot(oraginRatios.right, [currentParams.tr, currentParams.br], [sideCenters.right]);
                var bottom = v4v.curvedPathPlot(oraginRatios.bottom, [currentParams.bl, currentParams.br], [sideCenters.bottom]);
                //alert(sideCenters.left.x);
                /*
                var xRatio = 1;
                var yRatio = 1;
                
                var oFactor = 1;
                var cFactor = 1;
                
                var otr = {x:oraginParams.tr.x*oFactor, y:oraginParams.tr.y*oFactor};
                var ctr = currentParams.tr;
                
                var obr = {x:oraginParams.br.x*oFactor, y:oraginParams.br.y*oFactor};
                var cbr = currentParams.br;
                
                var obl = {x:oraginParams.bl.x*oFactor, y:oraginParams.bl.y*oFactor};
                var cbl = currentParams.bl;
                
                
                var leftPoint = this.plotSide(left.x, left.y, oraginParams.tl, obl, currentParams.tl, cbl, true, 1);
                var rightPoint = this.plotSide(right.x, right.y, otr, obr, ctr, cbr, true, 1);
                var topPoint = this.plotSide(top.x, top.y, oraginParams.tl, otr, currentParams.tl, ctr, false, 1);
                var bottomPoint = this.plotSide(bottom.x, bottom.y, obl, obr, cbl, cbr, false, 1);
                
                var iPoint = {x:leftPoint.x+((rightPoint.x-leftPoint.x)*xRatio),y:topPoint.y+((bottomPoint.y-topPoint.y)*yRatio), r:0};
                
                
                return iPoint;
                //*/
                var iPoint = this.getIntersection(top,left,bottom,right);
                
                
                
                return {x:iPoint.x, y:iPoint.y, r:0, vList:[{x:top.x,y:top.y,r:0},{x:bottom.x,y:bottom.y,r:0}], hList:[{x:left.x,y:left.y,r:0},{x:right.x,y:right.y,r:0}]};
                
                //return top;
            }
            this.processPoints = function(points)
            {

                //console(points);
                var rPoints = [];
                for(var i = 0;i<points.length;i++)
                {
                    rPoints.push(df.perspectivePlot(points[i].x, points[i].y));
                }
                return rPoints;
            }
            
            this.rotate = function (val)
            {

                var currentParams = this.getCurrentParams();

                var angleCorrection = -180;

                var centerPoint = this.getCenterPoint();
                //*
                var tlDistance = v4v.distance(currentParams.tl.x, currentParams.tl.y, centerPoint.x, centerPoint.y);
                var trDistance = v4v.distance(currentParams.tr.x, currentParams.tr.y, centerPoint.x, centerPoint.y);
                var blDistance = v4v.distance(currentParams.bl.x, currentParams.bl.y, centerPoint.x, centerPoint.y);
                var brDistance = v4v.distance(currentParams.br.x, currentParams.br.y, centerPoint.x, centerPoint.y);

                //*/
                /*
                var tlDistance = 200;
                var trDistance = 200;
                var blDistance = 200;
                var brDistance = 200;
                //*/
                var tlAngle = v4v.angle(currentParams.tl.x, currentParams.tl.y, centerPoint.x, centerPoint.y) + angleCorrection;
                var trAngle = v4v.angle(currentParams.tr.x, currentParams.tr.y, centerPoint.x, centerPoint.y) + angleCorrection;
                var blAngle = v4v.angle(currentParams.bl.x, currentParams.bl.y, centerPoint.x, centerPoint.y) + angleCorrection;
                var brAngle = v4v.angle(currentParams.br.x, currentParams.br.y, centerPoint.x, centerPoint.y) + angleCorrection;

                currentParams.tl.x = v4v.orbit(centerPoint.x, tlDistance, tlAngle + val, "cos");
                currentParams.tl.y = v4v.orbit(centerPoint.y, tlDistance, tlAngle + val, "sin");

                currentParams.tr.x = v4v.orbit(centerPoint.x, trDistance, trAngle + val, "cos");
                currentParams.tr.y = v4v.orbit(centerPoint.y, trDistance, trAngle + val, "sin");

                currentParams.bl.x = v4v.orbit(centerPoint.x, blDistance, blAngle + val, "cos");
                currentParams.bl.y = v4v.orbit(centerPoint.y, blDistance, blAngle + val, "sin");

                currentParams.br.x = v4v.orbit(centerPoint.x, brDistance, brAngle + val, "cos");
                currentParams.br.y = v4v.orbit(centerPoint.y, brDistance, brAngle + val, "sin");

            }

            this.resiseByHandle = function (stage, x, y, isTL, isTR, isBR, isBL)
            {
                var _x = x - stage.getX();
                var _y = y - stage.getY();
                var currentParams = this.getCurrentParams();

                if (isTL && isBL)
                {
                    currentParams.tl.x = _x;
                    currentParams.bl.x = _x;
                    //Left Handle
                }
                else if (isTR && isBR)
                {
                    currentParams.tr.x = _x;
                    currentParams.br.x = _x;
                    //Right Handle
                }
                else if (isBL && isBR)
                {
                    currentParams.bl.y = _y;
                    currentParams.br.y = _y;
                    //Bottom Handle
                }
                else if (isTL && isTR)
                {
                    currentParams.tl.y = _y;
                    currentParams.tr.y = _y;
                    //Top Handle
                }
                else if (isTL)
                {
                    currentParams.tl.x = _x;
                    currentParams.tl.y = _y;
                    currentParams.bl.x = _x;
                    currentParams.tr.y = _y;
                }
                else if (isTR)
                {
                    currentParams.tr.x = _x;
                    currentParams.tr.y = _y;
                    currentParams.br.x = _x;
                    currentParams.tl.y = _y;
                }
                else if (isBR)
                {
                    currentParams.br.x = _x;
                    currentParams.br.y = _y;
                    currentParams.tr.x = _x;
                    currentParams.bl.y = _y;
                }
                else if (isBL)
                {
                    currentParams.bl.x = _x;
                    currentParams.bl.y = _y;
                    currentParams.tl.x = _x;
                    currentParams.br.y = _y;
                }
            }

            this.setX = function (_x)
            {
                left = _x;
            }
            this.setY = function (_y)
            {
                top = _y;
            }

        }

        this.flexGrid = function(_columns,_rows, svgElement,_hexMode){
            return new FlexGrid(_columns,_rows, svgElement,_hexMode);
        }

        function FlexGrid(_columns,_rows, svgElement,_hexMode){
            var fpList;
            var columns = _columns;
            var rows = _rows;
            var pointCount = (columns*rows);
            var stage;
            var columnRowMatrix = [];
            var offset = {x:0,y:0};
            var range = 100;
            var growth = 20;
            var gridSize = 120;
            var flexing = true;
            var proxyMouse = v4v.point(0,0,0);
            //var _self = this;


            function createFlexPoints(_pointCount, _columns, _offset, _size, _hex){
                var _fpList = [];
                var _h = 0;
                var _v = 0;
                for(var i = 0;i<_pointCount;i++){
                    var xPos = _offset.x+(_size*_h);
                    var yPos = _offset.y+(_size*_v);
                    var isEven = true;
                    if(_hex){
                        isEven = i/2 == Math.round(i/2);
                        xPos = isEven ? _offset.x+(_size*_h)-(_size/3.6) : _offset.x+(_size*_h);
                        yPos = _offset.y+((_size/1.8)*_v);
                    }
                    _fpList.push({point:new FlexPoint(xPos, yPos, range, growth, false),c:_h,r:_v,poligon:undefined,e:isEven});
                    _h++;
                    if(_h>=_columns){
                        _h = 0;
                        _v++;
                    }
                }
                return _fpList;
            }

            function repositionPoints(_p){
                for(var i = 0;i<fpList.length;i++){
                    fpList[i].point.reposition(_p);
                }
            }

            function getShapePoints(_c,_r,_hex){
                var _shapPoints;
                
                if(_hex){
                    _shapPoints = {
                        p1:{x:0,y:0,r:0},
                        p2:{x:0,y:0,r:0},
                        p3:{x:0,y:0,r:0},
                        p4:{x:0,y:0,r:0},
                        p5:{x:0,y:0,r:0},
                        p6:{x:0,y:0,r:0}
                    };
                    var thisPoint = getPointByCoords(_c,_r);
                    //alert(thisPoint.e);
                    if(_c<columns && _r<rows && !thisPoint.e){
                        _shapPoints.p1 = thisPoint;
                        _shapPoints.p2 = getPointByCoords(_c+1,_r);
                        _shapPoints.p3 = getPointByCoords(_c+1,_r+1);
                        _shapPoints.p4 = getPointByCoords(_c+1,_r+2);
                        _shapPoints.p5 = getPointByCoords(_c,_r+2);
                        _shapPoints.p6 = getPointByCoords(_c,_r+1);
                    }
                }
                else{
                    _shapPoints = {
                        tl:{x:0,y:0,r:0},
                        tr:{x:0,y:0,r:0},
                        br:{x:0,y:0,r:0},
                        bl:{x:0,y:0,r:0}
                    };
                    if(_c<columns && _r<rows){
                        _shapPoints.tl = getPointByCoords(_c,_r);
                        _shapPoints.tr = getPointByCoords(_c+1,_r);
                        _shapPoints.br = getPointByCoords(_c+1,_r+1);
                        _shapPoints.bl = getPointByCoords(_c,_r+1);
                    }
                }
                return _shapPoints;
                
            }
            function getPointByCoords(_c,_r){
                var _fp;
                for(var i = 0;i<fpList.length;i++){
                    if(fpList[i].c == _c && fpList[i].r == _r){
                        _fp = fpList[i];
                    }
                }
                return _fp;
            }

            function processPoints(sp,_hex){
                return _hex ? [
                        {x:sp.p1.point.getPosition().x,y:sp.p1.point.getPosition().y,r:0},
                        {x:sp.p2.point.getPosition().x,y:sp.p2.point.getPosition().y,r:0},
                        {x:sp.p3.point.getPosition().x,y:sp.p3.point.getPosition().y,r:0},
                        {x:sp.p4.point.getPosition().x,y:sp.p4.point.getPosition().y,r:0},
                        {x:sp.p5.point.getPosition().x,y:sp.p5.point.getPosition().y,r:0},
                        {x:sp.p6.point.getPosition().x,y:sp.p6.point.getPosition().y,r:0}

                    ] : [
                        {x:sp.tl.point.getPosition().x,y:sp.tl.point.getPosition().y,r:0},
                        {x:sp.tr.point.getPosition().x,y:sp.tr.point.getPosition().y,r:0},
                        {x:sp.br.point.getPosition().x,y:sp.br.point.getPosition().y,r:0},
                        {x:sp.bl.point.getPosition().x,y:sp.bl.point.getPosition().y,r:0}

                    ];
            }

            function drawIcon(_df,_path,_points,_popigon,_hex,_offset){


                var cornerPoints = _hex ? {tl:_points[0],tr:_points[1],br:_points[3],bl:_points[4]} : {tl:_points[0],tr:_points[1],br:_points[2],bl:_points[3]};

                _df.setTL(cornerPoints.tl.x,cornerPoints.tl.y);
                _df.setTR(cornerPoints.tr.x,cornerPoints.tr.y);
                _df.setBR(cornerPoints.br.x,cornerPoints.br.y);
                _df.setBL(cornerPoints.bl.x,cornerPoints.bl.y);

                var distortedPath = new PathTransformer(_path,_offset).distortPath(_df);

                if(distortedPath.split("NaN").length<2){

                    _popigon.attr("d",distortedPath);
                    _popigon.attr("id",distortedPath);
                }



            }

            function drawPoligon(_m,_hex){
                var sp = getShapePoints(_m.c,_m.r,_hex);
                var firstPoint = _hex ? sp.p1 : sp.tl;
                var appenedClassName = _m.className != undefined ? " "+_m.className : "";

                if(firstPoint.poligon==undefined){
                    firstPoint.poligon = v4v.path(stage,{cssClass:"flex-grid-border"+appenedClassName},[{x:0,y:1,r:0},{x:1,y:1,r:0},{x:1,y:0,r:0}]);
                }

                var _poliPoints = processPoints(sp,_hex);

                var poliPath = stage.getLineString(_poliPoints);

                if(poliPath.split("NaN").length < 2){
                    firstPoint.poligon.attr("d",poliPath+"Z");
                }

                

                if(_m.p != undefined && _m.df != undefined){
                    if(_m.icon == undefined){
                        _m.icon = v4v.path(stage,{cssClass:"flex-grid-icon"+appenedClassName,fillRule:"evenodd"},[{x:0,y:1,r:0},{x:1,y:1,r:0},{x:1,y:0,r:0}]);
                        stage.getElement().appendChild(firstPoint.poligon.getElement());
                    }
                

                    drawIcon(_m.df,_m.p,_poliPoints,_m.icon,_hex,_m.offset);
                }

                
            }



            function drawFlexElements(_hex){
                for(var i = 0;i<columnRowMatrix.length;i++){
                    drawPoligon(columnRowMatrix[i],_hex);
                }
            }

            this.getStage = function(){
                return stage;
            }

            this.scaleGrid = function(x,y){
                this.disable();
                proxyMouse.animate({x:x,y:y},500,"out",function(){},function(){
                    repositionPoints(proxyMouse);
                    drawFlexElements(_hexMode);
                });
                

            }

            this.enable = function(){
                flexing = true;
            }

            this.disable = function(){
                flexing = false;
            }

            this.addFlexElement = function(_c,_r,_df,_path, _pathOffset,className){
                columnRowMatrix.push({c:_c, r:_r,df:_df,p:_path,icon:undefined,offset:_pathOffset,className:className});

            }

            this.setOffset = function(_x,_y){
                offset.x = _x;
                offset.y = _y;
            }

            this.setGrowth = function(g){
                growth = g;
            }

            this.setRange = function(r){
                range = r;
            }

            this.setGridSize = function(s){
                gridSize = s;
            }

            v4v.ready(function(){
                stage = v4v.stage(svgElement);
                var hexMode = _hexMode;
                fpList = createFlexPoints(pointCount, columns, offset, gridSize, hexMode);
                window.addEventListener("mousemove",function(e){
                    if(flexing){
                        proxyMouse.x = e.pageX-stage.getElement().getBoundingClientRect().left;
                        proxyMouse.y = e.pageY-stage.getElement().getBoundingClientRect().top;
                        repositionPoints(proxyMouse);
                        drawFlexElements(hexMode);
                    }
                });
                repositionPoints({x:0,y:0});
                drawFlexElements(hexMode);
            });
        }

        this.pathTransformer = function(_path,_offset){
            return new PathTransformer(_path,_offset);
        }
        
        function PathTransformer(_path,_offset){

            var lowerPath = _path;
            
            

            var commandList = getCommandList();

            var offset = _offset != undefined ? _offset : {x:0,y:0};

            //var lowerPath = primePath();

            //console.log(lowerPath);

            this.reconstruction = function(){
                return pathReconstruction();
            }

            this.deconstruction = function(){
                return pathDeconstruction();
            }

            this.commandManifest = function(){
                return commandList;
            }

            function convertPerpendiculars(){
                var hSplit = lowerPath.split("h");
                for(var i = 0;i<hSplit.length;i++){
                    hSplit[i].split(checkStringForCharacter(_string))[0];
                }
            }

            function checkStringForCharacter(_string){

                for(var i = 0;i<_string.length;i++){
                    var foundCharacter = checkCharacterForMatch(lowerPath.substring(i,i+1));
                    if(foundCharacter != undefined){
                        i = _string.length;

                    }
                }
                return foundCharacter;
            }

            function checkCharacterForMatch(_c){
                var found = false;
                var foundChar;
                for(var i = 0;i<getCommands().length;i++){
                    if(_c == getCommands()[i]){
                        found = true;
                        i = getCommands().length;
                        foundChar = _c;
                    }
                }
                return foundChar;
            }

            function getCommands(){
                return ["M","L","C","S","T","Q","V","H","A","Z","m","l","c","s","t","q","v","h","a","z"];
            }

            function pathReconstruction(){
                var dec = pathDeconstruction();
                var rec = [];
                for(var i = 1;i<dec.length;i++){
                    var values = dec[i].split(" ");
                    rec.push([]);
                    if(commandList[i-1].toUpperCase() == "A"){
                        rec[rec.length-1].push({x:Number(values[5]),y:Number(values[6]),rx:Number(values[0]),ry:Number(values[1]),angle:Number(values[2]),arc:Number(values[3]),sweep:Number(values[4]),command:commandList[i-1]});
                    }
                    else{
                        for(var j=0;j<values.length;j+=2){
                            var coords = j==0 ? {x:Number(values[j]),y:Number(values[j+1]),command:commandList[i-1]} : {x:Number(values[j]),y:Number(values[j+1])};
                            rec[rec.length-1].push(coords);

                        }
                    }
                    
                }

                return rec;

            }



            function getLowestValues(){

                var rec = pathReconstruction();
                for(var i = 0;i<rec.length;i++){
                    for(j = 0;j<rec[i].length;j++){
                    }
                }
            }

            function pathDeconstruction(){
                
                var pathCommands = getCommands();
                var commandSeparator = "|||::|||";
                lowerPath = lowerPath.split(",-").join("-");
                lowerPath = lowerPath.split("-").join(",-");
                //lowerPath = lowerPath.split("z").join("");
                for(var k = 0;k<pathCommands.length;k++){
                    lowerPath = lowerPath.split(pathCommands[k]+",").join(commandSeparator);
                    lowerPath = lowerPath.split(pathCommands[k]).join(commandSeparator);
                    //lowerPath.replace(pathCommands[k],commandSeparator);
                }

                lowerPath = lowerPath.split(",").join(" ");

                var pathChunks = lowerPath.split(commandSeparator);




                //_commandList = lowerPath;
                return trimChunks(pathChunks);

            }

            function trimChunks(_chuncks){
                var formattedChunks = "";
                for(var i = 0 ;i<_chuncks.length;i++){
                    var miniChunks = _chuncks[i].split(" ");
                    var miniChunkString = "";
                    for(var j = 0;j<miniChunks.length;j++){
                        var prefix = miniChunkString.length>0 ? " " : "";
                        if(miniChunks[j] != ""){
                            miniChunkString+=prefix+miniChunks[j];
                        }
                        
                    }
                    _chuncks[i] = miniChunkString;


                }
                return _chuncks;

            }

            function getCommandList(){
                var pathCommands = getCommands();
                var _commandList = [];
                
                //alert(lowerPath);
                for(var i = 0;i<lowerPath.length;i++){
                    var character = lowerPath.substring(i,i+1);
                    for(var j = 0;j<pathCommands.length;j++){
                        if(character == pathCommands[j]){
                            _commandList.push(character);
                        }
                    }
                }
                return _commandList;
            }

            function formatPath(_path){
                var newPath = _path;
                for(var i = 0;i<getCommands().length;i++){
                    newPath = newPath.split(getCommands()[i]).join(" "+getCommands()[i]+" ");
                }
                return newPath.substring(1,newPath.length-1);
            }

            this.distortPath = function(_df){
                var rec = primeList();
                //var rec = pathReconstruction();
                var recString = "";
                var lastPosition = {x:0,y:0};
                for(var i = 0;i<rec.length;i++){
                    recString += commandList[i].toUpperCase() == "V" || commandList[i].toUpperCase() == "H" ? "L " : commandList[i].toUpperCase()+"";
                    var isAbsolute = commandList[i] == commandList[i].toUpperCase();
                    var recSectionString = "";
                    for(j = 0;j<rec[i].length;j++){
                        
                        //console.log(i);
                        if(rec[i][j].x.toString() != "NaN" && rec[i][j].y.toString() != "NaN"){
                            //var _pp = _df.plot(rec[i][j].x,rec[i][j].y);
                            
                            var addOn = isAbsolute ? {x:0,y:0} : lastPosition;
                            //var _pp = _df.perspectivePlot(Number(rec[i][j].x)+offset.x+Number(addOn.x),Number(rec[i][j].y)+offset.y+Number(addOn.y));
                            var _pp = _df.perspectivePlot(Number(rec[i][j].x)+offset.x,Number(rec[i][j].y)+offset.y);
                            var xComma = j==0 ? "" : " ";
                            var yComma = " ";


                            //recSectionString+=xComma+Math.round(_pp.x).toString();
                            //recSectionString+=yComma+Math.round(_pp.y).toString();
                            recSectionString+=xComma+_pp.x.toString();
                            recSectionString+=yComma+_pp.y.toString();
                            if(j==rec[i].length-1){
                                lastPosition = {x:Number(rec[i][j].x),y:Number(rec[i][j].y)};
                            }
                            
                        }
                        //rec[i][j].y*_s;
                    }

                    recString+=recSectionString;
                }
                return recString; 
            }
            this.absolvePath = function(){
                return absolve();
            }

            function absolve(){
                var rec = pathReconstruction();
                //console.log("REC");
                //console.log(rec);
                //var recString = "";
                var lastPosition = {x:0,y:0};
                for(var i = 0;i<rec.length;i++){
                    //recString += commandList[i].toUpperCase() == "V" || commandList[i].toUpperCase() == "H" ? "L " : commandList[i].toUpperCase()+"";
                    var isAbsolute = commandList[i] == commandList[i].toUpperCase();
                    //var recSectionString = "";
                    for(j = 0;j<rec[i].length;j++){
                        switch(commandList[i]){
                            case "h":
                            {
                                rec[i][j].y = Number(0);
                                rec[i][j]._y = Number(0);
                                commandList[i] = "l";
                                break;
                            }
                            case "H":
                            {
                                
                                rec[i][j].y = rec[i-1][rec[i-1].length-1].y+addOn.y;
                                rec[i][j]._y = rec[i-1][rec[i-1].length-1].y+addOn.y;

                                commandList[i] = "L";
                                break;
                            }
                            case "v":
                            {
                                rec[i][j].y = rec[i][j].x;
                                rec[i][j]._y = rec[i][j].x;
                                rec[i][j].x = Number(0);
                                rec[i][j]._x = Number(0);
                                commandList[i] = "l";
                                break;
                            }
                            case "V":
                            {
                                rec[i][j].y = rec[i][j].x;
                                rec[i][j]._y = rec[i][j].x;
                                if(rec[i-1][0].command == "H"){
                                    rec[i][j].x = rec[i-1][j].x;
                                    rec[i][j]._x = rec[i-1][j].x;
                                }
                                else{

                                    

                                    rec[i][j].x = rec[i-1][rec[i-1].length-1].x+addOn.x;
                                    rec[i][j]._x = rec[i-1][rec[i-1].length-1].x+addOn.x;
                                    // rec[i][j].x = Number(0)+addOn.x;
                                    // rec[i][j]._x = Number(0)+addOn.x;
                                    // if(rec[i+1][0].command != undefined && rec[i+1][0].command.toUpperCase() == "Z"){
                                    //     //rec[i][j].x = rec[i-1][j].x;
                                    //     //rec[i][j]._x = rec[i-1][j].x;
                                    // }
                                    // else{
                                    //     rec[i][j].x = rec[i-1][j].x+addOn.x;
                                    //     rec[i][j]._x = rec[i-1][j].x+addOn.x;
                                    // }
                                    
                                }
                                
                                commandList[i] = "L";
                                break;
                            }
                            case "a":
                            case "A":{
                                break;
                            }

                        }
                        if(rec[i][j].x.toString() != "NaN" && rec[i][j].y.toString() != "NaN"){
                            //var _pp = _df.plot(rec[i][j].x,rec[i][j].y);
                            
                            var addOn = isAbsolute ? {x:0,y:0} : lastPosition;
                            rec[i][j]._x = Number(rec[i][j].x)+offset.x+Number(addOn.x);
                            rec[i][j]._y = Number(rec[i][j].y)+offset.y+Number(addOn.y);
                            //var xComma = j==0 ? "" : " ";
                            //var yComma = " ";


                            //recSectionString+=xComma+Math.round(_pp.x).toString();
                            //recSectionString+=yComma+Math.round(_pp.y).toString();
                            if(j==rec[i].length-1){
                                lastPosition = {x:Number(rec[i][j].x)+Number(addOn.x),y:Number(rec[i][j].y)+Number(addOn.y)};
                            }
                            
                        }
                        //rec[i][j].y*_s;
                    }

                    //recString+=rescSectionString;
                }
                return rec; 
            }

            this.primedList = function(){
                return primeList();
            }

            this.primedPath = function(){
                return primePath();
            }

            function primePath(){
                var outputString = "";
                var ablolvedPath = absolve();
                for(var i = 0;i<ablolvedPath.length;i++){
                    for(var j = 0;j<ablolvedPath[i].length;j++){
                        if(j==0){
                            var command = ablolvedPath[i][j].command.toLowerCase() == "h" || ablolvedPath[i][j].command.toLowerCase() == "v" ? "L" : ablolvedPath[i][j].command;
                            outputString+=command;
                        }
                        if(ablolvedPath[i][0].command.toLowerCase()!="z"){
                            outputString+=ablolvedPath[i][j]._x.toString()+" "+ablolvedPath[i][j]._y.toString()+" ";
                        }
                        
                        
                    }
                    

                }
                return outputString;
            }

            function primeList(){
                var list = [];
                var ablolvedPath = absolve();
                

                for(var i = 0;i<ablolvedPath.length;i++){
                    var subList = [];
                    
                    for(var j = 0;j<ablolvedPath[i].length;j++){
                        var subObj = {};
                        if(j==0){
                            
                            subObj.command = ablolvedPath[i][j].command.toLowerCase() == "h" || ablolvedPath[i][j].command.toLowerCase() == "v" ? "L" : ablolvedPath[i][j].command.toUpperCase();
                        }
                        subObj.x = ablolvedPath[i][j]._x;
                        subObj.y = ablolvedPath[i][j]._y;
                        
                        if(ablolvedPath[i][0].command.toLowerCase()=="z"){
                            subObj.x = "NaN";
                            subObj.y = "NaN";
                        }
                        subList.push(subObj);
                        
                        
                    }
                    list.push(subList);
                    

                }
                return list;
            }

            this.primedRawList = function(){
                return primeRawList();
            }

            function primeRawList(){
                var list = [];
                var ablolvedPath = absolve();
                //console.log("ABS");
                //console.log(ablolvedPath);
                for(var i = 0;i<ablolvedPath.length;i++){
                    var subList = [];
                    
                    for(var j = 0;j<ablolvedPath[i].length;j++){
                        var subObj = {};
                        if(j==0){
                            
                            subObj.command = ablolvedPath[i][j].command.toUpperCase();
                        }
                        if(ablolvedPath[i][0].command.toLowerCase() != "v" && ablolvedPath[i][0].command.toLowerCase()!="z"){
                            subObj.x = ablolvedPath[i][j]._x;
                        }
                        if(ablolvedPath[i][0].command.toLowerCase() != "h" && ablolvedPath[i][0].command.toLowerCase()!="z"){
                            subObj.y = ablolvedPath[i][j]._y;
                        }

                        if(ablolvedPath[i][0].command.toLowerCase() == "a"){
                            subObj.rx = ablolvedPath[i][j].rx;
                            subObj.ry = ablolvedPath[i][j].ry;
                            subObj.sweep = ablolvedPath[i][j].sweep;
                            subObj.arc = ablolvedPath[i][j].arc;
                            subObj.angle = ablolvedPath[i][j].angle;
                        }                        
                        //subObj.y = ablolvedPath[i][j]._y;
                        
                        // if(ablolvedPath[i][0].command.toLowerCase()=="z"){
                        //     subObj.x = "NaN";
                        //     subObj.y = "NaN";
                        // }
                        subList.push(subObj);
                        
                        
                    }
                    list.push(subList);
                    

                }
                return list;
            }

            // this.absolvePath = function(){
            //     var rec = pathReconstruction();
            //     //var recString = "";
            //     var lastPosition = {x:0,y:0};
            //     for(var i = 0;i<rec.length;i++){
            //         //recString += commandList[i].toUpperCase() == "V" || commandList[i].toUpperCase() == "H" ? "L " : commandList[i].toUpperCase()+"";
            //         var isAbsolute = commandList[i] == commandList[i].toUpperCase();
            //         //var recSectionString = "";
            //         for(j = 0;j<rec[i].length;j++){
            //             switch(commandList[i]){
            //                 case "h":
            //                 {
            //                     rec[i][j].y = Number(0);
            //                     rec[i][j]._y = Number(0);
            //                     commandList[i] = "l";
            //                     break;
            //                 }
            //                 case "H":
            //                 {
            //                     rec[i][j].y = Number(0)+addOn.y;
            //                     rec[i][j]._y = Number(0)+addOn.y;
            //                     commandList[i] = "L";
            //                     break;
            //                 }
            //                 case "v":
            //                 {
            //                     rec[i][j].y = rec[i][j].x;
            //                     rec[i][j]._y = rec[i][j].x;
            //                     rec[i][j].x = Number(0);
            //                     rec[i][j]._x = Number(0);
            //                     commandList[i] = "l";
            //                     break;
            //                 }
            //                 case "V":
            //                 {
            //                     rec[i][j].y = rec[i][j].x;
            //                     rec[i][j]._y = rec[i][j].x;
            //                     rec[i][j].x = Number(0)+addOn.x;
            //                     rec[i][j]._x = Number(0)+addOn.x;
            //                     commandList[i] = "L";
            //                     break;
            //                 }

            //             }
            //             if(rec[i][j].x.toString() != "NaN" && rec[i][j].y.toString() != "NaN"){
            //                 //var _pp = _df.plot(rec[i][j].x,rec[i][j].y);
                            
            //                 var addOn = isAbsolute ? {x:0,y:0} : lastPosition;
            //                 rec[i][j]._x = Number(rec[i][j].x)+offset.x+Number(addOn.x);
            //                 rec[i][j]._y = Number(rec[i][j].y)+offset.y+Number(addOn.y);
            //                 //var xComma = j==0 ? "" : " ";
            //                 //var yComma = " ";


            //                 //recSectionString+=xComma+Math.round(_pp.x).toString();
            //                 //recSectionString+=yComma+Math.round(_pp.y).toString();
            //                 if(j==rec[i].length-1){
            //                     lastPosition = {x:Number(rec[i][j].x)+Number(addOn.x),y:Number(rec[i][j].y)+Number(addOn.y)};
            //                 }
                            
            //             }
            //             //rec[i][j].y*_s;
            //         }

            //         //recString+=recSectionString;
            //     }
            //     return rec; 
            // }

            this.scalePath = function(_s){
                var rec = pathReconstruction();
                var recString = "";
                for(var i = 0;i<rec.length;i++){
                    recString+=commandList[i]+"";
                    var recSectionString = "";
                    for(j = 0;j<rec[i].length;j++){
                        if(rec[i][j].x.toString() != "NaN" && rec[i][j].y.toString() != "NaN"){
                            var xComma = j==0 ? "" : ",";
                            var yComma = ",";
                            recSectionString+=xComma+(rec[i][j].x*_s).toString();
                            recSectionString+=yComma+(rec[i][j].y*_s).toString();
                        }
                    }

                    recString+=recSectionString;
                }
                return recString;
            }



        }









    }
    return new V4V();
    //Ease end

})();