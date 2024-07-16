import { Fragment } from "react"

export const Footer = () => {
    return (
        <Fragment>
            <footer className="bg-green-500 py-8 px-16 text-white">
                <div className="">
                    <span className="font-bold text-xl">
                        Neo Post
                    </span>
                    <div className="">
                        <ul>
                            <li>Github</li>
                            <li>Email</li>
                        </ul>
                    </div>
                </div>
                <div className="content-center">
                    © Randy Steven
                </div>
            </footer>           
        </Fragment>
    )
}