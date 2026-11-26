import { Injectable } from '@nestjs/common';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Beer } from './entities/beer.entity';

@Injectable()
export class BeersService {
  constructor(
    @InjectRepository(Beer)
    private readonly beersRepository: Repository<Beer>,
  ) { }

  async create(createBeerDto: CreateBeerDto): Promise<Beer> {
    const beer = this.beersRepository.create({
      beer_name: createBeerDto.beer_name,
      beer_abv: createBeerDto.beer_abv,
      beer_type_id: createBeerDto.beer_type_id,
      brewery_id: createBeerDto.brewery_id,
      beer_is_active: createBeerDto.beer_is_active,
    });
    const savedBeer = await this.beersRepository.save(beer);
    return savedBeer;
  }

  findAll() {
    return `This action returns all beers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} beer`;
  }

  update(id: number, updateBeerDto: UpdateBeerDto) {
    return `This action updates a #${id} beer`;
  }

  remove(id: number) {
    return `This action removes a #${id} beer`;
  }
}
