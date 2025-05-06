const fs = require('fs')
const path = require('path')

async function uploadFile(imageFile) {
    const extension = path.extname(imageFile.originalname)
    const oldPath = imageFile.path
    const newPath = path.join(__dirname, '../../../resources/' + imageFile.filename + extension)

    fs.promises.rename(oldPath, newPath)

    const image = imageFile.filename + extension

    return {
        code: 200,
        message: "Upload successful",
        file: "resources/" + image
    }
}

async function uploadMultipleFile(imageFiles) {
    const uploadedImages = []

    for(const file of imageFiles) {
        const extension = path.extname(file.originalname)
        const oldPath = file.path
        const newPath = path.join(__dirname, '../../../resources/', file.filename + extension)

        await fs.promises.rename(oldPath, newPath)

        const imageUrl = "resources/" + file.filename + extension
        uploadedImages.push(imageUrl);
    }

    return {
        code: 200,
        message: "Upload successful",
        files: uploadedImages
    }
}

async function deleteFile(nameFile) {
    const filePath = path.join(__dirname, '../../../' + nameFile)

    fs.promises.rm(filePath)

    return {
        code: 200,
        message: "Delete successful"
    }
}

module.exports = {
    uploadFile,
    uploadMultipleFile,
    deleteFile,
}