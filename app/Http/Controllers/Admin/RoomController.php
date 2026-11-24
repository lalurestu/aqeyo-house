<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    public function index(): Response
    {
        $rooms = Room::latest()->get();

        return Inertia::render('Admin/Rooms/Index', [
            'rooms' => $rooms,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Rooms/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:rooms,slug'],
            'description' => ['required', 'string'],
            'price' => ['required', 'string', 'max:100'],
            'image' => ['nullable', 'string'],
            'file' => ['nullable', 'image', 'max:5120'],
            'amenities' => ['nullable', 'string'],
        ]);

        $data = [
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'image' => $validated['image'] ?? '/assets/img/rooms/space3.jpeg',
            'amenities' => $validated['amenities'] ?? json_encode([]),
        ];

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('rooms', 'public');
            $data['image'] = '/storage/' . $path;
        }

        Room::create($data);

        return redirect()->route('admin.rooms.index')->with('success', 'Kamar berhasil ditambahkan.');
    }

    public function edit(string $id): Response
    {
        $room = Room::findOrFail($id);

        return Inertia::render('Admin/Rooms/Form', [
            'room' => $room,
        ]);
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $room = Room::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('rooms', 'slug')->ignore($room->id)],
            'description' => ['required', 'string'],
            'price' => ['required', 'string', 'max:100'],
            'image' => ['nullable', 'string'],
            'file' => ['nullable', 'image', 'max:5120'],
            'amenities' => ['nullable', 'string'],
        ]);

        $data = [
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'image' => $validated['image'] ?? $room->image,
            'amenities' => $validated['amenities'] ?? $room->amenities,
        ];

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('rooms', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $room->update($data);

        return redirect()->route('admin.rooms.index')->with('success', 'Kamar berhasil diperbarui.');
    }

    public function destroy(string $id): RedirectResponse
    {
        $room = Room::findOrFail($id);
        $room->delete();

        return redirect()->route('admin.rooms.index')->with('success', 'Kamar berhasil dihapus.');
    }
}
