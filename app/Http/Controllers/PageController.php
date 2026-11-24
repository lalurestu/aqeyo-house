<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Room;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Public/Home');
    }

    public function rooms(): Response
    {
        $rooms = Room::all();
        return Inertia::render('Public/Rooms', [
            'rooms' => $rooms,
        ]);
    }

    public function socialSpace(): Response
    {
        $menus = Menu::all();
        return Inertia::render('Public/SocialSpace', [
            'menus' => $menus,
        ]);
    }

    public function gallery(): Response
    {
        return Inertia::render('Public/Gallery');
    }

    public function contact(): Response
    {
        return Inertia::render('Public/Contact');
    }
}
