'use client';

import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';

export default function SignOutButton() {
  return (
    <button 
      onClick={async () => {
        try {
          await signOut(auth);
          document.cookie = '__session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          window.location.href = '/admin/login';
        } catch (e) {
          console.error(e);
        }
      }}
      className="text-sm font-medium text-gray-600 hover:text-gray-900"
    >
      Sign Out
    </button>
  );
}
