import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../custom-decorator/customize';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.createCategory(createCategoryDto);
    }

    @Get()
    @Public()
    getCategories() {
        return this.categoryService.getCategories();
    }

    @Get(':id')
    @Public()
    getCategory(@Param('id') id: string) {
        return this.categoryService.getCategory(id);
    }

    @Delete(':id')
    removeCategory(@Param('id') id: string) {
        return this.categoryService.removeCategory(id);
    }

    @Put(':id')
    @Public()
    updateCategory(@Param('id') id: string, @Body() data: CreateCategoryDto) {
        return this.categoryService.updateCategory(id, data);
    }
}
