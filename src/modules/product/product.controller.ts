import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDTO } from './dto/create.product.dto';
import { FilterProductDTO } from './dto/filter-product.dto';
import { ProductService } from './product.service';

@Controller('store/products')
@ApiTags('Product Module')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ summary: 'Get All Product' })
  @ApiResponse({ status: 200, description: 'Success', type: FilterProductDTO })
  @Get('/')
  async getProducts(@Query() filterProductDTO: FilterProductDTO) {
    if (Object.keys(filterProductDTO).length) {
      const filteredProducts = await this.productService.getFilteredProducts(
        filterProductDTO,
      );
      return filteredProducts;
    } else {
      const allProducts = await this.productService.getAllProducts();
      return allProducts;
    }
  }

  @ApiOperation({ summary: 'Get Product by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @ApiOperation({ summary: 'Add Product' })
  @ApiResponse({ status: 200, description: 'Success', type: CreateProductDTO })
  @Post('/')
  async addProduct(@Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.addProduct(createProductDTO);
    return product;
  }

  @ApiOperation({ summary: 'Update Product' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const product = await this.productService.updateProduct(
      id,
      createProductDTO,
    );
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @ApiOperation({ summary: 'Delete Product' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product does not exist');
    return product;
  }
}
