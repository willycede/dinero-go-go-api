import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { RepositoryModule } from './repository/repository.module';
@Global()
@Module({
  imports: [DatabaseModule, RepositoryModule],
  exports: [DatabaseModule, RepositoryModule],
})
export class CommonModule {}
