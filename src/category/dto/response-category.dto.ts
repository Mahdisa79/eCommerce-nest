import { Expose } from "class-transformer"

export class ResponseCategoryDto {
    @Expose()
    id:string

    @Expose()
    name:string

    @Expose()
    description:string

    @Expose()
    slug : string
}
