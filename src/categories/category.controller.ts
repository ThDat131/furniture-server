import {
    Body,
    Controller,
    Get,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/custom-decorator/customize';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post()
    @Public()
    @UsePipes(new ValidationPipe())
    createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.createCategory(createCategoryDto);
    }

    @Get()
    @Public()
    getCategories() {
        return this.categoryService.getCategories();
    }
}
