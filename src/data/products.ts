import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // =========================================================================
  // 26 DISTINCT FULL-DISH SIGNATURE ITEMS FOR CAFÉ 007 MART BUREWALA
  // Every dish displays a 100% unique, full unclipped crystal-clear photo.
  // =========================================================================

  // 1. Dish 01 - Big Deal 1
  {
    id: 'dish-01',
    name: 'Big Deal 1 (2 Small Pizzas + 500ml Drink)',
    nameUrdu: 'بگ ڈیل 1 (2 اسمال پیزا + 500 ملی لیٹر ڈرنک)',
    nameRoman: 'Big Deal 1 (2 Small Pizza + Drink)',
    category: 'pizza_deals',
    price: 1340,
    description: '2 freshly baked 7" small pizzas on wooden platters paired with a chilled 500ml Coca-Cola bottle.',
    descriptionUrdu: '2 عدد تازہ تیار کردہ اسمال پیزا اور ٹھنڈی 500 ملی لیٹر ڈرنک۔',
    image: '/images/dish_01.jpg',
    tags: ['Best Value', 'Deal 1'],
    isPopular: true,
    prepTimeMinutes: 20,
    dealItems: ['2 Small Pizzas (7")', '500ml Cold Drink'],
  },

  // 2. Dish 02 - Big Deal 3
  {
    id: 'dish-02',
    name: 'Big Deal 3 (1 Large + 1 Medium Pizza + 1.5L Drink)',
    nameUrdu: 'بگ ڈیل 3 (1 لارج + 1 میڈیم پیزا + 1.5 لیٹر ڈرنک)',
    nameRoman: 'Big Deal 3 (1 Large + 1 Medium + 1.5L)',
    category: 'pizza_deals',
    price: 2550,
    description: '1 Large 13" pizza & 1 Medium 10" pizza on wooden platters served with a jumbo 1.5 Liter cold drink.',
    descriptionUrdu: '1 عدد لارج پیزا، 1 عدد میڈیم پیزا اور 1.5 لیٹر کولڈ ڈرنک۔',
    image: '/images/dish_02.jpg',
    tags: ['Family Feast', 'Deal 3'],
    isPopular: true,
    prepTimeMinutes: 25,
    dealItems: ['1 Large Pizza (13")', '1 Medium Pizza (10")', '1.5 Liter Drink'],
  },

  // 3. Dish 03 - Big Deal 4
  {
    id: 'dish-03',
    name: 'Big Deal 4 (1 Large Pizza + 10 Hot Wings + 1.5L Drink)',
    nameUrdu: 'بگ ڈیل 4 (1 لارج پیزا + 10 ہاٹ ونگز + 1.5 لیٹر ڈرنک)',
    nameRoman: 'Big Deal 4 (1 Large Pizza + 10 Wings + 1.5L)',
    category: 'pizza_deals',
    price: 2200,
    description: '1 Whole Large 13" pizza, a platter of 10 golden crispy hot wings, and a 1.5L cold drink bottle.',
    descriptionUrdu: '1 عدد لارج پیزا، 10 عدد کرسپی ہاٹ ونگز اور 1.5 لیٹر ڈرنک۔',
    image: '/images/dish_03.jpg',
    tags: ['Wings Combo', 'Top Hit'],
    isPopular: true,
    prepTimeMinutes: 25,
    dealItems: ['1 Large Pizza (13")', '10 Crispy Hot Wings', '1.5 Liter Drink'],
  },

  // 4. Dish 04 - Big Deal 8
  {
    id: 'dish-04',
    name: 'Big Deal 8 (2 Large Pizzas + 1.5 Liter Drink)',
    nameUrdu: 'بگ ڈیل 8 (2 لارج پیزا + 1.5 لیٹر ڈرنک)',
    nameRoman: 'Big Deal 8 (2 Large Pizzas + 1.5L)',
    category: 'pizza_deals',
    price: 2900,
    description: '2 Huge 13" large pizzas loaded with pure mozzarella & spiced chicken, served with a 1.5L cold drink.',
    descriptionUrdu: '2 عدد فل سائز لارج پیزا اور 1.5 لیٹر کولڈ ڈرنک۔ بھرپور فیملی ڈیل۔',
    image: '/images/dish_04.jpg',
    tags: ['Mega Feast', 'Bestseller'],
    isPopular: true,
    prepTimeMinutes: 28,
    dealItems: ['2 Large Pizzas (13")', '1.5 Liter Drink'],
  },

  // 5. Dish 05 - Big Deal 9
  {
    id: 'dish-05',
    name: 'Big Deal 9 (1 Med Pizza + 3 Zingers + Fries + 1.5L)',
    nameUrdu: 'بگ ڈیل 9 (1 میڈیم پیزا + 3 زنگر برگر + لارج فرائز + 1.5L)',
    nameRoman: 'Big Deal 9 (1 Med Pizza + 3 Zinger + Fries + 1.5L)',
    category: 'pizza_deals',
    price: 2650,
    description: '1 Medium 10" pizza, 3 whole crispy Zinger burgers, 1 large French fries box, and 1.5L Coca-Cola bottle.',
    descriptionUrdu: 'نئی دھماکہ ڈیل: 1 میڈیم پیزا، 3 زنگر برگر، 1 لارج فرائز اور 1.5 لیٹر ڈرنک۔',
    image: '/images/dish_05.jpg',
    tags: ['Pizza + Burger', 'Hot'],
    isPopular: true,
    prepTimeMinutes: 25,
    dealItems: ['1 Medium Pizza (10")', '3 Crispy Zinger Burgers', '1 Large French Fries', '1.5 Liter Drink'],
  },

  // 6. Dish 06 - Big Deal 10
  {
    id: 'dish-06',
    name: 'Big Deal 10 (Grand Feast: 4 Pizzas + 20 Wings + 2x 1.5L)',
    nameUrdu: 'بگ ڈیل 10 (2 لارج + 2 میڈیم پیزا + 20 ونگز + 2 ڈرنکس)',
    nameRoman: 'Big Deal 10 (Mega Party: 4 Pizzas + 20 Wings + 2 Drinks)',
    category: 'pizza_deals',
    price: 6750,
    description: 'Grand Royal Party Feast: 2 Large 13" pizzas, 2 Medium 10" pizzas, 20 hot wings, and 2x 1.5L cold drinks.',
    descriptionUrdu: 'شاہی پارٹی ڈیل: 2 لارج پیزا، 2 میڈیم پیزا، 20 کرسپی ہاٹ ونگز اور 2 عدد 1.5 لیٹر ڈرنکس۔',
    image: '/images/dish_06.jpg',
    tags: ['Mega Party', 'Feeds 8-10'],
    isPopular: true,
    prepTimeMinutes: 35,
    dealItems: ['2 Large Pizzas (13")', '2 Medium Pizzas (10")', '20 Crispy Hot Wings', '2x 1.5 Liter Drinks'],
  },

  // 7. Dish 07 - Fast Food Deal 1
  {
    id: 'dish-07',
    name: 'Fast Food Deal 1 (1 Zinger Burger + Reg. Drink)',
    nameUrdu: 'ڈیل 1 (1 زنگر برگر + ریگولر ڈرنک)',
    nameRoman: 'Deal 1 (1 Zinger Burger + Reg Drink)',
    category: 'burgers',
    price: 440,
    description: 'Whole crispy golden fried Zinger breast fillet in sesame bun with lettuce, mayo, and chilled regular drink.',
    descriptionUrdu: 'کرسپی زنگر برگر اور ٹھنڈی ڈرنک۔',
    image: '/images/dish_07.jpg',
    tags: ['Single Bite', 'Crispy'],
    isPopular: true,
    prepTimeMinutes: 12,
  },

  // 8. Dish 08 - Fast Food Deal 2
  {
    id: 'dish-08',
    name: 'Fast Food Deal 2 (Patty / Chapli Burger + Reg. Drink)',
    nameUrdu: 'ڈیل 2 (1 پیٹی / چپلی برگر + ریگولر ڈرنک)',
    nameRoman: 'Deal 2 (1 Patty / Chapli Burger + Drink)',
    category: 'burgers',
    price: 350,
    description: 'Juicy grilled chicken patty or traditional spiced Chapli burger served with a chilled Coca-Cola cup.',
    descriptionUrdu: '1 عدد پیٹی یا چپلی برگر اور ریگولر ڈرنک۔',
    image: '/images/dish_08.jpg',
    tags: ['Pocket Friendly'],
    isSpicy: true,
    prepTimeMinutes: 10,
  },

  // 9. Dish 09 - Fast Food Deal 4
  {
    id: 'dish-09',
    name: 'Fast Food Deal 4 (Zinger Roll + Fries + Reg. Drink)',
    nameUrdu: 'ڈیل 4 (1 زنگر رول + فرائز + ریگولر ڈرنک)',
    nameRoman: 'Deal 4 (1 Zinger Roll + Fries + Drink)',
    category: 'wraps',
    price: 590,
    description: 'Crispy fried chicken zinger wrap packed with fresh veggies & special garlic sauce, served with fries & drink.',
    descriptionUrdu: 'خستہ زنگر رول، فرائز اور ریگولر ڈرنک۔',
    image: '/images/dish_09.jpg',
    tags: ['Roll Craving'],
    prepTimeMinutes: 14,
  },

  // 10. Dish 10 - Fast Food Deal 5
  {
    id: 'dish-10',
    name: 'Fast Food Deal 5 (Zinger Tower + Fries + Reg. Drink)',
    nameUrdu: 'ڈیل 5 (1 زنگر ٹاور برگر + فرائز + ریگولر ڈرنک)',
    nameRoman: 'Deal 5 (1 Zinger Tower + Fries + Drink)',
    category: 'burgers',
    price: 720,
    description: 'Double-layer Zinger Tower burger stacked with crispy fillets, cheese, fries box, and chilled cold drink.',
    descriptionUrdu: 'بڑا زنگر ٹاور برگر، فرائز اور ریگولر ڈرنک۔',
    image: '/images/dish_10.jpg',
    tags: ['Tower Size', 'Bestseller'],
    isPopular: true,
    prepTimeMinutes: 15,
  },

  // 11. Dish 11 - Fast Food Deal 6
  {
    id: 'dish-11',
    name: 'Fast Food Deal 6 (Loaded Pizza Fries + Reg. Drink)',
    nameUrdu: 'ڈیل 6 (1 پیزا فرائز + ریگولر ڈرنک)',
    nameRoman: 'Deal 6 (1 Pizza Fries + Reg Drink)',
    category: 'snacks',
    price: 780,
    description: 'Oven-baked French fries topped with smoky chicken tikka, olives, bell peppers, melted mozzarella & drink.',
    descriptionUrdu: 'چیزی پیزا فرائز اور ٹھنڈی ڈرنک۔',
    image: '/images/dish_11.jpg',
    tags: ['Cheesy Treat'],
    isSpicy: true,
    prepTimeMinutes: 15,
  },

  // 12. Dish 12 - Fast Food Deal 7
  {
    id: 'dish-12',
    name: 'Fast Food Deal 7 (5 Hot Wings Plate + Reg. Drink)',
    nameUrdu: 'ڈیل 7 (5 ہاٹ ونگز + ریگولر ڈرنک)',
    nameRoman: 'Deal 7 (5 Hot Wings + Reg Drink)',
    category: 'snacks',
    price: 430,
    description: '5 Spicy golden deep-fried crispy chicken wings on platter paired with a chilled cold drink cup.',
    descriptionUrdu: '5 عدد اسپائسی ہاٹ ونگز اور ڈرنک۔',
    image: '/images/dish_12.jpg',
    tags: ['Crispy Wings'],
    isSpicy: true,
    prepTimeMinutes: 12,
  },

  // 13. Dish 13 - Fast Food Deal 9
  {
    id: 'dish-13',
    name: 'Fast Food Deal 9 (Zinger + 5 Wings + Fries + Bottle)',
    nameUrdu: 'ڈیل 9 (1 زنگر برگر + 5 ہاٹ ونگز + فرائز + ڈرنک)',
    nameRoman: 'Deal 9 (Zinger + 5 Wings + Fries + Drink)',
    category: 'fast_food_deals',
    price: 950,
    description: 'Ultimate solo feast: 1 Zinger burger, 5 crispy hot wings plate, French fries box, and chilled Coke bottle.',
    descriptionUrdu: '1 زنگر برگر، 5 ہاٹ ونگز، فرائز اور کولڈ ڈرنک۔',
    image: '/images/dish_13.jpg',
    tags: ['Mega Solo', 'Popular'],
    isPopular: true,
    prepTimeMinutes: 16,
  },

  // 14. Dish 14 - Fast Food Deal 10
  {
    id: 'dish-14',
    name: 'Fast Food Deal 10 (2 Zinger Burgers + Fries + 500ml)',
    nameUrdu: 'ڈیل 10 (2 زنگر برگر + فرائز + 500 ملی لیٹر ڈرنک)',
    nameRoman: 'Deal 10 (2 Zingers + Fries + 500ml Drink)',
    category: 'fast_food_deals',
    price: 1000,
    description: 'Duo combo: 2 whole Zinger burgers, golden fries in Café 007 box, and a chilled 500ml Coca-Cola bottle.',
    descriptionUrdu: '2 زنگر برگر، ریگولر فرائز اور 500ml کولڈ ڈرنک۔',
    image: '/images/dish_14.jpg',
    tags: ['Duo Pack'],
    isPopular: true,
    prepTimeMinutes: 15,
  },

  // 15. Dish 15 - Tortilla / Zingeratha Wrap Deal
  {
    id: 'dish-15',
    name: 'Tortilla / Zingeratha Wrap + 500ml Drink',
    nameUrdu: 'ٹارٹیلا / زنگر آٹا ریپ + 500 ملی لیٹر ڈرنک',
    nameRoman: 'Tortilla / Zingeratha Wrap + 500ml Drink',
    category: 'wraps',
    price: 600,
    description: 'New Addition! Grilled tortilla or flaky zingeratha wrap filled with crispy chicken strips & 500ml drink.',
    descriptionUrdu: 'نئی پیشکش: کرسپی چکن ٹارٹیلا ریپ اور 500 ملی لیٹر کولڈ ڈرنک۔',
    image: '/images/dish_15.jpg',
    tags: ['New Addition'],
    prepTimeMinutes: 14,
  },

  // 16. Dish 16 - Family Deal 11
  {
    id: 'dish-16',
    name: 'Family Deal 11 (5 Zinger Burgers + Large Fries + 1.5L)',
    nameUrdu: 'فیملی ڈیل 11 (5 زنگر برگر + لارج فرائز + 1.5 لیٹر ڈرنک)',
    nameRoman: 'Family Deal 11 (5 Zinger + Large Fries + 1.5L)',
    category: 'fast_food_deals',
    price: 2350,
    description: 'Café 007 signature Family Deal! 5 Jumbo Zinger burgers, large French fries box, and 1.5L Coca-Cola bottle.',
    descriptionUrdu: 'مشہور فیملی ڈیل: 5 عدد زنگر برگر، 1 عدد لارج فرائز اور 1.5 لیٹر ڈرنک۔',
    image: '/images/dish_16.jpg',
    tags: ['Top Family Hit', 'Save Big'],
    isPopular: true,
    prepTimeMinutes: 20,
    dealItems: ['5 Zinger Burgers', '1 Large French Fries', '1.5 Liter Cold Drink'],
  },

  // 17. Dish 17 - Fast Food Deal 13
  {
    id: 'dish-17',
    name: 'Fast Food Deal 13 (Club Sandwich + Fries + Drink)',
    nameUrdu: 'ڈیل 13 (1 کلب سینڈوچ + فرائز + ریگولر ڈرنک)',
    nameRoman: 'Deal 13 (Club Sandwich + Fries + Drink)',
    category: 'snacks',
    price: 620,
    description: 'Triple-decker toasted club sandwich with chicken, egg, lettuce, cheese, golden fries & regular drink.',
    descriptionUrdu: 'روایتی کلب سینڈوچ، فرائز اور ڈرنک۔',
    image: '/images/dish_17.jpg',
    tags: ['Club Special'],
    prepTimeMinutes: 14,
  },

  // 18. Dish 18 - Fast Food Deal 14
  {
    id: 'dish-18',
    name: 'Fast Food Deal 14 (5 Paratha Rolls + 1 Liter Drink)',
    nameUrdu: 'ڈیل 14 (5 پراٹھا رول + 1 لیٹر ڈرنک)',
    nameRoman: 'Deal 14 (5 Paratha Rolls + 1L Drink)',
    category: 'wraps',
    price: 1450,
    description: '5 Crispy fried paratha rolls loaded with tender chicken tikka & garlic mayo, plus a 1L cold drink bottle.',
    descriptionUrdu: '5 عدد گرما گرم پراٹھا رول اور 1 لیٹر کولڈ ڈرنک۔',
    image: '/images/dish_18.jpg',
    tags: ['Roll Feast'],
    isPopular: true,
    isSpicy: true,
    prepTimeMinutes: 18,
    dealItems: ['5 Crispy Chicken Paratha Rolls', '1 Liter Cold Drink'],
  },

  // 19. Dish 19 - Fast Food Deal 15
  {
    id: 'dish-19',
    name: 'Fast Food Deal 15 (5 Chicken Shawarmas + 1L Drink)',
    nameUrdu: 'ڈیل 15 (5 شوارما + 1 لیٹر ڈرنک)',
    nameRoman: 'Deal 15 (5 Shawarma + 1L Drink)',
    category: 'wraps',
    price: 1450,
    description: '5 Fresh Arabic pita shawarmas stuffed with shredded chicken, pickles & garlic sauce, plus 1L drink bottle.',
    descriptionUrdu: '5 عدد عربی شوارما اور 1 لیٹر کولڈ ڈرنک۔',
    image: '/images/dish_19.jpg',
    tags: ['Shawarma Pack'],
    prepTimeMinutes: 18,
    dealItems: ['5 Chicken Shawarmas', '1 Liter Cold Drink'],
  },

  // 20. Dish 20 - Fast Food Deal 16
  {
    id: 'dish-20',
    name: 'Fast Food Deal 16 (10 Chicken Nuggets + Reg. Drink)',
    nameUrdu: 'ڈیل 16 (10 چکن نگٹس + ریگولر ڈرنک)',
    nameRoman: 'Deal 16 (10 Nuggets + Reg Drink)',
    category: 'snacks',
    price: 750,
    description: 'Tall golden tower of 10 crispy chicken nuggets served hot with dipping sauce and chilled Coca-Cola.',
    descriptionUrdu: '10 عدد کرسپی چکن نگٹس اور ٹھنڈی ڈرنک۔',
    image: '/images/dish_20.jpg',
    tags: ['Kids Favorite'],
    prepTimeMinutes: 12,
  },

  // 21. Dish 21 - Fast Food Deal 17
  {
    id: 'dish-21',
    name: 'Fast Food Deal 17 (BBQ Patty Tower + Reg. Drink)',
    nameUrdu: 'ڈیل 17 (1 بی بی کیو پیٹی ٹاور برگر + ڈرنک)',
    nameRoman: 'Deal 17 (BBQ Patty Tower + Reg Drink)',
    category: 'burgers',
    price: 480,
    description: 'Double smoky chargrilled BBQ beef-style chicken patties with double melted cheddar, onions & drink cup.',
    descriptionUrdu: 'ڈبل باربی کیو پیٹی ٹاور برگر اور کولڈ ڈرنک۔',
    image: '/images/dish_21.jpg',
    tags: ['Smoky BBQ'],
    isSpicy: true,
    prepTimeMinutes: 14,
  },

  // 22. Dish 22 - Grilled Doner / Pizza Sandwich
  {
    id: 'dish-22',
    name: 'Special Grilled Doner Panini Sandwich',
    nameUrdu: 'اسپیشل گرلڈ ڈونر / پیزا سینڈوچ',
    nameRoman: 'Grilled Doner Sandwich',
    category: 'snacks',
    price: 600,
    description: 'Crispy grill-pressed panini sub loaded with seasoned doner chicken, melted cheese, tomatoes & lettuce.',
    descriptionUrdu: 'گرل کیا ہوا لذیذ ڈونر سینڈوچ چیز اور تازہ سبزیوں کے ساتھ۔',
    image: '/images/dish_22.jpg',
    tags: ['Grilled Sub'],
    prepTimeMinutes: 15,
  },

  // 23. Dish 23 - Fast Food Deal 20
  {
    id: 'dish-23',
    name: 'Fast Food Deal 20 (1 Zinger + 1 Paratha Roll + Drink)',
    nameUrdu: 'ڈیل 20 (1 زنگر برگر + 1 پراٹھا رول + ڈرنک)',
    nameRoman: 'Deal 20 (1 Zinger + 1 Paratha Roll + Drink)',
    category: 'fast_food_deals',
    price: 720,
    description: 'Best of both worlds: 1 crispy Zinger burger paired with 1 stuffed chicken paratha roll and a cold drink.',
    descriptionUrdu: '1 کرسپی زنگر برگر، 1 پراٹھا رول اور ٹھنڈی ڈرنک۔',
    image: '/images/dish_23.jpg',
    tags: ['Combo Favorite'],
    isPopular: true,
    prepTimeMinutes: 15,
  },

  // 24. Dish 24 - Al-Baik Chicken Broast Full Feast
  {
    id: 'dish-24',
    name: 'Al-Baik Broast Full Feast (8 Pcs + 4 Dips + Fries + 1L)',
    nameUrdu: 'ال بیک بروسٹ مکمل ڈیل (8 پیس چکن + 4 ساسز + فرائز + 1L)',
    nameRoman: 'Al-Baik Broast Full Feast (8 Pcs)',
    category: 'albaik',
    price: 2600,
    description: 'Twin platters of authentic pressure-fried crispy broast chicken, waffle & crinkle fries, 4 signature dips & 1L drink.',
    descriptionUrdu: 'ال بیک بروسٹ مکمل ڈیل: 8 پیس کرسپی چکن، وافل فرائز، 4 ڈپس اور 1 لیٹر کولڈ ڈرنک۔',
    image: '/images/dish_24.jpg',
    tags: ['Al-Baik Special', 'Top Seller'],
    isPopular: true,
    prepTimeMinutes: 25,
    dealItems: ['8 Pieces Broast Chicken', '4 Dinner Buns', '4 Signature Dip Sauces', 'Waffle & Crinkle Fries', '1 Liter Cold Drink'],
  },

  // 25. Dish 25 - Creamy White Sauce Pasta Bowl
  {
    id: 'dish-25',
    name: 'Creamy White Sauce Alfredo Pasta Bowl',
    nameUrdu: 'کریمی وائٹ ساس پاستا باؤل',
    nameRoman: 'Creamy White Sauce Pasta',
    category: 'pasta',
    price: 750,
    description: 'Hot-selling creamy penne pasta tossed in rich parmesan béchamel sauce, tender chicken breast & Italian herbs.',
    descriptionUrdu: 'وائٹ ساس میں پکا ہوا ملائم چیزی پاستا چکن اور ہربز کے ساتھ۔',
    image: '/images/dish_25.jpg',
    tags: ['Hot Selling', 'Creamy'],
    isPopular: true,
    prepTimeMinutes: 18,
  },

  // 26. Dish 26 - Shami Egg Burger Hot Seller
  {
    id: 'dish-26',
    name: 'Café 007 Special Shami Egg Burger',
    nameUrdu: 'کیفے 007 اسپیشل شامی انڈا برگر',
    nameRoman: 'Special Shami Egg Burger',
    category: 'burgers',
    price: 200,
    description: 'Best-rate street classic! Warm long bun filled with spiced chicken shami kebab, fried egg, crisp lettuce & chutney.',
    descriptionUrdu: 'سدا بہار ذائقہ: شامی کباب، تلا ہوا انڈا، سلاد اور اسپیشل کیچپ کے ساتھ۔',
    image: '/images/dish_26.jpg',
    tags: ['Hot Selling', 'Rs. 200/-'],
    isSpicy: true,
    prepTimeMinutes: 10,
  },
];
