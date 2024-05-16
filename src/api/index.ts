import { FormDataToken, statusPositionResponse } from '@/app.interface'
import axios from 'axios'

export const generateRequest = async (data: FormDataToken) => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post(`${url}/api/generate`, data, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
    return response
}