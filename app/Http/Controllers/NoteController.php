<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;

class NoteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getUser(){
        return Auth::user()->name;
    }

    public function getProfile(){
        return Auth::user();
    }
}
