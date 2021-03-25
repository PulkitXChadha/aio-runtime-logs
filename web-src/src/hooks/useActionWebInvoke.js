import { useState, useEffect } from "react";
import actionWebInvoke from "../utils";
import actions from "../config.json";
export const useActionWebInvoke = ({
  actionName,
  headers = {},
  params = {},
  cacheResponse = true,
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const key = actionName + JSON.stringify(headers) + JSON.stringify(params);

  console.log(`actionName = ${actionName} and key = ${key}`);
  useEffect(() => {
    const cachedValue = JSON.parse(sessionStorage.getItem(key));
    if (cachedValue && cacheResponse) {
      setData(cachedValue);
      setIsLoading(false);
    } else {
      actionWebInvoke(actions[actionName], headers, params)
        .then((response) => {
          setData(response);
          setIsLoading(false);
          sessionStorage.setItem(key, JSON.stringify(response));
        })
        .catch((e) => {
          console.log(`error = ${JSON.stringify(e)}`);
          setData(null);
          setIsLoading(false);
          setError(e);
        });
    }
  }, []);
  return { data, isLoading, error };
};
