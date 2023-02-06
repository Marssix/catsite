import React, { useState, useEffect } from "react";
import "./CatImage.css";

function CatImage() {
  const [catImage, setCatImage] = useState(null);
  const [partyMode, setPartyMode] = useState(false);
  const [bgColor, setBgColor] = useState("white");

  const fetchNewCatImage = async () => {
    //Get data from api
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await res.json();
    //update the cat image
    setCatImage(data[0].url);
  };

  useEffect(() => {
    fetchNewCatImage();
    let intervalId = null;
    if (partyMode) {
      //Change color and image every 500ms
      //It may take a while to the image to update
      intervalId = setInterval(() => {
        fetchNewCatImage();
        setBgColor(
          `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)})`
        );
      }, 500);
    }
    //Clear interval when partymode is turned off
    return () => clearInterval(intervalId);
  }, [partyMode]);

  return (
    // Display the cat image and buttons in a container
    <div
      className="cat-image-container"
      style={{ backgroundColor: bgColor }}
    >
      {catImage ? (
        <div className="cat-image-card">
          <img src={catImage} alt="cat" className="cat-image" />
          {/* Button to open the image in a new tab */}
          <a href={catImage} target="_blank" rel="noopener noreferrer" className="open-button">
            Open Image 
          </a>
          {/* Button to refresh the cat image */}
          <button onClick={fetchNewCatImage} className="refresh-button">
            Refresh Image
          </button>
          {/* Button to toggle partymode on and off*/}
          <button onClick={() => setPartyMode(!partyMode)} className="party-button">
          {partyMode ? "Stop Party" : "Start Party"}
          </button>
        </div>
      ) : (
        //Displays "Loading..." when there is no image
        "Loading..."
      )}
    </div>
  );
}

export default CatImage;


