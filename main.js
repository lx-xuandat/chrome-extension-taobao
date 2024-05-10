class DomainDetector {
    constructor(domain) {
        this.domain = this.detectDomain(domain);
    }

    detectDomain(host) {
        const regex = {
            _taobao: /.*\.taobao\.com/,
            _tmall: /.*\.tmall\.com/,
            _1688: /.*\.1688\.com/,
        };

        for (let key in regex) {
            if (regex[key].test(host)) {
                return key;
            }
        }

        return undefined;
    }
}

class Order {
    constructor(domain) {
        this.domainDetector = new DomainDetector(domain);
        this.msgUndefined = "Chua xac dinh."
        this.strError = undefined
    }

    read(element) {
        let value = undefined;
        if (element.nodeType === Node.ELEMENT_NODE) {
            switch (element.tagName) {
                case 'IMG':
                    value = element.src;
                    break;
                case 'A':
                    value = element.href;
                    break;
                case 'INPUT':
                    value = element.value;
                    break;
                default:
                    const title = element.getAttribute('title');
                    const src = element.getAttribute('src');
                    const href = element.getAttribute('href');
                    if (title) {
                        value = title;
                    } else if (src) {
                        value = src;
                    } else if (href) {
                        value = href;
                    } else {
                        const hasChildren = element.children.length > 0;
                        if (!hasChildren) {
                            value = element.innerText;
                        }
                    }
                    break;
            }
        }
        return value;
    }

    get(item) {
        let results = {};

        for (const prop in item) {
            if (item[prop]['key'] && item[prop]['value']) {
                const skus = [];
                const parentSelector = item[prop]['parent'][this.domainDetector.domain];
                const parentElements = document.querySelectorAll(parentSelector);

                if (parentElements instanceof NodeList) {
                    parentElements.forEach(parentElement => {
                        let keyElement = parentElement.querySelector(item[prop]['key'][this.domainDetector.domain]);
                        let valueElement = parentElement.querySelector(item[prop]['value'][this.domainDetector.domain]);

                        const sku = {
                            'key': keyElement ? this.read(keyElement) : this.msgUndefined,
                            'value': valueElement ? this.read(valueElement) : this.msgUndefined,
                        };
                        skus.push(sku);
                    });
                }

                results[prop + 'Msg'] = skus.map(item => `${item.key} ${item.value}`).join('\n');
                results[prop] = skus;
            } else {
                const selector = item[prop][this.domainDetector.domain];
                const elements = document.querySelector(selector);
                if (elements instanceof Node) {
                    results[prop] = this.read(elements);
                } else {
                    results[prop] = this.msgUndefined
                }
            }
        }

        if (this.valid(results) === true) {
            return results;
        } else {
            alert(this.strError)
        }

    }

    valid(item) {
        this.strError = Object.keys(item).reduce((strPrev, prop) => {
            if (typeof item[prop] === 'string') {
                return strPrev + prop + ": " + item[prop] + ", ";
            }

            return strPrev
        }, '');

        return this.strError.indexOf(this.msgUndefined) === -1
    }
}

const ItemDom = {
    name: {
        _taobao: '.ItemHeader--mainTitle--3CIjqW5',
        _tmall: '.ItemHeader--mainTitle--3CIjqW5',
    },

    price: {
        _taobao: '.Price--priceText--2nLbVda',
        _tmall: '.Price--priceText--2nLbVda',
    },

    mainPic: {
        _taobao: '#root [class*="PicGallery--mainPic"] img, img[class*="PicGallery--thumbnailPic"]',
        _tmall: '#root [class*="PicGallery--mainPic"] img, img[class*="PicGallery--thumbnailPic"]',
    },

    skuCate: {
        parent: {
            _taobao: '.skuCate',
            _tmall: '.skuCate',
        },
        key: {
            _taobao: '.skuCateText',
            _tmall: '.skuCateText',
        },
        value: {
            _taobao: '.skuItem.current div[title]',
            _tmall: '.skuItem.current div[title]',
        }
    },

    quantity: {
        _taobao: '.countWrapper input',
        _tmall: '.countWrapper input',
    }
};

const order = new Order(window.location.host);

fetch('http://localhost:8888/api/items', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(order.get(ItemDom))
})
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            console.log(res.statusText);
        }
    })
    .then(res => {
        // alert(res?.message)
    })
    .catch(error => {
        console.table(error);
    })
    ;
