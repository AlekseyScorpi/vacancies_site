import { FormDataToken, statusPositionResponse } from '@/app.interface'
import axios from 'axios'

export const generateRequest = async (data: FormDataToken) => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post(`${url}api/generate`, data, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
    return response
}

export const statusRequest = async (token: string) => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post(`${url}api/check-answer`, {token}, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data: statusPositionResponse = response.data
    return {response, data}
}