// This is our "database" of menu items,
// matched to your image files.

/*
========================================
== BAKER'S HUB - ADMIN PANEL & DATABASE ==
========================================

This file acts as the "admin panel" for the client.
The website's menu, specials, and features are all controlled from here.

To update the site, you can just edit this file:

- TO ADD A NEW ITEM:
  1. Copy and paste a new product object {} into the 'products' array.
  2. Fill in all the details and add a photo to the /images folder.

- TO MAKE IT "TODAY'S SPECIAL":
  Add this line to the product:
  isSpecial: true,

- TO FEATURE IT ON THE HOMEPAGE:
  Add this line to the product:
  isFeatured: true,
  
The website will update automatically. No HTML changes are needed.
*/
const products = [
  {
    id: 'cake01',
    name: 'Elegant Celebration Cake',
    category: 'Cakes',
    price: 35.00,
    rating: 5,
    image: 'images/cake.jpg',
    description: 'A stunning, multi-layered cake perfect for any celebration, with delicate frosting.'
  },
  {
    id: 'cake02',
    name: 'Strawberry Shortcake',
    category: 'Cakes',
    price: 28.00,
    rating: 4,
    image: 'images/stowberrycake.jpg',
    description: 'Light sponge cake layered with fresh cream and sweet strawberries.'
  },
  {
    id: 'cake03',
    name: 'Red Velvet Pastry',
    category: 'Cakes',
    price: 6.50,
    rating: 5,
    image: 'images/redvelvetpastry.jpg',
    isSpecial: true, // <-- THIS MARKS IT AS THE SPECIAL
    description: 'Our signature Red Velvet pastry with a rich, velvety crumb and luxurious cream cheese frosting. A true classic!'
  },
  {
    id: 'cake04',
    name: 'Single Vanilla Cupcake',
    category: 'Cakes',
    price: 3.99,
    rating: 4,
    image: 'images/cupcake.jpg',
    description: 'A classic vanilla bean cupcake with light, fluffy buttercream frosting.'
  },
  {
    id: 'cake05',
    name: 'Assorted Cupcakes Box',
    category: 'Cakes',
    price: 18.00,
    rating: 5,
    image: 'images/cupcakes.jpg',
    description: 'A beautiful box of our most popular assorted cupcakes, perfect for gifting.'
  },
  {
    id: 'pastry01',
    name: 'Assorted Glazed Donuts',
    category: 'Pastries',
    price: 3.50,
    rating: 4,
    image: 'images/donuts.jpg',
    description: 'Freshly made daily, our assorted donuts are a sweet, fluffy delight.'
  },
  {
    id: 'pastry02',
    name: 'Rich Fudge Brownie',
    category: 'Pastries',
    price: 4.50,
    rating: 5,
    image: 'images/brownie.jpg',
    description: 'A decadent, fudgy chocolate brownie that melts in your mouth.'
  },
  {
    id: 'pastry03',
    name: 'Signature Pastry',
    category: 'Pastries',
    price: 5.00,
    rating: 4,
    image: 'images/signature-pastry.jpg',
    description: 'A unique, flaky pastry with a surprise filling. Ask us what\'s new today!'
  },
  {
    id: 'cookie01',
    name: 'Classic Chocolate Chip Cookies',
    category: 'Cookies',
    price: 2.99,
    rating: 5,
    image: 'images/cookies.jpg',
    description: 'Packed with rich chocolate chips, these cookies are a timeless favorite.'
  },
  {
    id: 'pancake01',
    name: 'Creamy Dream Pancakes',
    category: 'Breakfast',
    price: 12.99,
    rating: 5,
    image: 'images/creamypancake.jpg',
    description: 'A tall stack of fluffy pancakes topped with a generous serving of fresh cream.'
  },
  {
    id: 'pancake02',
    name: 'Classic Stack Pancakes',
    category: 'Breakfast',
    price: 10.99,
    rating: 4,
    image: 'images/pancake.jpg',
    description: 'A simple, perfect stack of buttermilk pancakes served with butter and syrup.'
  },
];
