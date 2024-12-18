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

export interface Bill {
  /** ID */
  id?: number;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /** Статус */
  status?: 1 | 2;
  /**
   * Image
   * @minLength 1
   * @maxLength 100
   */
  image?: string;
  /**
   * Year
   * @minLength 1
   * @maxLength 100
   */
  year?: string;
  /** Описание */
  description?: string;
}

export interface Operat {
  /** ID */
  id?: number;
  /** Bills */
  bills?: string;
  /** Owner */
  owner?: string;
  /** Moderator */
  moderator?: string;
  /** Manager */
  manager?: string;
  /** Bills count */
  bills_count?: string;
  /** Статус */
  status?: 1 | 2 | 3 | 4 | 5;
  /**
   * Дата создания
   * @format date-time
   */
  date_created?: string;
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
  /**
   * Address
   * @minLength 1
   * @maxLength 255
   */
  address?: string;
  /** Success */
  success?: boolean | null;
}

export interface BillOperat {
  /** ID */
  id?: number;
  /**
   * Колличество
   * @min -2147483648
   * @max 2147483647
   */
  count?: number;
  /** Bill */
  bill?: number | null;
  /** Operat */
  operat?: number | null;
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
   * Имя
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Фамилия
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

export interface User {
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
   * Имя
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Фамилия
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Дата регистрации
   * @format date-time
   */
  date_joined?: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
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
  bills = {
    /**
     * No description
     *
     * @tags bills
     * @name BillsCreateCreate
     * @request POST:/bills/create/
     * @secure
     */
    billsCreateCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bills/create/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bills
     * @name BillsSearchList
     * @request GET:/bills/search/
     * @secure
     */
    billsSearchList: (
      query?: {
        query?: string;
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
     * @name BillsAddToOperatCreate
     * @request POST:/bills/{bill_id}/add_to_operat/
     * @secure
     */
    billsAddToOperatCreate: (billId: string, params: RequestParams = {}) =>
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
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags bills
     * @name BillsUpdateImageUpdate
     * @request PUT:/bills/{bill_id}/update_image/
     * @secure
     */
    billsUpdateImageUpdate: (billId: string, data: Bill, params: RequestParams = {}) =>
      this.request<Bill, any>({
        path: `/bills/${billId}/update_image/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  operats = {
    /**
     * No description
     *
     * @tags operats
     * @name OperatsSearchList
     * @request GET:/operats/search/
     * @secure
     */
    operatsSearchList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/operats/search/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags operats
     * @name OperatsRead
     * @request GET:/operats/{operat_id}/
     * @secure
     */
    operatsRead: (operatId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/operats/${operatId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags operats
     * @name OperatsDeleteDelete
     * @request DELETE:/operats/{operat_id}/delete/
     * @secure
     */
    operatsDeleteDelete: (operatId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/operats/${operatId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags operats
     * @name OperatsDeleteBillDelete
     * @request DELETE:/operats/{operat_id}/delete_bill/{bill_id}/
     * @secure
     */
    operatsDeleteBillDelete: (operatId: string, billId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/operats/${operatId}/delete_bill/${billId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags operats
     * @name OperatsUpdateUpdate
     * @request PUT:/operats/{operat_id}/update/
     * @secure
     */
    operatsUpdateUpdate: (operatId: string, data: Operat, params: RequestParams = {}) =>
      this.request<Operat, any>({
        path: `/operats/${operatId}/update/`,
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
     * @tags operats
     * @name OperatsUpdateBillUpdate
     * @request PUT:/operats/{operat_id}/update_bill/{bill_id}/
     * @secure
     */
    operatsUpdateBillUpdate: (operatId: string, billId: string, data: BillOperat, params: RequestParams = {}) =>
      this.request<BillOperat, any>({
        path: `/operats/${operatId}/update_bill/${billId}/`,
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
     * @tags operats
     * @name OperatsUpdateStatusAdminUpdate
     * @request PUT:/operats/{operat_id}/update_status_admin/
     * @secure
     */
    operatsUpdateStatusAdminUpdate: (operatId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/operats/${operatId}/update_status_admin/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags operats
     * @name OperatsUpdateStatusUserUpdate
     * @request PUT:/operats/{operat_id}/update_status_user/
     * @secure
     */
    operatsUpdateStatusUserUpdate: (operatId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/operats/${operatId}/update_status_user/`,
        method: "PUT",
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
    usersUpdateUpdate: (userId: string, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
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
