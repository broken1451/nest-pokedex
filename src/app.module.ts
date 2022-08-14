import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EvnConfiguration } from './config/env.config';
import { joiValidationSchema } from './config/joi.schema.validation';


// console.log({__dirname});
// console.log({ __dirname: join(__dirname, '../', 'public') });
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EvnConfiguration], // conversiones y mapeos 
      validationSchema: joiValidationSchema
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    PokemonModule,
    CommonModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
