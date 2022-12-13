import {getPhotoData} from "./src/fetch_random_photo.js"
import { Tweeter } from "./src/twitter.js";

let twitter = new Tweeter();
let photo_data = await getPhotoData();
let tweet_text = photo_data['title'] + ", " + photo_data['date'] + "\n #history #vintage #relics #photography #oldphotos #heritage #historicphotos #architecture";

twitter.send_tweet(tweet_text, photo_data['photo_buffer']);