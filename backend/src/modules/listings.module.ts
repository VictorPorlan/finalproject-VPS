import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing, User, Card, Edition } from '../entities';
import { ListingsService } from '../services/listings.service';
import { ListingsController } from '../controllers/listings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Listing, User, Card, Edition])],
  controllers: [ListingsController],
  providers: [ListingsService],
  exports: [ListingsService],
})
export class ListingsModule {}
