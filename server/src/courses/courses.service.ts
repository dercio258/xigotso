import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private coursesRepository: Repository<Course>,
    ) { }

    findAll(): Promise<Course[]> {
        return this.coursesRepository.find();
    }

    create(course: Partial<Course>): Promise<Course> {
        const newCourse = this.coursesRepository.create(course);
        return this.coursesRepository.save(newCourse);
    }
}
