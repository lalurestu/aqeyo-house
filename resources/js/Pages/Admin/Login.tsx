import { FormEventHandler, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Admin Login - AQEYO" />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-primary font-serif">
                            AQEYO House
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Silakan masuk untuk mengelola sistem
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={submit}>
                        {errors.username && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg text-center font-medium border border-red-200">
                                {errors.username}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={data.username}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    placeholder="Masukkan username"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => setData('username', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    placeholder="Masukkan password"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-gray-300 text-primary shadow-sm focus:ring-primary"
                                    />
                                    <span className="ms-2 text-sm text-gray-600">Ingat saya</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg shadow transition disabled:opacity-50 cursor-pointer"
                        >
                            {processing ? 'Memproses...' : 'Masuk'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
