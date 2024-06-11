const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;

const database = require("./config/database");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", userRoutes);

database.connect();

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})