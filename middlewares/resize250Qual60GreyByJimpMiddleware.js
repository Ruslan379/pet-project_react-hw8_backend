const { changeImageByJimp } = require("../helpers")

const {
    resize400ByJimp,
    resize250Qual60ByJimp,
    resize250GreyByJimp,
    resize250Qual60GreyByJimp
} = changeImageByJimp

const path = require("path");
const fs = require("fs/promises");


//----------------------------------------------------------------
const resize250Qual60GreyByJimpMiddleware = async (req, res, next) => {
    console.log("");

    const { path: tempUpload, destination, originalname } = req.file;

    console.log("ОБЪЕКТ -> req.file:".red, req.file); //!;
    console.log("");
    console.log("ПОЛНЫЙ путь к временной папке tmp -> destination:".bgYellow.black, destination.yellow); //!;
    console.log("");
    console.log("ПОЛНЫЙ путь к ориг. файлу аватара во временной папке tmp -> tempUpload:".bgBlue, tempUpload.red); //!;
    console.log("");

    // await resize400ByJimp(tempUpload);
    // await resize250Qual60ByJimp(tempUpload);
    // await resize250GreyByJimp(tempUpload);
    await resize250Qual60GreyByJimp(tempUpload);

    //* ----------- ПЕРЕИМЕННОВАНИЕ файла аватарки в файл Jimp1_<оригинальное имя файла> -------------
    // //! Новое имя Jimp-файла аватарки
    // const avatarNewJimpName = `Jimp1_${originalname}`;

    // //! ПОЛНЫЙ путь к новому Jimp-файлу аватарки во временноцй папке tmp
    // // const resultUpload = path.join(avatarsDir, avatarNewName);
    // const resultUpload = path.join(destination, avatarNewJimpName);
    // console.log("ПОЛНЫЙ путь к новому Jimp-файлу аватара во временноцй папке tmp -> resultUpload:".bgCyan.black, resultUpload.red); //!;
    // console.log("");


    // //! ПЕРЕИМЕНОВАНИЕ файла аватара во временноцй папке tmp в файл Jimp_<оригинальное имя файла>
    // await fs.rename(tempUpload, resultUpload);
    //* ___________ ПЕРЕИМЕННОВАНИЕ файла аватарки в файл Jimp_<оригинальное имя файла> ___________

    next();
};

module.exports = resize250Qual60GreyByJimpMiddleware;

// jimpResize250QualBWMiddleware --> resize250Qual60GreyByJimpMiddleware