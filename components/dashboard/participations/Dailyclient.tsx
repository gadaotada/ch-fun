'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent } from 'react';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

import { updateDailyStats } from '../../../lib/database/data/actions-mut';
import type { DailyUserStats } from "../../../types";
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { cn } from '../../../lib/utils';
import { Input } from '@/components/ui/input';
import CountdownTimer from './CountdownTimer';
import { Label } from '@/components/ui/label';

interface DailyparticipationCompProps {
    userId: number;
    dailyInfo: DailyUserStats | null;
}

const updateDailyStatsSchema = Yup.object().shape({
    note: Yup.string()
        .optional()
        .max(100, 'The note has to be a maximum of 100 chars.'),

    daily_field: Yup.number()
        .required('Daily field is required.'),
    totalValid: Yup.number().required('Count field is required').min(1, 'At least 1 pushup is required').max(99999, 'Is that you Chuck Norris? Please, lower the count!')
  });

const DailyparticipationComp: React.FC<DailyparticipationCompProps> = ({userId, dailyInfo}) => {
    const [note, setNote] = useState<string>(dailyInfo?.note ?? '');
    const [count, setCount] = useState<string>('0');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);

    const router = useRouter();
    
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (parseInt(e.target.value) < 0) {
            setCount('0')
            return;
        }  

        if (parseInt(e.target.value) > 99999) {
            setCount('99999')
            return;
        }

        setCount(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true);
        try {
            const daily_field = dailyInfo?.daily_field
            const totalValid = parseInt(count) + parseInt(dailyInfo?.count ?? '0')
            const check = await updateDailyStatsSchema.validate({ note, daily_field, totalValid }, { abortEarly: false });
            if (check) {
                const res = await updateDailyStats(userId, daily_field, note, count, dailyInfo?.count ?? '0');
               
                if (!res.isOk) {
                    toast.error(res.msg)
                } else {
                    toast.success(res.msg)
                    router.push('/leaderboard')
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
                <div className='min-w-[300px]'>

                    <div className='border border-slate-300 dark:border-slate-700 p-2 rounded-md min-w-[300px]'>
                        <h1 className='text-center uppercase text-2xl'>Day {dailyInfo?.indexNum}</h1>
                        
                        {dailyInfo?.finished === 'no' ? <div className='text-center min-w-[100px]'> <CountdownTimer targetDate={targetDate} /> </div> : <p className='pt-4 text-center text-3xl text-green-500 font-bold'>COMPLETED</p>}
                    </div>
                    </div>
                <form 
                    className='flex flex-col justify-center items-end gap-y-4 min-w-[300px] p-4 border border-slate-600 rounded-md'
                    onSubmit={handleSubmit}
                >   
                    <div className='w-full flex flex-col justify-start items-center gap-y-2'>
                        <h3
                            className='w-full text-left'
                        >
                            TOTAL PUSHUPS: <span className='ml-2 italic'>{dailyInfo?.count ?? '0'}</span>
                        </h3>
                        <div className='w-full flex justify-start items-center gap-x-4'>
                            <Label
                                htmlFor='count'
                                className='text-left'
                            >
                                Add more:
                            </Label>
                            <Input 
                                id='count'
                                name='count'
                                value={parseInt(count)}
                                type='number'
                                min={0}
                                max={99999}
                                onChange={handleCountChange}
                                className={`w-[100px] ` + (error[0]?.toLowerCase().includes('count') ? cn('border-red-500') : '')}
                            />
                        </div>
                    </div>
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
                        Set
                    </Button>
                </form>
                <Button 
                    className='w-full mt-4'
                    onClick= {()=> router.push('/leaderboard')}
                > 
                    Go to Leaderboard
                </Button>
            </div>
        </>
    );
};

export default DailyparticipationComp;