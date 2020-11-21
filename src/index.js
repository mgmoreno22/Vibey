import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// const Genius = require("genius-lyrics");
// const Client = Genius.Client("GjZdsQku4iZ7k9QRw0v3g2PRBRe6zrAe3NzPLBqdA-fBEFC_u1DbxuFF5FZvSxPL"); // Scrapes if no key is provided

// const searches = Client.songs.search("faded");

// // Pick first one
// const firstSong = searches[0];
// console.log("About the Song:\n", firstSong, "\n");

// // Ok lets get the lyrics
// const lyrics = firstSong.lyrics();
// console.log("Lyrics of the Song:\n", lyrics, "\n");

const Genius = require("genius-lyrics");
const Token = "GjZdsQku4iZ7k9QRw0v3g2PRBRe6zrAe3NzPLBqdA-fBEFC_u1DbxuFF5FZvSxPL";
const Client = new Genius.Client(Token);

let intervals = 0;
const wait = (time) =>
  new Promise((resolve) => {
    setTimeout(() => {
      intervals += 1;
      console.log("Pausing... (to avoid ratelimiting)\n");
      resolve();
    }, time);
  });
const test = async () => {
  const startTime = Date.now();
  console.log(`Genius-Lyrics v${Genius.Version}`);
  const searches = await Client.songs.search("rabbit carrot jumping");
  // Lets see the first song
  console.log("length of songs array: "+ searches.length)
  const firstSong = searches[0];
  console.log("About the Song:\n", firstSong, "\n");
  await wait(1000);
  // Ok lets get the lyrics
  const secondSong = searches[1];
  console.log("About the Song:\n", secondSong, "\n");
  await wait(1000);
  const thirdSong = searches[2];
  console.log("About the Song:\n", thirdSong, "\n");
  await wait(1000);
  const lyrics = await firstSong.lyrics();
  console.log("Lyrics of the Song:\n", lyrics, "\n");
  await wait(1000);
  // Ok look about the Artist
  const artist = firstSong.artist;
  console.log("About the Artist:\n", artist, "\n");
  await wait(1000);
  // Again...
  const againArtist = await Client.artists.get(456537);
  console.log("About the Artist (Again):\n", againArtist, "\n");
  // Done
  console.log(
    `Completed fetching in ${
      Date.now() - startTime
    }ms in ${intervals} intervals`
  );
};
test();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
