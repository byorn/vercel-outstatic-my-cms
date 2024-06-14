---
title: 'NextJS 14 Social Login with NextAuth'
status: 'published'
author:
  name: 'Byorn John De Silva'
  picture: 'https://avatars.githubusercontent.com/u/962948?v=4'
slug: 'nextjs-14-social-login-with-nextauth'
description: 'Get users to login with a github account . OAuth with Github flow.'
coverImage: '/images/social-media-card-g3Nj.png'
tags: [{"value":"nextJs","label":"NextJs"},{"label":"NextAuth","value":"nextAuth"}]
publishedAt: '2024-06-14T12:13:58.116Z'
---

In this article I will describe the step by step process how I got a user with a github account to login in a NextJS app.

**Step1: Initialise a NextJS project and Install NextAuth**

we will be using the bleeding edge NextAuth version 5 which is in beta release. at the time of writing this blog NextAuth is currently on version 4 in the documentation [here](https://next-auth.js.org/getting-started/introduction)

```node-repl
> npm install next-auth:5.0.0-beta.19
```

**Step 2: create a auth.ts file inside a lib folder**

![](/images/screenshot-2024-06-14-at-9.23.26-pm-UxMz.png)

```
import NextAuth from 'next-auth';
import Facebook from 'next-auth/providers/facebook';
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Facebook, GitHub, Google]
});
```

Step 3: Add your credentials to .env.local

```
AUTH_GITHUB_ID='XXXXXXXXXXXXX'
AUTH_GITHUB_SECRET='XXXXXXXXXXXXX'
AUTH_SECRET='XXXXXXXXXXXXX'
```

You will need to login to Github and Facebook and create these credentials. There are plenty of youtube vedios out there you can follow to see how its created. The AUTH_SECRET is a value you provide.

**Step 4: Create a simple server page under app folder.**

example inside /app/comments/page.tsx

```
import { auth, signIn, signOut } from '@/lib/auth';
import SessionData from "@/components/session-data";
export default async  function Page(){
    const session = await auth();
    const user = session?.user;


    if (!user) {
        return (
            <form
                action={async () => {
                    'use server';
                    await signIn('github');
                }}
            >
                <button type="submit">Sign In</button>
            </form>
        );
    }
    return <>

        <SessionData sessionFromServer={session} />
        <br/>
        comments


    </>
}
```

SessionData is inside /components/session-data

```
import { signOut} from "@/lib/auth";
type ISessionDataProps = {
    sessionFromServer: object
}
export default async function SessionData({sessionFromServer}:ISessionDataProps){


    return <>

        Session From Server Data: <br/>
        {JSON.stringify(sessionFromServer)} <br/><br/>

        <form
            action={async () => {
                "use server"
                await signOut()
            }}
            className="w-full"
        >
            <button type={"submit"}>
                Sign Out
            </button>
        </form>

    </>
}
```

And thats It folk! Leave a comment if it went well. cheers.