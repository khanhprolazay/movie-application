import { GoogleProfile } from '@app/shared';
import axios from 'axios';

async function getUserProfile(accessToken: string) {
  return axios.get<GoogleProfile>("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
    headers: {
      Authorization: "Bearer " + accessToken 
    }})
    .then(response => response.data)
    .catch(error => { throw(error) } ) 
  }

const goolgeUtils = { getUserProfile };
export default goolgeUtils;