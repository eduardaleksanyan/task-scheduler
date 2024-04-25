import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchTermModule } from './modules/searchTerm/searchTerm.module';
import { AppconfigService } from './config/appconfig.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './database/dbConfig';
import dataSource from './database/typeOrm.config';
import { CitiesModule } from './modules/cities/cities.module';
import { BrandsModule } from './modules/brands/brands.module';
import { DietsModule } from "./modules/diets/diets.module";
import { DishTypesModule } from "./modules/dishTypes/dishTypes.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => dbConfig,
      dataSourceFactory: async () => {
        return dataSource.initialize();
      },
    }),
    CitiesModule,
    BrandsModule,
    DietsModule,
    DishTypesModule,
    SearchTermModule,
  ],
  controllers: [AppController],
  providers: [AppconfigService, AppService],
})
export class AppModule {}
