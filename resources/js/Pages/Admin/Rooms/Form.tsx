import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState, ChangeEvent } from 'react';
import { FaArrowLeft, FaUpload, FaImage } from 'react-icons/fa';

interface Room {
    id: string;
    slug: string;
    name: string;
    price: string;
    description: string;
    image: string;
    amenities?: string;
}

interface RoomFormProps {
    room?: Room;
}

export default function RoomForm({ room }: RoomFormProps) {
    const isEdit = !!room;

    // Parse existing amenities if string JSON
    let initialAmenities = '';
    if (room?.amenities) {
        try {
            const parsed = JSON.parse(room.amenities);
            initialAmenities = Array.isArray(parsed) ? parsed.join(', ') : room.amenities;
        } catch {
            initialAmenities = room.amenities;
        }
    }

    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        slug: string;
        description: string;
        price: string;
        image: string;
        amenities: string;
        file: File | null;
        _method?: string;
    }>({
        name: room?.name || '',
        slug: room?.slug || '',
        description: room?.description || '',
        price: room?.price || '',
        image: room?.image || '',
        amenities: initialAmenities,
        file: null,
        ...(isEdit ? { _method: 'PUT' } : {}),
    });

    const [previewUrl, setPreviewUrl] = useState<string>(room?.image || '');

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setData((prev) => ({
            ...prev,
            name: val,
            slug: isEdit ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setData('file', selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Convert comma-separated amenities into JSON string
        const amenitiesArray = data.amenities
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);

        const payloadData = {
            ...data,
            amenities: JSON.stringify(amenitiesArray),
        };

        if (isEdit) {
            post(route('admin.rooms.update', room.id), {
                forceFormData: true,
            });
        } else {
            post(route('admin.rooms.store'), {
                forceFormData: true,
            });
        }
    };

    return (
        <AdminLayout title={`${isEdit ? 'Edit' : 'Tambah'} Kamar - Admin AQEYO`}>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.rooms.index')}
                        className="p-2.5 bg-white border border-gray-200 text-gray-600 hover:text-primary rounded-lg transition"
                    >
                        <FaArrowLeft />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-serif">
                            {isEdit ? 'Edit Kamar' : 'Tambah Kamar Baru'}
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {isEdit ? `Memperbarui detail kamar: ${room.name}` : 'Masukkan informasi kamar untuk guesthouse.'}
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Kamar <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={handleNameChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    placeholder="Contoh: Deluxe Double Room"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Slug URL <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    placeholder="deluxe-double-room"
                                    required
                                />
                                {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    placeholder="Contoh: $85 atau IDR 1.200.000"
                                    required
                                />
                                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                            </div>

                            {/* Amenities */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fasilitas (Pisahkan dengan koma)
                                </label>
                                <input
                                    type="text"
                                    value={data.amenities}
                                    onChange={(e) => setData('amenities', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    placeholder="King Bed, Garden View, Free Wi-Fi"
                                />
                                {errors.amenities && <p className="mt-1 text-sm text-red-600">{errors.amenities}</p>}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Deskripsi <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={4}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                placeholder="Jelaskan detail dan kenyamanan kamar..."
                                required
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        {/* Image Upload / URL */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Foto Kamar</label>
                            <div className="flex flex-col sm:flex-row items-start gap-6">
                                {previewUrl ? (
                                    <div className="relative w-40 h-28 rounded-xl overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-40 h-28 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 flex-shrink-0">
                                        <FaImage className="text-2xl mb-1" />
                                        <span className="text-xs">Belum ada foto</span>
                                    </div>
                                )}

                                <div className="flex-1 space-y-3 w-full">
                                    <div>
                                        <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition">
                                            <FaUpload className="text-xs text-gray-500" />
                                            Pilih File Gambar Baru
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>
                                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP hingga 5MB</p>
                                    </div>

                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Atau gunakan URL gambar:</label>
                                        <input
                                            type="text"
                                            value={data.image}
                                            onChange={(e) => {
                                                setData('image', e.target.value);
                                                if (!data.file) setPreviewUrl(e.target.value);
                                            }}
                                            placeholder="https://images.unsplash.com/... atau /assets/img/..."
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
                                        />
                                    </div>
                                </div>
                            </div>
                            {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                            <Link
                                href={route('admin.rooms.index')}
                                className="px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium text-sm transition"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium text-sm shadow transition disabled:opacity-50 cursor-pointer"
                            >
                                {processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Kamar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
