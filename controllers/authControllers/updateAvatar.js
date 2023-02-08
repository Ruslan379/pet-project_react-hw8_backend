const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

const { lineBreak } = require("../../services");

//!firebase
// const { storage } = require("../../firebase/config.js");
// const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");


//--------------------------------------------------------------------------------------------
//! ПОЛНЫЙ путь к папке назначения всех файлов-аватарок
console.log("");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
console.log("ПОЛНЫЙ путь к папке назначения всех файлов-аватарок -> avatarsDir:".bgBlue, avatarsDir.blue); //!;
console.log("");

const updateAvatar = async (req, res) => {
    console.log("ОБЪЕКТ -> req.user:".blue, req.user); //!
    const { id: userId } = req.user
    console.log("");

    lineBreak();
    const { path: tempUpload, destination, originalname } = req.file;
    console.log("ОБЪЕКТ -> req.file:".red, req.file); //!;
    console.log("");
    console.log("ПОЛНЫЙ путь к временной папке tmp -> destination:".bgYellow.black, destination.yellow); //!;
    console.log("");
    console.log("ПОЛНЫЙ путь к ориг. файлу аватара во временной папке tmp -> tempUpload:".bgBlue, tempUpload.red); //!;
    console.log("");
    lineBreak();

    //----------------------------------------------------------------------------
    //! ПЕРЕИМЕНОВАНИЕ файла аватара
    console.log("");
    const avatarNewJimpName = `Jimp_${userId}_${originalname}`; //?
    // const [filename, extension] = originalname.split(".");
    // const avatarNewJimpName = `${userId}.${extension}`;
    console.log("avatarNewJimpName:".bgMagenta, avatarNewJimpName.bgGreen.red); //!;
    console.log("");


    try {
        //? ПОЛНЫЙ путь к новому Jimp-файлу аватара в папке назначения
        const resultUpload = path.join(avatarsDir, avatarNewJimpName);
        console.log("ПОЛНЫЙ путь к новому Jimp-файлу аватара в папке назначения -> resultUpload:".bgCyan.black, resultUpload.red); //!;
        console.log("");


        //? ПЕРЕИМЕНОВАНИЕ и ПЕРЕМЕЩЕНИЕ файла аватара с временной папки tmp в папку назначения E:\GoIT\Code\goit-node-hw-05\public\avatars
        await fs.rename(tempUpload, resultUpload);


        //? АСОЛЮТНЫЙ (ПОЛНЫЙ) путь к новому Jimp-файлу аватара в папке назначения - вариант Юрия Довжика
        const BASE_URL = 'https://contact-book-backend52.onrender.com';
        const avatarURL = `${BASE_URL}/static/avatars/${avatarNewJimpName}`; //?
        console.log("АСОЛЮТНЫЙ (ПОЛНЫЙ) путь к новому Jimp-файлу аватара в папке назначения -> avatarURL:".bgGreen.black, avatarURL.green); //!;
        console.log("");


        //!++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //! Отправка АВАТАР на Storage
        // const storageRef = ref(storage, `avatars/${avatarNewJimpName}`);
        // console.log("storageRef:".bgYellow.black, storageRef); //!
        // await uploadBytes(storageRef, tempUpload);

        //! Получение АБСОЛЮТНОЙ ссылки на на АВАТАР
        // const avatarURL = await getDownloadURL(ref(storage, `avatars/${avatarNewJimpName}`));
        // console.log("АСОЛЮТНЫЙ (ПОЛНЫЙ) путь к новому Jimp-файлу аватара в папке назначения -> avatarURL:".bgGreen.black, avatarURL.green); //!;
        // console.log("");
        //!++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



        //! УДАЛЕНИЕ файла аватара с временной папки tmp
        // await fs.unlink(tempUpload);

        //! ЗАПИСЬ ссылки на файла аватара 
        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        // await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });


        //* ОТВЕТ
        res.json({ avatarURL });

    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
};


module.exports = updateAvatar;