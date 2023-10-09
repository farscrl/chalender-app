import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { ComponentRef } from '@angular/core';

export class RouterReuseStrategy implements RouteReuseStrategy {
    private handlers: { [key: string]: DetachedRouteHandle } = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (!route.routeConfig || route.routeConfig.loadChildren) {
            return false;
        }

        /** Whether this route should be reused or not */
        return !!(route.routeConfig.data && route.routeConfig.data['reuseRouteKey']);
    }

    store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle): void {
        const routeKey = this.getKey(route);
        if (handler && routeKey) {
            this.handlers[routeKey] = handler;
        }
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const routeKey = this.getKey(route);

        if (!routeKey) {
            return false;
        }

        const shouldAttach = !!this.handlers[routeKey];
        return shouldAttach;
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        const routeKey = this.getKey(route);

        if (!route.routeConfig || route.routeConfig.loadChildren || !routeKey) {
            return null;
        }

        return this.handlers[routeKey];
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
        /** We only want to reuse the route if the data of the route config contains a reuse true boolean */
        let reUseUrl = false;
        if (future.routeConfig && future.routeConfig.data && typeof future.routeConfig.data['reuseRoute']) {
            reUseUrl = !!future.routeConfig.data['reuseRoute'];
        }

        const defaultReuse = future.routeConfig === current.routeConfig;
        return reUseUrl || defaultReuse;
    }

    /**
     * Returns the reuse key for the current route or null if none is set
     * @param route
     */
    private getKey(route: ActivatedRouteSnapshot): string | null {
        if (route.routeConfig && route.routeConfig.data) {
            return route.routeConfig.data['reuseRouteKey'];
        }
        return null;
    }

    /**
     * Clearing / Destorying all handles
     */
    clearHandles() {
        for (const key in this.handlers) {
            this.destroyHandle(this.handlers[key]);
        }
        this.handlers = {};
    }

    /**
     * Destroying a handle
     * @param handle
     */
    private destroyHandle(handle: DetachedRouteHandle): void {
        // @ts-ignore
        const componentRef: ComponentRef<any> = handle['componentRef'];

        if (componentRef) {
            componentRef.destroy();
        }
    }
}
