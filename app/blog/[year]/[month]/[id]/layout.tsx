const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div className="card lg:w-3/4 mx-auto bg-base-200 shadow-lg shadow-base-200">
        <div className="card-body">
            {children}
        </div>
    </div>
}

export default Layout
