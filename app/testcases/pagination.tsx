"use client"

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link'

export default function Pagination() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    }

    return (
        <div>
          <Link href={createPageURL(currentPage - 1)} className="pr-2">Previous</Link>
          <Link href={createPageURL(currentPage + 1)} className="pr-2">Next</Link>
        </div>
    );
}