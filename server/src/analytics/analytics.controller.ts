import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('summary')
    getSummary() {
        return this.analyticsService.getSummary();
    }

    @Get('page-views')
    getPageViews() {
        return this.analyticsService.getPageViews();
    }

    @Get('recent-activity')
    getRecentActivity() {
        return this.analyticsService.getRecentActivity();
    }

    @Post('track-view')
    trackView(@Body() body: { page: string }) {
        return this.analyticsService.trackView(body.page);
    }
}
