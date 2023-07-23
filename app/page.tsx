import Image from "next/image"
import Link from "next/link"

import { getSortedPostsData, PostData } from "@/lib/posts"
import GithubLogo from "@/public/brands/github.svg"
import LinkedInLogo from "@/public/brands/linkedin.svg"
import TwitterLogo from "@/public/brands/twitter.svg"
import { Icon } from "@/components/icons"

const Home = () => {
  const postsData: Array<PostData> = getSortedPostsData()

  return (
    <main className="container min-h-screen mx-auto px-3 py-24">
      <div className="flex flex-row-reverse lg:flex-row flex-wrap justify-center">
        <div className="flex flex-col justify-center items-center w-full xl:min-w-sm xl:max-w-sm m-3 bg-slate-900 rounded-lg">
          <Image
            className="-translate-y-12 rounded-full border-8 border-emerald-500"
            src="/portrait.jpeg"
            alt="R. Dimas Bagas Herlambang"
            width={175}
            height={175}
          />
          <p className="-mt-5 text-xl text-emerald-500 font-semibold">R. Dimas Bagas Herlambang</p>
          <p className="pt-3 text-md font-light align-middle">
            <Icon className="text-lg mr-2 text-emerald-500" iconName="work" style={{ marginBottom: "0.175rem" }} />
            Deloitte - Financial Risk Advisory
          </p>
          <p className="pb-2 text-md font-light align-middle">
            <Icon className="text-lg mr-2 text-emerald-500" iconName="location_on" style={{ marginBottom: "0.175rem" }} />
            Jakarta, Indonesia
          </p>
          <div className="flex flex-row w-full justify-center items-center pt-2 pb-7">
            <Link
              className="w-6 h-6 mx-1"
              href="https://github.com/bagasbgy"
              target="_blank"
            >
              <GithubLogo />
            </Link>
            <Link
              className="w-6 h-6 mx-1"
              href="https://www.linkedin.com/in/dimasbagash/"
              target="_blank"
            >
              <LinkedInLogo />
            </Link>
            <Link
              className="w-6 h-6 mx-1"
              href="https://twitter.com/bagasbgy"
              target="_blank"
              style={{ paddingTop: "3px" }}
            >
              <TwitterLogo />
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center w-full xl:min-w-3xl xl:max-w-3xl m-3 bg-slate-900 rounded-lg">
        </div>
      </div>
    </main>
  )
}

export default Home
