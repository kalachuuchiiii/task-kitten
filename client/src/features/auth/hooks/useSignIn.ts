import { useState, type FormEvent } from 'react';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { useNavigate } from 'react-router-dom';
import { useSession } from './useSession';

import type { SignInForm } from '../types/auth.types';
import { API } from '@/utils';

export const useSignIn = () => {
    const [form, setForm] = useState<SignInForm>({
        username: '',
        password: ''
    })

    const nav = useNavigate();
    const { getSession } = useSession();
  

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev, 
            [name]: value
        }))
    }

    const { mutate: handleSignIn, isPending} = useMutation({
        mutationFn: async(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const p = API.post("/auth/sign-in", { ...form });
            toast.promise(p, {
                loading: 'Signing you in...',
                success: 'Sign in successful!',
                error: (err) => getErrorMessage(err)
            })
            return await p;
        },
        onSuccess: async() => {
            await getSession();
            nav('/home');
        }
    })

    return {
        form,
        handleChangeForm,
        handleSignIn,
        isSigningIn: isPending
    }

}