export interface HttpAdapterR{
    get<T>(url:string): Promise<T>
}
