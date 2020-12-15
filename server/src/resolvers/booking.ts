import { Booking } from "../entities/Booking";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";
import { COOKIE_NAME } from "../constants";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class BookingResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Booking, { nullable: true })
  booking?: Booking;
}

@Resolver()
export class BookingResolver {
    @Query(() => [Booking])
    async bookings(): Promise<Booking[]> {
       return Booking.find()
    }

    @Query(() => Booking, {nullable: true})
    booking(@Arg("id") id: number): Promise<Booking | undefined>{
        return Booking.findOne(id)
    }

    @Mutation(() => BookingResponse)
    async login(
        @Arg('bookingId') bookingId: number,
        @Ctx() { req }: MyContext
    ): Promise<BookingResponse> {
        const booking = await Booking.findOne(bookingId)
        if(!booking){
            return {
                errors: [{
                    field: 'bookingId',
                    message: `That booking number doesn't exist.`
                }]
            }
        }
        
        req.session.bookingId = booking.id
        return {
            booking
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Mutation(() => Boolean)
    async logout(
        @Ctx() { req, res }: MyContext
    ){
        return new Promise((resolve) =>
            req.session.destroy((err) => {
            res.clearCookie(COOKIE_NAME);
            if (err) {
                // eslint-disable-next-line no-console
                console.log(err);
                resolve(false);
                return;
            }
            return resolve(true);
      })
    );
    }
}