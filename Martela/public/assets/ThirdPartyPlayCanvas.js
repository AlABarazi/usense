import React,{Component} from 'react';
import PropTypes from 'prop-types';
export default class ThirdPartyPlayCanvas extends Component {
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
   this.playcanvascomp = new pc.Application(this.refs.application, { });
   this.playcanvascomp.start();

    // fill the available space at full resolution
    this.playcanvascomp.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    this.playcanvascomp.setCanvasResolution(pc.RESOLUTION_AUTO);

    // ensure canvas is resized when window changes size // changed to arrow function
    window.addEventListener('resize', ()=> {
        this.playcanvascomp.resizeCanvas();
    });

    // create box entity
    this.cube = new pc.Entity('cube');
    this.cube.addComponent('model', {
        type: 'box'
    });

    // create camera entity
    this.camera = new pc.Entity('camera');
    this.camera.addComponent('camera', {
        clearColor: new pc.Color(0.1, 0.1, 0.1)
    });

    // create directional light entity
    this.light = new pc.Entity('light');
    this.light.addComponent('light');

    // add to hierarchy
    this.playcanvascomp.root.addChild(this.cube);
    this.playcanvascomp.root.addChild(this.camera);
    this.playcanvascomp.root.addChild(this.light);

    // set up initial positions and orientations
    this.camera.setPosition(0, 0, 3);
    this.light.setEulerAngles(45, 0, 0);

    // register a global update event
    this.playcanvascomp.on('update',  (deltaTime)=> {
        this.cube.rotate(10 * deltaTime, 20 * deltaTime, 30 * deltaTime);
    });
    //note that i change function here to arrow function so that this.cube work
}

// <!DOCTYPE html>
// {/* <html>
// <head>
//     <meta charset="utf-8">
//     <title>PlayCanvas Hello Cube</title>
//     <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' />
//     <style>
//         body {
//             margin: 0;
//             overflow: hidden;
//         }
//     </style>
//     <script src='https://code.playcanvas.com/playcanvas-stable.min.js'></script>
// </head>
// <body>
//     <canvas id='application'></canvas>
//     <script>
//         // create a PlayCanvas application
//         var canvas = document.getElementById('application');
//         var app = new pc.Application(canvas, { });
//         app.start();
//
//         // fill the available space at full resolution
//         app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
//         app.setCanvasResolution(pc.RESOLUTION_AUTO);
//
//         // ensure canvas is resized when window changes size
//         window.addEventListener('resize', function() {
//             app.resizeCanvas();
//         });
//
//         // create box entity
//         var cube = new pc.Entity('cube');
//         cube.addComponent('model', {
//             type: 'box'
//         });
//
//         // create camera entity
//         var camera = new pc.Entity('camera');
//         camera.addComponent('camera', {
//             clearColor: new pc.Color(0.1, 0.1, 0.1)
//         });
//
//         // create directional light entity
//         var light = new pc.Entity('light');
//         light.addComponent('light');
//
//         // add to hierarchy
//         app.root.addChild(cube);
//         app.root.addChild(camera);
//         app.root.addChild(light);
//
//         // set up initial positions and orientations
//         camera.setPosition(0, 0, 3);
//         light.setEulerAngles(45, 0, 0);
//
//         // register a global update event
//         app.on('update', function (deltaTime) {
//             cube.rotate(10 * deltaTime, 20 * deltaTime, 30 * deltaTime);
//         });
//     </script>
// </body>
// </html> */}
  render() {

    return (
      <canvas id='application' ref='application' style = { {
            margin: 0,
            overflow: "hidden"
        }}></canvas>
    );
  }
}
