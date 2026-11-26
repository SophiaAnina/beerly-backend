import { Body, Controller, HttpCode, Post, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordHasher, Public, SignInService } from '@nestjs/authentication';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly passwordHasher: PasswordHasher,
    private readonly signInService: SignInService,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async login(@Body() { email, password }: LoginDto) {
    // passwordHash is select: false, so it has to be asked for.
    const user = await this.users.findOne({
      where: { email: email.trim().toLowerCase() },
      select: { id: true, email: true, hashed_password: true },
    });
    // Verifying even without a user keeps the response time the same for unknown emails.
    const valid = await this.passwordHasher.verify(password, user?.hashed_password);
    if (!user || !valid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    await this.signInService.signIn(user.id, { method: 'password' });
    return { id: user.id, email: user.email };
  }
}
