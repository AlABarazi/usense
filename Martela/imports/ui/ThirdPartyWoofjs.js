import React,{Component} from 'react';
import PropTypes from 'prop-types';
export default class ThirdPartyWoofjs extends Component {
  state = {
    options: []}

  handleDeleteOptions=()=> {
    this.setState(() => ({ options: [] }));
  };
shouldComponentUpdate(nextProps, nextState) {
  return false;
  //if your newe state of props recieved don't go with re render
}
componentWillReceiveProps(nextProps) {
  //it will not update but when you recive props do something like
  //    this.cube.addComponent('model', {
  //         type: 'box'
  //     });
  // in the parent component where this one will be called like <ThirdParty something={this.state.var1}/>
  //when setState is called in the parent toset var1 the nextporps will be sent to ThirdParty

}


componentDidMount() {
//   const script1 = document.createElement("script");
//   script1.src = "https://cdn.rawgit.com/stevekrouse/WoofJS/b41555bf/dist/woof.js";
//   script1.global = "false";
//   script1.async = true;
//   document.body.appendChild(script1);
 var project = new Woof({global: false, width: 300, height: 400})

var IMAGE_NAME = new Image({project: project, url: "http://woofjs.com/images/SMJjVCL.png"})
//
//






//by defult you don't need var project and var IMAGE_NAME because woofjs spread it's methods globaly
//if you don't want it so add global=false <script src="https://rawgit.com/stevekrouse/WoofJS/master/dist/woof.js" global=false></script>
//global should be false but it seems there is  a bug
//seems it's buggy
document.body.appendChild(project);
// the abovve shit didn't work
setBackdropColor("blue")
var textSprite1 = new Text({
  text: () => "Hello world!",
  size: 20,
  color: "rgb(100, 50, 240)",
  fontFamily: "arial",
  textAlign: "left"
})
//
//
//
// var circleSprite1 = new Circle({
//   radius: 10,
//   color: "red",
//   x: 0,
//   y: 0
// })
// var circleSprite1 = new Oval({
//   radius: 10,
//   color: "red",
//   x: 0,
//   y: 0
// })

}

// var project = new Woof({global: false, width: 300, height: 400})
//
// var IMAGE_NAME = new project.Image({project: project, url: "./images/SMJjVCL.png"})
// set the x to 50% of the window's width and y to 500px
// fullScreen = false
// setBackdropSize(500, 300)
// setBackdropSize(window.innerWidth * (50/100), 500)
//
// // every time the window resizes, recalculate the width from the `window.innerWidth` property
// window.addEventListener("resize", () => {
//   setBackdropSize(window.innerWidth * (50/100), 500)
// })

  render() {

    return (
      <canvas id='application' ref='application' style = { {
            margin: 0,
            overflow: "hidden"
        }}></canvas>
    );
  }
}
