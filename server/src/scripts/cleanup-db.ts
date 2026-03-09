import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function cleanup() {
    const client = new Client({
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '5432', 10),
        user: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        database: process.env.DATABASE_NAME || 'xigotso_db',
    });

    try {
        await client.connect();
        console.log('Connected to database');

        // Delete services with empty slugs that cause duplicate key violations
        // or update them with a placeholder
        const deleteRes = await client.query("DELETE FROM services WHERE slug = '' OR slug IS NULL");
        console.log(`Deleted ${deleteRes.rowCount} services with invalid slugs`);

        const blogRes = await client.query("DELETE FROM blog_posts WHERE slug = '' OR slug IS NULL");
        console.log(`Deleted ${blogRes.rowCount} blog posts with invalid slugs`);

    } catch (err) {
        console.error('Cleanup failed:', err);
    } finally {
        await client.end();
    }
}

cleanup();
