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
}
