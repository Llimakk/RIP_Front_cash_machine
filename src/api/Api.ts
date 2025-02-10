/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Operation {
  /** ID */
  id?: number;
  /** Owner */
  owner?: string;
  /** Moderator */
  moderator?: string;
  /** Bills */
  bills?: string;
  /** Статус */
  status?: 1 | 2 | 3 | 4 | 5;
  /**
   * Дата создания
   * @format date-time
   */
  date_created?: string | null;
  /**
   * Дата формирования
   * @format date-time
   */
  date_formation?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  date_complete?: string | null;
  /** Field */
  field?: string | null;
  /**
   * Success
   * @min -2147483648
   * @max 2147483647
   */
  success?: number | null;
}

export interface BillOperation {
  /** ID */
  id?: number;
  /**
   * Count
   * @min -2147483648
   * @max 2147483647
   */
  count?: number;
  /** Bill */
  bill?: number | null;
  /** Operation */
  operation?: number | null;
}

export interface UpdateOperationStatusAdmin {
  /** Status */
  status: number;
}

export interface BillAdd {
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /**
   * Год выпуска
   * @min -2147483648
   * @max 2147483647
   */
  year: number;
  /**
   * Фото
   * @format uri
   */
  image?: string | null;
}

export interface Bill {
  /** ID */
  id?: number;
  /** Image */
  image?: string;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /** Статус */
  status?: 1 | 2;
  /**
   * Год выпуска
   * @min -2147483648
   * @max 2147483647
   */
  year: number;
}

export interface UserLogin {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserRegister {
  /** ID */
  id?: number;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

export interface UserProfile {
  /**
   * Username
   * @minLength 1
   */
  username?: string;
  /**
   * Email
   * @minLength 1
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   */
  password?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  operations = {
    /**
     * No description
     *
     * @tags operations
     * @name OperationsList
     * @request GET:/operations/
     * @secure
     */
    operationsList: (
      query?: {
        status?: number;
        date_formation_start?: string;
        date_formation_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/operats/search/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags operations
     * @name OperationsRead
     * @request GET:/operations/{operation_id}/
     * @secure
     */
    operationsRead: (operationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/operats/${operationId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags operations
     * @name OperationsDeleteDelete
     * @request DELETE:/operations/{operation_id}/delete/
     * @secure
     */
    operationsDeleteDelete: (operationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/operats/${operationId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags operations
     * @name OperationsDeleteBillDelete
     * @request DELETE:/operations/{operation_id}/delete_bill/{bill_id}/
     * @secure
     */
    operationsDeleteBillDelete: (operationId: string, billId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/operats/${operationId}/delete_bill/${billId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags operations
     * @name OperationsUpdateUpdate
     * @request PUT:/operations/{operation_id}/update/
     * @secure
     */
    operationsUpdateUpdate: (operationId: string, data: Operation, params: RequestParams = {}) =>
      this.request<Operation, any>({
        path: `/operats/${operationId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags operations
     * @name OperationsUpdateBillUpdate
     * @request PUT:/operations/{operation_id}/update_bill/{bill_id}/
     * @secure
     */
    operationsUpdateBillUpdate: (
      operationId: string,
      billId: string,
      data: BillOperation,
      params: RequestParams = {},
    ) =>
      this.request<BillOperation, any>({
        path: `/operats/${operationId}/update_bill/${billId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags operations
     * @name OperationsUpdateStatusAdminUpdate
     * @request PUT:/operations/{operation_id}/update_status_admin/
     * @secure
     */
    operationsUpdateStatusAdminUpdate: (
      operationId: string,
      data: UpdateOperationStatusAdmin,
      params: RequestParams = {},
    ) =>
      this.request<UpdateOperationStatusAdmin, any>({
        path: `/operats/${operationId}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags operations
     * @name OperationsUpdateStatusUserUpdate
     * @request PUT:/operations/{operation_id}/update_status_user/
     * @secure
     */
    operationsUpdateStatusUserUpdate: (operationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/operats/${operationId}/update_status_user/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  bills = {
    /**
     * No description
     *
     * @tags bills
     * @name BillsList
     * @request GET:/bills/
     * @secure
     */
    billsList: (
      query?: {
        bill_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/bills/search/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bills
     * @name BillsCreateCreate
     * @request POST:/bills/create/
     * @secure
     */
    billsCreateCreate: (
      data: {
        /**
         * @minLength 1
         * @maxLength 100
         */
        name: string;
        /**
         * @minLength 1
         * @maxLength 500
         */
        description: string;
        /**
         * @min -2147483648
         * @max 2147483647
         */
        year: number;
        /** @format binary */
        image?: File | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<BillAdd, any>({
        path: `/bills/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags bills
     * @name BillsRead
     * @request GET:/bills/{bill_id}/
     * @secure
     */
    billsRead: (billId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bills/${billId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bills
     * @name BillsAddToOperationCreate
     * @request POST:/bills/{bill_id}/add_to_operation/
     * @secure
     */
    billsAddToOperationCreate: (billId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bills/${billId}/add_to_operat/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bills
     * @name BillsDeleteDelete
     * @request DELETE:/bills/{bill_id}/delete/
     * @secure
     */
    billsDeleteDelete: (billId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bills/${billId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bills
     * @name BillsUpdateUpdate
     * @request PUT:/bills/{bill_id}/update/
     * @secure
     */
    billsUpdateUpdate: (billId: string, data: Bill, params: RequestParams = {}) =>
      this.request<Bill, any>({
        path: `/bills/${billId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags bills
     * @name BillsUpdateImageCreate
     * @request POST:/bills/{bill_id}/update_image/
     * @secure
     */
    billsUpdateImageCreate: (
      billId: string,
      data: {
        /** @format binary */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/bills/${billId}/update_image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),
    
    /**
     * No description
     *
     * @tags bills
     * @name BillsRestoreCreate
     * @request POST:/bills/{bill_id}/restore/
     * @secure
     */
    billsRestoreCreate: (billId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bills/${billId}/restore/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (data: UserLogin, params: RequestParams = {}) =>
      this.request<UserLogin, any>({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserRegister, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/{user_id}/update/
     * @secure
     */
    usersUpdateUpdate: (userId: string, data: UserProfile, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/users/${userId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
