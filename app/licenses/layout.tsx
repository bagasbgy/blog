import SinglePage from "@/components/layout/SinglePage"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <SinglePage>
        {children}
    </SinglePage>
}

export default Layout
