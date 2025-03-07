@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>Admin Dashboard</h2>
        <a href="{{ route('websites.create') }}" class="btn btn-primary">Add Website</a>
        <table class="table table-bordered mt-3">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>URL</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($websites as $website)
                    <tr>
                        <td>{{ $website->name }}</td>
                        <td>{{ $website->url }}</td>
                        <td>{{ $website->status }}</td>
                        <td>
                            <form action="{{ route('websites.destroy', $website->id) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger">Delete</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
