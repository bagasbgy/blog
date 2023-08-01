'use client'

import { TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TelegramShareButton, TelegramIcon, LinkedinShareButton, LinkedinIcon } from "next-share"

const ShareButtons = ({ path, title }: { path: string, title: string }) => {
    const url = `${process.env.NEXT_PUBLIC_URL}/blog/${path}`
    return <>
        <LinkedinShareButton
            url={url}
            title={title}
        >
            <LinkedinIcon size={28} round />
        </LinkedinShareButton>
        <TwitterShareButton
            url={url}
            title={title}
        >
            <TwitterIcon size={28} round />
        </TwitterShareButton>
        <FacebookShareButton
            url={url}
            title={title}
        >
            <FacebookIcon size={28} round />
        </FacebookShareButton>
        <WhatsappShareButton
            url={url}
            title={title}
        >
            <WhatsappIcon size={28} round />
        </WhatsappShareButton>
        <TelegramShareButton
            url={url}
            title={title}
        >
            <TelegramIcon size={28} round />
        </TelegramShareButton>
    </>
}

export default ShareButtons
