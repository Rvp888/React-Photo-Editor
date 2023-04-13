
import { useState } from 'react';
import './App.css';
import SidebarItem from './components/SidebarItem';
import Slider from './components/Slider';


const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%',
  },
  {
    name: "Contrast",
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%',
  },
  {
    name: "Saturation",
    property: 'saturation',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%',
  },
  {
    name: "Grayscale",
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%',
  },
  {
    name: "Sepia",
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%',
  },
  {
    name: "Hue Rotate",
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg',
  },
  {
    name: "Blur",
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px',
  },
]

function App() {

  const [ selectedOptionIndex, setSelectedOptionIndex ] = useState(0);
  const [ options, setOptions ] = useState(DEFAULT_OPTIONS);
  const selectedOption = options[selectedOptionIndex];


  return (
    <div className="container">
      <div className='main-image' />
      <div className='sidebar'>
        {options.map((option, index) => {
          return (
            <SidebarItem
              key={index}
              name={option.name}
              active={index === selectedOptionIndex}
              handleClick={() => setSelectedOptionIndex(index)}
            />
          )
        })}
      </div>
      <Slider 
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
    </div>
  );
}

export default App;
