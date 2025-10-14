import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getDataUri = (file) => {
    // remove the dot from the extension
    const extName = path.extname(file.originalname).toString().replace('.', '');
    return parser.format(extName, file.buffer).content;
};

export default getDataUri;
