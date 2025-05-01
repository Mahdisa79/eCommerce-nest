import { IsIn, IsNotEmpty } from "class-validator";
import { status } from "../entities/order-detail.entity";

export class ChangeOrderStatusDto {
    @IsNotEmpty()
    @IsIn(['pending','success','cancel'])
    status:status;
}