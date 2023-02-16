import React, { useState } from 'react'

const useHttp = (requestConfig) =>
{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (taskText) =>
    {
        setIsLoading(true);
        setError(null);
        try
        {
            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method,
                headers: requestConfig.headers,
                body: JSON.stringify(requestConfig.body)
            }
            );

            if (!response.ok)
            {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            const loadedTasks = [];

            for (const taskKey in data)
            {
                loadedTasks.push({ id: taskKey, text: data[taskKey].text });
            }

        } catch (err)
        {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };

    return (
        <div>useHttp</div>
    )
}

export default useHttp