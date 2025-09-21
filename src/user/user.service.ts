import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import { UserQueryDto } from './dto/user-query.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async insertDummyData() {
        const departments = ['Engineering', 'Finance', 'Marketing', 'HR', 'Sales'];
        const locations = ['New York', 'Chicago', 'Boston', 'Los Angeles', 'San Francisco'];

        const data: User[] = [];

        for (let i = 1; i <= 100; i++) {
            const name = `Employee ${i}`;
            const email = `employee${i}@example.com`;
            const department = departments[Math.floor(Math.random() * departments.length)];
            const location = locations[Math.floor(Math.random() * locations.length)];
            // random joining date in last 5 years
            const joining_date = new Date(
                2018 + Math.floor(Math.random() * 6), // year between 2018-2023
                Math.floor(Math.random() * 12), // month
                Math.floor(Math.random() * 28) + 1 // day
            );

            data.push({ id: i, name, email, department, location, joining_date });
        }
        return this.userModel.insertMany(data);
    }

    async getUsers(query: UserQueryDto) {
        const filters: any = {};

        if (query?.id) filters.id = query.id;
        if (query?.department) filters.department = query.department;
        if (query?.location) filters.location = query.location;

        // regex searches (inputs)
        if (query?.name) {
            filters.name = { $regex: query.name, $options: 'i' };
        }
        if (query?.email) {
            filters.email = { $regex: query.email, $options: 'i' };
        }

        if (query?.joining_date) {
            const date = new Date(query.joining_date);
            // start of the day in UTC
            const start = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0));

            // end of the day in UTC
            const end = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999));


            filters.joining_date = { $gte: start, $lte: end };
        }

        const page = query?.page ?? 1;
        const limit = query?.limit ?? 10;

        const [data, total] = await Promise.all([
            this.userModel.find(filters).skip((page - 1) * limit).limit(limit).exec(),
            this.userModel.countDocuments(filters)
        ]);

        return {
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }
}
