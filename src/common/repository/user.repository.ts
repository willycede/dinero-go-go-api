import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../user/user.model';
import { EntityRepository } from './aux-types/entity-repository';

@Injectable()
export class UserRepository extends EntityRepository<UserDocument, User> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
