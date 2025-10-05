#!/usr/bin/env node

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User, Card, Edition, Listing } from '../../src/entities';
import * as bcrypt from 'bcryptjs';

async function runSeeds() {
  const logger = new Logger('SeedRunner');
  
  try {
    logger.log('🌱 Starting database seeding...');
    
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);
    
    // Get repositories from DataSource
    const userRepository = dataSource.getRepository(User);
    const cardRepository = dataSource.getRepository(Card);
    const editionRepository = dataSource.getRepository(Edition);
    const listingRepository = dataSource.getRepository(Listing);
    
    logger.log('📋 Checking existing data...');
    
    // Check if users already exist
    const existingUsers = await userRepository.count();
    if (existingUsers > 0) {
      logger.log(`👥 Found ${existingUsers} existing users, skipping user creation`);
    } else {
      // Create test users
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      const users = [
        {
          email: 'admin@tradebinder.com',
          username: 'admin',
          password: hashedPassword,
          location: 'Madrid, España',
          isActive: true,
        },
        {
          email: 'john@example.com',
          username: 'john_doe',
          password: hashedPassword,
          location: 'Barcelona, España',
          isActive: true,
        },
        {
          email: 'jane@example.com',
          username: 'jane_smith',
          password: hashedPassword,
          location: 'Valencia, España',
          isActive: true,
        },
      ];
      
      const createdUsers = await userRepository.save(users);
      logger.log(`👥 Created ${createdUsers.length} users`);
    }
    
    // Check if cards already exist
    const existingCards = await cardRepository.count();
    if (existingCards > 0) {
      logger.log(`🃏 Found ${existingCards} existing cards, skipping card creation`);
    } else {
      // Create test cards (simple info)
      const cards = [
        {
          name: 'Black Lotus',
          imageUrl: 'https://example.com/black-lotus.png',
        },
        {
          name: 'Lightning Bolt',
          imageUrl: 'https://example.com/lightning-bolt.png',
        },
        {
          name: 'Counterspell',
          imageUrl: 'https://example.com/counterspell.png',
        },
      ];
      
      const createdCards = await cardRepository.save(cards);
      logger.log(`🃏 Created ${createdCards.length} cards`);
    }
    
    // Check if editions already exist
    const existingEditions = await editionRepository.count();
    if (existingEditions > 0) {
      logger.log(`📚 Found ${existingEditions} existing editions, skipping edition creation`);
    } else {
      // Create test editions (simple info)
      const editions = [
        {
          name: 'Alpha',
          releaseDate: new Date('1993-08-05'),
          hasFoil: false,
        },
        {
          name: 'Beta',
          releaseDate: new Date('1993-10-04'),
          hasFoil: false,
        },
        {
          name: 'Unlimited',
          releaseDate: new Date('1993-12-01'),
          hasFoil: false,
        },
      ];
      
      const createdEditions = await editionRepository.save(editions);
      logger.log(`📚 Created ${createdEditions.length} editions`);
    }
    
    // Check if listings already exist
    const existingListings = await listingRepository.count();
    if (existingListings > 0) {
      logger.log(`📢 Found ${existingListings} existing listings, skipping listing creation`);
    } else {
      // Get existing data for relationships
      const users = await userRepository.find();
      const cards = await cardRepository.find();
      const editions = await editionRepository.find();
      
      // Create test listings (user-specific info)
      const listings = [
        {
          userId: users[0].id,
          cardId: cards[0].id,
          editionId: editions[0].id, // Black Lotus - Alpha
          condition: 'near_mint',
          isFoil: false,
          price: 2500.00,
          quantity: 1,
          description: 'Black Lotus Alpha en perfecto estado. Disponible para entrega en Madrid.',
          images: ['https://example.com/user-black-lotus-1.jpg', 'https://example.com/user-black-lotus-2.jpg'],
          isActive: true,
        },
        {
          userId: users[1].id,
          cardId: cards[1].id,
          editionId: editions[1].id, // Lightning Bolt - Beta
          condition: 'lightly_played',
          isFoil: false,
          price: 150.00,
          quantity: 1,
          description: 'Lightning Bolt Beta con ligero desgaste en los bordes. Precio negociable.',
          images: ['https://example.com/user-lightning-bolt-1.jpg'],
          isActive: true,
        },
        {
          userId: users[2].id,
          cardId: cards[2].id,
          editionId: editions[2].id, // Counterspell - Unlimited
          condition: 'near_mint',
          isFoil: false,
          price: 75.00,
          quantity: 1,
          description: 'Counterspell Unlimited en excelente estado. Envío disponible.',
          images: ['https://example.com/user-counterspell-1.jpg'],
          isActive: true,
        },
      ];
      
      const createdListings = await listingRepository.save(listings);
      logger.log(`📢 Created ${createdListings.length} listings`);
    }
    
    // Get final counts
    const finalUserCount = await userRepository.count();
    const finalCardCount = await cardRepository.count();
    const finalEditionCount = await editionRepository.count();
    const finalListingCount = await listingRepository.count();
    
    logger.log('✅ Database seeding completed successfully');
    logger.log('📊 Summary:');
    logger.log(`   - Users: ${finalUserCount}`);
    logger.log(`   - Cards: ${finalCardCount}`);
    logger.log(`   - Editions: ${finalEditionCount}`);
    logger.log(`   - Listings: ${finalListingCount}`);
    
    await app.close();
  } catch (error) {
    logger.error('❌ Error running seeds:', error);
    process.exit(1);
  }
}

runSeeds();