import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { FaPlus, FaEdit, FaTrash, FaBed } from 'react-icons/fa';

interface Room {
    id: string;
    slug: string;
    name: string;
    price: string;
    description: string;
    image: string;
    amenities?: string;
}

interface RoomsIndexProps {
    rooms: Room[];
}

export default function RoomsIndex({ rooms }: RoomsIndexProps) {
    const handleDelete = (id: string, name: string) => {
        if (confirm(`Yakin ingin menghapus kamar "${name}"?`)) {
            router.delete(route('admin.rooms.destroy', id));
        }
    };

    return (
        <AdminLayout title="Manajemen Kamar - Admin AQEYO">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-serif">Manajemen Kamar</h1>
                        <p className="text-gray-500 mt-1">Kelola data kamar dan akomodasi di guesthouse.</p>
                    </div>
                    <Link
                        href={route('admin.rooms.create')}
                        className="inline-flex items-center justify-center px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-sm font-medium text-sm gap-2"
                    >
                        <FaPlus className="text-xs" />
                        Tambah Kamar
                    </Link>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {rooms.length === 0 ? (
                        <div className="p-12 text-center">
                            <FaBed className="mx-auto text-4xl text-gray-300 mb-3" />
                            <p className="text-gray-500 font-medium">Belum ada data kamar.</p>
                            <Link
                                href={route('admin.rooms.create')}
                                className="mt-4 inline-flex items-center text-sm text-primary hover:underline gap-1"
                            >
                                <FaPlus className="text-xs" /> Tambah kamar pertama
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50/75 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Foto</th>
                                        <th className="px-6 py-4">Nama Kamar</th>
                                        <th className="px-6 py-4">Slug</th>
                                        <th className="px-6 py-4">Harga</th>
                                        <th className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {rooms.map((room) => (
                                        <tr key={room.id} className="hover:bg-gray-50/50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img
                                                    src={room.image}
                                                    alt={room.name}
                                                    className="w-16 h-12 rounded-lg object-cover border border-gray-200"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/assets/img/rooms/space3.jpeg';
                                                    }}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900">{room.name}</div>
                                                <div className="text-xs text-gray-500 line-clamp-1 max-w-xs">{room.description}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                                {room.slug}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">
                                                {room.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route('admin.rooms.edit', room.id)}
                                                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition"
                                                        title="Edit"
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(room.id, room.name)}
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
