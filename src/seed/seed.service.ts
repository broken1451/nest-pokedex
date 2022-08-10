import { Injectable } from '@nestjs/common';
import axios,{AxiosInstance} from 'axios'
import { PoleResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {
  
  private readonly axios: AxiosInstance = axios



  async executeSEED() {
    const { data } = await this.axios.get<PoleResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10`)
    data.results.forEach(poke => {
      const segments = poke.url.split('/');
      const noPoke: number = Number(segments[segments.length - 2])
      // console.log({ segments: segments.length, noPoke, segmento: segments });
    })
    return data.results;
  }

}
