import { Router } from "express";

export const getAllRoutes = ( router : Router) =>{
    return {
        routes: router.stack
            .map(layer => {
                if(layer.route) {
                    const path = layer.route?.path;
                    const method = layer.route?.stack[0].method;
                    return `${method.toUpperCase()} ${path}`
                }
            })
            .filter(item => item !== undefined)
    }
}