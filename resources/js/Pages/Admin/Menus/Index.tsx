import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCoffee, FaSearch } from 'react-icons/fa';

interface Menu {
    id: string;
    name: string;
    price: string;
    category: string;
    description: string;
}

interface MenusIndexProps {
    menus: Menu[];
}

const CATEGORIES = ['Semua', 'Makanan', 'Minuman', 'Paket Se-Sele/Begibung', 'Snack', 'Dessert', 'Tambahan'];

const CATEGORY_COLORS: Record<string, string> = {
    'Makanan': 'bg-orange-100 text-orange-800 border-orange-200',
    'Minuman': 'bg-blue-100 text-blue-800 border-blue-200',
    'Paket Se-Sele/Begibung': 'bg-purple-100 text-purple-800 border-purple-200',
    'Snack': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Dessert': 'bg-pink-100 text-pink-800 border-pink-200',
    'Tambahan': 'bg-gray-100 text-gray-800 border-gray-200',
};

export default function MenusIndex({ menus }: MenusIndexProps) {
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Yakin ingin menghapus menu "${name}"?`)) {
            router.delete(route('admin.menus.destroy', id));
        }
    };

    const filteredMenus = menus.filter((menu) => {
        const matchesCategory = selectedCategory === 'Semua' || menu.category === selectedCategory;
        const matchesSearch =
            menu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (menu.description && menu.description.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <AdminLayout title="Manajemen Menu Cafe - Admin AQEYO">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-serif">Manajemen Menu Cafe</h1>
                        <p className="text-gray-500 mt-1">Kelola daftar makanan, minuman, dan snack di Social Space.</p>
                    </div>
                    <Link
                        href={route('admin.menus.create')}
                        className="inline-flex items-center justify-center px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-sm font-medium text-sm gap-2"
                    >
                        <FaPlus className="text-xs" />
                        Tambah Menu
                    </Link>
                </div>

                {/* Filter and Search Toolbar */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari menu berdasarkan nama atau deskripsi..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                        />
                    </div>

                    {/* Category Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-sm">
                        {CATEGORIES.map((category) => {
                            const isSelected = selectedCategory === category;
                            const count =
                                category === 'Semua'
                                    ? menus.length
                                    : menus.filter((m) => m.category === category).length;

                            return (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition cursor-pointer text-xs sm:text-sm flex items-center gap-1.5 ${
                                        isSelected
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <span>{category}</span>
                                    <span
                                        className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                                            isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                                        }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {filteredMenus.length === 0 ? (
                        <div className="p-12 text-center">
                            <FaCoffee className="mx-auto text-4xl text-gray-300 mb-3" />
                            <p className="text-gray-500 font-medium">Tidak ada item menu yang sesuai filter.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50/75 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Nama Menu</th>
                                        <th className="px-6 py-4">Kategori</th>
                                        <th className="px-6 py-4">Harga</th>
                                        <th className="px-6 py-4">Deskripsi</th>
                                        <th className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {filteredMenus.map((menu) => (
                                        <tr key={menu.id} className="hover:bg-gray-50/50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-semibold text-gray-900">{menu.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${
                                                        CATEGORY_COLORS[menu.category] || 'bg-gray-100 text-gray-800'
                                                    }`}
                                                >
                                                    {menu.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">
                                                {menu.price}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                                {menu.description || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route('admin.menus.edit', menu.id)}
                                                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition"
                                                        title="Edit"
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(menu.id, menu.name)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                                                        title="Hapus"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
