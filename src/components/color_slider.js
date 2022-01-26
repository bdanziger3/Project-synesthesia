import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class ColorSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      onChange: props.onChange,

    };
  }

  slide = (value) => {
    this.setState({ value });
    this.state.onChange(value);
  };

  render() {
    return (
      <div>
        <Slider
          value={this.state.value}
          min={0}
          max={360}
          onChange={this.slide}
          markerLabel={[]}
          tabIndex={0}
          railStyle={{
            border: '1vh',
            height: '2vh',
            // eslint-disable-next-line max-len
            backgroundImage: 'linear-gradient( .25turn, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%) )',
          }}
          handleStyle={{
            borderColor: `hsl(${this.state.value}, 100%, 25%, 50%)`,
            backgroundColor: `hsl(${this.state.value}, 100%, 50%, 100%)`,
            height: '3vh',
            width: '3vh',
            marginTop: '-0.5vh',
          }}
          trackStyle={{
            background: 'none',
          }}
        />
      </div>
    );
  }
}

export default ColorSlider;
