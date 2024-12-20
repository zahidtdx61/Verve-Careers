const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { ServerConfig } = require("./configs");
const { StatusCodes } = require("http-status-codes");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://bloom-hire.web.app",
    "https://bloom-hire.vercel.app",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Server is running!",
    data: {},
    error: {},
  });
});

app.use("/api", require("./routes"));

// global catch-all route
app.use((req, res) => {
  console.log(req.url);
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Route not found!",
    data: {},
    error: {},
  });
});

app.listen(ServerConfig.PORT, () => {
  console.log(`Server is running on port ${ServerConfig.PORT}`);
});
