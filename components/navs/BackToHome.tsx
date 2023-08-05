import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import Link from "next/link"

const BackToHome = () => {
    return <Link className="inline-flex flex-row items-center text-lg font-bold pt-7" href="/">
        <ArrowLeftIcon className="h-5 w-5" />
        &nbsp;Back to Home
    </Link>

}

export default BackToHome
