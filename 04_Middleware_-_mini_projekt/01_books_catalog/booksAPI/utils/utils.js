import fs from 'fs';
import path from 'path';

export const getBooks = async () => {
    return JSON.parse(
        await fs.promises.readFile(
            path.resolve('./data_storage/books.json'),
            'utf-8'
        )
    )
};
export const saveBooks = async (data) => {
    await fs.promises.writeFile(
        path.resolve('data_storage/books.json'),
        JSON.stringify(data)
    )
};
