export default function Sidebar() {
  return (
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-red-900 text-white p-4">
      <ul className="space-y-2">
        <li>Add User</li>
        <li>User Pool</li>
        <li>App Client</li>
      </ul>
    </aside>
  );
}
