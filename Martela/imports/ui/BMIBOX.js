import React,{Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

class DisplayBMI extends Component {
  state = {
    options: []}

  handleDeleteOptions=()=> {
    this.setState(() => ({ options: [] }));
  };

  render() {
    let showAlert;
    if (this.props.result !== '' ) {
      showAlert = <div className="displayBMI text-center">
                    <div className="alert alert-info">{this.props.result}</div>
                  </div>
    }
    return (
      showAlert || null
    )
  }
}



class BodyForm extends Component {
  state = {
    options: []}

  handleDeleteOptions=()=> {
    this.setState(() => ({ options: [] }));
  };
  updateDisplayBMI=()=> {

    this.setState({
      displayBMI: this.doCalc()
    })
  };

  resetDisplayBMI= ()=> {
    this.setState({
      displayBMI: ''
    });
    this.refs.myWeight.value = '';
    this.refs.myHeight.value = '';
    this.refs.myGender.value = '0';
  };

  doCalc= () =>{
    let myWeight = this.refs.myWeight.value,
        myHeight = this.refs.myHeight.value,
        myGender = this.refs.myGender.value,
        myAge=this.refs.myAge.value;
    let finalBmi = myWeight/(myHeight/100*myHeight/100);

    if (!(myWeight > 0 && myHeight > 0 && myAge > 0 && (myGender == "Male" || myGender == "Female" || myGender == "Nope" ))) return "Please Fill in everything correctly"

    if (finalBmi < 18.5) {
      this.props.meteorCall('userdata.update.bmi',"bmi","thin",finalBmi,myAge,myWeight,myHeight);
      return "You are thin."
    }
    if (finalBmi > 18.5 && finalBmi < 25) {
      this.props.meteorCall('userdata.update.bmi',"bmi","healthy",finalBmi,myAge,myWeight,myHeight);
      return "Your weight is fine."
    }
    if (finalBmi > 25) {
      this.props.meteorCall('userdata.update.bmi',"bmi","extra",finalBmi,myAge,myWeight,myHeight);
      return "You have extra weight."
    }
  };

  render() {

    return (
      <div>
        <DisplayBMI result={this.state.displayBMI} />
        <div className="bodyForm">
          <div className="form-group">
            <div className="input-group">
              <input type="text" ref="myWeight" placeholder="Your weight in kg. Ex: 68" className="form-control"/>
              <span className="input-group-addon">kg</span>
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <input type="text" ref="myHeight" placeholder="Your height in cm. Ex: 160" className="form-control"/>
              <span className="input-group-addon">cm</span>
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <input type="text" ref="myAge" placeholder="Your age" className="form-control"/>
              <span className="input-group-addon">years</span>
            </div>
          </div>
          <div className="form-group">
            <select className="form-control" ref="myGender">
              <option value="0">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Nope">Other/NA</option>
            </select>
          </div>

          <div className="pull-right">
            <br/>
            <button type="submit" className="btn btn-primary" onClick={this.updateDisplayBMI}>Check!</button>
            <br/>
            <br/>

            <a href="javascript:void(0)" className="btn btn-link" onClick={this.resetDisplayBMI}>reset</a>

          </div>
        </div>
      </div>
    );
  }
}



class BMIBOX extends Component {
  state = {
    options: []}

  handleDeleteOptions=()=> {
    this.setState(() => ({ options: [] }));
  };

  render() {
    let style = {
      marginTop: '20px',
      marginBottom: '20px'
    }
    return (
      <div className="bmi-box">
        {/* <div className="ribbon"><span>NEW</span></div> */}
        <header className="text-center">
          <img src="body.svg" height="80"/>
          {/* <h3 style={style}>BMI CALCULATOR</h3> */}
        </header>
        <BodyForm meteorCall={this.props.meteorCall}/>
      </div>
    );
  }
}

export default createContainer(params => {
  return {
    meteorCall: Meteor.call
    //then inside component onClick={()=>{props.meteorCall('notes.insert')}}
  };
},BMIBOX)
