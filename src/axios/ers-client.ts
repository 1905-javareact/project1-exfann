import axios from 'axios'


//base http request
//please work
export const ersClient = axios.create({
    baseURL: 'https://ec2-18-220-25-148.us-east-2.compute.amazonaws.com:9050',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials: true
}
)
