'use client';

import { useState, useEffect } from 'react';
import { Permission } from '../../types/user';

export default function RBACExample() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPermissions() {
      try {
        const response = await fetch('/api/permissions');
        if (!response.ok) {
          throw new Error('Failed to fetch permissions');
        }
        const data = await response.json();
        console.log('data', data)
        setPermissions(data.permissions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPermissions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">RBAC Example</h1>
      <h2 className="text-xl font-semibold mb-2">Your Permissions:</h2>
      <ul className="list-disc pl-5">
        {permissions.map((permission, index) => (
          <li key={index}>
            Can {permission.action} {permission.subject}
          </li>
        ))}
      </ul>
    </div>
  );
}