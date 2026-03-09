import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const product = await this.productsService.findOne(+id);
        if (!product) throw new NotFoundException(`Product with ID ${id} not found`);
        return product;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() product: Partial<Product>) {
        return this.productsService.create(product);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() product: Partial<Product>) {
        const updated = await this.productsService.update(+id, product);
        if (!updated) throw new NotFoundException(`Product with ID ${id} not found`);
        return updated;
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.productsService.remove(+id);
    }
}
