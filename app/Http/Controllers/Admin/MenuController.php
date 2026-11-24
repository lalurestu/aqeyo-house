<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(): Response
    {
        $menus = Menu::latest()->get();

        return Inertia::render('Admin/Menus/Index', [
            'menus' => $menus,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Menus/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'string', 'max:100'],
            'category' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
        ]);

        Menu::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'category' => $validated['category'],
            'description' => $validated['description'] ?? '',
        ]);

        return redirect()->route('admin.menus.index')->with('success', 'Item menu berhasil ditambahkan.');
    }

    public function edit(string $id): Response
    {
        $menu = Menu::findOrFail($id);

        return Inertia::render('Admin/Menus/Form', [
            'menu' => $menu,
        ]);
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $menu = Menu::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'string', 'max:100'],
            'category' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
        ]);

        $menu->update([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'category' => $validated['category'],
            'description' => $validated['description'] ?? '',
        ]);

        return redirect()->route('admin.menus.index')->with('success', 'Item menu berhasil diperbarui.');
    }

    public function destroy(string $id): RedirectResponse
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();

        return redirect()->route('admin.menus.index')->with('success', 'Item menu berhasil dihapus.');
    }
}
