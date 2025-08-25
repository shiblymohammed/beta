// export interface MenuItem {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     category: string;
// }

// export const fullMenuData: MenuItem[] = [
//     // --- SOUP & SALAD ---
//     { id: 1, name: "Creamy Corn & Spinach Soup (Chicken)", description: "Healthy and creamy soup made with fresh spinach, sweet corn and flavored spices.", price: 240, category: "Soup & Salad" },
//     { id: 2, name: "Creamy Corn & Spinach Soup (Prawn)", description: "Healthy and creamy soup made with fresh spinach, sweet corn and flavored spices.", price: 240, category: "Soup & Salad" },
//     { id: 3, name: "Creamy Corn & Spinach Soup (Veg)", description: "Healthy and creamy soup made with fresh spinach, sweet corn and flavored spices.", price: 170, category: "Soup & Salad" },
//     { id: 4, name: "Chemmeen Thengapaal Soup", description: "Finished with coconut milk and curry leaves.", price: 240, category: "Soup & Salad" },
//     { id: 5, name: "Lemon Coriander Chicken Soup", description: "Made of tender chicken bites, lime juice and lots of fresh coriander leaves.", price: 240, category: "Soup & Salad" },
//     { id: 6, name: "Tom Kha Gai Soup", description: "Thai chicken soup with galangal, lemongrass & red chilli.", price: 240, category: "Soup & Salad" },
//     { id: 7, name: "Cream of Tomato Soup", description: "Made of tomato puree and fresh cream.", price: 200, category: "Soup & Salad" },
//     { id: 8, name: "Broccoli Almond Soup", description: "Protein-rich broccoli and almond nourishing soup.", price: 200, category: "Soup & Salad" },
//     { id: 9, name: "Hot 'n' Sour (Veg)", description: "Popular Chinese soup; tangy flavour and spicy kick.", price: 200, category: "Soup & Salad" },
//     { id: 10, name: "Hot 'n' Sour (Chicken)", description: "Popular Chinese soup; tangy flavour and spicy kick.", price: 240, category: "Soup & Salad" },
//     { id: 11, name: "Sweet Corn (Veg)", description: "Soup made with sweet corn kernels.", price: 200, category: "Soup & Salad" },
//     { id: 12, name: "Sweet Corn (Chicken)", description: "Soup made with sweet corn kernels.", price: 240, category: "Soup & Salad" },
//     { id: 13, name: "Kohinoor Special Salad", description: "Strips of beef, chicken, salami and boiled egg on bed of lettuce in ranch dressing.", price: 320, category: "Soup & Salad" },
//     { id: 14, name: "Niçoise Salad", description: "Tuna, boiled egg, potato, tomato and beans in herb French dressing.", price: 280, category: "Soup & Salad" },
//     { id: 15, name: "Tempered Beansprout & Chickpeas Salad", description: "With grated coconut in lemon dressing.", price: 250, category: "Soup & Salad" },
//     { id: 16, name: "Healthy Microgreen & Sprout Salad", description: "In cilantro-ginger-honey dressing.", price: 250, category: "Soup & Salad" },
//     { id: 17, name: "Tossed Salad", description: "Dices of cucumber, tomato, onion, carrot, tomato in vinaigrette dressing.", price: 200, category: "Soup & Salad" },

//     // --- APPETIZERS ---
//     { id: 18, name: "Prawns Pepper Fry", description: "Prawns tossed with Kerala spices and served.", price: 600, category: "Appetizers" },
//     { id: 19, name: "Kuttanadan Fish Pops", description: "Marinated king fish chunks coated with panko crumbs & corn flakes; deep-fried; served with tomato-onion relish.", price: 580, category: "Appetizers" },
//     { id: 20, name: "Talay Krok", description: "Seafood hoppers in tempura batter; sweet chilli sauce.", price: 400, category: "Appetizers" },
//     { id: 21, name: "Fish Tikka", description: "Marinated, char-grilled king fish; mint relish & salad.", price: 540, category: "Appetizers" },
//     { id: 22, name: "Squid Rings Tempura", description: "With sweet chilli sauce.", price: 340, category: "Appetizers" },
//     { id: 23, name: "Nigara Chicken", description: "In-house grilled chicken chunks tossed with triple pepper, peanut and chilli-tomato sauce.", price: 350, category: "Appetizers" },
//     { id: 24, name: "Murg Kalimirch Tikka", description: "Boneless chicken marinated with black pepper, char-grilled; mint relish & salad.", price: 350, category: "Appetizers" },
//     { id: 25, name: "Beef Coconut Fry", description: "Tender, juicy boneless beef stir-fried with coconut cuts.", price: 380, category: "Appetizers" },
//     { id: 26, name: "Golden Fried Baby Corn", description: "Batter-fried baby corn; tomato-garlic sauce.", price: 240, category: "Appetizers" },
//     { id: 27, name: "Kung Pao Cauliflower", description: "Batter-fried cauliflower tossed with peanut and green pepper.", price: 240, category: "Appetizers" },
//     { id: 28, name: "Achari Malai Paneer Tikka", description: "Cottage cheese in pickle-yogurt marination; char-grilled; mint relish & salad.", price: 320, category: "Appetizers" },
//     { id: 29, name: "Mushroom 65", description: "Mushrooms in spicy batter, served crispy.", price: 240, category: "Appetizers" },
//     { id: 30, name: "Paneer Finger", description: "Served crispy.", price: 320, category: "Appetizers" },
//     { id: 31, name: "Crumb Fried Babycorn", description: "Crispy and spicy babycorn.", price: 240, category: "Appetizers" },

//     // --- MAIN COURSE — From the Land of Kathakali ---
//     { id: 32, name: "Koonthal Perattu", description: "Squid stir-fried with shallots.", price: 340, category: "Main Course - Kathakali" },
//     { id: 33, name: "Meen Pollichathu", description: "King fish cooked with herbs & spices, wrapped in banana leaves and grilled.", price: 580, category: "Main Course - Kathakali" },
//     { id: 34, name: "Chef's Special Fish Curry", description: "Chunks of king fish in Amritha special gravy.", price: 600, category: "Main Course - Kathakali" },
//     { id: 35, name: "Kozhi Koonu Varutharachathu", description: "Chicken and mushroom cooked in roasted & ground gravy.", price: 380, category: "Main Course - Kathakali" },
//     { id: 36, name: "Kerala Kozhi Roast", description: "Pot-roasted tender chicken finished with country spices & coconut milk.", price: 400, category: "Main Course - Kathakali" },
//     { id: 37, name: "Murgh Kali Mirchi", description: "Boneless chicken chunks in black pepper masala, cooked tender.", price: 380, category: "Main Course - Kathakali" },
//     { id: 38, name: "Beef Roast", description: "Pot-roasted tender loin beef with spices & herbs.", price: 380, category: "Main Course - Kathakali" },
//     { id: 39, name: "Malabari Mutton Curry", description: "Traditional North Kerala preparation.", price: 550, category: "Main Course - Kathakali" },
//     { id: 40, name: "South Indian Veg. Thali (Lunch only)", description: "Kerala vegetarian specials with steamed rice and chapatti.", price: 250, category: "Main Course - Kathakali" },
//     { id: 41, name: "South Indian Fish Thali (Lunch only)", description: "Fresh fish curry & fish fry with steamed rice and chapatti.", price: 380, category: "Main Course - Kathakali" },
//     { id: 42, name: "South Indian Mix Meat Thali (Lunch only)", description: "Day special of chicken fry & curry, beef, mutton with steamed rice and chapatti.", price: 500, category: "Main Course - Kathakali" },

//     // --- NOSTALGIA — Amritha Heritage Dishes ---
//     { id: 43, name: "Fish Malabari", description: "Sea-fresh seer fish tempered and simmered in coconut milk gravy.", price: 600, category: "Nostalgia - Heritage" },
//     { id: 44, name: "Garlic Fish", description: "Crispy fried fish in garlic-flavoured tomato-chilli sauce.", price: 600, category: "Nostalgia - Heritage" },
//     { id: 45, name: "Amritha Spl. Roast Chicken (Half)", description: "Old-hotel Amritha-style roast; served with potato lyonnaise and glazed vegetables.", price: 450, category: "Nostalgia - Heritage" },
//     { id: 46, name: "Amritha Chilli Chicken", description: "Chef's special home preparation.", price: 380, category: "Nostalgia - Heritage" },
//     { id: 47, name: "Kadai Murgh", description: "Spring chicken pieces cooked North-Indian style.", price: 400, category: "Nostalgia - Heritage" },
//     { id: 48, name: "Chicken with Diced Vegetables", description: "Chicken with broccoli, carrot, beans.", price: 380, category: "Nostalgia - Heritage" },
//     { id: 49, name: "Chicken Steak Sizzler", description: "With potato wedges, glazed veggies.", price: 380, category: "Nostalgia - Heritage" },
//     { id: 50, name: "Beef Steak Sizzler", description: "With potato wedges & glazed veggies.", price: 450, category: "Nostalgia - Heritage" },
//     { id: 51, name: "Beef with Onion", description: "Tenderloin cuts stir-fried; semi-gravy.", price: 420, category: "Nostalgia - Heritage" },
//     { id: 52, name: "Beef with Capsicum", description: "Tenderloin cuts stir-fried with green pepper; semi-gravy.", price: 420, category: "Nostalgia - Heritage" },
//     { id: 53, name: "Beef with Red Chilli", description: "Tenderloin cuts stir-fried with Thai red chilli; semi-gravy.", price: 420, category: "Nostalgia - Heritage" },
//     { id: 54, name: "Fried Rice (Veg)", description: "Stir-fried basmati rice, soya-flavoured.", price: 280, category: "Nostalgia - Heritage" },
//     { id: 55, name: "Fried Rice (Egg)", description: "Stir-fried basmati rice, soya-flavoured.", price: 320, category: "Nostalgia - Heritage" },
//     { id: 56, name: "Fried Rice (Chicken)", description: "Stir-fried basmati rice, soya-flavoured.", price: 360, category: "Nostalgia - Heritage" },
//     { id: 57, name: "Fried Rice (Mix Meat)", description: "Stir-fried basmati rice, soya-flavoured.", price: 390, category: "Nostalgia - Heritage" },
//     { id: 58, name: "Noodles (Veg)", description: "Stir-fried noodles, soya-flavoured.", price: 280, category: "Nostalgia - Heritage" },
//     { id: 59, name: "Noodles (Egg)", description: "Stir-fried noodles, soya-flavoured.", price: 320, category: "Nostalgia - Heritage" },
//     { id: 60, name: "Noodles (Chicken)", description: "Stir-fried noodles, soya-flavoured.", price: 360, category: "Nostalgia - Heritage" },
//     { id: 61, name: "Noodles (Mix Meat)", description: "Stir-fried noodles, soya-flavoured.", price: 400, category: "Nostalgia - Heritage" },

//     // --- ORIENTAL (Authentic Oriental Cuisine) ---
//     { id: 62, name: "Fish in Chilli Oyster", description: "Amritha special Chinese delicacy.", price: 600, category: "Oriental" },
//     { id: 63, name: "Fish in Chilli Garlic", description: "Amritha special Chinese delicacy.", price: 600, category: "Oriental" },
//     { id: 64, name: "Fish in Chilli Soya", description: "Amritha special Chinese delicacy.", price: 600, category: "Oriental" },
//     { id: 65, name: "Chicken in Red Curry", description: "Boneless chicken dice in Thai red curry with coconut milk.", price: 380, category: "Oriental" },
//     { id: 66, name: "Chicken in Green Curry", description: "Boneless chicken dice in Thai green curry with coconut milk.", price: 380, category: "Oriental" },
//     { id: 67, name: "Nasi Goreng", description: "Indonesian fried rice with chicken, egg and prawn.", price: 350, category: "Oriental" },
//     { id: 68, name: "Bami Goreng", description: "Noodles with chicken, egg and prawns.", price: 370, category: "Oriental" },
//     { id: 69, name: "Pad Thai", description: "Flat noodles with prawns tossed in Pad Thai sauce, flavoured with basil.", price: 390, category: "Oriental" },
//     { id: 70, name: "Mix Veg with Nuts", description: "Hong Kong street food of the \"City of Darkness.\"", price: 260, category: "Oriental" },
//     { id: 71, name: "Cauliflower Manchurian", description: "Amritha's Chinese delicacy.", price: 240, category: "Oriental" },
//     { id: 72, name: "Chicken Schezwan", description: "Amritha's Chinese attraction.", price: 380, category: "Oriental" },
//     { id: 73, name: "Chicken Hunan", description: "Amritha's Chinese attraction.", price: 380, category: "Oriental" },
//     { id: 74, name: "Chicken Manchurian", description: "Amritha's Chinese attraction.", price: 380, category: "Oriental" },

//     // --- CONTINENTAL ---
//     { id: 75, name: "Fisherman's Catch", description: "Chunks of fish with prawns & squid in creamy tomato sauce; served with parsley rice.", price: 450, category: "Continental" },
//     { id: 76, name: "Fish n' Chips", description: "Panko-crumb fried fish with French fries & tartare sauce.", price: 600, category: "Continental" },
//     { id: 77, name: "Grilled Mackerel Roll with Kariveppila Rice", description: "Amritha Heritage signature dish: marinated & grilled mackerel; curry-leaf rice.", price: 380, category: "Continental" },
//     { id: 78, name: "Cheesy Crunchy Fried Chicken", description: "Cheese-stuffed chicken breast, panko-crumb fried; potato salad & rossa tartare.", price: 380, category: "Continental" },
//     { id: 79, name: "Beef Steak in Mushroom Sauce", description: "With potato wedges & glazed veggies.", price: 400, category: "Continental" },
//     { id: 80, name: "Steak au Poivre", description: "With potato wedges & glazed veggies.", price: 400, category: "Continental" },

//     // --- INDIAN & TANDOOR ---
//     { id: 81, name: "Tandoori Murg (Half)", description: "Char-grilled chicken served with naan or roti, dal and mint relish.", price: 450, category: "Indian & Tandoor" },
//     { id: 82, name: "Murg Makhani", description: "Tandoori-roasted spring chicken in tomato-cashew gravy.", price: 380, category: "Indian & Tandoor" },
//     { id: 83, name: "Murg Mutter Masala", description: "Combination of green peas and chicken.", price: 380, category: "Indian & Tandoor" },
//     { id: 84, name: "Kadai Mutton", description: "North-Indian delicacy.", price: 550, category: "Indian & Tandoor" },
//     { id: 85, name: "Mutton Saagwala", description: "Pureed spinach with tender chunks of meat.", price: 550, category: "Indian & Tandoor" },

//     // --- PASTA ---
//     { id: 86, name: "Penne Pasta", description: "Choice of pasta preparation.", price: 380, category: "Pasta" },
//     { id: 87, name: "Fusilli Pasta", description: "Choice of pasta preparation.", price: 380, category: "Pasta" },
//     { id: 88, name: "Farfalle Pasta", description: "Choice of pasta preparation.", price: 320, category: "Pasta" },
//     { id: 89, name: "Alfredo (Chicken)", description: "Cream sauce with mushroom.", price: 380, category: "Pasta" },
//     { id: 90, name: "Alfredo (Veg)", description: "Cream sauce with mushroom.", price: 380, category: "Pasta" },
//     { id: 91, name: "Marinara", description: "Fresh red-chilli tomato with seafood.", price: 380, category: "Pasta" },
//     { id: 92, name: "Chicken in Creamy Tomato Sauce", description: "Pan-fried chicken in creamy tomato sauce.", price: 380, category: "Pasta" },

//     // --- RICE & BREAD ---
//     { id: 93, name: "Steamed Rice", description: "Perfectly steamed basmati rice.", price: 160, category: "Rice & Bread" },
//     { id: 94, name: "Veg Pulao", description: "Aromatic rice with vegetables.", price: 280, category: "Rice & Bread" },
//     { id: 95, name: "Kashmiri Pulao", description: "Aromatic rice with dried fruits and nuts.", price: 300, category: "Rice & Bread" },
//     { id: 96, name: "Paneer Pulao", description: "Aromatic rice with cottage cheese.", price: 300, category: "Rice & Bread" },
//     { id: 97, name: "Jeera Rice", description: "Cumin flavored basmati rice.", price: 280, category: "Rice & Bread" },
//     { id: 98, name: "Kerala Parotta (1 no.)", description: "Traditional layered flatbread.", price: 40, category: "Rice & Bread" },
//     { id: 99, name: "Nool Parotta (1 no.)", description: "String-like layered flatbread.", price: 40, category: "Rice & Bread" },
//     { id: 100, name: "Chapathi", description: "Whole wheat flatbread.", price: 30, category: "Rice & Bread" },
//     { id: 101, name: "Phulka", description: "Puffed whole wheat bread.", price: 30, category: "Rice & Bread" },
//     { id: 102, name: "Wheat Coin Parotta", description: "Small round wheat flatbread.", price: 40, category: "Rice & Bread" },
//     { id: 103, name: "Appam", description: "Traditional Kerala fermented pancake.", price: 40, category: "Rice & Bread" },
//     { id: 104, name: "Egg Appam", description: "Appam with egg.", price: 50, category: "Rice & Bread" },
//     { id: 105, name: "Naan", description: "Traditional Indian leavened bread.", price: 40, category: "Rice & Bread" },
//     { id: 106, name: "Butter Naan", description: "Naan with butter.", price: 50, category: "Rice & Bread" },
//     { id: 107, name: "Kulcha", description: "Stuffed Indian bread.", price: 50, category: "Rice & Bread" },
//     { id: 108, name: "Roti", description: "Indian flatbread.", price: 40, category: "Rice & Bread" },
//     { id: 109, name: "Butter Roti", description: "Roti with butter.", price: 50, category: "Rice & Bread" },
//     { id: 110, name: "Peshwari Naan", description: "Sweet naan with nuts and coconut.", price: 60, category: "Rice & Bread" },
//     { id: 111, name: "Kashmiri Naan", description: "Naan with dried fruits.", price: 60, category: "Rice & Bread" },
//     { id: 112, name: "Rogini Naan", description: "Special flavored naan.", price: 60, category: "Rice & Bread" },

//     // --- COMBO MEALS — Amritha Heritage Special ---
//     { id: 113, name: "Chilli Oyster Fish Combo", description: "With choice of veg. noodle or veg. fried rice & one scoop of ice cream.", price: 750, category: "Combo Meals" },
//     { id: 114, name: "Schezwan Chicken Combo", description: "With choice of veg. noodle or veg. fried rice & one scoop of vanilla ice cream.", price: 650, category: "Combo Meals" },
//     { id: 115, name: "Murg Makhani Combo", description: "With choice of veg. pulao or one butter naan with gulab jamun.", price: 650, category: "Combo Meals" },
//     { id: 116, name: "Chicken Varutharachathu Combo", description: "Choice of 2 Kerala parotta or 3 chapathi with gulab jamun.", price: 650, category: "Combo Meals" },
//     { id: 117, name: "Paneer Jalfraizi Combo", description: "With choice of veg. pulao or one butter naan and phulka with gulab jamun.", price: 450, category: "Combo Meals" },
//     { id: 118, name: "Vegetable with Nuts Combo", description: "With choice of veg. noodle or veg. fried rice & one scoop of ice cream.", price: 450, category: "Combo Meals" },
//     { id: 119, name: "Pal Cutty Ulli Thiyal Combo", description: "Choice of 3 appam or 2 chapathi with gulab jamun.", price: 450, category: "Combo Meals" },

//     // --- VEGETARIAN DELICACIES ---
//     { id: 120, name: "Aloo Mutter", description: "Potato & green peas in creamy gravy.", price: 280, category: "Vegetarian Delicacies" },
//     { id: 121, name: "Aloo Gobi", description: "Potato & cauliflower in creamy gravy.", price: 280, category: "Vegetarian Delicacies" },
//     { id: 122, name: "Aloo Tamatar", description: "Potato & tomato in creamy gravy.", price: 280, category: "Vegetarian Delicacies" },
//     { id: 123, name: "Vegetable Korma", description: "Mix vegetables in coconut gravy.", price: 260, category: "Vegetarian Delicacies" },
//     { id: 124, name: "Palcutty Ulli Thiyal", description: "Paneer and shallots in coconut-roast gravy.", price: 320, category: "Vegetarian Delicacies" },
//     { id: 125, name: "Navarathan Kurma", description: "Seasonal vegetables in rich creamy gravy, garnished with fruits & nuts.", price: 320, category: "Vegetarian Delicacies" },
//     { id: 126, name: "Mushroom Masala", description: "Mushroom delicacy.", price: 280, category: "Vegetarian Delicacies" },
//     { id: 127, name: "Mushroom Pepper Fry", description: "Mushroom delicacy.", price: 280, category: "Vegetarian Delicacies" },
//     { id: 128, name: "Veg Chettinadu", description: "Seasoned vegetables in roasted Chettinadu gravy.", price: 280, category: "Vegetarian Delicacies" },
//     { id: 129, name: "Palak Paneer", description: "Paneer cooked with pureed spinach.", price: 320, category: "Vegetarian Delicacies" },
//     { id: 130, name: "Paneer Makhani", description: "Stir-fried cottage cheese, North-Indian style preparation.", price: 320, category: "Vegetarian Delicacies" },
//     { id: 131, name: "Paneer Jalfraizi", description: "Stir-fried cottage cheese, North-Indian style preparation.", price: 320, category: "Vegetarian Delicacies" },

//     // --- REGIONAL CUISINE ---
//     { id: 132, name: "Chicken Biryani", description: "Persian-inspired full meal with flavoured rice and chicken.", price: 360, category: "Regional Cuisine" },
//     { id: 133, name: "Mutton Biryani", description: "Persian-inspired full meal with flavoured rice and mutton.", price: 420, category: "Regional Cuisine" },
//     { id: 134, name: "Veg Biryani", description: "Persian-inspired full meal with flavoured rice and vegetables.", price: 300, category: "Regional Cuisine" },
//     { id: 135, name: "Kohinoor Special Prawns Biryani", description: "Amritha's homely delicacy.", price: 650, category: "Regional Cuisine" },
//     { id: 136, name: "Mutton Masala", description: "Made with blend of spices.", price: 550, category: "Regional Cuisine" },
//     { id: 137, name: "Mutton Chettinadu", description: "Tender chunks of meat in Chettinadu spices.", price: 550, category: "Regional Cuisine" },
//     { id: 138, name: "Mutton Mappas", description: "Cooked in coconut milk.", price: 550, category: "Regional Cuisine" },
//     { id: 139, name: "Duck Mappas", description: "Duck cooked in coconut milk with spices & herbs.", price: 600, category: "Regional Cuisine" },
//     { id: 140, name: "Duck Pepper Masala", description: "Spring duck cooked in herbs & spices.", price: 600, category: "Regional Cuisine" },
//     { id: 141, name: "Fish Moilee", description: "Mildly spiced fish stew made with coconut milk.", price: 600, category: "Regional Cuisine" },
//     { id: 142, name: "Fish Nirvana", description: "Fish in ginger-coconut-milk sauce.", price: 600, category: "Regional Cuisine" },
//     { id: 143, name: "Beef Pepper Fry", description: "With crushed herbs and spices.", price: 380, category: "Regional Cuisine" },
//     { id: 144, name: "Beef Dry Fry", description: "In spicy aromatic masala.", price: 380, category: "Regional Cuisine" },
//     { id: 145, name: "Egg Roast", description: "Egg with spices and herbs.", price: 280, category: "Regional Cuisine" },
//     { id: 146, name: "Egg Masala", description: "Egg with spices and herbs.", price: 280, category: "Regional Cuisine" },
//     { id: 147, name: "Scrambled Egg", description: "Egg with spices and herbs.", price: 280, category: "Regional Cuisine" },
//     { id: 148, name: "Chilly Egg", description: "Chef-special egg in Chinese style.", price: 280, category: "Regional Cuisine" },
//     { id: 149, name: "Egg Schezwan", description: "Chef-special egg in Chinese style.", price: 280, category: "Regional Cuisine" },
//     { id: 150, name: "Egg Manchurian", description: "Chef-special egg in Chinese style.", price: 280, category: "Regional Cuisine" },

//     // --- DESSERTS ---
//     { id: 151, name: "Vancho Pudding", description: "Duets of white and dark chocolate.", price: 300, category: "Desserts" },
//     { id: 152, name: "Caramel Bread Butter Pudding", description: "Classic bread pudding with caramel sauce.", price: 320, category: "Desserts" },
//     { id: 153, name: "Coconut & Date Pie", description: "Traditional coconut and date dessert.", price: 320, category: "Desserts" },
//     { id: 154, name: "Cut Fruits", description: "Fresh seasonal fruits.", price: 200, category: "Desserts" },
//     { id: 155, name: "Payasam of the Day", description: "Traditional South Indian dessert.", price: 180, category: "Desserts" },
//     { id: 156, name: "Gulab Jamun", description: "Classic Indian sweet.", price: 180, category: "Desserts" },
//     { id: 157, name: "Choice of Ice Cream", description: "Various flavors of ice cream.", price: 180, category: "Desserts" },
//     { id: 158, name: "Fresh Fruit Salad", description: "Seasonal fresh fruits.", price: 240, category: "Desserts" },
//     { id: 159, name: "Fresh Fruit Salad with Ice Cream", description: "Fresh fruits served with ice cream.", price: 240, category: "Desserts" },
//     { id: 160, name: "Tender Coconut Soufflé", description: "Light and airy coconut dessert.", price: 320, category: "Desserts" },
//     { id: 161, name: "Crème Caramel", description: "Classic French custard dessert.", price: 320, category: "Desserts" },

//     // --- BEVERAGES ---
//     { id: 162, name: "Tea", description: "Traditional Indian tea.", price: 80, category: "Beverages" },
//     { id: 163, name: "Coffee", description: "Freshly brewed coffee.", price: 80, category: "Beverages" },
//     { id: 164, name: "Chocolate Milkshake with Ice Cream", description: "Rich chocolate milkshake.", price: 180, category: "Beverages" },
//     { id: 165, name: "Mango Milkshake with Ice Cream", description: "Fresh mango milkshake.", price: 180, category: "Beverages" },
//     { id: 166, name: "Strawberry Milkshake with Ice Cream", description: "Fresh strawberry milkshake.", price: 180, category: "Beverages" },
//     { id: 167, name: "Fresh Lime Juice", description: "Freshly squeezed lime juice.", price: 80, category: "Beverages" },
//     { id: 168, name: "Fresh Lime Soda", description: "Refreshing lime soda.", price: 120, category: "Beverages" },
//     { id: 169, name: "Fresh Fruit Juice", description: "Variety of fresh fruit juices.", price: 200, category: "Beverages" }
// ];





export interface MenuItem {
    name: string;
    price: number | string;
    description?: string;
    variants?: {
      name: string;
      price: number;
    }[];
  }
  
  export interface MenuCategory {
    category: string;
    items: MenuItem[];
  }
  
  export const menuData: MenuCategory[] = [
    {
      category: "SOUP & SALAD",
      items: [
        {
          name: "Creamy Corn & Spinach Soup",
          price: "₹200/240/170",
          description: "Healthy and creamy soup made with fresh spinach, sweet corn and flavored spices.",
          variants: [
            { name: "Chicken", price: 200 },
            { name: "Prawn", price: 240 },
            { name: "Veg", price: 170 }
          ]
        },
        {
          name: "Chemmeen Thengapaal Soup",
          price: 240,
          description: "Finished with coconut milk and curry leaves."
        },
        {
          name: "Lemon Coriander Chicken Soup",
          price: 240,
          description: "Made of tender chicken bites, lime juice and lots of fresh coriander leaves."
        },
        {
          name: "Tom Kha Gai Soup",
          price: 240,
          description: "Thai chicken soup with galangal, lemongrass & red chilli."
        },
        {
          name: "Cream of Tomato Soup",
          price: 200,
          description: "Made of tomato puree and fresh cream."
        },
        {
          name: "Broccoli Almond Soup",
          price: 200,
          description: "Protein-rich broccoli and almond nourishing soup."
        },
        {
          name: "Hot 'n' Sour",
          price: "₹200/240",
          description: "Popular Chinese soup; tangy flavour and spicy kick.",
          variants: [
            { name: "Veg", price: 200 },
            { name: "Chicken", price: 240 }
          ]
        },
        {
          name: "Sweet Corn",
          price: "₹200/240",
          description: "Soup made with sweet corn kernels.",
          variants: [
            { name: "Veg", price: 200 },
            { name: "Chicken", price: 240 }
          ]
        },
        {
          name: "Kohinoor Special Salad",
          price: 320,
          description: "Strips of beef, chicken, salami and boiled egg on bed of lettuce in ranch dressing."
        },
        {
          name: "Niçoise Salad",
          price: 280,
          description: "Tuna, boiled egg, potato, tomato and beans in herb French dressing."
        },
        {
          name: "Tempered Beansprout & Chickpeas Salad",
          price: 250,
          description: "With grated coconut in lemon dressing."
        },
        {
          name: "Healthy Microgreen & Sprout Salad",
          price: 250,
          description: "In cilantro-ginger-honey dressing."
        },
        {
          name: "Tossed Salad",
          price: 200,
          description: "Dices of cucumber, tomato, onion, carrot, tomato in vinaigrette dressing."
        }
      ]
    },
    {
      category: "APPETIZERS",
      items: [
        {
          name: "Prawns Pepper Fry",
          price: 600,
          description: "Prawns tossed with Kerala spices and served."
        },
        {
          name: "Kuttanadan Fish Pops",
          price: 580,
          description: "Marinated king fish chunks coated with panko crumbs & corn flakes; deep-fried; served with tomato-onion relish."
        },
        {
          name: "Talay Krok",
          price: 400,
          description: "Seafood hoppers in tempura batter; sweet chilli sauce."
        },
        {
          name: "Fish Tikka",
          price: 540,
          description: "Marinated, char-grilled king fish; mint relish & salad."
        },
        {
          name: "Squid Rings Tempura",
          price: 340,
          description: "With sweet chilli sauce."
        },
        {
          name: "Nigara Chicken",
          price: 350,
          description: "In-house grilled chicken chunks tossed with triple pepper, peanut and chilli-tomato sauce."
        },
        {
          name: "Murg Kalimirch Tikka",
          price: 350,
          description: "Boneless chicken marinated with black pepper, char-grilled; mint relish & salad."
        },
        {
          name: "Beef Coconut Fry",
          price: 380,
          description: "Tender, juicy boneless beef stir-fried with coconut cuts."
        },
        {
          name: "Golden Fried Baby Corn",
          price: 240,
          description: "Batter-fried baby corn; tomato-garlic sauce."
        },
        {
          name: "Kung Pao Cauliflower",
          price: 240,
          description: "Batter-fried cauliflower tossed with peanut and green pepper."
        },
        {
          name: "Achari Malai Paneer Tikka",
          price: 320,
          description: "Cottage cheese in pickle-yogurt marination; char-grilled; mint relish & salad."
        },
        {
          name: "Mushroom 65",
          price: 240,
          description: "Mushrooms in spicy batter, served crispy."
        },
        {
          name: "Paneer Finger",
          price: 320,
          description: "Served crispy."
        },
        {
          name: "Crumb Fried Babycorn",
          price: 240,
          description: "Crispy and spicy babycorn."
        }
      ]
    },
    {
      category: "MAIN COURSE — From the Land of Kathakali",
      items: [
        {
          name: "Koonthal Perattu",
          price: 340,
          description: "Squid stir-fried with shallots."
        },
        {
          name: "Meen Pollichathu",
          price: 580,
          description: "King fish cooked with herbs & spices, wrapped in banana leaves and grilled."
        },
        {
          name: "Chef's Special Fish Curry",
          price: 600,
          description: "Chunks of king fish in Amritha special gravy."
        },
        {
          name: "Kozhi Koonu Varutharachathu",
          price: 380,
          description: "Chicken and mushroom cooked in roasted & ground gravy."
        },
        {
          name: "Kerala Kozhi Roast",
          price: 400,
          description: "Pot-roasted tender chicken finished with country spices & coconut milk."
        },
        {
          name: "Murgh Kali Mirchi",
          price: 380,
          description: "Boneless chicken chunks in black pepper masala, cooked tender."
        },
        {
          name: "Beef Roast",
          price: 380,
          description: "Pot-roasted tender loin beef with spices & herbs."
        },
        {
          name: "Malabari Mutton Curry",
          price: 550,
          description: "Traditional North Kerala preparation."
        },
        {
          name: "South Indian Veg. Thali (Lunch only)",
          price: 250,
          description: "Kerala vegetarian specials with steamed rice and chapatti."
        },
        {
          name: "South Indian Fish Thali (Lunch only)",
          price: 380,
          description: "Fresh fish curry & fish fry with steamed rice and chapatti."
        },
        {
          name: "South Indian Mix Meat Thali (Lunch only)",
          price: 500,
          description: "Day special of chicken fry & curry, beef, mutton with steamed rice and chapatti."
        }
      ]
    },
    {
      category: "NOSTALGIA — Amritha Heritage Dishes",
      items: [
        {
          name: "Fish Malabari",
          price: 600,
          description: "Sea-fresh seer fish tempered and simmered in coconut milk gravy."
        },
        {
          name: "Garlic Fish",
          price: 600,
          description: "Crispy fried fish in garlic-flavoured tomato-chilli sauce."
        },
        {
          name: "Amritha Spl. Roast Chicken (Half)",
          price: 450,
          description: "Old-hotel Amritha-style roast; served with potato lyonnaise and glazed vegetables."
        },
        {
          name: "Amritha Chilli Chicken",
          price: 380,
          description: "Chef's special home preparation."
        },
        {
          name: "Kadai Murgh",
          price: 400,
          description: "Spring chicken pieces cooked North-Indian style."
        },
        {
          name: "Chicken with Diced Vegetables",
          price: 380,
          description: "Chicken with broccoli, carrot, beans."
        },
        {
          name: "Chicken Steak Sizzler",
          price: 380,
          description: "With potato wedges, glazed veggies."
        },
        {
          name: "Beef Steak Sizzler",
          price: 450,
          description: "With potato wedges & glazed veggies."
        },
        {
          name: "Beef with Onion",
          price: 420,
          description: "Tenderloin cuts stir-fried; semi-gravy."
        },
        {
          name: "Beef with Capsicum",
          price: 420,
          description: "Tenderloin cuts stir-fried with green pepper; semi-gravy."
        },
        {
          name: "Beef with Red Chilli",
          price: 420,
          description: "Tenderloin cuts stir-fried with Thai red chilli; semi-gravy."
        },
        {
          name: "Choice of Fried Rice",
          price: "₹280/320/360/390",
          description: "Stir-fried basmati rice, soya-flavoured.",
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
      items: [
        {
          name: "Fish in Chilli Oyster / Chilli Garlic / Chilli Soya",
          price: 600,
          description: "Amritha special Chinese delicacy."
        },
        {
          name: "Chicken in Red Curry / Green Curry",
          price: 380,
          description: "Boneless chicken dice in Thai red or green curry with coconut milk."
        },
        {
          name: "Nasi Goreng",
          price: 350,
          description: "Indonesian fried rice with chicken, egg and prawn."
        },
        {
          name: "Bami Goreng",
          price: 370,
          description: "Noodles with chicken, egg and prawns."
        },
        {
          name: "Pad Thai",
          price: 390,
          description: "Flat noodles with prawns tossed in Pad Thai sauce, flavoured with basil."
        },
        {
          name: "Mix Veg with Nuts",
          price: 260,
          description: "Hong Kong street food of the \"City of Darkness.\""
        },
        {
          name: "Cauliflower Manchurian",
          price: 240,
          description: "Amritha's Chinese delicacy."
        },
        {
          name: "Chicken (Schezwan/Hunan/Manchurian)",
          price: 380,
          description: "Amritha's Chinese attraction."
        }
      ]
    },
    {
      category: "CONTINENTAL",
      items: [
        {
          name: "Fisherman's Catch",
          price: 450,
          description: "Chunks of fish with prawns & squid in creamy tomato sauce; served with parsley rice."
        },
        {
          name: "Fish n' Chips",
          price: 600,
          description: "Panko-crumb fried fish with French fries & tartare sauce."
        },
        {
          name: "Grilled Mackerel Roll with Kariveppila Rice",
          price: 380,
          description: "Amritha Heritage signature dish: marinated & grilled mackerel; curry-leaf rice."
        },
        {
          name: "Cheesy Crunchy Fried Chicken",
          price: 380,
          description: "Cheese-stuffed chicken breast, panko-crumb fried; potato salad & rossa tartare."
        },
        {
          name: "Beef Steak in Mushroom Sauce / Steak au Poivre",
          price: 400,
          description: "With potato wedges & glazed veggies."
        }
      ]
    },
    {
      category: "INDIAN & TANDOOR",
      items: [
        {
          name: "Tandoori Murg (Half)",
          price: 450,
          description: "Char-grilled chicken served with naan or roti, dal and mint relish."
        },
        {
          name: "Murg Makhani",
          price: 380,
          description: "Tandoori-roasted spring chicken in tomato-cashew gravy."
        },
        {
          name: "Murg Mutter Masala",
          price: 380,
          description: "Combination of green peas and chicken."
        },
        {
          name: "Kadai Mutton",
          price: 550,
          description: "North-Indian delicacy."
        },
        {
          name: "Mutton Saagwala",
          price: 550,
          description: "Pureed spinach with tender chunks of meat."
        }
      ]
    },
    {
      category: "PASTA",
      items: [
        {
          name: "Choice of Pasta (Penne/Fusilli/Farfalle)",
          price: "₹380/₹320",
          variants: [
            { name: "Regular", price: 320 },
            { name: "Premium", price: 380 }
          ]
        },
        {
          name: "Alfredo",
          price: 380,
          description: "Cream sauce with mushroom.",
          variants: [
            { name: "Chicken", price: 380 },
            { name: "Veg", price: 380 }
          ]
        },
        {
          name: "Marinara",
          price: 380,
          description: "Fresh red-chilli tomato with seafood."
        },
        {
          name: "Chicken in Creamy Tomato Sauce",
          price: 380,
          description: "Pan-fried chicken in creamy tomato sauce."
        }
      ]
    },
    {
      category: "RICE & BREAD",
      items: [
        {
          name: "Steamed Rice",
          price: 160
        },
        {
          name: "Pulao",
          price: "₹280/300/300",
          variants: [
            { name: "Veg", price: 280 },
            { name: "Kashmiri", price: 300 },
            { name: "Paneer", price: 300 }
          ]
        },
        {
          name: "Jeera Rice",
          price: 280
        },
        {
          name: "Kerala Parotta / Nool Parotta (1 no.)",
          price: 40
        },
        {
          name: "Chapathi / Phulka",
          price: 30
        },
        {
          name: "Wheat Coin Parotta",
          price: 40
        },
        {
          name: "Appam / Egg Appam",
          price: "₹40/50",
          variants: [
            { name: "Regular", price: 40 },
            { name: "Egg", price: 50 }
          ]
        },
        {
          name: "Naan / Butter Naan",
          price: "₹40/50",
          variants: [
            { name: "Regular", price: 40 },
            { name: "Butter", price: 50 }
          ]
        },
        {
          name: "Kulcha",
          price: 50
        },
        {
          name: "Roti / Butter Roti",
          price: "₹40/50",
          variants: [
            { name: "Regular", price: 40 },
            { name: "Butter", price: 50 }
          ]
        },
        {
          name: "Naan — Peshwari / Kashmiri / Rogini",
          price: 60
        }
      ]
    },
    {
      category: "COMBO MEALS — Amritha Heritage Special",
      items: [
        {
          name: "Chilli Oyster Fish",
          price: 750,
          description: "With choice of veg. noodle or veg. fried rice & one scoop of ice cream."
        },
        {
          name: "Schezwan Chicken",
          price: 650,
          description: "With choice of veg. noodle or veg. fried rice & one scoop of vanilla ice cream."
        },
        {
          name: "Murg Makhani",
          price: 650,
          description: "With choice of veg. pulao or one butter naan with gulab jamun."
        },
        {
          name: "Chicken Varutharachathu",
          price: 650,
          description: "Choice of 2 Kerala parotta or 3 chapathi with gulab jamun."
        },
        {
          name: "Paneer Jalfraizi",
          price: 450,
          description: "With choice of veg. pulao or one butter naan and phulka with gulab jamun."
        },
        {
          name: "Vegetable with Nuts",
          price: 450,
          description: "With choice of veg. noodle or veg. fried rice & one scoop of ice cream."
        },
        {
          name: "Pal Cutty Ulli Thiyal",
          price: 450,
          description: "Choice of 3 appam or 2 chapathi with gulab jamun."
        }
      ]
    },
    {
      category: "VEGETARIAN DELICACIES",
      items: [
        {
          name: "Aloo Mutter / Gobi / Tamatar",
          price: 280,
          description: "Potato & cauliflower in creamy gravy."
        },
        {
          name: "Vegetable Korma",
          price: 260,
          description: "Mix vegetables in coconut gravy."
        },
        {
          name: "Palcutty Ulli Thiyal",
          price: 320,
          description: "Paneer and shallots in coconut-roast gravy."
        },
        {
          name: "Navarathan Kurma",
          price: 320,
          description: "Seasonal vegetables in rich creamy gravy, garnished with fruits & nuts."
        },
        {
          name: "Mushroom Masala / Mushroom Pepper Fry",
          price: 280,
          description: "Mushroom delicacy."
        },
        {
          name: "Veg Chettinadu",
          price: 280,
          description: "Seasoned vegetables in roasted Chettinadu gravy."
        },
        {
          name: "Palak Paneer",
          price: 320,
          description: "Paneer cooked with pureed spinach."
        },
        {
          name: "Paneer Makhani / Jalfraizi",
          price: 320,
          description: "Stir-fried cottage cheese, North-Indian style preparation."
        }
      ]
    },
    {
      category: "REGIONAL CUISINE",
      items: [
        {
          name: "Biryani",
          price: "₹360/420/300",
          description: "Persian-inspired full meal with flavoured rice and meat.",
          variants: [
            { name: "Chicken", price: 360 },
            { name: "Mutton", price: 420 },
            { name: "Veg", price: 300 }
          ]
        },
        {
          name: "Kohinoor Special Prawns Biryani",
          price: 650,
          description: "Amritha's homely delicacy."
        },
        {
          name: "Mutton Masala",
          price: 550,
          description: "Made with blend of spices."
        },
        {
          name: "Mutton Chettinadu",
          price: 550,
          description: "Tender chunks of meat in Chettinadu spices."
        },
        {
          name: "Mutton Mappas",
          price: 550,
          description: "Cooked in coconut milk."
        },
        {
          name: "Duck Mappas",
          price: 600,
          description: "Duck cooked in coconut milk with spices & herbs."
        },
        {
          name: "Duck Pepper Masala",
          price: 600,
          description: "Spring duck cooked in herbs & spices."
        },
        {
          name: "Fish Moilee",
          price: 600,
          description: "Mildly spiced fish stew made with coconut milk."
        },
        {
          name: "Fish Nirvana",
          price: 600,
          description: "Fish in ginger-coconut-milk sauce."
        },
        {
          name: "Beef Pepper Fry",
          price: 380,
          description: "With crushed herbs and spices."
        },
        {
          name: "Beef Dry Fry",
          price: 380,
          description: "In spicy aromatic masala."
        },
        {
          name: "Egg Roast / Egg Masala / Scrambled Egg",
          price: 280,
          description: "Egg with spices and herbs."
        },
        {
          name: "Chilly Egg / Egg Schezwan / Egg Manchurian",
          price: 280,
          description: "Chef-special egg in Chinese style."
        }
      ]
    },
    {
      category: "DESSERTS",
      items: [
        {
          name: "Vancho Pudding",
          price: 300,
          description: "Duets of white and dark chocolate."
        },
        {
          name: "Caramel Bread Butter Pudding",
          price: 320
        },
        {
          name: "Coconut & Date Pie",
          price: 320
        },
        {
          name: "Cut Fruits",
          price: 200
        },
        {
          name: "Payasam of the Day",
          price: 180
        },
        {
          name: "Gulab Jamun",
          price: 180
        },
        {
          name: "Choice of Ice Cream",
          price: 180
        },
        {
          name: "Fresh Fruit Salad / with Ice Cream",
          price: 240
        },
        {
          name: "Tender Coconut Soufflé",
          price: 320
        },
        {
          name: "Crème Caramel",
          price: 320
        }
      ]
    },
    {
      category: "BEVERAGES",
      items: [
        {
          name: "Tea / Coffee",
          price: 80
        },
        {
          name: "Milkshakes with Ice Cream (Chocolate/Mango/Strawberry)",
          price: 180
        },
        {
          name: "Fresh Lime",
          price: "₹80/₹120",
          variants: [
            { name: "Juice", price: 80 },
            { name: "Soda", price: 120 }
          ]
        },
        {
          name: "Fresh Fruit Juice",
          price: 200
        }
      ]
    }
  ];
  
  // Helper functions for working with the menu data
  export const getMenuItemsByCategory = (category: string): MenuItem[] => {
    const categoryData = menuData.find(cat => cat.category === category);
    return categoryData ? categoryData.items : [];
  };
  
  export const getAllCategories = (): string[] => {
    return menuData.map(category => category.category);
  };
  
  export const searchMenuItems = (searchTerm: string): MenuItem[] => {
    const results: MenuItem[] = [];
    
    menuData.forEach(category => {
      category.items.forEach(item => {
        if (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
        ) {
          results.push(item);
        }
      });
    });
    
    return results;
  };
  
  export const getItemsByPriceRange = (minPrice: number, maxPrice: number): MenuItem[] => {
    const results: MenuItem[] = [];
    
    menuData.forEach(category => {
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
    
    return results;
  };