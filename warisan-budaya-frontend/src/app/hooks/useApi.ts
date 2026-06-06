import { useQuery, useMutation, useQueryClient, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import type { PaginationParams, PaginatedResponse, ApiResponse } from '../types';

// ============================================================
// GENERIC HOOKS
// ============================================================

interface UseListQueryOptions<T> extends Omit<UseQueryOptions<AxiosResponse<PaginatedResponse<T>>>, 'queryKey' | 'queryFn'> {
  params?: PaginationParams;
}

interface UseDetailQueryOptions<T> extends Omit<UseQueryOptions<AxiosResponse<ApiResponse<T>>>, 'queryKey' | 'queryFn'> {}

export function useListQuery<T>(
  key: string,
  fetchFn: (params?: PaginationParams) => Promise<AxiosResponse<PaginatedResponse<T>>>,
  options?: UseListQueryOptions<T>
) {
  const { params, ...queryOptions } = options || {};

  return useQuery({
    queryKey: [key, params],
    queryFn: () => fetchFn(params),
    ...queryOptions,
  });
}

export function useDetailQuery<T>(
  key: string,
  id: number | string | undefined,
  fetchFn: (id: number | string) => Promise<AxiosResponse<ApiResponse<T>>>,
  options?: UseDetailQueryOptions<T>
) {
  return useQuery({
    queryKey: [key, id],
    queryFn: () => fetchFn(id!),
    enabled: !!id,
    ...options,
  });
}

export function useCreateMutation<T, TData = Partial<T>>(
  key: string,
  createFn: (data: TData) => Promise<AxiosResponse<ApiResponse<T>>>,
  options?: UseMutationOptions<AxiosResponse<ApiResponse<T>>, Error, TData>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFn,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [key] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}

export function useUpdateMutation<T, TData = Partial<T>>(
  key: string,
  updateFn: (id: number | string, data: TData) => Promise<AxiosResponse<ApiResponse<T>>>,
  options?: UseMutationOptions<AxiosResponse<ApiResponse<T>>, Error, { id: number | string; data: TData }>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateFn(id, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [key] });
      queryClient.invalidateQueries({ queryKey: [key, variables.id] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}

export function useDeleteMutation(
  key: string,
  deleteFn: (id: number | string) => Promise<AxiosResponse<ApiResponse<void>>>,
  options?: UseMutationOptions<AxiosResponse<ApiResponse<void>>, Error, number | string>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFn,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [key] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}

// ============================================================
// SPECIALIZED HOOKS FACTORY
// ============================================================

export function createResourceHooks<T>(key: string, api: {
  getAll: (params?: PaginationParams) => Promise<AxiosResponse<PaginatedResponse<T>>>;
  getOne: (id: number | string) => Promise<AxiosResponse<ApiResponse<T>>>;
  create: (data: Partial<T>) => Promise<AxiosResponse<ApiResponse<T>>>;
  update: (id: number | string, data: Partial<T>) => Promise<AxiosResponse<ApiResponse<T>>>;
  delete: (id: number | string) => Promise<AxiosResponse<ApiResponse<void>>>;
}) {
  return {
    useList: (params?: PaginationParams, options?: UseListQueryOptions<T>) =>
      useListQuery(key, api.getAll, { params, ...options }),

    useDetail: (id: number | string | undefined, options?: UseDetailQueryOptions<T>) =>
      useDetailQuery(key, id, api.getOne, options),

    useCreate: (options?: UseMutationOptions<AxiosResponse<ApiResponse<T>>, Error, Partial<T>>) =>
      useCreateMutation(key, api.create, options),

    useUpdate: (options?: UseMutationOptions<AxiosResponse<ApiResponse<T>>, Error, { id: number | string; data: Partial<T> }>) =>
      useUpdateMutation(key, api.update, options),

    useDelete: (options?: UseMutationOptions<AxiosResponse<ApiResponse<void>>, Error, number | string>) =>
      useDeleteMutation(key, api.delete, options),
  };
}
