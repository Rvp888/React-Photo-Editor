import { useState } from "react";
import "./App.css";
import SidebarItem from "./components/SidebarItem";
import Slider from "./components/Slider";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebaseConfig";

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
];

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const selectedOption = options[selectedOptionIndex];
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [imageURL, setImageURL] = useState(
    "https://media.istockphoto.com/id/1363905781/photo/fireweed-in-anchorage-alaska.jpg?b=1&s=170667a&w=0&k=20&c=wGddCuHzJCtQPo5Kk-qzhj-_Gq34lUo3hfJvvOhCGwM="
  );

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
    let file = e.target.files[0];
    const imageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(imageRef, file);
    uploadTask.on("state_changed", async () => {
      console.log("inside async function");
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log("File available at", downloadURL);
      setImageURL(downloadURL);
      setShowModal(false);
    });
  }

  return (
    <div className="App">
      <h1 className="app-title" >Photo-Editor</h1>
      <div className="container">
        <div className="main-image" style={getImageStyle()} />
        <div className="actions">
          <button
            className="actions-upload-btn"
            onClick={() => setShowModal(true)}
          >
            Upload image
          </button>
          <button className="actions-download-btn" onClick={downloadImage}>
            Download image
          </button>
          {showModal && (
            <div>
              <input
                type="file"
                onChange={handleUpload}
              />
            </div>
          )}
          <button onClick={() => setShowEdit(showEdit ? false : true)}>
            Edit image
          </button>
          <div className="edit-box">
          {options.map((option, index) => {
            return (
              <SidebarItem
                key={index}
                name={option.name}
                active={index === selectedOptionIndex}
                handleClick={() => setSelectedOptionIndex(index)}
                showEdit={showEdit}
              />
            );
          })}
        </div>
        </div>
        <Slider
          min={selectedOption.range.min}
          max={selectedOption.range.max}
          value={selectedOption.value}
          handleChange={handleSliderChange}
        />
      </div>
    </div>
  );
}

export default App;
