const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//API START
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

// Define API routes here
app.get("/api/songs", (req, res) => {
    res.send()
})

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
