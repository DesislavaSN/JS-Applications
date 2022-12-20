
import * as api from './api.js';

const endpoints = {
    'ideas': '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'ideaById': '/data/ideas/',
    'createIdea': '/data/ideas',
}

export async function getAllIdeas(){
    // console.log(await api.get(endpoints.ideas));
    return api.get(endpoints.ideas);
}

export async function getIdeaById(id){
    return api.get(endpoints.ideaById + id);
}

export async function createIdea(ideaData){
    return api.post(endpoints.createIdea, ideaData);
}

export async function deleteIdeaById(id){
    return api.delete(endpoints.ideaById+id);
}

