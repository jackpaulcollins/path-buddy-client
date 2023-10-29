import React from 'react';
import {Link} from 'react-router-dom';

function Public() {
  return (
    <section className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <header className="text-3xl font-bold mb-8 text-slate-600">
        Welcome to Path Buddy!
      </header>
      <main className="text-lg text-gray-700 text-center mb-8">
        create and track the disciplines that define your journey
      </main>
      <div className="w-1/6 flex flex-row justify-around">
        <Link
          to="/login"
        >
          <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Login
          </button>
        </Link>
        <Link
          to="/register"
        >
          <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign up
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Public;
