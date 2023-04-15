import { useState } from "react";
import "./App.css";
import SidebarItem from "./components/SidebarItem";
import Slider from "./components/Slider";
import { toPng } from "html-to-image";
import download from "downloadjs";
import ReactCrop from "react-image-crop";



const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: "deg",
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: "px",
  },
  {
    name: "Add text",
  }
];

function App() {
  const [ selectedOptionIndex, setSelectedOptionIndex ] = useState(0);
  const [ options, setOptions ] = useState(DEFAULT_OPTIONS);
  const selectedOption = options[selectedOptionIndex];
  const [ showEdit, setShowEdit ] = useState(false);
  const [ imageURL, setImageURL ] = useState(
    "https://media.istockphoto.com/id/1363905781/photo/fireweed-in-anchorage-alaska.jpg?b=1&s=170667a&w=0&k=20&c=wGddCuHzJCtQPo5Kk-qzhj-_Gq34lUo3hfJvvOhCGwM="
  );
  const [ showTextBox, setShowTextBox ] = useState(false);
  const [ text, setText ] = useState("");


  function handleSliderChange(e) {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) {
          return option;
        }
        return {
          ...option,
          value: e.target.value,
        };
      });
    });
  }


  function getImageStyle() {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    return { filter: filters.join(" "), backgroundImage: `url(${imageURL})` };
  }


  const node = document.querySelector(".main-image");

  function downloadImage() {
    toPng(node)
      .then((dataUrl) => {
        download(dataUrl, "Custom-image.png");
      })
      .catch((err) => {
        console.log(err);
      });
  }


  function handleUpload(e) {
    const { files } = e.target;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setImageURL(reader.result);
      });
    }
  }

 

  return (
    <div className="App">
      <h1 className="app-title">Photo-Editor</h1>
      <div className="container">
        <div className="main-image" style={getImageStyle()} >
          {showTextBox ? <input type="text" className="image-text-input" onChange={(e) => setText(e.target.value)} onBlur={() => setShowTextBox(false)} /> : <p className="image-text">{text}</p>}
        </div>
        <div className="actions">         
          <div>
            <input type="file" className="file-input" onChange={handleUpload} />
          </div>
          <button className="actions-btn actions-download-btn" onClick={downloadImage}>
            Download image
          </button>
          <button className="actions-btn actions-edit-btn" onClick={() => setShowEdit(showEdit ? false : true)}>
            Edit image
          </button>
          <div className="edit-box">
            {options.map((option, index) => {
              return (
                <SidebarItem
                  key={index}
                  name={option.name}
                  active={index === selectedOptionIndex}
                  handleOptionIndex={() => setSelectedOptionIndex(index)}
                  showEdit={showEdit}
                  setShowTextBox={setShowTextBox}
                />
              );
            })}
          </div>
        </div>
        <Slider
          min={selectedOption.range?.min}
          max={selectedOption.range?.max}
          value={selectedOption.value}
          handleChange={handleSliderChange}
        />
      </div>
    </div>
  );
}

export default App;
