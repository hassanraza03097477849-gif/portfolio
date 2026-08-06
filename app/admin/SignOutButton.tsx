'use client';

import React from 'react';

export default function SignOutButton() {
  return (
    <button 
      onClick={async () => {
        const { getAuth, signOut } = await import('firebase/auth');
        await signOut(getAuth());
        document.cookie = '__session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/admin/login';
      }}
      className="text-sm font-medium text-gray-600 hover:text-gray-900"
    >
      Sign Out
    </button>
  );
}
