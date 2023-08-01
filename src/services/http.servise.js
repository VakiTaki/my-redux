import axios from "axios";

const jsonplaceholder = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/" })

export const httpService = {
   get: jsonplaceholder.get,
   post: jsonplaceholder.post
}

