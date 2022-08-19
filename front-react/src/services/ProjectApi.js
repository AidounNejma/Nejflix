import axios from "../interceptors/axios";
import Cache from "./Cache";

async function findAll() {
    const cachedProjects = await Cache.get("project");

    if (cachedProjects) return cachedProjects;

    return axios.get('projects').then(response => {
        const projects = response.data["hydra:member"];
        Cache.set("projects", projects);
        return projects;
    });
}

async function find(id) {
    const cachedProject = await Cache.get("projects." + id);

    if (cachedProject) return cachedProject;

    return axios.get("projects/" + id).then(response => {
        const project = response.data;

        Cache.set("projects." + id, project);

        return project;
    });
}

function deleteProject(id) {
    return axios.delete("projects/" + id).then(async response => {
        const cachedProjects = await Cache.get("projects");

        if (cachedProjects) {
            Cache.set("projects", cachedProjects.filter(c => c.id !== id));
        }

        return response;
    });
}

function update(id, project) {
    return axios.put("projects/" + id, project).then(async response => {
        const cachedProjects = await Cache.get("projects");
        const cachedProject = await Cache.get("projects." + id);

        if (cachedProject) {
            Cache.set("projects." + id, response.data);
        }

        if (cachedProjects) {
            const index = cachedProjects.findIndex(c => c.id === +id);
            cachedProjects[index] = response.data;
        }

        return response;
    });
}

function create(project) {
    return axios.post('projects', project).then(async response => {
        const cachedProjects = await Cache.get("projects");

        if (cachedProjects) {
            Cache.set("projects", [...cachedProjects, response.data]);
        }

        return response;
    });
}

export default {
    findAll,
    find,
    create,
    update,
    deleteProject
};