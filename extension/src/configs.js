export const env = import.meta.env

export const e =
{
    toolbar: {
        component: 'ToolBar',
        id: 'vitexpress_toolbar',
    },
    btn_add_to_cart: {
        component: 'ButtonAddToCart',
        id: 'vitexpress_cart'
    }
}

const api = import.meta.env.VITE_API_URL;

export const routes = {
    api,
    users: {
        index: api + '/users',
        find: api + '/user',
        store: api + '/users/store',
        update: api + '/users/update',
        destroy: api + '/user/destroy',
    },
    config: api + '/configs'
}
