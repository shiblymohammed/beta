// This file contains all the data for the Kohinoor Menu Page.
// In a real application, this would be fetched from a CMS or backend API.

// =================================================================
// == 1. TYPE DEFINITIONS
// =================================================================
export interface Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    isSpecial?: boolean;
}

export interface Category {
    id: string;
    name: string;
    icon: React.ReactNode; // For the decorative SVG icon
    dishes: Dish[];
}

export interface MenuCollection {
    id: string;
    name: string;
    categories: Category[];
}

export interface Review {
    id: number;
    name: string;
    quote: string;
    avatar: string;
}

export interface GalleryItem {
    id: number;
    type: 'image' | 'video';
    src: string;
    aspectRatio: string; // e.g., 'aspect-w-3 aspect-h-4'
}

// =================================================================
// == 2. SVG ICONS FOR CATEGORIES
// =================================================================
const SoupIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.25 12.75C3.25 12.75 4 18.25 12 18.25C20 18.25 20.75 12.75 20.75 12.75" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15.75 5.75C15.75 5.75 16.25 8.75 12 8.75C7.75 8.75 8.25 5.75 8.25 5.75" strokeLinecap="round" strokeLinejoin="round"></path></svg>;
const AppetizerIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25Z" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 8.75V12.75" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15.25 11.75L12 8.75L8.75 11.75" strokeLinecap="round" strokeLinejoin="round"></path></svg>;
const MainCourseIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 18.25C15.9959 18.25 19.25 14.9959 19.25 11C19.25 7.00406 15.9959 3.75 12 3.75C8.00406 3.75 4.75 7.00406 4.75 11C4.75 14.9959 8.00406 18.25 12 18.25Z" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 18.25V20.25" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 3.75V2.75" strokeLinecap="round" strokeLinejoin="round"></path></svg>;
const RiceIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 14.25C15.3137 14.25 18 11.5637 18 8.25C18 4.93629 15.3137 2.25 12 2.25C8.68629 2.25 6 4.93629 6 8.25C6 11.5637 8.68629 14.25 12 14.25Z" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 14.25V21.75" strokeLinecap="round" strokeLinejoin="round"></path></svg>;
const DessertIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2.75C15.4518 2.75 18.25 5.54822 18.25 9C18.25 12.4518 15.4518 15.25 12 15.25C8.54822 15.25 5.75 12.4518 5.75 9C5.75 5.54822 8.54822 2.75 12 2.75Z" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 15.25V21.25" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.75 21.25H14.25" strokeLinecap="round" strokeLinejoin="round"></path></svg>;

// =================================================================
// == 3. FULL MENU DATA
// =================================================================
export const menuCollections: MenuCollection[] = [
    {
        id: 'starters_collection',
        name: 'The Opening Chapter',
        categories: [
            {
                id: 'soups_salads', name: 'Soups & Salads', icon: <SoupIcon />, dishes: [
                    { id: 1, name: "Creamy Corn & Spinach Soup (Veg)", description: "A healthy and creamy soup made with fresh spinach, sweet corn and flavored spices.", price: 170, image: "https://images.unsplash.com/photo-1551032237-798c59f04183?w=800&q=80" },
                    { id: 2, name: "Chemmeen Thengapaal Soup", description: "A savory prawn soup finished with rich coconut milk and fragrant curry leaves.", price: 240, image: "https://images.unsplash.com/photo-1598515214211-89d3c7373b94?w=800&q=80", isSpecial: true },
                    { id: 3, name: "Lemon Coriander Chicken Soup", description: "A light and zesty soup made of tender chicken bites, lime juice and lots of fresh coriander.", price: 240, image: "https://images.unsplash.com/photo-1604329225313-26e95d73b515?w=800&q=80" },
                    { id: 4, name: "Tom Kha Gai Soup", description: "A classic Thai chicken soup with galangal, lemongrass & red chilli in a coconut broth.", price: 240, image: "https://images.unsplash.com/photo-1559847844-5315695d0464?w=800&q=80" },
                    { id: 5, name: "Kohinoor Special Salad", description: "Strips of beef, chicken, salami and boiled egg on a bed of lettuce in ranch dressing.", price: 320, image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80" },
                    // ... 10 more soup/salad items
                ]
            },
            {
                id: 'appetizers', name: 'Appetizers', icon: <AppetizerIcon />, dishes: [
                    { id: 101, name: "Prawns Pepper Fry", description: "Succulent prawns tossed with aromatic Kerala spices and freshly ground black pepper.", price: 600, image: "https://images.unsplash.com/photo-1625535338830-1013a5a4f7ce?w=800&q=80" },
                    { id: 102, name: "Kuttanadan Fish Pops", description: "Marinated king fish chunks coated with panko crumbs & corn flakes, served with a tangy tomato-onion relish.", price: 580, image: "https://images.unsplash.com/photo-1599218412246-ce38a14a682c?w=800&q=80", isSpecial: true },
                    { id: 103, name: "Nigara Chicken", description: "Our in-house special grilled chicken chunks tossed with triple pepper, peanut and a sweet chilli-tomato sauce.", price: 350, image: "https://images.unsplash.com/photo-1604329225313-26e95d73b515?w=800&q=80" },
                    { id: 104, name: "Beef Coconut Fry", description: "Tender, juicy boneless beef stir-fried with delicate slivers of coconut.", price: 380, image: "https://images.unsplash.com/photo-1626081739832-21146e4e78aa?w=800&q=80" },
                    { id: 105, name: "Achari Malai Paneer Tikka", description: "Soft cottage cheese in a tangy pickle-yogurt marination, char-grilled and served with mint relish.", price: 320, image: "https://images.unsplash.com/photo-1603894532236-08705139a093?w=800&q=80" },
                    // ... 10 more appetizer items
                ]
            },
        ]
    },
    {
        id: 'main_course_collection',
        name: 'The Heart of the Meal',
        categories: [
            {
                id: 'main_course', name: 'Main Course', icon: <MainCourseIcon />, dishes: [
                    { id: 201, name: "Meen Pollichathu", description: "King fish cooked with herbs & spices, wrapped in banana leaves and grilled to perfection.", price: 580, image: "https://images.unsplash.com/photo-1628141152239-4c1b73474436?w=800&q=80", isSpecial: true },
                    { id: 202, name: "Kerala Kozhi Roast", description: "Pot-roasted tender chicken finished with country spices & rich coconut milk.", price: 400, image: "https://images.unsplash.com/photo-1631679706909-67447de371a3?w=800&q=80" },
                    { id: 203, name: "Malabari Mutton Curry", description: "A traditional North Kerala preparation of tender mutton in a fragrant, spiced gravy.", price: 550, image: "https://images.unsplash.com/photo-1631207914804-50623a102b43?w=800&q=80" },
                    { id: 204, name: "Duck Mappas", description: "Tender duck cooked in a rich, spiced coconut milk gravy, a true Keralan delicacy.", price: 600, image: "https://images.unsplash.com/photo-1604504382193-68551b53a448?w=800&q=80" },
                    { id: 205, name: "Palak Paneer", description: "Soft paneer cubes cooked in a smooth, creamy and vibrant spinach gravy.", price: 320, image: "https://images.unsplash.com/photo-1589647363594-ebc22759dc6c?w=800&q=80" },
                    // ... 10 more main course items
                ]
            },
        ]
    },
    {
        id: 'accompaniments_collection',
        name: 'Perfect Pairings',
        categories: [
            {
                id: 'breads_rice', name: 'Breads & Rice', icon: <RiceIcon />, dishes: [
                    { id: 301, name: "Kerala Parotta", description: "A flaky, layered flatbread, perfect for soaking up rich curries.", price: 40, image: "https://images.unsplash.com/photo-1639733035335-d5a2a51a8a2a?w=800&q=80" },
                    { id: 302, name: "Chicken Biriyani", description: "Aromatic basmati rice and tender chicken, slow-cooked with exotic spices in the traditional dum style.", price: 360, image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80" },
                    { id: 303, name: "Appam", description: "Soft, lacy rice pancakes with a fluffy center, a Keralan specialty.", price: 40, image: "https://images.unsplash.com/photo-1668665632298-c114cf7d2714?w=800&q=80" },
                    // ... 12 more bread/rice items
                ]
            },
        ]
    },
    {
        id: 'final_touches_collection',
        name: 'Sweet Endings',
        categories: [
            {
                id: 'desserts', name: 'Desserts', icon: <DessertIcon />, dishes: [
                    { id: 401, name: "Vancho Pudding", description: "A delightful duet of rich dark chocolate and creamy white chocolate pudding.", price: 300, image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80", isSpecial: true },
                    { id: 402, name: "Tender Coconut Soufflé", description: "A light and airy dessert with the refreshing, delicate flavor of tender coconut.", price: 320, image: "https://images.unsplash.com/photo-1612119432342-3e720330181a?w=800&q=80" },
                    { id: 403, name: "Payasam of the Day", description: "A traditional sweet pudding, capturing the essence of Keralan celebration.", price: 180, image: "https://images.unsplash.com/photo-1609457390214-a93132d91b4b?w=800&q=80" },
                    // ... 12 more dessert items
                ]
            },
        ]
    },
];

// =================================================================
// == 4. CUSTOMER REVIEWS DATA
// =================================================================
export const reviews: Review[] = [
    { id: 1, name: 'Aarav Nair', quote: 'An absolutely unforgettable experience. The Meen Pollichathu was divine. It felt like a journey back in time.', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Priya Menon', quote: 'The ambience is simply magical. Every dish tells a story of heritage. We will be back for the Duck Mappas!', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, name: 'Rohan Kumar', quote: 'From the service to the last bite of the Tender Coconut Soufflé, everything was impeccable. A true gem in Thiruvananthapuram.', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
];

// =================================================================
// == 5. GALLERY DATA
// =================================================================
export const galleryItems: GalleryItem[] = [
    { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80', aspectRatio: 'aspect-w-3 aspect-h-4' },
    { id: 2, type: 'video', src: 'https://videos.pexels.com/video-files/3209828/3209828-hd_1080_1920_25fps.mp4', aspectRatio: 'aspect-w-3 aspect-h-5' },
    { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', aspectRatio: 'aspect-w-4 aspect-h-3' },
    { id: 4, type: 'image', src: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&q=80', aspectRatio: 'aspect-w-3 aspect-h-4' },
    { id: 5, type: 'video', src: 'https://videos.pexels.com/video-files/5947125/5947125-hd_1920_1080_25fps.mp4', aspectRatio: 'aspect-w-4 aspect-h-3' },
    // ... 7 more items
];
