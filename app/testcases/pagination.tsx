"use client"

import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link'
import Image from 'next/image';
import PixelArrow from "@/public/plainarrow.svg"

export default function Pagination({previous, next} : {previous: boolean, next:boolean}){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    }

    return (
        <div className='flex my-2'>
            {previous 
                ?   <Link href={createPageURL(currentPage - 1)} className="pr-2">
                        <Image priority src={PixelArrow} alt="Previous" className="h-5 w-5 transform -scale-x-100"/>
                    </Link>
                :   <span className="pr-2">
                        <Image priority src={PixelArrow} alt="Previous" className="h-5 w-5 transform -scale-x-100"/>
                    </span>
            }
            {next 
                ?   <Link href={createPageURL(currentPage + 1)} className="pr-2">
                        <Image priority src={PixelArrow} alt="Next" className='h-5 w-5'/>
                    </Link> 
                :   <span className="pr-2">
                        <Image priority src={PixelArrow} alt="Next" className='h-5 w-5'/>
                    </span>
            }
        </div>
    );
}