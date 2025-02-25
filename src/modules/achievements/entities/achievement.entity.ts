import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AchievementDocument = HydratedDocument<Achievement>
@Schema({
    toJSON : {
        virtuals : true , 
        getters : true ,
    },
})
export class Achievement {   
        @Prop({required : true})
        title : string
        @Prop({required : true})
        completed : boolean
}

export const achievmentSchema = SchemaFactory.createForClass(Achievement) 


