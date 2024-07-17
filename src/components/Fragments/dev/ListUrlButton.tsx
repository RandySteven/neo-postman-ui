import { getBaseHostList } from "@/api/DevApi";
import { ChangeEvent, Fragment, useEffect, useState } from "react"

interface ListButtonProps {
    handleChange : (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

export const ListUrlButton = (props: ListButtonProps) => {
    const [baseUrl, setBaseUrl] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchBaseUrl = async () => {
            try {
                let response = await getBaseHostList()
                setBaseUrl(response.data.baseUrl);
            } catch (error) {
                console.error('Error fetching the base URL:', error);
            }
        };

        fetchBaseUrl();
    }, []);
    return <>
        <Fragment>
            <div className="flex">
                {Object.entries(baseUrl).map(([key, value]) => (
                    <div className="mx-2">
                        <input type="radio" id={key} value={key} name="url_key" onChange={props.handleChange}/><label htmlFor={key}>{key}</label>
                    </div>
                ))}
            </div>
        </Fragment>
    </>
}