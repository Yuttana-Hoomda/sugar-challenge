"use client";
import { signOut } from "next-auth/react";

export default function GoogleSignOut() {
    return (
        <button
            onClick={() => signOut()}
            type="button"
            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-red-500 me-2 mb-2"
        >
            <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M12 0a12 12 0 0 1 11.985 11.45C21.862 5.717 17.122 0 12 0 5.372 0 0 5.373 0 12s5.372 12 12 12c5.122 0 9.862-5.717 11.985-11.45A11.99 11.99 0 0 1 12 24a12 12 0 0 1-11.985-11.45C2.138 18.283 6.878 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.24 18.633c-1.053.663-2.523.675-3.78-.11-1.258-.784-1.673-2.294-1.091-3.61.44-.977 1.487-1.57 2.49-1.53a2.99 2.99 0 0 1 2.36 1.08c1.274 1.35 1.054 3.493-.012 4.45z"/>
            </svg>
            Sign Out
        </button>
    );
}
