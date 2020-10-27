import Axios, { AxiosInstance } from 'axios';
import { ResultOk, ResultFail, ResultOK, ResultFAIL } from 'node-result';

import { CarrierService, CarrierServicesCreate } from './types/carrier_service';
import { ScriptTag, ScriptTagCreate, ScriptTagId } from './types/script_tag';
import { WebHookId, WebHookCreate } from './types/webhook';

export class Shopify {
  private readonly instance: AxiosInstance;

  constructor(baseURL: string, timeout = 1000, headers = {}) {
    this.instance = Axios.create({ baseURL, timeout, headers });
  }

  async getCarrierServices(): Promise<ResultOK<CarrierService[]> | ResultFAIL<Error>> {
    try {
      const {
        data: { carrier_services },
      } = await this.instance.get('/admin/api/2020-10/carrier_services.json');
      return ResultOk(carrier_services);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async createCarrierService(
    carrierServicesCreate: CarrierServicesCreate,
  ): Promise<ResultOK<CarrierService> | ResultFAIL<Error>> {
    try {
      const payload = {
        carrier_service: carrierServicesCreate,
      };
      const {
        data: { carrier_service },
      } = await this.instance.post('/admin/api/2020-10/carrier_services.json', payload);
      return ResultOk(carrier_service);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getScriptTags(): Promise<ResultOK<ScriptTag[]> | ResultFAIL<Error>> {
    try {
      const {
        data: { script_tags },
      } = await this.instance.get('/admin/api/2020-07/script_tags.json');
      return ResultOk(script_tags);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async createScriptTag(scriptTagCreate: ScriptTagCreate): Promise<ResultOK<ScriptTag> | ResultFAIL<Error>> {
    try {
      const payload = {
        script_tag: scriptTagCreate,
      };
      const {
        data: { script_tag },
      } = await this.instance.post('/admin/api/2020-07/script_tags.json', payload);
      return ResultOk(script_tag);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getScriptTag(id: ScriptTagId): Promise<ResultOK<ScriptTag> | ResultFAIL<Error>> {
    try {
      const {
        data: { script_tag },
      } = await this.instance.get(`/admin/api/2020-10/script_tags/${id}.json`);
      return ResultOk(script_tag);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async deleteScriptTag(id: ScriptTagId): Promise<ResultOK<ScriptTag> | ResultFAIL<Error>> {
    try {
      await this.instance.delete(`/admin/api/2020-10/script_tags/${id}.json`);
      return ResultOk(null);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getWebHooks() {
    try {
      const {
        data: { webhooks },
      } = await this.instance.get('/admin/api/2020-10/webhooks.json');
      return ResultOk(webhooks);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getWebHook(id: WebHookId) {
    try {
      const {
        data: { webhook },
      } = await this.instance.get(`/admin/api/2019-10/webhooks/${id}.json`);
      return ResultOk(webhook);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async createWebHook(webHookCreate: WebHookCreate) {
    try {
      const payload = {
        webhook: webHookCreate,
      };
      const {
        data: { webhook },
      } = await this.instance.post('/admin/api/2020-10/webhooks.json', payload);
      return ResultOk(webhook);
    } catch (error) {
      return ResultFail(error);
    }
  }
}
