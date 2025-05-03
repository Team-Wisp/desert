// app/dashboard/page.tsx
import { headers } from 'next/headers';

export default async function DashboardPage() {
  const headersList = await headers(); 

  const userId = headersList.get('x-user-id');
  const org = headersList.get('x-org');
  const orgType = headersList.get('x-org-type');

  if (!userId) {
    return <p>Access denied</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to TeamWisp</h1>
      <p>User ID: {userId}</p>
      <p>Organization: {org}</p>
      <p>Type: {orgType}</p>
    </div>
  );
}
