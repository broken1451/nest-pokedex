import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDTO } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {


  constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>) { }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDTO: PaginationDTO) {
    const { limit = 10, offset = 0 } = paginationDTO
    return this.pokemonModel.find({}).limit(limit).skip(offset).sort({
      no: 1
    }).select('-__v')
  }

  async findOne(term: string) {

    let pokemon: Pokemon
    // console.log(+term);
    // console.log(isNaN(+term));
    // console.log(!isNaN(+term));
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term })
    }

    // buscar por mongoID
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // buscar por nombre
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.trim().toLocaleLowerCase() });
    }

    if (!pokemon) {
      throw new NotFoundException(`No se Encontro pokemon por el termino a buscar ${term}`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    try {
      const pokemon = await this.findOne(term);
      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      }

      const pokemonUpdate = await pokemon.updateOne(updatePokemonDto, {
        new: true
      });
      // return pokemonUpdate;
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      console.log({ error });
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await  pokemon.deleteOne()
    // const pokemon = await this.pokemonModel.findByIdAndDelete(id);
    const { acknowledged, deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon con id  en la db ${id} no existe `)
    }
    return;
  }



  private handleExceptions(error: any) {
    console.log({ error });
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon Existe en la db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`No se puede Crear pokemon`);
  }
}
