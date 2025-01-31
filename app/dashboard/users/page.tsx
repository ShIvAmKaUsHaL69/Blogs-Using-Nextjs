import Link from "next/link";

export default function page() {
  return (
    <div>
      <h1>users dashboard</h1>

      <ul className="mt-10">
        <li><Link href="/dashboard/users/1">user1</Link></li>
        <li><Link href="/dashboard/users/2">user2</Link></li>
        <li><Link href="/dashboard/users/3">user3</Link></li>
        <li><Link href="/dashboard/users/4">user4</Link></li>

      </ul>
    </div>
  )
}
