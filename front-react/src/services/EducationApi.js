import axios from "../interceptors/axios";
import Cache from "./Cache";

async function findAll() {
    const cachedEducations = await Cache.get("education");

    if (cachedEducations) return cachedEducations;

    return axios.get('education').then(response => {
        const educations = response.data["hydra:member"];
        Cache.set("education", educations);
        return educations;
    });
}

async function find(id) {
    const cachedEducation = await Cache.get("education." + id);

    if (cachedEducation) return cachedEducation;

    return axios.get("education/" + id).then(response => {
        const education = response.data;

        Cache.set("education." + id, education);

        return education;
    });
}

function deleteApi(id) {
    return axios.delete("education/" + id).then(async response => {
        const cachedEducation = await Cache.get("education");

        if (cachedEducation) {
            Cache.set("education", cachedEducation.filter(c => c.id !== id));
        }

        return response;
    });
}

function update(id, education) {
    return axios.put("education/" + id, education).then(async response => {
        const cachedEducations = await Cache.get("education");
        const cachedEducation = await Cache.get("education." + id);

        if (cachedEducation) {
            Cache.set("education." + id, response.data);
        }

        if (cachedEducations) {
            const index = cachedEducations.findIndex(c => c.id === +id);
            cachedEducations[index] = response.data;
        }

        return response;
    });
}

function create(education) {
    return axios.post('education', education).then(async response => {
        const cachedEducations = await Cache.get("education");

        if (cachedEducations) {
            Cache.set("education", [...cachedEducations, response.data]);
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