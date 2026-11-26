import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsBoolean,
    IsUUID,
    MaxLength,
    Min,
    Max,
} from 'class-validator';

export class CreateBeerDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    beer_name: string;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @Max(99.99)
    beer_abv: number;

    @IsUUID()
    beer_type_id: string;

    @IsUUID()
    brewery_id: string;

    @IsBoolean()
    beer_is_active: boolean;
}