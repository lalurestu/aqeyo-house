<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\Menu;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $roomsCount = Room::count();
        $menuCount = Menu::count();

        return Inertia::render('Admin/Dashboard', [
            'roomsCount' => $roomsCount,
            'menuCount' => $menuCount,
        ]);
    }
}
