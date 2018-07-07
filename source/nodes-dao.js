
export var allNodes = [
  creatNode(1, 'root', null),
  creatNode(2, 'child1', 1),
  creatNode(3, 'child2', 1),
  creatNode(4, 'child3', 1),
  creatNode(5, 'child4', 1),
  creatNode(6, 'child5', 1),

  creatNode(7, 'child6', 2),
  creatNode(8, 'child7', 3),
  creatNode(81, 'child7-2', 3),
  creatNode(811, 'child7-2-1', 81),
  creatNode(812, 'child7-2-2', 81),
  creatNode(82, 'child7-3', 3),
  creatNode(9, 'child8', 5),
]

export var nodesMap = createNodesMap()
resolveNodes()

function creatNode(nodeid, nodename, nodeparentid){
  return {
    id: nodeid,
    name: nodename,
    parentid: nodeparentid
  }
}

function createNodesMap(){
  var result = {}
  for(var i in allNodes){
    result[''+allNodes[i].id] = allNodes[i]
  }
  return result
}

function resolveNodes(){
  for(var i in nodesMap){
    var currentNode = nodesMap[i]
    currentNode.parent = nodesMap[currentNode.parentid]
    currentNode.children = findChildrenFor(currentNode.id)
  }
}

function findChildrenFor(id){
  var result = []
  for(var i in nodesMap){
      if(nodesMap[i].parentid == id){
        result.push(nodesMap[i])
      }
  }
  return result
}

export var countNodeDepth = function(node){
  initGUI(node)
  if(node.children.length>0){
    var maxChildrenW = 0
    node.gui.h = 0
    for(var i in node.children){
      countNodeDepth(node.children[i])
      if(node.children[i].gui.w>maxChildrenW){
        maxChildrenW = node.children[i].gui.w
      }
      node.gui.h = node.gui.h + node.children[i].gui.h
    }
    node.gui.w = maxChildrenW + 1
  }
}

var initGUI = function(node){
  if(node.gui == null){
    node.gui = {
      w: 1,
      h: 1
    }
  }
}

export var getChildrenForRoot = function(rootNode){
  var result = {
    left: [],
    right: []
  }
  var toLeft = false
  for(var i in nodesMap){
    if(nodesMap[i].parentid == rootNode.id){
      if(toLeft){
        result.left.push(nodesMap[i])
      } else {
        result.right.push(nodesMap[i])
      }
      toLeft = !toLeft
    }
  }
  return result
}
