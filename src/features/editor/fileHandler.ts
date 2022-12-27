import { createAsyncThunk } from "@reduxjs/toolkit";

export const readFile = (file: File): Promise<string> => {
    return new Promise( (resolve, reject) => {
        var reader = new FileReader();
        var result: string;
        reader.onload = () => {
            try {
                if ( reader.result && typeof(reader.result) == 'string' ) {
                    result = JSON.parse(reader.result);
                    resolve(result);
                } else reject('Not a string');
            } catch (e) {
                reject(e);
            }
        };
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
};

const loadCodeFromFile = createAsyncThunk("editor/loadfile", async (arg: File, thunkApi) => {
    let code = await readFile(arg)
    console.log("got code", {code})
    return code;
});

export default loadCodeFromFile;