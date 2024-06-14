import React, { Component } from "react";

class AirDrop extends Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 20 };
    this.timer = 0;
    this.startTimer = this.startTime.bind(this);
    this.countdown = this.countdown.bind(this);
  }
  startTime(){
    if(this.timer==0 && this.state.seconds>0){
        this.timer = setInterval(this.countdown,1000)
    }
  }

  countdown(){
    let seconds = this.state.seconds - 1
    this.setState({
        time:this.secondsToTime(seconds),
    seconds: seconds
  })
  if(seconds == 0){
    clearInterval(this.timer)
  }

  }
  secondsToTime(secs) {
    let hours, minutes, seconds;
    hours = Math.floor(secs / (60 * 60));

    let devisor_for_min = secs % (60 * 60);
    minutes = Math.floor(devisor_for_min / 60);

    let devisor_for_secs = devisor_for_min % 60;
    seconds = Math.ceil(devisor_for_secs);

    let obj = {
      'h':  hours ,
     'm':  minutes,
      's':  seconds ,
    };
    return obj;
  }
  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }
  AirDropReleaseTokens(){
    let stackingB = this.props.stackingBalance
    if(stackingB>=50){
        this.startTimer()
    }
  }
  render() {
    this.AirDropReleaseTokens()
    return (
      <div style={{ color: "black" }}>
        {this.state.time.m}:{this.state.time.s}
      </div>
    );
  }
}
export default AirDrop;
