export const generateMetadata = async () => {
    return {
        title: `BagasBgy | Licenses`,
        description: "License attributions",
    }
}

const Licenses = async () => {
    return <div>
        <div className="text-4xl text-primary font-bold">Licenses</div>
        <ul className="list-disc pt-7 pl-4">
            <li className="text-lg font-semibold">Favicon Emoji</li>
            <p>The favicon emoji graphic is generated using <a href="https://favicon.io/" target="_blank">favicon.io</a>, which uses <a href="https://twemoji.twitter.com/" target="_blank">Twemoji</a> that distributed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a> license.</p>
        </ul>
    </div>
}

export default Licenses
