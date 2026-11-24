import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { FaBed, FaCoffee, FaArrowRight, FaGlobe, FaPlus } from 'react-icons/fa';

interface DashboardProps {
    roomsCount: number;
    menuCount: number;
}

export default function Dashboard({ roomsCount, menuCount }: DashboardProps) {
    return (
        <AdminLayout title="Dashboard - Admin AQEYO">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-serif">Ringkasan Dashboard</h1>
                        <p className="text-gray-500 mt-1">Selamat datang kembali di panel administrasi AQEYO House.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium shadow-sm"
                        >
                            <FaGlobe className="text-gray-500" />
                            Lihat Website
                        </a>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Rooms Card */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-4 rounded-xl bg-blue-50 text-blue-600">
                                <FaBed className="text-2xl" />
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                                Guesthouse
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Kamar Terdaftar</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{roomsCount}</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <Link
                                href={route('admin.rooms.index')}
                                className="text-sm font-medium text-primary hover:text-secondary inline-flex items-center gap-1 transition"
                            >
                                Kelola Kamar <FaArrowRight className="text-xs" />
                            </Link>
                            <Link
                                href={route('admin.rooms.create')}
                                className="text-xs bg-primary/10 text-primary hover:bg-primary/20 px-2.5 py-1 rounded-md font-medium transition inline-flex items-center gap-1"
                            >
                                <FaPlus className="text-[10px]" /> Tambah
                            </Link>
                        </div>
                    </div>

                    {/* Menus Card */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-4 rounded-xl bg-amber-50 text-amber-600">
                                <FaCoffee className="text-2xl" />
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                                Social Space
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Menu Cafe</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{menuCount}</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <Link
                                href={route('admin.menus.index')}
                                className="text-sm font-medium text-primary hover:text-secondary inline-flex items-center gap-1 transition"
                            >
                                Kelola Menu <FaArrowRight className="text-xs" />
                            </Link>
                            <Link
                                href={route('admin.menus.create')}
                                className="text-xs bg-amber-100 text-amber-800 hover:bg-amber-200 px-2.5 py-1 rounded-md font-medium transition inline-flex items-center gap-1"
                            >
                                <FaPlus className="text-[10px]" /> Tambah
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 font-serif mb-4">Pintasan Cepat</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <Link
                            href={route('admin.rooms.create')}
                            className="p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition flex items-center gap-3 group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition">
                                <FaPlus />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 text-sm">Tambah Kamar Baru</h3>
                                <p className="text-xs text-gray-500">Tambahkan tipe kamar & fasilitas</p>
                            </div>
                        </Link>

                        <Link
                            href={route('admin.menus.create')}
                            className="p-4 rounded-xl border border-gray-200 hover:border-amber-500 hover:bg-amber-50/50 transition flex items-center gap-3 group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition">
                                <FaPlus />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 text-sm">Tambah Menu Cafe</h3>
                                <p className="text-xs text-gray-500">Makanan, minuman, snack, dll.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
