import Link from "next/link"
import { Fragment } from "react"

export const Navbar = () => {
    return (
        <Fragment>
            <div className="bg-green-500 text-white py-4 px-8">
                <div className="flex justify-between items-center">
                    <div className="text-xl font-bold">
                        <Link href="/">Neo-Post</Link>
                    </div>
                    <div className="flex space-x-4 font-bold">
                        <Link href="/testdata/create" className="hover:bg-green-600 py-2 px-4 rounded">
                            Test
                        </Link>
                        <Link href="/testrecord" className="hover:bg-green-600 py-2 px-4 rounded">
                            See Records
                        </Link>
                    </div>
                </div>
            </div>  
        </Fragment>
    )
}