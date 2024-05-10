; (() => {
    const innerText = (slt) => {
        return document.querySelector(slt)?.innerText ?? null
    }

    const linkImage = (slt) => {
        return document.querySelector(slt).getAttribute('src')
    }

    const link = (slt) => {
        return document.querySelector(slt).getAttribute('href')
    }

    const MyQuery = ((queryString) => {
        const params = new URLSearchParams(queryString);
        var obj = {};

        params.forEach(function (value, key) {
            obj[key] = value;
        });

        return obj;
    })(window.location.search)

    const Shop = {
        star: ((slt) => {
            return innerText(slt) ?? '5'
        })("#root [class*='ShopHeaderNew--starNum--'], #root [class*='ShopHeader--scoreText-']"),

        link: (() => {
            let url = document.querySelector("#root [class*='ShopHeaderNew--detailWrap--'][href], [class*='ShopHeader--board--'][href] ").getAttribute('href')

            let index = url.indexOf('?');
            let substringBeforeQuestionMark = index !== -1 ? url.substring(0, index) : url;
            return substringBeforeQuestionMark
        })(),
        name: document.querySelector("#root [class*='ShopHeaderNew--shopName--'][title], #root [class*='ShopHeader--title--'][title]").getAttribute('title'),
        img: document.querySelector("#root [class*='ShopHeaderNew--leftWrap--'] img[src], #root [class*='ShopHeader--pic--'][src]").getAttribute('src'),
    }

    const Sku = (() => {
        let skuCates = []
        let skuCatesDom = document.querySelectorAll("#root .skuWrapper .skuCate")
        if (skuCatesDom) {
            skuCatesDom.forEach(e => {
                let skuCate = {
                    skuCateText: e.querySelector('.skuCateText').innerText,
                    skuIcon: e.querySelector('.skuItem.current img[src]')?.getAttribute('src') ?? null,
                    skuItem: e.querySelector('.skuItem.current div[title]').getAttribute('title'),
                }
                skuCates.push(skuCate)
            });
        }

        const name = (() => {
            let str = ''
            skuCates.forEach(function (item) {
                str += item.skuCateText + " " + item.skuItem + ".";
            });

            return str
        })()

        return {
            categories: skuCates,
            name
        }
    })()

    const Item = {
        shop: {
            ...Shop
        },

        mainPic: ((selector) => {
            return document.querySelector(selector)?.getAttribute('src') ?? undefined
        })("#root img[class*='PicGallery--mainPic'], #root [class*='PicGallery--mainPicVideo'] video"),

        thumbnail: (() => {
            return linkImage("#root [class*='PicGallery--active--'] img[src], #root [class*='PicGallery--thumbnail--'] img[src]")
        })(),

        name: (() => {
            return document.querySelector("#root [class*='ItemHeader--mainTitle']").innerText
        })(),

        price: (() => {
            return document.querySelector("#root [class*='Price--priceText--']").innerText
        })(),

        link: (() => {
            return window.location.href
        })(),

        id: (() => {
            return MyQuery.id ?? null
        })(),

        itemIds: (() => {
            return MyQuery.itemIds ?? null
        })(),

        skuId: (() => {
            return MyQuery.skuId ?? MyQuery.skuIds ?? null
        })(),

        sku: {
            ...Sku
        },

        quantity: (() => {
            let e = document.querySelector("#root .quantityLine .countValueWrapper input")
            if (e) {
                return e.value
            }
            return 0
        })(),
    }
    console.table(Item);

    var serverUrl = 'http://localhost:8888/api/items';
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: Item
    };

    fetch(serverUrl, options)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                console.log(res.statusText);
            }
        })
        .then(res => {
            alert(res?.message)
        })
        .catch(error => {
            console.error('Error:', error);
        });
})()


const domain = ((host) => {
    const taobaoRegex = /.*\.taobao\.com/;
    const _1688 = /.*\.tmall\.com/;
    const alibabaRegex = /.*\.1688\.com/;

    if (taobaoRegex.test(host)) {
        return '_taobao';
    } else if (tmallRegex.test(host)) {
        return '_tmall';
    } else if (_1688.test(host)) {
        return '_1688';
    } else {
        return host;
    }
})(window.location.host)


function getContentFromDOM(item) {
    const result = {};
    for (const key in item) {
        const selector = item[key].selector;
        const value = item[key].value;
        const element = document.querySelector(selector);
        if (element) {
            result[key] = element[value];
        } else {
            result[key] = null;
        }
    }
    return result;
}

function detect(item) {
    const result = {};

    const taobaoRegex = /.*\.taobao\.com/;
    const tmallRegex = /.*\.tmall\.com/;
    const alibabaRegex = /.*\.1688\.com/;

    for (const prop in item) {
        const selector = item[key][domain];

        console.log(selector);

    }
    return result;
}


const ItemDom = {
    name: {
        _taobao: '.ItemHeader--mainTitle--3CIjqW5',
        _1688: '.ItemHeader--mainTitle--3CIjqW5',
        _tmall: '.ItemHeader--mainTitle--3CIjqW5',
        return: 'value',
    },
    price: {
        _taobao: '.Price--priceText--2nLbVda',
        _1688: '.Price--priceText--2nLbVda',
        _tmall: '.Price--priceText--2nLbVda',
        return: 'innerText'
    }
}

detect(ItemDom)



Document.prototype.tb = (function () {
    const item = document.querySelector("#root [class*='BasicContent--itemInfo--']")
})()

Document.prototype.queryByText = function (className, searchText) {
    const parentElement = this.querySelector(`.${className}`);
    if (!parentElement) return null;

    const childElements = parentElement.querySelectorAll('*');
    let foundElement = null;

    childElements.forEach(element => {
        const text = element.innerText || element.textContent;


        if (text.includes(searchText)) {
            foundElement = element;
            return;
        }
    });

    return foundElement;
};