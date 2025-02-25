import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAchievmentDto } from './dto/create-achievement.dto';
import { UpdateAchievmentDto } from './dto/update-achievement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Achievement, AchievementDocument } from './entities/achievement.entity';
import { Model } from 'mongoose';

@Injectable()
export class AchievmentsService {
  constructor(@InjectModel(Achievement.name) private achievementModel : Model<AchievementDocument>){}

  async create(createAchievmentDto: CreateAchievmentDto) {
    const achievement = await new this.achievementModel(createAchievmentDto);
    return achievement.save()
  }

  async findAll() {
    return await this.achievementModel.find().exec();
  }

  async findOne(id: string) {
    return await this.achievementModel.findById(id).exec();
  }

  async update(id: string, updateAchievmentDto: UpdateAchievmentDto) {
    const achievement = await this.achievementModel.findById(id , updateAchievmentDto , {new : true}).exec()
    if(!achievement) {
      throw new NotFoundException()
    }
    return achievement;
  }

  async remove(id: string) {
    const achievement = await this.achievementModel.findByIdAndDelete(id).exec();
    if(!achievement){
      throw new NotFoundException()
    }
    return achievement;
  }
}
