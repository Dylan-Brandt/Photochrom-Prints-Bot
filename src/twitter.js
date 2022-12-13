import { TwitterApi } from 'twitter-api-v2';
import { API_Key, API_Key_Secret, Access_Token, Access_Token_Secret } from '../keys/keys.js';

export class Tweeter {
    constructor() {
        const twitter_api = new TwitterApi({
            appKey: API_Key,
            appSecret: API_Key_Secret,
            accessToken: Access_Token,
            accessSecret: Access_Token_Secret,
        });

        this.client = twitter_api.readWrite;
    }

    async send_tweet(text, photo_buffer) {
        let media_ids = [await this.client.v1.uploadMedia(photo_buffer, {mimeType: 'image/jpg', chunkLength: 50000})];
        await this.client.v2.tweet(text, {media: {media_ids: media_ids}});
    }
}
