import { Controller, Get, Post, Body } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @Get()
    findAll() {
        return this.coursesService.findAll();
    }

    @Post()
    create(@Body() course: Partial<Course>) {
        return this.coursesService.create(course);
    }
}
