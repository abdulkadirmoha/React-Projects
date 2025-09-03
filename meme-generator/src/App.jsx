import { useState, useEffect } from "react";
import Header from "./Header";

function App() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    ImageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const newMemeUrl = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      ImageUrl: newMemeUrl,
    }));
  }

  return (
    <>
      <Header />
      <section className="bg-white p-8 rounded-xl w-full max-w-2xl md:m-auto">
        {/* Top Text Input */}
        <div className="flex flex-col mb-4">
          <label
            htmlFor="topText"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Text at the top
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
            type="text"
            name="topText"
            id="topText"
            placeholder="One simply cannot"
            onChange={handleChange}
            value={meme.topText}
          />
        </div>

        {/* Bottom Text Input */}
        <div className="flex flex-col mb-4">
          <label
            htmlFor="bottomText"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Text at the bottom
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
            type="text"
            name="bottomText"
            id="bottomText"
            placeholder="Learn React in a day"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </div>

        {/* Button */}
        <button
          onClick={getMemeImage}
          className="bg-purple-700 text-white font-semibold py-4 px-6 mb-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full text-lg"
        >
          Get a new picture 🖼️
        </button>

        {/* Meme Display */}
        <div className="flex flex-col justify-center items-center relative mt-6">
          <img
            className="max-w-full h-auto rounded-sm"
            src={meme.ImageUrl}
            alt="Meme"
          />
          <span
            className="absolute top-0 text-center my-4 px-1 font-[impact] text-2xl uppercase text-white tracking-wide
              [text-shadow:2px_2px_0_#000,-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,0_2px_0_#000,2px_0_0_#000,0_-2px_0_#000,-2px_0_0_#000,2px_2px_5px_#000]"
          >
            {meme.topText}
          </span>
          <span
            className="absolute bottom-0 text-center my-4 px-1 font-[impact] text-2xl uppercase text-white tracking-wide
              [text-shadow:2px_2px_0_#000,-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,0_2px_0_#000,2px_0_0_#000,0_-2px_0_#000,-2px_0_0_#000,2px_2px_5px_#000]"
          >
            {meme.bottomText}
          </span>
        </div>
      </section>
    </>
  );
}

export default App;
