import axios from "../interceptors/axios";
import Cache from "./Cache";

async function findAll() {
    const cachedExperiences = await Cache.get("experiences");

    if (cachedExperiences) return cachedExperiences;

    return axios.get('experiences').then(response => {
        const experiences = response.data["hydra:member"];
        Cache.set("experiences", experiences);
        return experiences;
    });
}

async function find(id) {
    const cachedExperience = await Cache.get("experiences." + id);

    if (cachedExperience) return cachedExperience;

    return axios.get("experiences/" + id).then(response => {
        const experience = response.data;

        Cache.set("experiences." + id, experience);

        return experience;
    });
}

function deleteApi(id) {
    return axios.delete("experiences/" + id).then(async response => {
        const cachedExperiences = await Cache.get("experiences");

        if (cachedExperiences) {
            Cache.set("experiences", cachedExperiences.filter(c => c.id !== id));
        }

        return response;
    });
}

function update(id, experience) {
    return axios.put("experiences/" + id, experience).then(async response => {
        const cachedExperiences = await Cache.get("experiences");
        const cachedExperience = await Cache.get("experiences." + id);

        if (cachedExperience) {
            Cache.set("experiences." + id, response.data);
        }

        if (cachedExperiences) {
            const index = cachedExperiences.findIndex(c => c.id === +id);
            cachedExperiences[index] = response.data;
        }

        return response;
    });
}

function create(experience) {
    return axios.post('experiences', experience).then(async response => {
        const cachedExperiences = await Cache.get("experiences");

        if (cachedExperiences) {
            Cache.set("experiences", [...cachedExperiences, response.data]);
        }

        return response;
    });
}

export default {
    findAll,
    find,
    create,
    update,
    deleteApi
};