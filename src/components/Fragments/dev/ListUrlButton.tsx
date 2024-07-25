import { getBaseHostList } from "@/api/DevApi";
import { Loading } from "@/components/Elements/Loading";
import { ChangeEvent, Fragment, useEffect, useState } from "react"

interface ListButtonProps {
    handleChange : (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

export const ListUrlButton = (props: ListButtonProps) => {
    const [baseUrl, setBaseUrl] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBaseUrl = async () => {
            try {
                let response = await getBaseHostList()
                setBaseUrl(response.data.baseUrl);
            } catch (error) {
                console.error('Error fetching the base URL:', error);
                setError('failed to fetch data')
            } finally {
                setLoading(false)
            }
        };

        fetchBaseUrl();
    }, []);

    if(loading) {
        return <>
            <div className="">
                <Loading />
            </div>
        </>
    }

    if(error) {
        return <>
            <div className="">
                {error}
            </div>
        </>
    }

    return <>
        <Fragment>
            <div className="mx-2">
            <ul>
                {Object.entries(baseUrl).map(([key, value]) => (
                    <li className="my-2">
                        <input className="mr-2" type="radio" id={key} value={key} name="url_key" onChange={props.handleChange}/><label htmlFor={key}>{key}</label>
                    </li>
                ))}
            </ul>

            </div>

        </Fragment>
    </>
}