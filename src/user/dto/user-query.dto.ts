import { Type } from "class-transformer";
import { IsDate, IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UserQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    id?: number

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    email?: string

    @IsOptional()
    @IsString()
    department?: string

    @IsOptional()
    @IsString()
    location?: string

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    joining_date?: Date

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @Min(1)
    page: number = 1;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @Min(1)
    limit: number = 10;
}