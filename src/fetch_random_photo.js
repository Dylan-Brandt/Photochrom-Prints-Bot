import fetch from "node-fetch";
import { writeFile } from 'fs/promises';
export const NUM_PHOTOS = 7514;

export async function getPhotoData() {
    let url = "https://www.loc.gov/collections/photochrom-prints/?fo=json&?fa=access-restricted:false&c=1&sp="
              + String(Math.floor(Math.random() * NUM_PHOTOS) + 2);

    let res = await fetch(url);
    if(res.ok) {
        let res_json = await res.json();
        let results = res_json['results'][0];
        let title = results['item']['title'].replace('[', '').replace(']', '');
        let date = results['item']['date'].replace('[', '').replace(']', '');
        let last_image_index = results['image_url'].length - 1;
        let photo_url= results['image_url'][last_image_index];
        let photo_res = await fetch(photo_url);
        if(photo_res.ok) {
            let photo_blob = await photo_res.blob();
            let photo_array_buffer = await photo_blob.arrayBuffer();
            let photo_buffer = Buffer.from(photo_array_buffer);
            saveFile('./sample_photos/photo.jpg', photo_buffer);
            return {title: title, date: date, photo_buffer: photo_buffer};
        }
    }
}

async function saveFile(path, content) {
        try {
            writeFile(path, content);
        } catch (err) {
            console.error(err);
        }
    }