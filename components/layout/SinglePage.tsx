import BackToHome from "../navs/BackToHome"

const SinglePage = ({ children }: { children: React.ReactNode }) => {
    return <div className="card lg:w-1/2 mx-auto bg-base-200 shadow-lg shadow-base-200">
        <div className="card-body">
            {children}
            <BackToHome />
        </div>
    </div>
}

export default SinglePage
