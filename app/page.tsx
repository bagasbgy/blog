import Image from "next/image"
import { BriefcaseIcon, MapPinIcon } from "@heroicons/react/20/solid"
import { getSortedPostsData, PostData } from "@/lib/posts"
import { SocialIcon } from "react-social-icons"
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
            <SocialIcon
              className="mx-0.5"
              url='https://github.com/bagasbgy'
              target='_blank'
              fgColor="currentColor"
              bgColor="transparent"
            />
            <SocialIcon
              className="mx-0.5"
              url="https://www.linkedin.com/in/dimasbagash/"
              target='_blank'
              fgColor="currentColor"
              bgColor="transparent"
            />
            <SocialIcon
              className="mx-0.5"
              url="https://twitter.com/bagasbgy"
              target='_blank'
              fgColor="currentColor"
              bgColor="transparent"
            />
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
