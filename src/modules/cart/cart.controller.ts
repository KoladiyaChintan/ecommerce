import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Delete,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/gaurd/jwt.guard';
import { RolesGuard } from '../auth/gaurd/roles.guard';
import { ItemDTO } from '../user/dto/item.dto';
import { CartService } from './cart.service';

@Controller('cart')
@ApiTags('Cart Module')
export class CartController {
  constructor(private cartService: CartService) {}

  @ApiOperation({ summary: 'Add Item to Cart' })
  @ApiResponse({ status: 200, description: 'Success', type: ItemDTO })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Post('/add')
  async addItemToCart(@Request() req, @Body() itemDTO: ItemDTO) {
    const userId = req.user.userId;
    const cart = await this.cartService.addItemToCart(userId, itemDTO);
    return cart;
  }

  @ApiOperation({ summary: 'Remove Item From Cart' })
  @ApiResponse({ status: 200, description: 'Success' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Delete('/remove')
  async removeItemFromCart(@Request() req, @Body() { productId }) {
    const userId = req.user.userId;
    const cart = await this.cartService.removeItemFromCart(userId, productId);
    if (!cart) throw new NotFoundException('Item does not exist');
    return cart;
  }

  @ApiOperation({ summary: 'Delete Item Form cart ' })
  @ApiResponse({ status: 200, description: 'Success' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Delete('/delete/:id')
  async deleteCart(@Param('id') userId: string) {
    const cart = await this.cartService.deleteCart(userId);
    if (!cart) throw new NotFoundException('Cart does not exist');
    return cart;
  }
}
