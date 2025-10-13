import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { ListingsService } from '../services/listings.service';
import { 
  CreateListingDto, 
  UpdateListingDto, 
  UpdateListingStatusDto,
  SearchListingsDto, 
  ListingResponseDto, 
  PaginatedListingsResponseDto 
} from '../dto/listings.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';

@Controller('listings')
@UseGuards(JwtAuthGuard)
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  async create(
    @GetUser('id') userId: number,
    @Body() createListingDto: CreateListingDto,
  ): Promise<ListingResponseDto> {
    return this.listingsService.create(userId, createListingDto);
  }

  @Get()
  async findAll(@Query() searchDto: SearchListingsDto): Promise<PaginatedListingsResponseDto> {
    return this.listingsService.findAll(searchDto);
  }

  @Get('my-listings')
  async findMyListings(
    @GetUser('id') userId: number,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 20,
  ): Promise<PaginatedListingsResponseDto> {
    return this.listingsService.findByUser(userId, page, limit);
  }

  @Get('available')
  async findAvailable(@Query() searchDto: SearchListingsDto): Promise<PaginatedListingsResponseDto> {
    // Solo mostrar listings disponibles para compra
    const availableSearchDto = { ...searchDto, isActive: true };
    return this.listingsService.findAll(availableSearchDto);
  }

  @Get('search')
  async searchListings(@Query() searchDto: SearchListingsDto): Promise<PaginatedListingsResponseDto> {
    // Búsqueda avanzada para compra con filtros específicos
    const advancedSearchDto = { ...searchDto, isActive: true };
    return this.listingsService.findAll(advancedSearchDto);
  }

  @Get('stats')
  async getStats(): Promise<{ total: number; active: number; inactive: number; totalValue: number }> {
    return this.listingsService.getListingStats();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ListingResponseDto> {
    return this.listingsService.findOne(id);
  }

  @Put(':id')
  async update(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateListingDto: UpdateListingDto,
  ): Promise<ListingResponseDto> {
    return this.listingsService.update(userId, id, updateListingDto);
  }

  @Put(':id/status')
  async updateStatus(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateListingStatusDto,
  ): Promise<ListingResponseDto> {
    return this.listingsService.updateStatus(userId, id, updateStatusDto);
  }

  @Delete(':id')
  async remove(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.listingsService.remove(userId, id);
    return { message: 'Listing deleted successfully' };
  }
}
