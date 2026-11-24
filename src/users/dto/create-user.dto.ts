
import {
    IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsDateString
} from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(128)
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    last_name: string;

    @IsDateString()
    date_of_birth: string;
}
