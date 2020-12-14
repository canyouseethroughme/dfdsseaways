import { User } from "../entities/User";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Booking } from "../entities/Booking";
import { MyContext } from "../types";

@Resolver()
export class UserResolver {
    @Query(() => [User])
    async users(): Promise<User[]> {
        return User.find()
    }

    @Query(() => User, {nullable: true})
    user(@Arg('id') id: number): Promise<User | undefined>{
        return User.findOne(id)
    }

    @Query(() => User, {nullable: true})
    async me(@Ctx() {req}: MyContext){
        if(!req.session.bookingId){
            return null
        }
        const booking = await Booking.findOne(req.session.bookingId)
        return User.findOne(booking?.userId)
    }
}