import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {Button} from 'react-bootstrap'
import {linkNodes, wrapToSvg} from './curveDrawer.js'
import {nodesMap, getChildrenForRoot, countNodeDepth} from './nodes-dao.js'
import $ from 'jquery'

ReactDOM.render(<div id="app" />, document.body);
const app = document.getElementById("app");

function rerender(){
	ReactDOM.render(<Main />, app);
}

var nodeWidth = 100
var nodeHeight = 50

var mapWidth = 1000
var mapHeight = 400

var nodesMarginW = nodeWidth*2//200
var nodesMarginH = nodeHeight*0.3 //20

class Main extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
	}

	render() {
		var linkCurves = []
		var scene = {}
		return (
			<div>
				Modelege
				<div id='map' class='map' style={{width:mapWidth, height:mapHeight}}>
					{drawNodes(nodesMap, linkCurves, scene)}
					{wrapToSvg(linkCurves, scene)}
				</div>
				Bottom
			</div>
		)
	}
}

var drawNodes = function(nodes, curves, scene){
	var result = []
	var root = findRoot(nodes)
	var rootChildren = getChildrenForRoot(root)

	countNodeDepth(root)
	countScene(rootChildren.left, rootChildren.right, scene)
	scene.h = scene.h*(nodeHeight+nodesMarginH)
	scene.w = (scene.w+1)*(nodesMarginW) // +1 for root node

	root.gui.x = (scene.w/2) - nodeWidth/2 + nodeWidth
	root.gui.y = (scene.h/2) - nodeHeight/2

	result.push(getDiv(root))
	drawChildren(rootChildren.left, 'left', root, result, curves)
	drawChildren(rootChildren.right, 'right', root, result, curves)
	return result;
}

var drawChildren = function(childNodes, position, root, result, curves){
	const nodePlusMargin = nodeHeight+nodesMarginH
	const allNodesHeight = childNodes.length*(nodeHeight+nodesMarginH)
	const xpos = position=='left'? root.gui.x-nodesMarginW: root.gui.x+nodesMarginW
	const nodesHeight = countSceneOneSide(childNodes).h
	const ymax = root.gui.y-(nodesHeight/2)*nodePlusMargin

	var ypos = ymax
	for(var i in childNodes){
		var currentNode = childNodes[i]
		currentNode.gui.x = xpos
		currentNode.gui.y = ypos + (nodePlusMargin*currentNode.gui.h)/2
		result.push(getDiv(currentNode))
		curves.push(linkNodes(
			{lx: root.gui.x, w: nodeWidth, my: root.gui.y+nodeHeight/2},
			{lx: currentNode.gui.x, w: nodeWidth, my: currentNode.gui.y+nodeHeight/2}))
		if(childNodes[i].children.length>0){
			drawChildren(childNodes[i].children, position, childNodes[i], result,  curves)
		}
		ypos = ypos + nodePlusMargin*currentNode.gui.h
	}
}

var findRoot = function(nodes){
	for(var i in nodes){
		if(nodes[i].parentid == null){
			return nodes[i]
		}
	}
}

var countScene = function(left, right, result){
	var sceneLeft = countSceneOneSide(left)
	var sceneRight = countSceneOneSide(right)

	result.h = sceneLeft.h>sceneRight.h? sceneLeft.h: sceneRight.h
	result.w = sceneLeft.w + sceneRight.w
}

var countSceneOneSide = function(nodes){
	var result = {
		w: 0,
		h: 0
	}
	var maxW = 0;
	for(var i in nodes){
		result.h = result.h + nodes[i].gui.h
		if(nodes[i].gui.w>maxW){
			maxW= nodes[i].gui.w
		}
	}
	result.w = result.w + maxW
	return result
}


var getDiv = function(node){
	return <div class='node' style={{left: node.gui.x, top: node.gui.y, width: nodeWidth, height: nodeHeight}}>
		{node.name}
	</div>
}

rerender();
