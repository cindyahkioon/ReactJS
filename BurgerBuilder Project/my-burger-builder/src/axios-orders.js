import axios from 'axios';

const instance = axios.create({
    baseUrl: 'https://react-burger-291c3.firebaseio.com/'
});

export default instance;