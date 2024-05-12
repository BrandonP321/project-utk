import {
  APIErrResponse,
  APIErrorsMap,
} from "@project-utk/shared/src/api/routes";
import { APIRequest, ReqParams } from "../api/APIHelpers";
import { useRef, useState } from "react";

export function useAPI<Req, Res, Errors extends APIErrorsMap<string>>(
  req: APIRequest<Req, Res, Errors>,
  reqParams?: ReqParams<Req, Res, Errors>,
) {
  const { onFailure, onFinally, onSuccess } = reqParams ?? {};

  const [isLoadingState, setIsLoadingState] = useState(false);
  const isLoadingRef = useRef(false);
  const setIsLoading = (isLoading: boolean) => {
    setIsLoadingState(isLoading);
    setIsLoadingState(isLoading);
  };

  const [error, setError] = useState<APIErrResponse<Errors> | null>(null);
  const [data, setData] = useState<Res | null>(null);

  const fetchAPI = async (reqBody: Req) => {
    if (isLoadingRef.current) {
      return;
    }

    setError(null);
    setIsLoading(true);

    return await req(reqBody, {
      onSuccess: async (res) => {
        setData(res);
        await onSuccess?.(res, reqBody);
      },
      onFailure: async (err) => {
        setError(err);
        await onFailure?.(err);
      },
      onFinally: async () => {
        setIsLoading(false);
        await onFinally?.();
      },
    });
  };

  return {
    isLoading: isLoadingState,
    fetchAPI,
    error,
    data,
  };
}
