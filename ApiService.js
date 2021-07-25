import axios from 'axios';

const API_URL = '  http://localhost:8080/api/';

export class ApiService {

    async get(service) {
        let url = API_URL + service;
        return await axios.get(url);
    }
    
    async post(service, parameters) {
        let url = API_URL + service;
        return axios.post(url, parameters);
    }
    
    async patch(service, parameters) {
        let url = API_URL + service;
        return axios.patch(url, parameters);
    }
    
    async put(service, parameters) {
        let url = API_URL + service;
        return axios.put(url, parameters);
    }
}