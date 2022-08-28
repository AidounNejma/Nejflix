import axios from "../interceptors/axios";
import Cache from "./Cache";

async function findAll() {
    const cachedInformations = await Cache.get("informations");

    if (cachedInformations) return cachedInformations;

    return axios.get('informations').then(response => {
        const informations = response.data["hydra:member"];
        Cache.set("information", informations);
        return informations;
    });
}

async function find(id) {
    const cachedInformation = await Cache.get("informations." + id);

    if (cachedInformation) return cachedInformation;

    return axios.get("informations/" + id).then(response => {
        const information = response.data;

        Cache.set("informations." + id, information);

        return information;
    });
}

function deleteApi(id) {
    return axios.delete("informations/" + id).then(async response => {
        const cachedInformation = await Cache.get("informations");

        if (cachedInformation) {
            Cache.set("informations", cachedInformation.filter(c => c.id !== id));
        }

        return response;
    });
}

function update(id, information) {
    return axios.put("informations/" + id, information).then(async response => {
        const cachedInformations = await Cache.get("informations");
        const cachedInformation = await Cache.get("informations." + id);

        if (cachedInformation) {
            Cache.set("informations." + id, response.data);
        }

        if (cachedInformations) {
            const index = cachedInformations.findIndex(c => c.id === +id);
            cachedInformations[index] = response.data;
        }

        return response;
    });
}

function create(information) {
    return axios.post('informations', information).then(async response => {
        const cachedInformations = await Cache.get("informations");

        if (cachedInformations) {
            Cache.set("informations", [...cachedInformations, response.data]);
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