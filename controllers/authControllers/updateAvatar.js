const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

//! Jimp
const Jimp = require('jimp');
const { changeImageByJimp } = require("../../helpers") //? 3-var

const {
    resize400ByJimp,
    resize250Qual60ByJimp,
    resize250GreyByJimp,
    resize250Qual60GreyByJimp
} = changeImageByJimp

//----------------------------------------------------------------------------------
//! Jimp
// async function resizeAvatar(tempUpload, avatarTempURL) { //? 1-var
async function resizeAvatar(tempUpload) { //? 2-var
    //! Read the image.
    const image = await Jimp.read(tempUpload);
    //! 2-вариант
    await image
        .resize(250, 250)
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .writeAsync(tempUpload); //? 2-var  -  записывает ИЗМЕНЕННЫЙ аватар-image под ТЕМ ЖЕ ИМЕНЕМ во временную папку E:\GoIT\Code\goit-node-hw-05\tmp\
    // .writeAsync(avatarTempURL); //? 1-var  -  записывает ИЗМЕНЕННЫЙ аватар-image под НОВЫМ ИМЕНЕМ во временную папку E:\GoIT\Code\goit-node-hw-05\tmp\
};

//! ПОЛНЫЙ путь к папке назначения всех файлов-аватарок
console.log("");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
console.log("ПОЛНЫЙ путь к папке назначения всех файлов-аватарок -> avatarsDir:".bgBlue, avatarsDir.blue); //!;
console.log("");

const updateAvatar = async (req, res) => {
    console.log("ОБЪЕКТ -> req.user:".blue, req.user); //!
    console.log("");

    const { path: tempUpload, destination, originalname } = req.file;
    console.log("ОБЪЕКТ -> req.file:".red, req.file); //!;
    console.log("");
    console.log("ПОЛНЫЙ путь к временной папке tmp -> destination:".bgYellow.black, destination.yellow); //!;
    console.log("");
    console.log("ПОЛНЫЙ путь к ориг. файлу аватара во временной папке tmp -> tempUpload:".bgBlue, tempUpload.red); //!;
    console.log("");

    const { id: userId } = req.user

    //! Уже не надо
    // const avatarNewName = `${userId}_${originalname}`;
    // console.log("avatarNewName:".bgMagenta, avatarNewName.bgGreen.red); //!;
    // console.log("");
    console.log("____________________________________________");

    //----------------------------------------------------------------------------
    //! Jimp 
    console.log("");
    // const avatarNewJimpName = `Jimp_250x250_${avatarNewName}`;
    const avatarNewJimpName = `Jimp_${userId}_${originalname}`;
    console.log("avatarNewJimpName:".bgMagenta, avatarNewJimpName.bgGreen.red); //!;
    console.log("");

    //! НЕ НУЖЕН С Jimp + 2-var
    //! ПОЛНЫЙ путь к новому Jimp-файлу аватара во временной папке tmp
    // const avatarTempURL = path.join(destination, avatarNewJimpName);
    // console.log("ПОЛНЫЙ путь к новому Jimp-файлу аватара во временной папке tmp -> avatarTempURL:".bgRed, avatarTempURL.bgBlue); //!;


    // async function resizeAvatar() {
    //     const image = await Jimp.read(tempUpload);
    //     await image
    //         .resize(250, 250)
    //         .quality(60) // set JPEG quality
    //         .greyscale() // set greyscale
    //         .writeAsync(avatarTempURL); //! записывает измененный image в E:\GoIT\Code\goit-node-hw-05\tmp\
    // }

    //! Вызов ф-ции Jimp ЛОКАЛЬНО
    // await resizeAvatar(tempUpload); //? 2-var
    // // await resizeAvatar(tempUpload, avatarTempURL); //? 1-var
    //? 3-var
    //! Вызов ф-ции Jimp из файла:
    //* включить одну из строчек,
    //* если НЕ ИСПОЛЬЗУЕТСЯ resize250Qual60GreyByJimpMiddleware
    //* в маршруте №6 (router.patch("/avatars", ...)) в authRouter.js
    // await resize400ByJimp(tempUpload);
    // await resize250Qual60ByJimp(tempUpload); 
    // await resize250GreyByJimp(tempUpload); 
    // await resize250Qual60GreyByJimp(tempUpload); //!!!!!!!!!!!!!!!!!!!!!!!


    //! Уже не надо
    // console.log("");
    // console.log("ОБЪЕКТ -> req.file:".red, req.file); //!;
    // console.log("");
    //----------------------------------------------------------------------------


    try {
        //! ПОЛНЫЙ путь к новому Jimp-файлу аватара в папке назначения
        // const resultUpload = path.join(avatarsDir, avatarNewName);
        const resultUpload = path.join(avatarsDir, avatarNewJimpName);
        console.log("ПОЛНЫЙ путь к новому Jimp-файлу аватара в папке назначения -> resultUpload:".bgCyan.black, resultUpload.red); //!;
        console.log("");

        //! ПЕРЕИМЕНОВАНИЕ и ПЕРЕМЕЩЕНИЕ файла аватара с временноцй папки tmp в папку назначения E:\GoIT\Code\goit-node-hw-05\public\avatars
        await fs.rename(tempUpload, resultUpload); //? 2-var
        // await fs.rename(tempUpload, avatarTempURL); //???? 1-var - не перезаписывает Jimp-файлу аватара
        // await fs.rename(avatarTempURL, resultUpload); //? 1-var

        //! ОТНОСИТЕЛЬНЫЙ путь к новому Jimp-файлу аватара в папке назначения
        const avatarURL = path.join("public", "avatars", avatarNewJimpName);
        console.log("ОТНОСИТЕЛЬНЫЙ путь к новому Jimp-файлу аватара в папке назначения -> avatarURL:".bgGreen.black, avatarURL.green); //!;
        console.log("");


        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        // await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });

        res.json({ avatarURL });

    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
};


module.exports = updateAvatar;