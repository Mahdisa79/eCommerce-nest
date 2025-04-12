import { Expose } from "class-transformer"

export class ResponseCategoryNotChildrenDto {
    @Expose()
    id:string

    @Expose()
    name:string

    @Expose()
    description:string

    @Expose()
    slug : string

}
