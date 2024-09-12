import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/custom-decorator/customize';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private productService: ProductService) {}

    @Post()
    @Public()
    @UsePipes(new ValidationPipe())
    createProduct(@Body() product: CreateProductDto) {
        return this.productService.createProduct(product);
    }

    @Get()
    @Public()
    getProducts(
        @Query('isNew') isNew?: boolean,
        @Query('isPotential') isPotential?: boolean,
    ) {
        return this.productService.getProducts(isNew, isPotential);
    }

    @Get(':id')
    @Public()
    getProduct(@Param('id') id: string) {
        return this.productService.getProduct(id);
    }
    
    @Delete(':id')
    @Public()
    removeProduct(@Param('id') id: string) {
        return this.productService.removeProduct(id);
    }

    @Put(':id')
    @Public()
    updateProduct(@Param('id') id: string, @Body() data: CreateProductDto) {
        return this.productService.updateProduct(id, data);
    }
}
