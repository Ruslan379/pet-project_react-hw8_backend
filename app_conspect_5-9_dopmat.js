require("colors");
const express = require("express")
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const { v4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public")); //! Чтобы Express мог раздавать статические файлы из папки "/public"

//-------------------------------------------------------------------------------------
//! Путь к временной папке tmp
console.log("");
const tempDir = path.join(__dirname, "tmp"); // путь к временной папке
console.log("Путь к временной папке -> tempDir:".bgBlue, tempDir.blue);
console.log("");

//! Путь к папке назначения
const productsDir = path.join(__dirname, "public", "products"); // путь к папке назначения
console.log("Путь к папке назначения -> productsDir:".bgCyan, productsDir.cyan);
console.log("")


//! multer-Настройки сохранения файла:
const multerConfig = multer.diskStorage({
  //! временная папка для сохранения файла:
  destination: (req, file, cb) => {
    cb(null, tempDir); //! выбираем папку для сохранения файла и передаем обработку дальше ( типа next() )
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); //! сохраняем файл с именем originalname и передаем обработку дальше ( типа next() )
  },
  limits: {
    // fileSize: 2048 //! ограничение размера загружаемого файла
  }
});

//! Middleware upload
const upload = multer({
  storage: multerConfig
});

const products = [];


app.post("/api/products", upload.single("image"), async (req, res) => {
  console.log("req.file:".red, req.file); //!
  const { file: uploadFile } = req

  const { path: tempUpload, originalname } = req.file;
  console.log("tempUpload:".yellow, tempUpload); //!

  const resultUpload = path.join(productsDir, originalname);
  console.log("resultUpload:".green, resultUpload); //!
  console.log(""); //!

  try {
    //! Переносим файл с папки tempUpload в папку resultUpload
    await fs.rename(tempUpload, resultUpload);

    const image = path.join("products", originalname);

    console.log("req.body:".bgYellow, req.body); //! Должно быть поле "name" в Postman--> Body --> Key (name)
    console.log("");

    const newProduct = {
      name: req.body.name,
      id: v4(),
      image
    };

    products.push(newProduct);
    console.log("products:".bgRed, products); //!

    //! мой вариант
    res.status(201).json({
      status: "success /api/products",
      code: 201,
      uploadFile,
      newProduct,
      products
    })
    // res.status(201).json(newProduct);
  } catch (error) {
    await fs.unlink(tempUpload);
  }
});

app.get("/api/products", async (req, res) => {
  //! мой вариант
  // res.status(200).json({
  //   status: "success, products --> /api/products",
  //   code: 200,
  //   products
  // })
  res.json(products);
})

const PORT = 3001

app.listen(PORT, () => console.log(`Server-2 is running on the port: ${PORT}`.bgGreen.red));