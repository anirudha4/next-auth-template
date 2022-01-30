import React, { useEffect } from 'react';
import { Avatar, Button, Grid, Text } from '@nextui-org/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link'

export default function Navbar() {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session) {
            router.replace('/dashboard')
        }
    }, [session])
    return (
        <Grid.Container justify='space-between'>
            <Link href='/dashboard'>
                <a>
                    <Text
                        h1
                        size={24}
                        css={{
                            textGradient: '45deg, $blue500 -20%, $pink500 50%'
                        }}
                        weight="bold"
                    >
                        Todo Ape
                    </Text>
                </a>
            </Link>
            <div>
                {session ? (
                    <Grid.Container css={{
                        gap: 20
                    }}>
                        <Avatar src={session.user.image} />
                        <Button auto onClick={signOut} color='error'>Logout</Button>
                    </Grid.Container>
                ) :
                    <Button auto onClick={e => signIn('google', { callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL })} >Login with Google</Button>}
            </div>
        </Grid.Container>
    );
}
