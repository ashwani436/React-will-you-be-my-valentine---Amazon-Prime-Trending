import React, { useState } from 'react';

class App extends React.Component{
  constructor(props) {
    super(props);

 this.state ={
      currentSlide: 0,
      nextDisabled: false,
      prevDisabled: false,
    };

    this.prevHandler = this.prevHandler.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
    this.resandler = this.resandler.bind(this);
  }

  nextHandler() {
    this.setState((prevState, props) => {
      if (prevState.currentSlide < this.props.slides.length - 1) {
        return {
          currentSlide: prevState.currentSlide + 1,
          prevDisabled: false,
        };
      } else if (prevState.currentSlide === this.props.slides.length - 1) {
        return {
          nextDisabled: true,
          prevDisabled: false,
        };
      }
    });
  }

  prevHandler() {
    this.setState((prevState, props) => {
      if (prevState.currentSlide === 0) {
        return { prevDisabled: true };
      } else if (prevState.currentSlide > 0) {
        return {
          currentSlide: prevState.currentSlide - 1,
          nextDisabled: false,
        };
      }
    });
  }

  resandler() {
    this.setState({
      currentSlide: 0,
      nextDisabled: false,
      prevDisabled: true,
    });
  }

  componentDidMount() {
    this.setState((prevState, props) => {
      if (prevState.currentSlide === 0) {
        return { prevDisabled: true };
      }
    });
  }

  render() {
    const { slides } = this.props;
  //  console.log(slides);
    return (
      <div>
        <div id="navigation">
          <button
            onClick={this.resandler}
            data-testid="button-restart"
            disabled={this.state.currentSlide === 0}>
            Restart
          </button>
          <button
            data-testid="button-prev"
            onClick={this.prevHandler}
          
            disabled={this.state.currentSlide === 0}>
            Prev
          </button>
          <button
            
            onClick={this.nextHandler}
            data-testid="button-next"
            disabled={this.state.currentSlide === this.props.slides.length - 1}>
            Next
          </button>
        </div>
        {slides.map((slide,i) => {
          return i === this.state.currentSlide ? (
            <div id="slide" key={slide + i}>
              <h1 data-testid="title">{slide.title}</h1>
              <p data-testid="text">{slide.text}</p>
            </div>
          ) : null;
        })}
      </div>
    );
  }
}

export default App;
