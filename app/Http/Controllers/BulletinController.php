<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Bulletin;
use App\Http\Requests\StoreBulletinRequest;
use App\Http\Requests\UpdateBulletinRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Redirector;
use Inertia\Inertia;

class BulletinController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Admin/Bulletin',[
            "posts"=>Bulletin::orderBy('id','DESC')->paginate(10),
        ]);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function showPublic(){
        return Bulletin::all()->where('show',true);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Bulletin/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'=> 'required',
        ]);

        $bulletin = Bulletin::create([
            'title' => $request->title,
            'text'=> $request->text,
            'user_id' => Auth::id(),
        ]);


        return redirect('admin/bulletin');
    }

    /**
     * Display the specified resource.
     *
     * @param  INT ID
     * @return Response
     */
    public function show($id)
    {
        return Bulletin::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Bulletin  $bulletin
     * @return \Inertia\Response
     */
    public function edit(Bulletin $bulletin)
    {
        return Inertia::render('Admin/Bulletin/Update',$bulletin);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBulletinRequest  $request
     * @param  \App\Models\Bulletin  $bulletin
     * @return Response
     */
    public function update(Bulletin $bulletin, UpdateBulletinRequest $request)
    {
        $bulletin->update(
            $request->validated()
        );
        return Redirect::back;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Bulletin  $bulletin
     * @return Response
     */
    public function destroy(Bulletin $bulletin)
    {
        $bulletin->delete();
        return Redirect('admin.bulletin.index');
    }
}
