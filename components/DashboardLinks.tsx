'use client'
import Link from 'next/link'
import { GiNightSleep } from "@react-icons/all-files/gi/GiNightSleep";
import { HiEmojiSad } from "@react-icons/all-files/hi/HiEmojiSad";
import { RiDashboardFill } from "@react-icons/all-files/ri/RiDashboardFill";
import { GiMeditation } from "@react-icons/all-files/gi/GiMeditation";
import { usePathname } from 'next/navigation';

const links = [
    { component: RiDashboardFill, link: "/folder", name: "book" },
    { component: GiMeditation, link: "/folder/waiting", name: "waiting list" },
    { component: GiNightSleep, link: "/folder/building", name: "Location" },
    { component: HiEmojiSad, link: "/folder/therapist", name: "therapist" },
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
                                        <div className={`${iconObj.link === path ? 'bg-slate-500 text-white' : 'hover:bg-slate-600 bg-slate-400 hover:text-white'} text-[21px] p-2 rounded-2xl icon-container`}>
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