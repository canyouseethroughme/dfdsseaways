import { MenuItem } from '../entities/MenuItem'
import { getConnection } from 'typeorm'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const menuItemSeeds = async () => {
    //// TYPE
    // starter: 1
    // main_course: 2
    // side_orders: 3
    // desert: 4
    // alcoholic: 5
    // nonalcoholic: 6
    //// ITEM_TYPE
    // food: 1
    // drink: 2
    // /////////////////////////////////////
    const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(MenuItem)
        .values([
            {type: 1, itemType: 1, name: 'KöD Tartare', description: 'Beef tartare made from Danish prime beef w. crispy rye bread, beetroot, smoked mayo & lemon', price: 105},
            {type: 1, itemType: 1, name: 'Lobster Ravioli', description: 'Homemade ravioli w. langoustine, herbal oil & langoustine broth', price: 95},
            {type: 1, itemType: 1, name: 'Salmon Tartare', description: 'Thinly sliced Danish beef w. Danish gouda cheese, croutons, baby leafs & browned butter cream', price: 110},
            {type: 2, itemType: 1, name: 'Ribeye', description: '400gr. Greater Omaha - Angus/Hereford - USA/Grain-fed', price: 395},
            {type: 2, itemType: 1, name: 'Ribeye', description: '350gr. Angus/Hereford - Australia/Grain-fed', price: 350},
            {type: 2, itemType: 1, name: 'Ribeye', description: '700gr. Cöte de köd - Hereford - Uruguay/Grain-fed - Matured at least 35 days', price: 565},
            {type: 2, itemType: 1, name: 'Wagyu', description: '150gr. Snowbeef - Hida-Gyu - Grade5A/Feeding: Corn, grains & Japanese beer', price: 545},
            {type: 2, itemType: 1, name: 'Tenderloin', description: '225gr. Hereford - Uruguay/Grass-fed - Matured at least 35 days', price: 285},
            {type: 3, itemType: 1, name: 'Steak Fries à la KöD', description: 'Danish gouda cheese & herbs', price: 50},
            {type: 3, itemType: 1, name: 'Sweet Potato Fries', description: 'Danish gouda cheese & herbs', price: 55},
            {type: 3, itemType: 1, name: 'Chili/Garlic Fries', description: 'Thin fries w. homemade chili seasoning', price: 55},
            {type: 3, itemType: 1, name: 'Sauteed Mushrooms', description: 'w. pickled pearl onions & thyme', price: 50},
            {type: 3, itemType: 1, name: 'Truffle Fries w. fresh tarragon', description: 'Danish gouda cheese & herbs', price: 50},
            {type: 4, itemType: 1, name: 'Classic creme brulee', description: 'w, passionfruit sorbet', price: 80},
            {type: 4, itemType: 1, name: 'White Chocolate Mousse', description: 'w. roasted almonds, cherries & dark chocolate', price: 80},
            {type: 5, itemType: 2, name: 'Gin & Tonic', description: 'Choose your favourite from our extensive G&T Menu', price: 85},
            {type: 5, itemType: 2, name: 'Lemonade à la KöD', description: 'Stolichnaya Vodka – Homemade lemonade – Angostura', price: 80},
            {type: 5, itemType: 2, name: 'Dark ‘n’ Stormy', description: 'Bacardi Anejo Cuatro – Ginger Beer – Lime – Gomme', price: 95},
            {type: 5, itemType: 2, name: 'Rio Alto', description: 'Chardonnay, Reserva, 2018, Maipo – Chile', price: 80},
            {type: 5, itemType: 2, name: 'Seguinot-Bordet', description: 'Chablis Premier Cru, 2017, Chablis – France', price: 95},
            {type: 5, itemType: 2, name: 'Toscana Rosso', description: 'Sangiovese, Carparzo, 2018, Toscana – Italy', price: 95},
            {type: 5, itemType: 2, name: 'Tuborg Classic', description: 'Danish dark and slightly complex pilsner beer', price: 60},
            {type: 5, itemType: 2, name: 'Heineken', description: 'Dutch super-inoffensive lager with a stronger, bitter taste', price: 60},
            {type: 6, itemType: 2, name: 'Evian', description: 'Natural spring water from several sources near Évian-les-Bains, Geneva', price: 70},
            {type: 6, itemType: 2, name: 'Juice', description: 'Fresh juice made from oranges, apples, grepfruits or strawberries', price: 50},
            {type: 6, itemType: 2, name: 'Soda', description: 'Coca-Cola, Fanta Orange, Faxe Kondi or Tonic water', price: 60},
        ]).execute() 
    // eslint-disable-next-line no-console
    console.log('menu items', result) 
}