import { MenuItem } from "../entities/MenuItem";
import { getConnection } from "typeorm";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const menuItemSeeds = async () => {
  const result = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(MenuItem)
    .values([
      {
        category: "starter",
        itemType: "food",
        name: "KöD Tartare",
        description:
          "Beef tartare made from Danish prime beef w. crispy rye bread, beetroot, smoked mayo & lemon",
        price: 105,
      },
      {
        category: "starter",
        itemType: "food",
        name: "Lobster Ravioli",
        description:
          "Homemade ravioli w. langoustine, herbal oil & langoustine broth",
        price: 95,
      },
      {
        category: "starter",
        itemType: "food",
        name: "Salmon Tartare",
        description:
          "Thinly sliced Danish beef w. Danish gouda cheese, croutons, baby leafs & browned butter cream",
        price: 110,
      },
      {
        category: "main_course",
        itemType: "food",
        name: "Ribeye",
        description: "400gr. Greater Omaha - Angus/Hereford - USA/Grain-fed",
        price: 395,
      },
      {
        category: "main_course",
        itemType: "food",
        name: "Ribeye",
        description: "350gr. Angus/Hereford - Australia/Grain-fed",
        price: 350,
      },
      {
        category: "main_course",
        itemType: "food",
        name: "Ribeye",
        description:
          "700gr. Cöte de köd - Hereford - Uruguay/Grain-fed - Matured at least 35 days",
        price: 565,
      },
      {
        category: "main_course",
        itemType: "food",
        name: "Wagyu",
        description:
          "150gr. Snowbeef - Hida-Gyu - Grade5A/Feeding: Corn, grains & Japanese beer",
        price: 545,
      },
      {
        category: "main_course",
        itemType: "food",
        name: "Tenderloin",
        description:
          "225gr. Hereford - Uruguay/Grass-fed - Matured at least 35 days",
        price: 285,
      },
      {
        category: "side_orders",
        itemType: "food",
        name: "Steak Fries à la KöD",
        description: "Danish gouda cheese & herbs",
        price: 50,
      },
      {
        category: "side_orders",
        itemType: "food",
        name: "Sweet Potato Fries",
        description: "Danish gouda cheese & herbs",
        price: 55,
      },
      {
        category: "side_orders",
        itemType: "food",
        name: "Chili/Garlic Fries",
        description: "Thin fries w. homemade chili seasoning",
        price: 55,
      },
      {
        category: "side_orders",
        itemType: "food",
        name: "Sauteed Mushrooms",
        description: "w. pickled pearl onions & thyme",
        price: 50,
      },
      {
        category: "side_orders",
        itemType: "food",
        name: "Truffle Fries w. fresh tarragon",
        description: "Danish gouda cheese & herbs",
        price: 50,
      },
      {
        category: "desert",
        itemType: "food",
        name: "Classic creme brulee",
        description: "w, passionfruit sorbet",
        price: 80,
      },
      {
        category: "desert",
        itemType: "food",
        name: "White Chocolate Mousse",
        description: "w. roasted almonds, cherries & dark chocolate",
        price: 80,
      },
      {
        category: "alcoholic",
        itemType: "drink",
        name: "Gin & Tonic",
        description: "Choose your favourite from our extensive G&T Menu",
        price: 85,
      },
      {
        category: "alcoholic",
        itemType: "drink",
        name: "Lemonade à la KöD",
        description: "Stolichnaya Vodka – Homemade lemonade – Angostura",
        price: 80,
      },
      {
        category: "alcoholic",
        itemType: "drink",
        name: "Dark ‘n’ Stormy",
        description: "Bacardi Anejo Cuatro – Ginger Beer – Lime – Gomme",
        price: 95,
      },
      {
        category: "alcoholic",
        itemType: "drink",
        name: "Rio Alto",
        description: "Chardonnay, Reserva, 2018, Maipo – Chile",
        price: 80,
      },
      {
        category: "alcoholic",
        itemType: "drink",
        name: "Seguinot-Bordet",
        description: "Chablis Premier Cru, 2017, Chablis – France",
        price: 95,
      },
      {
        category: "alcoholic",
        itemType: "drink",
        name: "Toscana Rosso",
        description: "Sangiovese, Carparzo, 2018, Toscana – Italy",
        price: 95,
      },
      {
        category: "alcoholic",
        itemType: "drink",
        name: "Tuborg Classic",
        description: "Danish dark and slightly complex pilsner beer",
        price: 60,
      },
      {
        category: "alcoholic",
        itemType: "drink",
        name: "Heineken",
        description:
          "Dutch super-inoffensive lager with a stronger, bitter taste",
        price: 60,
      },
      {
        category: "nonalcoholic",
        itemType: "drink",
        name: "Evian",
        description:
          "Natural spring water from several sources near Évian-les-Bains, Geneva",
        price: 70,
      },
      {
        category: "nonalcoholic",
        itemType: "drink",
        name: "Juice",
        description:
          "Fresh juice made from oranges, apples, grepfruits or strawberries",
        price: 50,
      },
      {
        category: "nonalcoholic",
        itemType: "drink",
        name: "Soda",
        description: "Coca-Cola, Fanta Orange, Faxe Kondi or Tonic water",
        price: 60,
      },
    ])
    .execute();
  // eslint-disable-next-line no-console
  console.log("menu items", result);
};
