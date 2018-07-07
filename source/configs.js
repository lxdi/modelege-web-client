
var ratio = 0.5
var nodeWidthInit = 100
var nodeHeightInit = nodeWidthInit*ratio
//
// var nodesMarginW = nodeWidth*2//200
// var nodesMarginH = nodeHeight*0.3 //20

export var settings = {
  changeScale: function(type){
    if(type=='plus'){
      setSettings(this.nodeWidth + this.nodeWidth*0.15)
    } else {
      setSettings(this.nodeWidth - this.nodeWidth*0.15)
    }
  }
}

setSettings(nodeWidthInit)


function setSettings(newnodeWidth){
  settings.nodeWidth = newnodeWidth
  settings.nodeHeight = newnodeWidth*ratio
  settings.nodesMarginW = newnodeWidth*2
  settings.nodesMarginH = newnodeWidth*0.3
}
