import { clearUserData, setUserData } from '../util.js';
import { get, post, put, del } from './api.js';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: "/users/logout",
}

//TODO change user object according to project requirements
export async function login(email, password){
    const result = await post(endpoints.login, {email, password});
    setUserData(result);
}

export async function register(email, password){
    const result = await post(endpoints.register, {email, password});
    setUserData(result);
}

export async function logout(){
    get(endpoints.logout);
    clearUserData();
}

export async function getById(){
    return get("/data/fruits?sortBy=_createdOn%20desc");
}

export async function addFruit(fruit){
    return post('/data/fruits', fruit);
}

export async function getFruitById(id){
    return get(`/data/fruits/${id}`);
}

export async function editFruitById(id, fruit){
    return put(`/data/fruits/${id}`, fruit);
}

export async function deleteFruitById(id){
    return del(`/data/fruits/${id}`);
}

//bonus
export async function listByName(query){
    return post(`/data/fruits?where=name%20LIKE%20%22${query}%22`, query);
}

export async function own(fruitId, userId){
    return get(`/data/fruits?where=fruitId%3D%22${fruitId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}