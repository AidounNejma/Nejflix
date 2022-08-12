import axios from "../interceptors/axios";
import Cache from "./Cache";

function create(image) {
    return axios.post('media_objects', image).then(async response => {
        const cachedImages = await Cache.get("media_objects");

        if (cachedImages) {
            Cache.set("media_objects", [...cachedImages, response.data]);
        }

        return response;
    });
}

export default {
    create
};