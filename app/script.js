import React from 'react';
import { render } from 'react-dom';



class App extends React.Component {

  state = {
    status: 'off',
    time: null,
    timer: null,
  };
  
  

  formatTime = () => {
    const { time } = this.state;
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;
    let ret = "";
    
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  step = () => {
    const { time, status } = this.state;
    let timeTmp= time - 1;

    this.setState({
      time: timeTmp,
    });

    if (timeTmp == 0) {
      this.playBell();
      switch (status){
        case 'work':
          this.setState({
            status: 'rest',
            time: 20,
          });
          break;
        case 'rest':
          this.setState({
            status: 'work',
            time: 1200,
          });
          break;
      }
    };

  };

  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
      status: 'work',
      time: 1200,
    });
  };

  stopTimer = () => {
    const { timer } = this.state;
    clearInterval(timer);
    console.log(timer);
    this.setState({
      status: 'off',
      time: 0,
    });
  }

  closeApp = () => {
    window.close()    
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  render() {

    const {status, time} = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && 
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime()}</div>}
        {(status === 'off') && <button className="btn" onClick={() => this.startTimer()}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={() => this.stopTimer()}>Stop</button>}
        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
