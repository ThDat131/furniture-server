import {
    Body,
    Controller,
    Get,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private productService: ProductService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    createProduct(@Body() product: CreateProductDto) {
        return this.productService.createProduct(product);
    }

    @Get()
    getProducts() {
        return this.productService.getProducts();
    }
}
