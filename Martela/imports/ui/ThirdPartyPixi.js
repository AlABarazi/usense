import React,{Component} from 'react';
import PropTypes from 'prop-types';
export default class Pixi extends Component {
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
  // The application will create a renderer using WebGL, if possible,
  // with a fallback to a canvas render. It will also setup the ticker
  // and the root stage PIXI.Container
  this.app = new PIXI.Application();
// window.innerHeight
  // The application will create a canvas element for you that you
  // can then insert into the DOM
  document.body.appendChild(this.app.view);

  // load the texture we need
  PIXI.loader.add('bunny', 'bunny.png').load((loader, resources) => {
      // This creates a texture from a 'bunny.png' image
      const bunny = new PIXI.Sprite(resources.bunny.texture);

      // Setup the position of the bunny
      bunny.x = this.app.renderer.width / 2;
      bunny.y = this.app.renderer.height / 2;

      // Rotate around the center
      bunny.anchor.x = 0.5;
      bunny.anchor.y = 0.5;

      // Add the bunny to the scene we are building
      this.app.stage.addChild(bunny);

      // Listen for frame updates
      this.app.ticker.add(() => {
           // each frame we spin the bunny around a bit
          bunny.rotation += 0.01;
      });
  });

}

// // The application will create a renderer using WebGL, if possible,
// // with a fallback to a canvas render. It will also setup the ticker
// // and the root stage PIXI.Container
// const app = new PIXI.Application();
//
// // The application will create a canvas element for you that you
// // can then insert into the DOM
// document.body.appendChild(app.view);
//
// // load the texture we need
// PIXI.loader.add('bunny', 'bunny.png').load((loader, resources) => {
//     // This creates a texture from a 'bunny.png' image
//     const bunny = new PIXI.Sprite(resources.bunny.texture);
//
//     // Setup the position of the bunny
//     bunny.x = app.renderer.width / 2;
//     bunny.y = app.renderer.height / 2;
//
//     // Rotate around the center
//     bunny.anchor.x = 0.5;
//     bunny.anchor.y = 0.5;
//
//     // Add the bunny to the scene we are building
//     app.stage.addChild(bunny);
//
//     // Listen for frame updates
//     app.ticker.add(() => {
//          // each frame we spin the bunny around a bit
//         bunny.rotation += 0.01;
//     });
// });
  render() {

    return (
      <canvas id='application' ref='application' ></canvas>
    );
  }
}
