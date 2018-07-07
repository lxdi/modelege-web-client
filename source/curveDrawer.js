import React from 'react';

var svgNS = "http://www.w3.org/2000/svg";

export var wrapToSvg = function(paths, scene){
  var pathsFlat = []
  for(var i in paths){
    pathsFlat.push(paths[i].first)
    pathsFlat.push(paths[i].second)
  }
  //height="400" width="1000"
  return <svg xmlns='http://www.w3.org/2000/svg' width={scene.w} height={scene.h}>
      {pathsFlat}
  </svg>
}

export var linkNodes = function(node1, node2){
  node1.rx = node1.lx + node1.w
  node2.rx = node2.lx + node2.w
  if(node1.rx < node2.lx){
    return drawSmoothCurve(node1.rx, node1.my, node2.lx, node2.my)
  } else {
    return drawSmoothCurve(node2.rx, node2.my, node1.lx, node1.my)
  }
}

function drawSmoothCurve(x1, y1, x2, y2){
  var result = []
  var middlePoint = {}
  var dx1x2 = x2-x1
  var dy1y2 = y2-y1
  var middlePointX = dx1x2/4
  middlePoint.x = dx1x2/2
  middlePoint.y = dy1y2/2
  return {
    first: getOneCurve(makePath(x1, y1, middlePointX, 0, middlePoint.x, middlePoint.y)),
    second: getOneCurve(makePath(x1+middlePoint.x, y1+middlePoint.y,
       (dx1x2/2)-middlePointX, dy1y2/2,
      dx1x2/2, dy1y2/2))
  }
}

function getOneCurve(coord){
  return <path d={coord} stroke-width='1' stroke='blue' fill='none'>
  </path>
}

function makePath(x1, y1, offsetx, offsety, x2, y2){
  var result = 'M ' + x1 + ' ' + y1 + ' q ' + offsetx + ' ' + offsety + ' ' + x2 + ' ' + y2
  return result
}
