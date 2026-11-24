import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface Menu {
    id: string;
    name: string;
    price: string;
    category: string;
    description: string;
}

interface MenuFormProps {
    menu?: Menu;
}

const CATEGORIES = ['Makanan', 'Minuman', 'Paket Se-Sele/Begibung', 'Snack', 'Dessert', 'Tambahan'];

export default function MenuForm({ menu }: MenuFormProps) {
    const isEdit = !!menu;

    const { data, setData, post, put, processing, errors } = useForm({
        name: menu?.name || '',
        price: menu?.price || '',
        category: menu?.category || CATEGORIES[0],
        description: menu?.description || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.menus.update', menu.id));
        } else {
            post(route('admin.menus.store'));
        }
    };

    return (
        <AdminLayout title={`${isEdit ? 'Edit' : 'Tambah'} Menu - Admin AQEYO`}>
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.menus.index')}
                        className="p-2.5 bg-white border border-gray-200 text-gray-600 hover:text-primary rounded-lg transition"
                    >
                        <FaArrowLeft />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-serif">
                            {isEdit ? 'Edit Item Menu' : 'Tambah Menu Baru'}
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {isEdit ? `Memperbarui item menu: ${menu.name}` : 'Masukkan informasi menu makanan/minuman baru.'}
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nama Menu <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                placeholder="Contoh: Nasi Goreng Spesial atau Aren Latte"
                                required
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Kategori <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
                                    required
                                >
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Harga <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    placeholder="Contoh: 35K atau IDR 35.000"
                                    required
                                />
                                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Deskripsi (Opsional)
                            </label>
                            <textarea
                                rows={3}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                placeholder="Komposisi atau penjelasan hidangan..."
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                            <Link
                                href={route('admin.menus.index')}
                                className="px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium text-sm transition"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium text-sm shadow transition disabled:opacity-50 cursor-pointer"
                            >
                                {processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Menu'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
