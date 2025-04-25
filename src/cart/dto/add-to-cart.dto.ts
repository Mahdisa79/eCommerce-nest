import { IsInt, IsNotEmpty } from "class-validator";

export class AddToCartDto{

    @IsNotEmpty()
    @IsInt()
    quantity:number;


    @IsNotEmpty()
    @IsInt()
    variantItemId:number; //{ size : M}


    @IsNotEmpty()
    @IsInt()
    productId:number;



}