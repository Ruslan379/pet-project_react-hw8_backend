const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
//! Jimp
const Jimp = require('jimp');


//----------------------------------------------------------------------------------
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
console.log("avatarsDir:".bgBlue, avatarsDir.blue); //!;

const updateAvatar = async (req, res) => {
    console.log("req.user:".blue, req.user); //!

    const { path: tempUpload, destination, originalname } = req.file;
    console.log("req.file:".red, req.file); //!;
    console.log("");
    console.log("req.file.destination:".bgYellow.black, destination.yellow); //!;
    console.log("");
    console.log("req.file.path-->tempUpload:".bgBlue, tempUpload.red); //!;
    console.log("");

    const { id: userId } = req.user

    const avatarNewName = `${userId}_${originalname}`;
    console.log("avatarNewName:".bgMagenta, avatarNewName.bgGreen.red); //!;
    console.log("");

    try {
        const resultUpload = path.join(avatarsDir, avatarNewName);
        console.log("resultUpload:".bgCyan.black, resultUpload.red); //!;
        console.log("");



        await fs.rename(tempUpload, resultUpload);

        const avatarURL = path.join("public", "avatars", avatarNewName);
        console.log("avatarURL:".bgGreen, avatarURL.green); //!;
        console.log("");
        //----------------------------------------------------------------------------
        //! Jimp-1
        // Jimp.read(avatarURL)
        //     .then(avatarURL => {
        //         return image
        //             .resize(250, 250) // resize
        //             .quality(60) // set JPEG quality
        //             .greyscale() // set greyscale
        //             // .write(`Jimp_${avatarNewName}`); // save
        //             .write("250x250.png"); // save
        //     })
        //     .catch(err => {
        //         console.log(err);
        // });

        //----------------------------------------------------------------------------
        //! Jimp-2

        const avatarTempURL = path.join(destination, `Jimp_${avatarNewName}_250x250.png`);
        console.log("avatarTempURL:".bgRed, avatarTempURL.bgBlue); //!;

        async function resizeAvatar() {
            //! Read the image.
            const image = await Jimp.read(avatarURL);
            //! 2-вариант
            await image
                .resize(250, 250)
                .quality(60) // set JPEG quality
                .greyscale() // set greyscale
                .writeAsync(avatarTempURL); //! записывает измененный image в E:\GoIT\Code\goit-node-hw-05\tmp\
            // .writeAsync(`./tmp/Jimp_${avatarNewName}_250x250.png`); //! записывает измененный image в E:\GoIT\Code\goit-node-hw-05\tmp\
            // .writeAsync(`${avatarNewName}_150x150.png`); //! записывает измененный image в корень папки проекта ./
            //! 1-вариант 
            // const image = await Jimp.read('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg');
            // await image.resize(250, 250);
            // await image.greyscale() // set greyscale
            // await image.writeAsync(`./tmp/${avatarNewName}_250x250.png`); //! Save and overwrite the image
            // console.log("image:", image); //!
        }
        resizeAvatar();
        //----------------------------------------------------------------------------

        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        // await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });

        res.json({ avatarURL });

    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
};


module.exports = updateAvatar;