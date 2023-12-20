import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

/* load up and parse config. details from
 * `.env` file tothe `process.env`
 * object of Node.js */
dotenv.config();

//create an express app and get value of the port environment variable from the `process.env`
const app: Express = express();
const port = process.env.PORT || 3000;

//define a route for the root path ("/") using HTTP get method
app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server");
});

//start the Express app and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
