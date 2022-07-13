import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDTO } from '../user/dto/create-user-dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { JwtAuthGuard } from './gaurd/jwt.guard';
import { LocalAuthGuard } from './gaurd/local.guard';
import { RolesGuard } from './gaurd/roles.guard';

@Controller('auth')
@ApiTags('Auth Module')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({ status: 200, description: 'Success', type: CreateUserDTO })
  @ApiBadRequestResponse({ description: 'NOT Register User' })
  @Post('/register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.addUser(createUserDTO);
    return user;
  }

  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiBadRequestResponse({ description: 'NOT Login User' })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: ' Get User' })
  @ApiResponse({ status: 200, description: 'Success' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('/user')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: 'Get Admin' })
  @ApiResponse({ status: 200, description: 'Success' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/admin')
  getDashboard(@Request() req) {
    return req.user;
  }
}
