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
    getProducts() {
        return this.productService.getProducts();
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
