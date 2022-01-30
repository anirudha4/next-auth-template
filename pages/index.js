import { Button, Text } from "@nextui-org/react";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div style={{ textAlign: 'center', paddingTop: '5em' }}>
      <Text
        h1
        size={60}
        css={{
          textGradient: '45deg, $blue500 -20%, $pink500 50%'
        }}
        weight="bold"
      >
        Create Todo's
      </Text>
      <Text
        h1
        size={60}
        css={{
          textGradient: '45deg, $purple500 -20%, $pink500 100%'
        }}
        weight="bold"
      >
        with Better UI
      </Text>
      <Text
        h1
        size={60}
        css={{
          textGradient: '45deg, $yellow500 -20%, $red500 100%'
        }}
        weight="bold"
      >
        and Nextjs
      </Text>
      <br />
      <br />
      <div style={{
        margin: '0 auto',
        width: 'fit-content'
      }}>
        <Button onClick={e => {
          session ? router.push('/dashboard') : signIn('google', { callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL })
        }} auto size={'xl'}>Get Started</Button>
      </div>
    </div>
  )
}
