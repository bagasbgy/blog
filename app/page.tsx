import Image from "next/image"
import Link from "next/link"
import { BriefcaseIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { getSortedPostsData, PostData } from "@/lib/posts"
import GithubLogo from "@/public/brands/github.svg"
import LinkedInLogo from "@/public/brands/linkedin.svg"
import TwitterLogo from "@/public/brands/twitter.svg"
import HomeTab from "@/components/HomeTab"

const Home = () => {
  const postsData: Array<PostData> = getSortedPostsData()

  return (
    <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5">
      <div className="card basis-full lg:basis-1/4 h-min bg-base-200 shadow-lg shadow-base-200">
        <div className="card-body flex flex-col items-center">
          <Image
            className="-translate-y-16 rounded-full border-8 border-primary"
            src="/portrait.jpeg"
            alt="R. Dimas Bagas Herlambang"
            width={175}
            height={175}
          />
          <div className="-mt-12 text-xl text-center text-primary font-semibold">
            R. Dimas Bagas Herlambang
          </div>
          <div className="inline-flex flex-row text-md font-light items-center pt-1">
            <BriefcaseIcon className="h-6 w-6 mr-1 text-primary" />
            Risk Advisory
          </div>
          <div className="inline-flex flex-row text-md font-light items-center pb-1">
            <MapPinIcon className="h-6 w-6 mr-[2px] text-primary" />
            Jakarta, Indonesia
          </div>
          <div className="flex flex-row w-full justify-center items-center pt-2">
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
      </div>
      <div className="card basis-full lg:basis-3/4 bg-base-200 shadow-lg shadow-base-200">
        <div className="card-body flex flex-col">
          <HomeTab postsData={postsData} />
        </div>
      </div>
    </div>
  )
}

export default Home
