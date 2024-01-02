import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRoutes } from "./routes/user-routes";
import { TokenUser } from "./models/token-user";
import { clubRoutes } from "./routes/club-routes";
import { meetingRoutes } from "./routes/meeting-routes";
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "./docs/swagger-output.json";

/* load up and parse config. details from
 * `.env` file tothe `process.env`
 * object of Node.js */
dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    user?: TokenUser;
  }
}

//create an express app and get value of the port environment variable from the `process.env`
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//define a route for the root path ("/") using HTTP get method
app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server");
});

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use("/users", userRoutes);
app.use("/clubs", clubRoutes);
app.use("/meetings", meetingRoutes);
//start the Express app and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
