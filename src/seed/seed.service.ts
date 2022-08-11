import { Injectable } from '@nestjs/common';
// import axios, { AxiosInstance } from 'axios'
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PoKeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios-adapter';


@Injectable()
export class SeedService {

  // private readonly axios: AxiosInstance = axios

  constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>, private readonly http: AxiosAdapter, private readonly pokemonService: PokemonService) { }

  async executeSEED() {

    await this.pokemonModel.deleteMany({}) //  delete * from pokemons

    //  1)forma --------------------------------------------------------------------------------------------------- 1)forma ///
    // const { data } = await this.axios.get<PoKeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10`)
    // data.results.forEach((poke) => {
    //   const segments = poke.url.split('/');
    //   const noPoke: number = Number(segments[segments.length - 2])
    //   let pokemons: CreatePokemonDto = {
    //     name: poke.name,
    //     no: noPoke
    //   }
    //  this.pokemonService.create(pokemons)
    // })
    // 1)forma  --------------------------------------------------------------------------------------------------- 1)forma ///

    // 2)forma  --------------------------------------------------------------------------------------------------- 2)forma ///
      // const { data } = await this.axios.get<PoKeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10`)
      // data.results.forEach(async (poke) => {
      //   const segments = poke.url.split('/');
      //   const noPoke: number = Number(segments[segments.length - 2])
      //   let pokemons: CreatePokemonDto = {
      //     name: poke.name,
      //     no: noPoke
      //   }
      //   await this.pokemonModel.create(pokemons)
      // })
    // 2)forma  --------------------------------------------------------------------------------------------------- 2)forma ///

    // 3)forma  --------------------------------------------------------------------------------------------------- 3)forma ///
      // const { data } = await this.axios.get<PoKeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10`)
      // const insetPomisesArray: Promise<Pokemon>[] = []
      // data.results.forEach( (poke) => {
      //   const segments = poke.url.split('/');
      //   const noPoke: number = Number(segments[segments.length - 2])
      //   let pokemons: CreatePokemonDto = {
      //     name: poke.name,
      //     no: noPoke
      //   }
      //   // await this.pokemonService.create(pokemons)
      //   // insetPomisesArray.push(this.pokemonService.create(pokemons))
      //   insetPomisesArray.push(this.pokemonModel.create(pokemons))
      // });
      // await Promise.all(insetPomisesArray)
    // 3)forma  --------------------------------------------------------------------------------------------------- 3)forma ///

     // 4)forma  --------------------------------------------------------------------------------------------------- 4)forma ///
      const data = await this.http.get<PoKeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=650`)
      const pokemonsToInsert: CreatePokemonDto[] = []
      data.results.forEach((poke) => {
        const segments = poke.url.split('/');
        const noPoke: number = Number(segments[segments.length - 2])
        let pokemons: CreatePokemonDto = {
          name: poke.name,
          no: noPoke
        }
        pokemonsToInsert.push(pokemons)        
      });
      await this.pokemonModel.insertMany(pokemonsToInsert)
     // 4)forma  --------------------------------------------------------------------------------------------------- 4)forma ///

    return 'SEED EXECUTE';
  }

}
