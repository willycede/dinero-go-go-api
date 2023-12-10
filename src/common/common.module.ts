import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [DatabaseModule, RepositoryModule],
  exports: [RepositoryModule],
})
export class CommonModule {}
