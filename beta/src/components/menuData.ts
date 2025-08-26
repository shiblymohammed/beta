export interface MenuItem {
    name: string;
    price: number | string;
    description?: string;
    image: string;
    variants?: {
      name: string;
      price: number;
    }[];
  }
  
  export interface MenuCategory {
    category: string;
    image: string;
    items: MenuItem[];
  }
  
  export interface MenuCollection {
    collection: string;
    description: string;
    icon: string;
    categories: MenuCategory[];
  }
  
  export const menuData: MenuCollection[] = [
    {
      collection: "Opening Chapter",
      description: "Begin your culinary journey with our refreshing soups, vibrant salads, and tantalizing appetizers",
      icon: "🌟",
      categories: [
        {
          category: "SOUP & SALAD",
          image: "/images/categories/soup-salad.jpg",
          items: [
            {
              name: "Creamy Corn & Spinach Soup",
              price: "₹200/240/170",
              description: "Healthy and creamy soup made with fresh spinach, sweet corn and flavored spices.",
              image: "/images/soups/creamy-corn-spinach-soup.jpg",
              variants: [
                { name: "Chicken", price: 200 },
                { name: "Prawn", price: 240 },
                { name: "Veg", price: 170 }
              ]
            },
            {
              name: "Chemmeen Thengapaal Soup",
              price: 240,
              description: "Finished with coconut milk and curry leaves.",
              image: "/images/soups/chemmeen-thengapaal-soup.jpg"
            },
            {
              name: "Lemon Coriander Chicken Soup",
              price: 240,
              description: "Made of tender chicken bites, lime juice and lots of fresh coriander leaves.",
              image: "/images/soups/lemon-coriander-chicken-soup.jpg"
            },
            {
              name: "Tom Kha Gai Soup",
              price: 240,
              description: "Thai chicken soup with galangal, lemongrass & red chilli.",
              image: "/images/soups/tom-kha-gai-soup.jpg"
            },
            {
              name: "Cream of Tomato Soup",
              price: 200,
              description: "Made of tomato puree and fresh cream.",
              image: "/images/soups/cream-tomato-soup.jpg"
            },
            {
              name: "Broccoli Almond Soup",
              price: 200,
              description: "Protein-rich broccoli and almond nourishing soup.",
              image: "/images/soups/broccoli-almond-soup.jpg"
            },
            {
              name: "Hot 'n' Sour",
              price: "₹200/240",
              description: "Popular Chinese soup; tangy flavour and spicy kick.",
              image: "/images/soups/hot-n-sour-soup.jpg",
              variants: [
                { name: "Veg", price: 200 },
                { name: "Chicken", price: 240 }
              ]
            },
            {
              name: "Sweet Corn",
              price: "₹200/240",
              description: "Soup made with sweet corn kernels.",
              image: "/images/soups/sweet-corn-soup.jpg",
              variants: [
                { name: "Veg", price: 200 },
                { name: "Chicken", price: 240 }
              ]
            },
            {
              name: "Kohinoor Special Salad",
              price: 320,
              description: "Strips of beef, chicken, salami and boiled egg on bed of lettuce in ranch dressing.",
              image: "/images/salads/kohinoor-special-salad.jpg"
            },
            {
              name: "Niçoise Salad",
              price: 280,
              description: "Tuna, boiled egg, potato, tomato and beans in herb French dressing.",
              image: "/images/salads/nicoise-salad.jpg"
            },
            {
              name: "Tempered Beansprout & Chickpeas Salad",
              price: 250,
              description: "With grated coconut in lemon dressing.",
              image: "/images/salads/beansprout-chickpeas-salad.jpg"
            },
            {
              name: "Healthy Microgreen & Sprout Salad",
              price: 250,
              description: "In cilantro-ginger-honey dressing.",
              image: "/images/salads/microgreen-sprout-salad.jpg"
            },
            {
              name: "Tossed Salad",
              price: 200,
              description: "Dices of cucumber, tomato, onion, carrot, tomato in vinaigrette dressing.",
              image: "/images/salads/tossed-salad.jpg"
            }
          ]
        },
        {
          category: "APPETIZERS",
          image: "/images/categories/appetizers.jpg",
          items: [
            {
              name: "Prawns Pepper Fry",
              price: 600,
              description: "Prawns tossed with Kerala spices and served.",
              image: "/images/appetizers/prawns-pepper-fry.jpg"
            },
            {
              name: "Kuttanadan Fish Pops",
              price: 580,
              description: "Marinated king fish chunks coated with panko crumbs & corn flakes; deep-fried; served with tomato-onion relish.",
              image: "/images/appetizers/kuttanadan-fish-pops.jpg"
            },
            {
              name: "Talay Krok",
              price: 400,
              description: "Seafood hoppers in tempura batter; sweet chilli sauce.",
              image: "/images/appetizers/talay-krok.jpg"
            },
            {
              name: "Fish Tikka",
              price: 540,
              description: "Marinated, char-grilled king fish; mint relish & salad.",
              image: "/images/appetizers/fish-tikka.jpg"
            },
            {
              name: "Squid Rings Tempura",
              price: 340,
              description: "With sweet chilli sauce.",
              image: "/images/appetizers/squid-rings-tempura.jpg"
            },
            {
              name: "Nigara Chicken",
              price: 350,
              description: "In-house grilled chicken chunks tossed with triple pepper, peanut and chilli-tomato sauce.",
              image: "/images/appetizers/nigara-chicken.jpg"
            },
            {
              name: "Murg Kalimirch Tikka",
              price: 350,
              description: "Boneless chicken marinated with black pepper, char-grilled; mint relish & salad.",
              image: "/images/appetizers/murg-kalimirch-tikka.jpg"
            },
            {
              name: "Beef Coconut Fry",
              price: 380,
              description: "Tender, juicy boneless beef stir-fried with coconut cuts.",
              image: "/images/appetizers/beef-coconut-fry.jpg"
            },
            {
              name: "Golden Fried Baby Corn",
              price: 240,
              description: "Batter-fried baby corn; tomato-garlic sauce.",
              image: "/images/appetizers/golden-fried-baby-corn.jpg"
            },
            {
              name: "Kung Pao Cauliflower",
              price: 240,
              description: "Batter-fried cauliflower tossed with peanut and green pepper.",
              image: "/images/appetizers/kung-pao-cauliflower.jpg"
            },
            {
              name: "Achari Malai Paneer Tikka",
              price: 320,
              description: "Cottage cheese in pickle-yogurt marination; char-grilled; mint relish & salad.",
              image: "/images/appetizers/achari-malai-paneer-tikka.jpg"
            },
            {
              name: "Mushroom 65",
              price: 240,
              description: "Mushrooms in spicy batter, served crispy.",
              image: "/images/appetizers/mushroom-65.jpg"
            },
            {
              name: "Paneer Finger",
              price: 320,
              description: "Served crispy.",
              image: "/images/appetizers/paneer-finger.jpg"
            },
            {
              name: "Crumb Fried Babycorn",
              price: 240,
              description: "Crispy and spicy babycorn.",
              image: "/images/appetizers/crumb-fried-babycorn.jpg"
            }
          ]
        }
      ]
    },
    {
      collection: "The Heart of The Meal",
      description: "Experience the soul of our cuisine with authentic main courses from various culinary traditions",
      icon: "🍽️",
      categories: [
        {
          category: "MAIN COURSE — From the Land of Kathakali",
          image: "/images/categories/kerala-main-course.jpg",
          items: [
            {
              name: "Koonthal Perattu",
              price: 340,
              description: "Squid stir-fried with shallots.",
              image: "/images/main-course/koonthal-perattu.jpg"
            },
            {
              name: "Meen Pollichathu",
              price: 580,
              description: "King fish cooked with herbs & spices, wrapped in banana leaves and grilled.",
              image: "/images/main-course/meen-pollichathu.jpg"
            },
            {
              name: "Chef's Special Fish Curry",
              price: 600,
              description: "Chunks of king fish in Amritha special gravy.",
              image: "/images/main-course/chef-special-fish-curry.jpg"
            },
            {
              name: "Kozhi Koonu Varutharachathu",
              price: 380,
              description: "Chicken and mushroom cooked in roasted & ground gravy.",
              image: "/images/main-course/kozhi-koonu-varutharachathu.jpg"
            },
            {
              name: "Kerala Kozhi Roast",
              price: 400,
              description: "Pot-roasted tender chicken finished with country spices & coconut milk.",
              image: "/images/main-course/kerala-kozhi-roast.jpg"
            },
            {
              name: "Murgh Kali Mirchi",
              price: 380,
              description: "Boneless chicken chunks in black pepper masala, cooked tender.",
              image: "/images/main-course/murgh-kali-mirchi.jpg"
            },
            {
              name: "Beef Roast",
              price: 380,
              description: "Pot-roasted tender loin beef with spices & herbs.",
              image: "/images/main-course/beef-roast.jpg"
            },
            {
              name: "Malabari Mutton Curry",
              price: 550,
              description: "Traditional North Kerala preparation.",
              image: "/images/main-course/malabari-mutton-curry.jpg"
            },
            {
              name: "South Indian Veg. Thali (Lunch only)",
              price: 250,
              description: "Kerala vegetarian specials with steamed rice and chapatti.",
              image: "/images/main-course/south-indian-veg-thali.jpg"
            },
            {
              name: "South Indian Fish Thali (Lunch only)",
              price: 380,
              description: "Fresh fish curry & fish fry with steamed rice and chapatti.",
              image: "/images/main-course/south-indian-fish-thali.jpg"
            },
            {
              name: "South Indian Mix Meat Thali (Lunch only)",
              price: 500,
              description: "Day special of chicken fry & curry, beef, mutton with steamed rice and chapatti.",
              image: "/images/main-course/south-indian-mix-meat-thali.jpg"
            }
          ]
        },
        {
          category: "NOSTALGIA — Amritha Heritage Dishes",
          image: "/images/categories/heritage-dishes.jpg",
          items: [
            {
              name: "Fish Malabari",
              price: 600,
              description: "Sea-fresh seer fish tempered and simmered in coconut milk gravy.",
              image: "/images/heritage/fish-malabari.jpg"
            },
            {
              name: "Garlic Fish",
              price: 600,
              description: "Crispy fried fish in garlic-flavoured tomato-chilli sauce.",
              image: "/images/heritage/garlic-fish.jpg"
            },
            {
              name: "Amritha Spl. Roast Chicken (Half)",
              price: 450,
              description: "Old-hotel Amritha-style roast; served with potato lyonnaise and glazed vegetables.",
              image: "/images/heritage/amritha-spl-roast-chicken.jpg"
            },
            {
              name: "Amritha Chilli Chicken",
              price: 380,
              description: "Chef's special home preparation.",
              image: "/images/heritage/amritha-chilli-chicken.jpg"
            },
            {
              name: "Kadai Murgh",
              price: 400,
              description: "Spring chicken pieces cooked North-Indian style.",
              image: "/images/heritage/kadai-murgh.jpg"
            },
            {
              name: "Chicken with Diced Vegetables",
              price: 380,
              description: "Chicken with broccoli, carrot, beans.",
              image: "/images/heritage/chicken-with-diced-vegetables.jpg"
            },
            {
              name: "Chicken Steak Sizzler",
              price: 380,
              description: "With potato wedges, glazed veggies.",
              image: "/images/heritage/chicken-steak-sizzler.jpg"
            },
            {
              name: "Beef Steak Sizzler",
              price: 450,
              description: "With potato wedges & glazed veggies.",
              image: "/images/heritage/beef-steak-sizzler.jpg"
            },
            {
              name: "Beef with Onion",
              price: 420,
              description: "Tenderloin cuts stir-fried; semi-gravy.",
              image: "/images/heritage/beef-with-onion.jpg"
            },
            {
              name: "Beef with Capsicum",
              price: 420,
              description: "Tenderloin cuts stir-fried with green pepper; semi-gravy.",
              image: "/images/heritage/beef-with-capsicum.jpg"
            },
            {
              name: "Beef with Red Chilli",
              price: 420,
              description: "Tenderloin cuts stir-fried with Thai red chilli; semi-gravy.",
              image: "/images/heritage/beef-with-red-chilli.jpg"
            },
            {
              name: "Choice of Fried Rice",
              price: "₹280/320/360/390",
              description: "Stir-fried basmati rice, soya-flavoured.",
              image: "/images/heritage/choice-of-fried-rice.jpg",
              variants: [
                { name: "Veg", price: 280 },
                { name: "Egg", price: 320 },
                { name: "Chicken", price: 360 },
                { name: "Mix Meat", price: 390 }
              ]
            },
            {
              name: "Choice of Noodles",
              price: "₹280/320/360/400",
              description: "Stir-fried noodles, soya-flavoured.",
              image: "/images/heritage/choice-of-noodles.jpg",
              variants: [
                { name: "Veg", price: 280 },
                { name: "Egg", price: 320 },
                { name: "Chicken", price: 360 },
                { name: "Mix Meat", price: 400 }
              ]
            }
          ]
        },
        {
          category: "ORIENTAL (Authentic Oriental Cuisine)",
          image: "/images/categories/oriental-cuisine.jpg",
          items: [
            {
              name: "Fish in Chilli Oyster / Chilli Garlic / Chilli Soya",
              price: 600,
              description: "Amritha special Chinese delicacy.",
              image: "/images/oriental/fish-chilli-oyster.jpg"
            },
            {
              name: "Chicken in Red Curry / Green Curry",
              price: 380,
              description: "Boneless chicken dice in Thai red or green curry with coconut milk.",
              image: "/images/oriental/chicken-red-green-curry.jpg"
            },
            {
              name: "Nasi Goreng",
              price: 350,
              description: "Indonesian fried rice with chicken, egg and prawn.",
              image: "/images/oriental/nasi-goreng.jpg"
            },
            {
              name: "Bami Goreng",
              price: 370,
              description: "Noodles with chicken, egg and prawns.",
              image: "/images/oriental/bami-goreng.jpg"
            },
            {
              name: "Pad Thai",
              price: 390,
              description: "Flat noodles with prawns tossed in Pad Thai sauce, flavoured with basil.",
              image: "/images/oriental/pad-thai.jpg"
            },
            {
              name: "Mix Veg with Nuts",
              price: 260,
              description: "Hong Kong street food of the \"City of Darkness.\"",
              image: "/images/oriental/mix-veg-with-nuts.jpg"
            },
            {
              name: "Cauliflower Manchurian",
              price: 240,
              description: "Amritha's Chinese delicacy.",
              image: "/images/oriental/cauliflower-manchurian.jpg"
            },
            {
              name: "Chicken (Schezwan/Hunan/Manchurian)",
              price: 380,
              description: "Amritha's Chinese attraction.",
              image: "/images/oriental/chicken-schezwan-hunan-manchurian.jpg"
            }
          ]
        },
        {
          category: "CONTINENTAL",
          image: "/images/categories/continental.jpg",
          items: [
            {
              name: "Fisherman's Catch",
              price: 450,
              description: "Chunks of fish with prawns & squid in creamy tomato sauce; served with parsley rice.",
              image: "/images/continental/fishermans-catch.jpg"
            },
            {
              name: "Fish n' Chips",
              price: 600,
              description: "Panko-crumb fried fish with French fries & tartare sauce.",
              image: "/images/continental/fish-n-chips.jpg"
            },
            {
              name: "Grilled Mackerel Roll with Kariveppila Rice",
              price: 380,
              description: "Amritha Heritage signature dish: marinated & grilled mackerel; curry-leaf rice.",
              image: "/images/continental/grilled-mackerel-roll.jpg"
            },
            {
              name: "Cheesy Crunchy Fried Chicken",
              price: 380,
              description: "Cheese-stuffed chicken breast, panko-crumb fried; potato salad & rossa tartare.",
              image: "/images/continental/cheesy-crunchy-fried-chicken.jpg"
            },
            {
              name: "Beef Steak in Mushroom Sauce / Steak au Poivre",
              price: 400,
              description: "With potato wedges & glazed veggies.",
              image: "/images/continental/beef-steak-mushroom-sauce.jpg"
            }
          ]
        },
        {
          category: "INDIAN & TANDOOR",
          image: "/images/categories/indian-tandoor.jpg",
          items: [
            {
              name: "Tandoori Murg (Half)",
              price: 450,
              description: "Char-grilled chicken served with naan or roti, dal and mint relish.",
              image: "/images/indian-tandoor/tandoori-murg.jpg"
            },
            {
              name: "Murg Makhani",
              price: 380,
              description: "Tandoori-roasted spring chicken in tomato-cashew gravy.",
              image: "/images/indian-tandoor/murg-makhani.jpg"
            },
            {
              name: "Murg Mutter Masala",
              price: 380,
              description: "Combination of green peas and chicken.",
              image: "/images/indian-tandoor/murg-mutter-masala.jpg"
            },
            {
              name: "Kadai Mutton",
              price: 550,
              description: "North-Indian delicacy.",
              image: "/images/indian-tandoor/kadai-mutton.jpg"
            },
            {
              name: "Mutton Saagwala",
              price: 550,
              description: "Pureed spinach with tender chunks of meat.",
              image: "/images/indian-tandoor/mutton-saagwala.jpg"
            }
          ]
        },
        {
          category: "PASTA",
          image: "/images/categories/pasta.jpg",
          items: [
            {
              name: "Choice of Pasta (Penne/Fusilli/Farfalle)",
              price: "₹380/₹320",
              image: "/images/pasta/choice-of-pasta.jpg",
              variants: [
                { name: "Regular", price: 320 },
                { name: "Premium", price: 380 }
              ]
            },
            {
              name: "Alfredo",
              price: 380,
              description: "Cream sauce with mushroom.",
              image: "/images/pasta/alfredo.jpg",
              variants: [
                { name: "Chicken", price: 380 },
                { name: "Veg", price: 380 }
              ]
            },
            {
              name: "Marinara",
              price: 380,
              description: "Fresh red-chilli tomato with seafood.",
              image: "/images/pasta/marinara.jpg"
            },
            {
              name: "Chicken in Creamy Tomato Sauce",
              price: 380,
              description: "Pan-fried chicken in creamy tomato sauce.",
              image: "/images/pasta/chicken-creamy-tomato-sauce.jpg"
            }
          ]
        },
        {
          category: "VEGETARIAN DELICACIES",
          image: "/images/categories/vegetarian-delicacies.jpg",
          items: [
            {
              name: "Aloo Mutter / Gobi / Tamatar",
              price: 280,
              description: "Potato & cauliflower in creamy gravy.",
              image: "/images/vegetarian/aloo-mutter-gobi-tamatar.jpg"
            },
            {
              name: "Vegetable Korma",
              price: 260,
              description: "Mix vegetables in coconut gravy.",
              image: "/images/vegetarian/vegetable-korma.jpg"
            },
            {
              name: "Palcutty Ulli Thiyal",
              price: 320,
              description: "Paneer and shallots in coconut-roast gravy.",
              image: "/images/vegetarian/palcutty-ulli-thiyal.jpg"
            },
            {
              name: "Navarathan Kurma",
              price: 320,
              description: "Seasonal vegetables in rich creamy gravy, garnished with fruits & nuts.",
              image: "/images/vegetarian/navarathan-kurma.jpg"
            },
            {
              name: "Mushroom Masala / Mushroom Pepper Fry",
              price: 280,
              description: "Mushroom delicacy.",
              image: "/images/vegetarian/mushroom-masala-pepper-fry.jpg"
            },
            {
              name: "Veg Chettinadu",
              price: 280,
              description: "Seasoned vegetables in roasted Chettinadu gravy.",
              image: "/images/vegetarian/veg-chettinadu.jpg"
            },
            {
              name: "Palak Paneer",
              price: 320,
              description: "Paneer cooked with pureed spinach.",
              image: "/images/vegetarian/palak-paneer.jpg"
            },
            {
              name: "Paneer Makhani / Jalfraizi",
              price: 320,
              description: "Stir-fried cottage cheese, North-Indian style preparation.",
              image: "/images/vegetarian/paneer-makhani-jalfraizi.jpg"
            }
          ]
        },
        {
          category: "REGIONAL CUISINE",
          image: "/images/categories/regional-cuisine.jpg",
          items: [
            {
              name: "Biryani",
              price: "₹360/420/300",
              description: "Persian-inspired full meal with flavoured rice and meat.",
              image: "/images/regional/biryani.jpg",
              variants: [
                { name: "Chicken", price: 360 },
                { name: "Mutton", price: 420 },
                { name: "Veg", price: 300 }
              ]
            },
            {
              name: "Kohinoor Special Prawns Biryani",
              price: 650,
              description: "Amritha's homely delicacy.",
              image: "/images/regional/kohinoor-special-prawns-biryani.jpg"
            },
            {
              name: "Mutton Masala",
              price: 550,
              description: "Made with blend of spices.",
              image: "/images/regional/mutton-masala.jpg"
            },
            {
              name: "Mutton Chettinadu",
              price: 550,
              description: "Tender chunks of meat in Chettinadu spices.",
              image: "/images/regional/mutton-chettinadu.jpg"
            },
            {
              name: "Mutton Mappas",
              price: 550,
              description: "Cooked in coconut milk.",
              image: "/images/regional/mutton-mappas.jpg"
            },
            {
              name: "Duck Mappas",
              price: 600,
              description: "Duck cooked in coconut milk with spices & herbs.",
              image: "/images/regional/duck-mappas.jpg"
            },
            {
              name: "Duck Pepper Masala",
              price: 600,
              description: "Spring duck cooked in herbs & spices.",
              image: "/images/regional/duck-pepper-masala.jpg"
            },
            {
              name: "Fish Moilee",
              price: 600,
              description: "Mildly spiced fish stew made with coconut milk.",
              image: "/images/regional/fish-moilee.jpg"
            },
            {
              name: "Fish Nirvana",
              price: 600,
              description: "Fish in ginger-coconut-milk sauce.",
              image: "/images/regional/fish-nirvana.jpg"
            },
            {
              name: "Beef Pepper Fry",
              price: 380,
              description: "With crushed herbs and spices.",
              image: "/images/regional/beef-pepper-fry.jpg"
            },
            {
              name: "Beef Dry Fry",
              price: 380,
              description: "In spicy aromatic masala.",
              image: "/images/regional/beef-dry-fry.jpg"
            },
            {
              name: "Egg Roast / Egg Masala / Scrambled Egg",
              price: 280,
              description: "Egg with spices and herbs.",
              image: "/images/regional/egg-roast-masala-scrambled.jpg"
            },
            {
              name: "Chilly Egg / Egg Schezwan / Egg Manchurian",
              price: 280,
              description: "Chef-special egg in Chinese style.",
              image: "/images/regional/chilly-egg-schezwan-manchurian.jpg"
            }
          ]
        }
      ]
    },
    {
      collection: "Perfect Pairings",
      description: "Complete your meal with our selection of aromatic rice dishes and fresh-baked breads",
      icon: "🍞",
      categories: [
        {
          category: "RICE & BREAD",
          image: "/images/categories/rice-bread.jpg",
          items: [
            {
              name: "Steamed Rice",
              price: 160,
              image: "/images/rice-bread/steamed-rice.jpg"
            },
            {
              name: "Pulao",
              price: "₹280/300/300",
              image: "/images/rice-bread/pulao.jpg",
              variants: [
                { name: "Veg", price: 280 },
                { name: "Kashmiri", price: 300 },
                { name: "Paneer", price: 300 }
              ]
            },
            {
              name: "Jeera Rice",
              price: 280,
              image: "/images/rice-bread/jeera-rice.jpg"
            },
            {
              name: "Kerala Parotta / Nool Parotta (1 no.)",
              price: 40,
              image: "/images/rice-bread/kerala-parotta-nool-parotta.jpg"
            },
            {
              name: "Chapathi / Phulka",
              price: 30,
              image: "/images/rice-bread/chapathi-phulka.jpg"
            },
            {
              name: "Wheat Coin Parotta",
              price: 40,
              image: "/images/rice-bread/wheat-coin-parotta.jpg"
            },
            {
              name: "Appam / Egg Appam",
              price: "₹40/50",
              image: "/images/rice-bread/appam-egg-appam.jpg",
              variants: [
                { name: "Regular", price: 40 },
                { name: "Egg", price: 50 }
              ]
            },
            {
              name: "Naan / Butter Naan",
              price: "₹40/50",
              image: "/images/rice-bread/naan-butter-naan.jpg",
              variants: [
                { name: "Regular", price: 40 },
                { name: "Butter", price: 50 }
              ]
            },
            {
              name: "Kulcha",
              price: 50,
              image: "/images/rice-bread/kulcha.jpg"
            },
            {
              name: "Roti / Butter Roti",
              price: "₹40/50",
              image: "/images/rice-bread/roti-butter-roti.jpg",
              variants: [
                { name: "Regular", price: 40 },
                { name: "Butter", price: 50 }
              ]
            },
            {
              name: "Naan — Peshwari / Kashmiri / Rogini",
              price: 60,
              image: "/images/rice-bread/naan-peshwari-kashmiri-rogini.jpg"
            }
          ]
        },
        {
          category: "COMBO MEALS — Amritha Heritage Special",
          image: "/images/categories/combo-meals.jpg",
          items: [
            {
              name: "Chilli Oyster Fish",
              price: 750,
              description: "With choice of veg. noodle or veg. fried rice & one scoop of ice cream.",
              image: "/images/combo-meals/chilli-oyster-fish-combo.jpg"
            },
            {
              name: "Schezwan Chicken",
              price: 650,
              description: "With choice of veg. noodle or veg. fried rice & one scoop of vanilla ice cream.",
              image: "/images/combo-meals/schezwan-chicken-combo.jpg"
            },
            {
              name: "Murg Makhani",
              price: 650,
              description: "With choice of veg. pulao or one butter naan with gulab jamun.",
              image: "/images/combo-meals/murg-makhani-combo.jpg"
            },
            {
              name: "Chicken Varutharachathu",
              price: 650,
              description: "Choice of 2 Kerala parotta or 3 chapathi with gulab jamun.",
              image: "/images/combo-meals/chicken-varutharachathu-combo.jpg"
            },
            {
              name: "Paneer Jalfraizi",
              price: 450,
              description: "With choice of veg. pulao or one butter naan and phulka with gulab jamun.",
              image: "/images/combo-meals/paneer-jalfraizi-combo.jpg"
            },
            {
              name: "Vegetable with Nuts",
              price: 450,
              description: "With choice of veg. noodle or veg. fried rice & one scoop of ice cream.",
              image: "/images/combo-meals/vegetable-with-nuts-combo.jpg"
            },
            {
              name: "Pal Cutty Ulli Thiyal",
              price: 450,
              description: "Choice of 3 appam or 2 chapathi with gulab jamun.",
              image: "/images/combo-meals/pal-cutty-ulli-thiyal-combo.jpg"
            }
          ]
        }
      ]
    },
    {
      collection: "Sweet Ending",
      description: "End your dining experience on a delightful note with our exquisite desserts and refreshing beverages",
      icon: "🍰",
      categories: [
        {
          category: "DESSERTS",
          image: "/images/categories/desserts.jpg",
          items: [
            {
              name: "Vancho Pudding",
              price: 300,
              description: "Duets of white and dark chocolate.",
              image: "/images/desserts/vancho-pudding.jpg"
            },
            {
              name: "Caramel Bread Butter Pudding",
              price: 320,
              image: "/images/desserts/caramel-bread-butter-pudding.jpg"
            },
            {
              name: "Coconut & Date Pie",
              price: 320,
              image: "/images/desserts/coconut-date-pie.jpg"
            },
            {
              name: "Cut Fruits",
              price: 200,
              image: "/images/desserts/cut-fruits.jpg"
            },
            {
              name: "Payasam of the Day",
              price: 180,
              image: "/images/desserts/payasam-of-the-day.jpg"
            },
            {
              name: "Gulab Jamun",
              price: 180,
              image: "/images/desserts/gulab-jamun.jpg"
            },
            {
              name: "Choice of Ice Cream",
              price: 180,
              image: "/images/desserts/choice-of-ice-cream.jpg"
            },
            {
              name: "Fresh Fruit Salad / with Ice Cream",
              price: 240,
              image: "/images/desserts/fresh-fruit-salad.jpg"
            },
            {
              name: "Tender Coconut Soufflé",
              price: 320,
              image: "/images/desserts/tender-coconut-souffle.jpg"
            },
            {
              name: "Crème Caramel",
              price: 320,
              image: "/images/desserts/creme-caramel.jpg"
            }
          ]
        },
        {
          category: "BEVERAGES",
          image: "/images/categories/beverages.jpg",
          items: [
            {
              name: "Tea / Coffee",
              price: 80,
              image: "/images/beverages/tea-coffee.jpg"
            },
            {
              name: "Milkshakes with Ice Cream (Chocolate/Mango/Strawberry)",
              price: 180,
              image: "/images/beverages/milkshakes-with-ice-cream.jpg"
            },
            {
              name: "Fresh Lime",
              price: "₹80/₹120",
              image: "/images/beverages/fresh-lime.jpg",
              variants: [
                { name: "Juice", price: 80 },
                { name: "Soda", price: 120 }
              ]
            },
            {
              name: "Fresh Fruit Juice",
              price: 200,
              image: "/images/beverages/fresh-fruit-juice.jpg"
            }
          ]
        }
      ]
    }
  ];
  
  // Helper functions for working with the enhanced menu data
  export const getCollectionsByName = (collectionName: string): MenuCollection | undefined => {
    return menuData.find(collection => collection.collection === collectionName);
  };
  
  export const getAllCollections = (): string[] => {
    return menuData.map(collection => collection.collection);
  };
  
  export const getMenuItemsByCategory = (category: string): MenuItem[] => {
    for (const collection of menuData) {
      const categoryData = collection.categories.find(cat => cat.category === category);
      if (categoryData) {
        return categoryData.items;
      }
    }
    return [];
  };
  
  export const getAllCategories = (): string[] => {
    const categories: string[] = [];
    menuData.forEach(collection => {
      collection.categories.forEach(category => {
        categories.push(category.category);
      });
    });
    return categories;
  };
  
  export const searchMenuItems = (searchTerm: string): MenuItem[] => {
    const results: MenuItem[] = [];
    
    menuData.forEach(collection => {
      collection.categories.forEach(category => {
        category.items.forEach(item => {
          if (
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
          ) {
            results.push(item);
          }
        });
      });
    });
    
    return results;
  };
  
  export const getItemsByPriceRange = (minPrice: number, maxPrice: number): MenuItem[] => {
    const results: MenuItem[] = [];
    
    menuData.forEach(collection => {
      collection.categories.forEach(category => {
        category.items.forEach(item => {
          if (typeof item.price === 'number' && item.price >= minPrice && item.price <= maxPrice) {
            results.push(item);
          } else if (item.variants) {
            const hasItemInRange = item.variants.some(variant => 
              variant.price >= minPrice && variant.price <= maxPrice
            );
            if (hasItemInRange) {
              results.push(item);
            }
          }
        });
      });
    });
    
    return results;
  };
  
  export const getItemsByCollection = (collectionName: string): MenuItem[] => {
    const results: MenuItem[] = [];
    const collection = menuData.find(c => c.collection === collectionName);
    
    if (collection) {
      collection.categories.forEach(category => {
        results.push(...category.items);
      });
    }
    
    return results;
  };
  
  export const getCategoriesByCollection = (collectionName: string): MenuCategory[] => {
    const collection = menuData.find(c => c.collection === collectionName);
    return collection ? collection.categories : [];
  };
  
  export const getRandomFeaturedItems = (count: number = 6): MenuItem[] => {
    const allItems: MenuItem[] = [];
    
    menuData.forEach(collection => {
      collection.categories.forEach(category => {
        allItems.push(...category.items);
      });
    });
    
    // Shuffle array and return specified count
    const shuffled = allItems.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  export const getVegetarianItems = (): MenuItem[] => {
    const vegetarianKeywords = ['veg', 'paneer', 'mushroom', 'vegetable', 'aloo', 'gobi', 'palak'];
    const results: MenuItem[] = [];
    
    menuData.forEach(collection => {
      collection.categories.forEach(category => {
        category.items.forEach(item => {
          if (vegetarianKeywords.some(keyword => 
            item.name.toLowerCase().includes(keyword) || 
            (item.description && item.description.toLowerCase().includes(keyword))
          )) {
            results.push(item);
          }
        });
      });
    });
    
    return results;
  };
  
  // Statistics functions
  export const getMenuStatistics = () => {
    let totalItems = 0;
    let totalCategories = 0;
    let itemsWithVariants = 0;
    
    menuData.forEach(collection => {
      totalCategories += collection.categories.length;
      collection.categories.forEach(category => {
        totalItems += category.items.length;
        itemsWithVariants += category.items.filter(item => item.variants).length;
      });
    });
    
    return {
      totalCollections: menuData.length,
      totalCategories,
      totalItems,
      itemsWithVariants,
      averageItemsPerCategory: Math.round(totalItems / totalCategories)
    };
  };