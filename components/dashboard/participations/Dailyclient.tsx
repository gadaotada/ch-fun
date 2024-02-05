'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

import { updateDailyStats } from '../../../lib/database/data/actions-mut';
import type { DailyUserStats } from "../../../types";
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { cn } from '../../../lib/utils';

interface DailyparticipationCompProps {
    userId: number;
    dailyInfo: DailyUserStats | null;
}

const updateDailyStatsSchema = Yup.object().shape({
    note: Yup.string()
        .optional()
        .max(100, 'The note has to be a maximum of 100 chars.'),

    daily_field: Yup.number()
        .required('Daily field is required.')
  });

const DailyparticipationComp: React.FC<DailyparticipationCompProps> = ({userId, dailyInfo}) => {
    const [timer, setTimer] = useState<string>('00:00:00');
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    const [note, setNote] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);

    const router = useRouter();

    useEffect(() => {
        setHasMounted(true);
        
        if (hasMounted) {
            const interval = setInterval(() => {
                setTimer(countdownToMidnight());
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [hasMounted]);

    function countdownToMidnight(): string {
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const diff = midnight.getTime() - now.getTime();

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true);
        try {
            const daily_field = dailyInfo?.daily_field
            const check = await updateDailyStatsSchema.validate({ note, daily_field }, { abortEarly: false });
            if (check) {
                const res = await updateDailyStats(userId, daily_field, note);
               
                if (!res) {
                    toast.error('Something went wrong... Please try again later.')
                } else {
                    toast.success('Good job!')
                    router.push('/dashboard')
                    router.refresh();
                }
                setLoading(false);
            }
        } catch (error) {
            const yupError = error as Yup.ValidationError;
            setError(yupError.errors);
            // get the errors as a string with multy lines
            const errorsString = yupError.errors.join('\n');
            toast.error(errorsString);
            setLoading(false);
            return;
        }

    };
 
    return (
        <>
            <div className='flex flex-col justify-center items-center gap-y-4'>
                <div className='h-20 min-w-[300px]'>
                {hasMounted && 
                    (<div className='border border-slate-300 dark:border-slate-700 p-2 rounded-md min-w-[300px]'>
                        <h1 className='text-center uppercase text-2xl'>Day {dailyInfo?.indexNum}</h1>
                        
                        {dailyInfo?.finished === 'no' ? <p className='text-center min-w-[100px]'> {timer}</p> : <p className='pt-4 text-center text-3xl text-green-500 font-bold'>COMPLETED</p>}
                    </div>)}
                    </div>
                {   dailyInfo?.finished === 'no' ?
                <form 
                    className='flex flex-col justify-center items-end gap-y-4 min-w-[300px]'
                    onSubmit={handleSubmit}
                >
                    <Textarea 
                        placeholder='Add a note...'
                        name='note'
                        autoComplete='off'
                        value={note}
                        maxLength={100}
                        onChange={(e) => setNote(e.target.value)}
                        className={`w-full ` + (error[0]?.includes('The note has') ? cn('border-red-500') : '')}
                    />
                    <Button 
                        type='submit'
                        className='w-full'
                        disabled={loading}
                    >
                        Complete
                    </Button>
                </form>
            : <Button 
                className='w-full mt-4'

                onClick= {()=> router.push('/leaderboard')}
            > 
                Go to Leaderboard
            </Button>}
            </div>
        </>
    );
};

export default DailyparticipationComp;