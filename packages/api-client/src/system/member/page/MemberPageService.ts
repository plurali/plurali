import type { UpdatePageRequestInterface } from '@plurali/pluraliapp/src/application/v2/dto/page/request/UpdatePageRequestInterface';
import type { CreatePageRequestInterface } from '@plurali/pluraliapp/src/application/v2/dto/page/request/CreatePageRequestInterface';
import type { OkInterface } from '@plurali/pluraliapp/src/application/v2/dto/response/OkInterface';
import type { PageDtoInterface } from '@plurali/pluraliapp/src/application/v2/dto/page/PageDtoInterface';
import { $api, ApiService } from '../../../ApiService';
import type { ApiResponse } from '@plurali/pluraliapp/src/application/v2/types/response';

export class MemberPageService {
    constructor(private readonly api: ApiService) {}

    public async getPublicMemberPages(systemId: string, memberId: string): Promise<ApiResponse<PageDtoInterface[]>> {
        try {
          return (
            await this.api.client.request<ApiResponse<PageDtoInterface[]>>({
              url: `/v2/public/system/${systemId}/member/${memberId}/page`,
              method: 'GET',
            })
          ).data;
        } catch (error) {
          return this.api.handleException(error);
        }
      }
    
      public async getPublicMemberPage(
        systemId: string,
        memberId: string,
        pageId: string
      ): Promise<ApiResponse<PageDtoInterface>> {
        try {
          return (
            await this.api.client.request<ApiResponse<PageDtoInterface>>({
              url: `/v2/public/system/${systemId}/member/${memberId}/page/${pageId}`,
              method: 'GET',
            })
          ).data;
        } catch (error) {
          return this.api.handleException(error);
        }
      }
    
      public async getMemberPages(memberId: string): Promise<ApiResponse<PageDtoInterface[]>> {
        try {
          return (
            await this.api.client.request<ApiResponse<PageDtoInterface[]>>({
              url: `/v2/member/${memberId}/page`,
              method: 'GET',
            })
          ).data;
        } catch (error) {
          return this.api.handleException(error);
        }
      }
    
      public async getMemberPage(memberId: string, pageId: string): Promise<ApiResponse<PageDtoInterface>> {
        try {
          return (
            await this.api.client.request<ApiResponse<PageDtoInterface>>({
              url: `/v2/member/${memberId}/page/${pageId}`,
              method: 'GET',
            })
          ).data;
        } catch (error) {
          return this.api.handleException(error);
        }
      }
    
      public async updateMemberPage(
        memberId: string,
        pageId: string,
        data: Partial<UpdatePageRequestInterface>
      ): Promise<ApiResponse<PageDtoInterface>> {
        try {
          return (
            await this.api.client.request<ApiResponse<PageDtoInterface>>({
              url: `/v2/member/${memberId}/page/${pageId}`,
              method: 'PATCH',
              data,
            })
          ).data;
        } catch (error) {
          return this.api.handleException(error);
        }
      }
    
      public async deleteMemberPage(memberId: string, pageId: string): Promise<ApiResponse<OkInterface>> {
        try {
          return (
            await this.api.client.request<ApiResponse<OkInterface>>({
              url: `/v2/member/${memberId}/page/${pageId}`,
              method: 'DELETE',
            })
          ).data;
        } catch (error) {
          return this.api.handleException(error);
        }
      }
    
      public async createMemberPage(
        memberId: string,
        data: CreatePageRequestInterface
      ): Promise<ApiResponse<PageDtoInterface>> {
        try {
          return (
            await this.api.client.request<ApiResponse<PageDtoInterface>>({
              url: `/v2/member/${memberId}/page`,
              method: 'PUT',
              data,
            })
          ).data;
        } catch (error) {
          return this.api.handleException(error);
        }
      }
}

export const $memberPage = new MemberPageService($api);