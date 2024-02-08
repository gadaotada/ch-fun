'use client'
import { useState,useEffect } from 'react'

import { Cross1Icon } from "@radix-ui/react-icons";
import { Check } from "lucide-react";
import { Button } from '../../components/ui/button';
import { Avatar, AvatarImage } from "../../components/ui/avatar"
import { DailyData, UserData } from '../../types';

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        // fix to prevent scrolling from happening when the modal is open
        const originalStyle = window.getComputedStyle(document.body).overflow;  
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = originalStyle;
        }

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
            <div className="bg-white max-h-[500px] md:max-h-[700px] dark:bg-gray-800 rounded shadow-lg p-4 relative max-w-[700px] w-full mx-4 overflow-y-auto">
                <Button onClick={onClose} className="absolute top-2 right-2" variant={'ghost'}>
                    <Cross1Icon className="h-4 w-4 text-red-500"/>
                </Button>
                {children}
            </div>
        </div>
    );
}

interface LeaderboardCompProps {
    impData: DailyData[]
}

const LeaderboardComp: React.FC<LeaderboardCompProps> = ({impData}) => {
    const [leaderboardData, setLeaderboardData] = useState<DailyData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDayData, setSelectedDayData] = useState<{day: number, users: UserData[]} | null>(null);

    const openModal = ({day, users}: {day: number, users: UserData[]}) => {
        setSelectedDayData({day, users});
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDayData(null);
    };
    useEffect(() => {
        const updatedData = [];
        for (let day = 1; day <= 31; day++) {
            const dayData = impData.find(d => d.day === day);
            if (dayData) {
                updatedData.push(dayData);
            } else {
                updatedData.push({
                    day: day,
                    users: [],
                });
            }
        }
        setLeaderboardData(updatedData);
    }, [impData]);

    return (
        <section className="p-4 w-full flex justify-center items-center">
            <div className="w-full max-w-6xl">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {leaderboardData.map(({ day, users }) => (
                        <div key={day} 
                            onClick={() => users.length > 0 && openModal({ day, users })}
                            className={` bg-slate-200 dark:bg-gray-800 shadow rounded p-4 transition-shadow` + 
                            (users.length === 0 ? " opacity-60 dark:opacity-15 cursor-not-allowed min-h-[80px] " : " cursor-pointer hover:shadow-slate-700 dark:hover:shadow-slate-100")}
                        >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center">Day {day}</h3>
                            {users.length > 0 ? (
                                <ul className="mt-2">
                                    {users.map(user => (
                                        <li key={user.userId} className="mb-1 text-sm text-gray-600 dark:text-gray-300 flex justify-start items-center gap-x-3">
                                            <Avatar>
                                                <AvatarImage src={user.avatar === "no-avatar" ? '/next.svg' : user.avatar} />
                                            </Avatar>
                                            <span>
                                                {user.username}
                                            </span> 
                                            <span>
                                                {user.finished === "yes" ? <Check className="h-4 w-4 text-green-500" /> : <Cross1Icon className="h-4 w-4 text-red-500"/>} 
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                null
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedDayData && (
                    <>
                        <h3 className="text-lg font-semibold">Day {selectedDayData?.day}</h3>
                        {selectedDayData.users.length > 0 ? (
                                <ul className="mt-2">
                                    {selectedDayData.users.map(user => (
                                        <li key={user.userId} className="mb-4 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <div className='flex justify-start items-center gap-x-2'>
                                                <Avatar>
                                                    <AvatarImage src={user.avatar === "no-avatar" ? '/next.svg' : user.avatar} />
                                                </Avatar>
                                                <span>
                                                    {user.username} Did <span className='text-green-500'>{user.count}</span> pushups so far.
                                                </span> 
                                                {user.time !== '-' ? 
                                                <span>Daily completed at <span className='text-yellow-500'>{user.time}</span>
                                                </span>
                                                :  <span>Daily not completed</span>}
                                            </div>
                                            <span className='italic'>
                                                {user.note} 
                                            </span>
                                        </li>
                                        
                                    ))}
                                </ul>
                            ) : (
                                null
                            )}
                    </>
                )}
            </Modal>
        </section>
    );
}

export default LeaderboardComp