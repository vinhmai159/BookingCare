import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleServiceToken, CategoryServiceToken, TagServiceToken } from './constants';
import { ArticleController, CategoryController, TagController } from './controllers';
import { Article, Category, Tag } from './entities';
import { ArticleRepository, CategoryRepository, TagRepository } from './repository';
import { ArticleService, CategoryService, TagService } from './services';

const serviceProviders = [
    {
        provide: ArticleServiceToken,
        useClass: ArticleService
    },
    {
        provide: CategoryServiceToken,
        useClass: CategoryService
    },
    {
        provide: TagServiceToken,
        useClass: TagService
    }
];

@Module({
    imports: [
        TypeOrmModule.forFeature([Article, Category, Tag, ArticleRepository, CategoryRepository, TagRepository]),
        CqrsModule
    ],
    controllers: [ArticleController, CategoryController, TagController],
    providers: [...serviceProviders],
    exports: []
})
export class ArticleModel {}
