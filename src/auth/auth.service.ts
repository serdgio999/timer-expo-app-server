import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { v4 } from 'uuid';

import { PrismaService } from '../prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private jwtStrategy: JwtStrategy
  ) {}

  async login(authDto: AuthDto, response: Response) {
    const user = await this.validateUser(authDto);
    const accessToken = await this.createAccessToken(user.id);

    response.cookie('accessToken', accessToken);

    return {
      user: this.returnUserFields(user),
      accessToken
    };
  }

  async register(authDto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: authDto.email }
    });

    if (user) {
      throw new BadRequestException(
        'User with this emails has already been registered'
      );
    }

    const token = v4();
    const hashedPassword = await hash(authDto.password);

    const newUser = await this.prisma.user.create({
      data: {
        token,
        firstName: 'fName',
        lastName: 'lName',
        email: authDto.email,
        password: hashedPassword,
        options: {
          create: {
            sessionCount: 7,
            flowDuration: 60,
            breakDuration: 15
          }
        }
      }
    });

    // TODO: Handle autologin. Send cookies for client.

    return {
      user: this.returnUserFields(newUser),
      accessToken: await this.createAccessToken(newUser.id)
    };
  }

  async validateUser(authDto: AuthDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: authDto.email }
    });

    if (!user) {
      throw new NotFoundException('Cannot find user');
    }

    const isValidPassword = await verify(user.password, authDto.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Password is invalid');
    }

    return user;
  }

  async createAccessToken(userId: number) {
    const data = { id: userId };

    return await this.jwtService.signAsync(data, { expiresIn: '30d' });
  }

  decodeToken() {}

  encodeToken() {}

  returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email
    };
  }
}
