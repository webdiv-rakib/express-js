import app from "./app"
import config from "./config";
import { initDB } from "./db";

const main = () => {
  initDB();
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
};

main();
//nothing to worry 
// i will finish my assignment on time 
//  i feel sooooo lazy
// i have completed my goal.
// i wills start working from today