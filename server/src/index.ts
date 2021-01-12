import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
// /////////////////////////////////////

import { COOKIE_NAME, __prod__ } from "./constants";

//// IMPORTS FOR ENTITIES
import { Booking } from "./entities/Booking";
import { MenuItem } from "./entities/MenuItem";
import { Order } from "./entities/Order";
import { OrderItem } from "./entities/OrderItem";
import { Reservation } from "./entities/Reservation";
import { User } from "./entities/User";
import { Table } from "./entities/Table";
// /////////////////////////////////////

//// IMPORTS FOR RESOLVERS
import { ReservationResolver } from "./resolvers/reservation";
import { TableResolver } from "./resolvers/table";
import { UserResolver } from "./resolvers/user";
import { OrderItemResolver } from "./resolvers/orderItem";
import { OrderResolver } from "./resolvers/order";
import { MenuItemResolver } from "./resolvers/menuItem";
import { BookingResolver } from "./resolvers/booking";

// IMPORTS FOR SEEDS
// import { userSeeds } from "./seeds/user.seeds";
// import { menuItemSeeds } from "./seeds/menuItem.seeds";
// import { tableSeeds } from "./seeds/table.seeds";
// import { bookingSeeds } from "./seeds/booking.seeds";
// import { reservationSeeds } from "./seeds/reservation.seeds";
// import { orderSeeds } from "./seeds/order.seeds";
// import { orderItemSeeds } from "./seeds/orderItem.seeds";
// /////////////////////////////////////

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "dfds2",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [Booking, MenuItem, Order, OrderItem, Reservation, Table, User],
  });

  // SEEDS
  //   await userSeeds();
  //   await menuItemSeeds();
  //   await tableSeeds();
  //   await bookingSeeds();
  //   await reservationSeeds();
  //   await orderSeeds();
  //   await orderItemSeeds();
  /////////////////////////

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      saveUninitialized: false,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        path: "/",
        maxAge: 1000 * 60 * 60, // 1 hour
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      secret: "secretKey",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        TableResolver,
        UserResolver,
        OrderItemResolver,
        OrderResolver,
        MenuItemResolver,
        BookingResolver,
        ReservationResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    // eslint-disable-next-line no-console
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});
