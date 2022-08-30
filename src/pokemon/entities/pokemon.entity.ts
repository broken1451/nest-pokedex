import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import * as mongoose from 'mongoose';

@Schema()
export class Pokemon extends Document {

    @Prop({ unique: true, index: true })
    name: string

    @Prop({ unique: true, index: true })
    no: number;

    // @Prop({
    //     ref: 'Customer',
    //     type: Types.ObjectId,
    //     required: true,
        
    // })
    // products: [{ _id: Types.ObjectId, name: string; }];

    // @Prop({
    //     ref: 'Customer',
    //     type: Types.ObjectId,
    //     required: true,
    //     // type: Schema.Types.ObjectId,
    //     // ref: 'Customer',
    // })
    // keywords: string[];

}

export const PokemonShema = SchemaFactory.createForClass(Pokemon);
