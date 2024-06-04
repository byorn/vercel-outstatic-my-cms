"use client"
import Giscus from '@giscus/react';

type Props = {
    dateString?: string
}

const GiscussComments = ({ dateString }: Props) => {

    return <>
        <Giscus
            id="comments"
            repo="byorn/vercel-outstatic-my-cms"
            repoId="R_kgDOLsUohA"
            category="Announcements"
            categoryId="DIC_kwDOLsUohM4Cf2D9"
            mapping="pathname"
            term="Welcome to @giscus/react component!"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="light"
            lang="en"
            loading="lazy"
        />
        </>
}

export default GiscussComments
