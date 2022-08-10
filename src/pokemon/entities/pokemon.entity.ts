import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {

    @Prop({ unique: true, index: true })
    name: string

    @Prop({ unique: true, index: true })
    no: number;

}

export const PokemonShema = SchemaFactory.createForClass(Pokemon);