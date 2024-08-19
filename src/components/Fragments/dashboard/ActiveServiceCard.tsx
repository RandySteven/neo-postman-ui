import { GetActiveService } from "@/api/DashboardApi";
import { Loading } from "@/components/Elements/Loading";
import { act, useEffect, useState } from "react"

export const ActiveServiceCard = () => {
    const [activeServices, setActiveServices] = useState<ActiveServiceResponse[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
       const fetchActiveService = async () => {
            try {
                const response = await GetActiveService()
                setActiveServices(response.data.result)
            }catch(error) {
                setError('Failed to fetch data');
            }finally {
                setLoading(false)
            }
       }

       fetchActiveService()
    }, [])

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                {error}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-6">
            {activeServices?.map(activeService => (
                <div key={activeService.key} className="col-span-1 bg-white border border-gray-300 py-2 px-3">
                    <h5 className="text-xl font-bold">{activeService.key}</h5>
                    <div className="px-2">
                        <span className={setRadioActiveColor(activeService?.value)}></span>
                        <span className="pl-2">{activeService?.value === 1 ? "online" : "offline"}</span>
                    </div>

                </div>
            ))}
        </div>
    );
}

function setRadioActiveColor(value: number) : string {
    return value == 1 ? "bg-green-500 py-1 px-3 rounded-full" : "bg-red-500 px-2 py-2 rounded rounded-full"
}