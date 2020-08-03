import MultiSlider, { Progress } from "react-multi-bar-slider";
import React, { Component } from "react";

export default class MultiSliderNutrient extends Component {
  state = {
    protein: 40,
    carbs: 40,
    fat: 20,
  };

  handleSlide = (e) => this.setState({ protein: e.target.value });

  render() {
    return (
      <MultiSlider onSlide={this.handleSlide}>
        <Progress color="green" progress={this.state.protein} />
        <Progress color="purple" progress={this.state.carbs} />
        <Progress color="yellow" progress={this.state.fat} />
      </MultiSlider>
    );
  }
}
