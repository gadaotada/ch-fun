'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import * as Yup from 'yup';

import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
      .required('Email is required.')
      .min(3, 'The email has to be at least 3 characters long.')
      .max(100, 'The email has to be a maximum of 100 chars.')
      .email('Not a valid email.')
});


export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginValidationSchema.validate({ email }, { abortEarly: false });
    } catch (error) {
        const yupError = error as Yup.ValidationError;
        setError(yupError.errors);
        // get the errors as a string with multy lines
        const errorsString = yupError.errors.join('\n');
        toast.error(errorsString);
        setLoading(false);
        return;
    }

    const res = await signIn('credentials', {
        email: email,
        redirect: false,
        callbackUrl: '/dashboard'
    }, );

    if (res?.error) {
        toast.error('Wrong email address')
    } else {
        router.push('/dashboard')
        router.refresh();
    }
    setLoading(false);
};

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Enter your Email</CardTitle>
        <CardDescription>Contact the admin if you want to join.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input 
                id="email" 
                placeholder="Email that gada gave you" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className={((error.includes('Email') || error.includes('email')) ? ' border-red-500' : '')}
              />
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type='submit' disabled={loading}>Login</Button>
      </CardFooter>
      </form>
    </Card>
  )
}
