import { e, routes } from '@configs'
import axios from 'axios'

export const Page = (() => {
    let configs = {}

    const getConfigs = async () => {
        await axios.get(routes.config)
            .then((res) => {
                configs = { ...configs, ...res.data.configs }
                debugger
            })
            .catch((res) => {
                console.log(res);
            })
            ;
    }

    

    const info = { ...window.location }

    const hostname = info.hostname
    const pathname = info.pathname
    const search = info.search

    const isHost = (_hostname) => {
        return hostname === _hostname;
    }

    const isPageDetail1688 = () => {
        return isHost('detail.1688.com')
    }

    const override = () => {
        if (isHost('detail.1688.com')) {
            makeButtonAddToCart1688((btn) => {
                btn.style.display = 'none'
            })
        }
    }

    /**
     * Tao nut them vao gio hang cua Cong ty VC VN
     * Xoa nut order cu neu can
     */
    const makeButtonAddToCart1688 = (_overrideOldBtn = 'remove') => {
        const _b1 = document.querySelector("div.detail-affix-sku-wrapper > .order-button-wrapper")
        if (_overrideOldBtn === 'remove') {
            _b1.remove()
        } else if (_overrideOldBtn === 'function') {
            _overrideOldBtn(_b1)
        }

        const _patent = document.querySelector("div.detail-affix-sku-wrapper")
        const _b2 = document.createElement('div')
        _b2.id = e.btn_add_to_cart.id
        _patent.appendChild(_b2)
    }

    return {
        override,
        getConfigs,
        makeButtonAddToCart1688,
        configs
    }
})()

const myModule = (() => {
    // Hàm private không được xuất ra bên ngoài
    const privateFunction = () => {
        console.log("This is a private function");
    };

    // Hàm public được xuất ra bên ngoài để có thể sử dụng
    const publicFunction = () => {
        console.log("This is a public function");
    };

    // Hàm public khác
    const anotherPublicFunction = () => {
        console.log("This is another public function");
    };

    // Xuất các hàm public để có thể sử dụng trong các module khác
    return {
        publicFunction,
        anotherPublicFunction
    };
})();
