<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Room;
use App\Models\Menu;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin User
        User::updateOrCreate(
            ['username' => 'admin'],
            [
                'password' => Hash::make('admin123'),
            ]
        );

        // 2. Rooms
        $rooms = [
            [
                'slug' => 'deluxe-double',
                'name' => 'Deluxe Double Room',
                'description' => 'A spacious room featuring a king-size bed, private balcony with garden views, and a modern en-suite bathroom.',
                'price' => '$85',
                'image' => 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop',
                'amenities' => json_encode(['King Bed', 'Garden View', 'En-suite Bathroom', 'Free Wi-Fi']),
            ],
            [
                'slug' => 'suite',
                'name' => 'Executive Suite',
                'description' => 'Experience luxury in our Executive Suite, offering a separate living area, kitchenette, and premium amenities.',
                'price' => '$120',
                'image' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
                'amenities' => json_encode(['King Bed', 'Living Area', 'Kitchenette', 'Bathtub']),
            ],
            [
                'slug' => 'family',
                'name' => 'Family Room',
                'description' => 'Perfect for families, this room includes two queen beds and ample space for everyone to relax comfortably.',
                'price' => '$100',
                'image' => 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop',
                'amenities' => json_encode(['2 Queen Beds', 'Spacious', 'Smart TV', 'Mini Fridge']),
            ],
        ];

        foreach ($rooms as $room) {
            Room::updateOrCreate(['slug' => $room['slug']], $room);
        }

        // 3. Cafe Menus
        Menu::truncate();

        $menuItems = [
            // MAKANAN
            ['name' => 'Nasi Goreng Ayam', 'price' => '32K', 'description' => 'Fried Rice with Chicken', 'category' => 'Makanan'],
            ['name' => 'Nasi Goreng Udang', 'price' => '32K', 'description' => 'Fried Rice with Shrimp', 'category' => 'Makanan'],
            ['name' => 'Nasi Goreng Telur', 'price' => '25K', 'description' => 'Fried Rice with Egg', 'category' => 'Makanan'],
            ['name' => 'Nasi Goreng Spesial', 'price' => '38K', 'description' => 'Fried Rice with Egg + Chicken', 'category' => 'Makanan'],
            ['name' => 'Nasi Rawon', 'price' => '50K', 'description' => 'Rawon Beef Soup with Rice', 'category' => 'Makanan'],
            ['name' => 'Lalapan Ikan Nila', 'price' => '40K', 'description' => 'Fried Fish with Fresh Vegetables & Sambal', 'category' => 'Makanan'],
            ['name' => 'Lalapan Ayam', 'price' => '40K', 'description' => 'Fried Chicken with Fresh Vegetables & Sambal', 'category' => 'Makanan'],
            ['name' => 'Lalapan Bebek', 'price' => '42K', 'description' => 'Fried Duck with Fresh Vegetables & Sambal', 'category' => 'Makanan'],
            ['name' => 'Pepes Ayam', 'price' => '35K', 'description' => 'Steamed Chicken in Banana Leaf', 'category' => 'Makanan'],
            ['name' => 'Sop Iga', 'price' => '50K', 'description' => 'Beef Rib Soup with Rice', 'category' => 'Makanan'],
            ['name' => 'Nasi Bakar Kemangi Ikan', 'price' => '32K', 'description' => 'Grilled Basil Rice with Fish', 'category' => 'Makanan'],
            ['name' => 'Nasi Bakar Kemangi Ayam', 'price' => '32K', 'description' => 'Grilled Basil Rice with Chicken', 'category' => 'Makanan'],
            ['name' => 'Nasi Kebuli Daging', 'price' => '60K', 'description' => 'Arabian Rice with Beef', 'category' => 'Makanan'],
            ['name' => 'Nasi Kebuli Ayam', 'price' => '50K', 'description' => 'Arabian Rice with Chicken', 'category' => 'Makanan'],
            ['name' => 'Sate Daging', 'price' => '50K', 'description' => 'Beef Satay', 'category' => 'Makanan'],
            ['name' => 'Sate Ayam', 'price' => '40K', 'description' => 'Chicken Satay', 'category' => 'Makanan'],
            ['name' => 'Chicken Wings', 'price' => '40K', 'description' => '', 'category' => 'Makanan'],
            ['name' => 'Spageti Carbonara', 'price' => '40K', 'description' => '', 'category' => 'Makanan'],
            ['name' => 'Spageti Bolognise', 'price' => '35K', 'description' => '', 'category' => 'Makanan'],

            // SNACK
            ['name' => 'Kentang Goreng', 'price' => '25K', 'description' => 'French Fries', 'category' => 'Snack'],
            ['name' => 'Pisang Goreng', 'price' => '25K', 'description' => 'Banana Fritters', 'category' => 'Snack'],
            ['name' => 'Nugget', 'price' => '25K', 'description' => 'Chicken Nuggets', 'category' => 'Snack'],
            ['name' => 'Dimsum Mentai', 'price' => '35K', 'description' => 'Dimsum with Mentaiko Sauce', 'category' => 'Snack'],
            ['name' => 'Dimsum Keju Goreng', 'price' => '35K', 'description' => 'Fried Cheese Dimsum', 'category' => 'Snack'],
            ['name' => 'Risol Mayo', 'price' => '30K', 'description' => 'Crispy Pastry Roll with Mayonnaise Filling', 'category' => 'Snack'],
            ['name' => 'Risol Rogut', 'price' => '30K', 'description' => 'Crispy Pastry Roll with Chicken & Vegetables Filling', 'category' => 'Snack'],
            ['name' => 'Stick Keju', 'price' => '25K', 'description' => 'Cheese Stick', 'category' => 'Snack'],
            ['name' => 'Risol Chococheese', 'price' => '25K', 'description' => 'Crispy Pastry Roll with Chocolate & Cheese Filling', 'category' => 'Snack'],

            // DESSERTS
            ['name' => 'Cheese Cake', 'price' => '35K', 'description' => '', 'category' => 'Dessert'],
            ['name' => 'Slice Cake', 'price' => '30K', 'description' => '', 'category' => 'Dessert'],
            ['name' => 'Brownis Cheese Cake', 'price' => '38K', 'description' => '', 'category' => 'Dessert'],

            // PAKET SE-SELE / BEGIBUNG
            ['name' => 'Gibung Special House', 'price' => '275K', 'description' => 'Complete Meal Set : Fish, Chicken, Spinach/Moringa Clear Soup, Beberoq/Pelecing kangkung, Tofu, Tempe & Rice', 'category' => 'Paket Se-Sele/Begibung'],

            // TAMBAHAN
            ['name' => 'Nasi Putih', 'price' => '10K', 'description' => 'Rice', 'category' => 'Tambahan'],
            ['name' => 'Tahu', 'price' => '18K', 'description' => 'Tofu', 'category' => 'Tambahan'],
            ['name' => 'Tempe', 'price' => '18K', 'description' => '', 'category' => 'Tambahan'],
            ['name' => 'Telur Dadar', 'price' => '20K', 'description' => 'Omelett', 'category' => 'Tambahan'],
            ['name' => 'Plecing', 'price' => '18K', 'description' => '', 'category' => 'Tambahan'],
            ['name' => 'Beberok Terong', 'price' => '18K', 'description' => '', 'category' => 'Tambahan'],
            ['name' => 'Sayur Bening + Sambal', 'price' => '10K', 'description' => 'Spinach Clear Soup + Sambal', 'category' => 'Tambahan'],

            // MINUMAN
            ['name' => 'Coffe Tubruk', 'price' => '20K', 'description' => 'House Drinks - Coffe', 'category' => 'Minuman'],
            ['name' => 'Merberry', 'price' => '28K', 'description' => 'House Drinks - Coffe', 'category' => 'Minuman'],
            ['name' => 'Merrissa', 'price' => '28K', 'description' => 'House Drinks - Coffe', 'category' => 'Minuman'],
            ['name' => 'Merranna', 'price' => '28K', 'description' => 'House Drinks - Coffe', 'category' => 'Minuman'],
            ['name' => 'Coffe Latte', 'price' => '28K', 'description' => 'House Drinks - Coffe', 'category' => 'Minuman'],
            ['name' => 'Cold Brew', 'price' => '25K', 'description' => 'House Drinks - Coffe', 'category' => 'Minuman'],
            ['name' => 'Aren Latte', 'price' => '30K', 'description' => 'House Drinks - Coffe', 'category' => 'Minuman'],
            ['name' => 'Matcha', 'price' => '28K', 'description' => 'House Drinks - Non Coffe with milk', 'category' => 'Minuman'],
            ['name' => 'Milo', 'price' => '28K', 'description' => 'House Drinks - Non Coffe with milk', 'category' => 'Minuman'],
            ['name' => 'Cokelat', 'price' => '28K', 'description' => 'House Drinks - Non Coffe with milk', 'category' => 'Minuman'],
            ['name' => 'Regal', 'price' => '28K', 'description' => 'House Drinks - Non Coffe with milk', 'category' => 'Minuman'],
            ['name' => 'Thaitea', 'price' => '28K', 'description' => 'House Drinks - Non Coffe with milk', 'category' => 'Minuman'],
            ['name' => 'Cincau', 'price' => '28K', 'description' => 'House Drinks - Non Coffe with milk', 'category' => 'Minuman'],
            ['name' => 'Matcha Berry', 'price' => '35K', 'description' => 'House Drinks - Non Coffe with milk', 'category' => 'Minuman'],
            ['name' => 'Iced Tea', 'price' => '15K', 'description' => 'House Drinks - Refresher', 'category' => 'Minuman'],
            ['name' => 'Iced Lemontea', 'price' => '20K', 'description' => 'House Drinks - Refresher', 'category' => 'Minuman'],
            ['name' => 'Orange Juice', 'price' => '20K', 'description' => 'House Drinks - Refresher', 'category' => 'Minuman'],
            ['name' => 'Palm Sugar Coconut', 'price' => '20K', 'description' => 'House Drinks - Refresher', 'category' => 'Minuman'],
            ['name' => 'Coconut with Syrup', 'price' => '20K', 'description' => 'House Drinks - Refresher', 'category' => 'Minuman'],
            ['name' => 'Unripened Coconut', 'price' => '25K', 'description' => 'House Drinks - Refresher', 'category' => 'Minuman'],
            ['name' => 'Avocado Juice', 'price' => '25K', 'description' => 'House Drinks - Refresher', 'category' => 'Minuman'],
            ['name' => 'Dragon Fruit Juice', 'price' => '20K', 'description' => 'House Drinks - Refresher', 'category' => 'Minuman'],
            ['name' => 'Summer Berries', 'price' => '33K', 'description' => 'House Drinks - Refresher', 'category' => 'Minuman'],
            ['name' => 'Mineral', 'price' => '10K', 'description' => 'House Drinks - Add Ons', 'category' => 'Minuman'],
            ['name' => 'Oat Milk', 'price' => '15K', 'description' => 'House Drinks - Add Ons', 'category' => 'Minuman'],
            ['name' => 'Espresso', 'price' => '15K', 'description' => 'House Drinks - Add Ons', 'category' => 'Minuman'],
        ];

        foreach ($menuItems as $item) {
            Menu::create($item);
        }
    }
}
