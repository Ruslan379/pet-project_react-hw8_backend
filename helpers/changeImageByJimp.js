const Jimp = require('jimp');

// resizeAvatarJimp-файл --> changeImageByJimp
// resizeAvatarJimp-функция --> resize250Qual60GreyByJimp

async function resize400ByJimp(tempUpload) {
    const image = await Jimp.read(tempUpload);
    await image
        .resize(400, 400)
        // .quality(60) // set JPEG quality
        // .greyscale() // set greyscale
        .writeAsync(tempUpload); //! записывает ИЗМЕНЕННЫЙ аватар-image под ТЕМ ЖЕ ИМЕНЕМ во временную папку E:\GoIT\Code\goit-node-hw-05\tmp\
};

async function resize250Qual60ByJimp(tempUpload) {
    const image = await Jimp.read(tempUpload);
    await image
        .resize(250, 250)
        .quality(60) // set JPEG quality
        // .greyscale() // set greyscale
        .writeAsync(tempUpload); //! записывает ИЗМЕНЕННЫЙ аватар-image под ТЕМ ЖЕ ИМЕНЕМ во временную папку E:\GoIT\Code\goit-node-hw-05\tmp\
};

async function resize250GreyByJimp(tempUpload) {
    const image = await Jimp.read(tempUpload);
    await image
        .resize(250, 250)
        // .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .writeAsync(tempUpload); //! записывает ИЗМЕНЕННЫЙ аватар-image под ТЕМ ЖЕ ИМЕНЕМ во временную папку E:\GoIT\Code\goit-node-hw-05\tmp\
};

async function resize250Qual60GreyByJimp(tempUpload) {
    const image = await Jimp.read(tempUpload);
    await image
        .resize(250, 250)
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .writeAsync(tempUpload); //! записывает ИЗМЕНЕННЫЙ аватар-image под ТЕМ ЖЕ ИМЕНЕМ во временную папку E:\GoIT\Code\goit-node-hw-05\tmp\
};

module.exports = {
    resize400ByJimp,
    resize250Qual60ByJimp,
    resize250GreyByJimp,
    resize250Qual60GreyByJimp,
};