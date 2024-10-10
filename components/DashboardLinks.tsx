'use client'
import Link from 'next/link'
import { RiDashboardFill } from "@react-icons/all-files/ri/RiDashboardFill";
import { FaClipboardList } from "@react-icons/all-files/fa/FaClipboardList";
import { FaLocationArrow } from "@react-icons/all-files/fa/FaLocationArrow";
import { MdPerson } from "@react-icons/all-files/md/MdPerson";
import { usePathname } from 'next/navigation';

const links = [
    { component: RiDashboardFill, link: "/folder", name: "book" },
    { component: FaClipboardList, link: "/folder/waiting", name: "waiting list" },
    { component: FaLocationArrow, link: "/folder/building", name: "Location" },
    { component: MdPerson, link: "/folder/therapist", name: "therapist" },
];

const DashboardLinks = () => {
    const path = usePathname();
    return (
        <div className="mt-10">
            <div className='flex gap-6'>
                {
                    links.map((iconObj, index) => {
                        const IconComponent = iconObj.component;
                        return (
                            <Link href={iconObj.link} passHref key={index}>
                                <div className="icon-label">
                                    <div className={`flex flex-col gap-1 items-center capitalize`}>
                                        <div className={`${iconObj.link === path ? 'bg-slate-600 text-white' : 'hover:bg-slate-600 bg-slate-400 text-white text-white'} text-[21px] p-2 rounded-2xl icon-container`}>
                                            <IconComponent className={`text-[25px]`} />
                                        </div>
                                        <p className={`${iconObj.link === path ? 'font-semibold text-white' : 'hover:text-white'}`}>{iconObj.name}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default DashboardLinks