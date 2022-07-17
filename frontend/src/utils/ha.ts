export function querySelector(ele: any, selector: any): any {
    // console.log('%O', ele)
    // 正常元素
    let findEle = ele.querySelector(selector)
    if (findEle) return findEle
    else if (ele.children.length > 0) {
        let children = ele.children
        for (let i = 0, j = children.length; i < j; i++) {
            let result = querySelector(children[i], selector)
            if (result) return result
        }
    }
    // 影子根
    if (ele.renderRoot) {
        findEle = ele.renderRoot.querySelector(selector)
        if (findEle) return findEle
        else if (ele.renderRoot.children.length > 0) {
            let children = ele.renderRoot.children
            for (let i = 0, j = children.length; i < j; i++) {
                let result = querySelector(children[i], selector)
                if (result) return result
            }
        }
    }
}

class HomeAssistant {

    get homeassistant(): any {
        return parent.document.querySelector('home-assistant')
    }

    get hass() {
        return this.homeassistant.hass
    }

    jsonClone(data: any) {
        return JSON.parse(JSON.stringify(data))
    }

    httpPost(url: string, body: object) {
        return this.hass.fetchWithAuth(url, {
            method: 'POST',
            body: JSON.stringify(body)
        }).then((res: any) => res.json())
    }

    httpPut(url: string, body: object) {
        return this.hass.fetchWithAuth(url, {
            method: 'PUT',
            body: JSON.stringify(body)
        }).then((res: any) => res.json())
    }

    httpGet(url: string, query = { t: Date.now() }) {
        let arr = []
        for (let [key, value] of Object.entries(query)) {
            arr.push(`${key}=${value}`)
        }
        if (arr.length > 0) {
            url += '?' + arr.join('&')
        }
        return this.hass.fetchWithAuth(url).then((res: any) => res.json())
    }

    httpDelete(url: string, body: object) {
        return this.hass.fetchWithAuth(url, {
            method: 'DELETE',
            body: JSON.stringify(body)
        }).then((res: any) => res.json())
    }

    /**
     * 发送事件
     * @param type 事件
     * @param data 数据
     * @param ele 默认元素
     */
    fireEvent(type: string, data = {}, ele: any = null) {
        const win = parent as any
        const event = new win.Event(type, {
            bubbles: true,
            cancelable: false,
            composed: true
        });
        event.detail = data;
        if (!ele) {
            ele = querySelector(win.document, 'app-drawer-layout')
        }
        ele.dispatchEvent(event);
    }

    /**
     * 全屏显示iframe
     */
    fullScreen() {
        const subpage = querySelector(parent.document, 'hass-subpage')
        let iframe = subpage.querySelector("iframe");
        let toolbar = subpage.shadowRoot.querySelector('.toolbar')
        subpage.shadowRoot.querySelector('.content').style.height = '100vh'
        iframe.style.position = 'absolute'
        toolbar.style.display = 'none'
        iframe.style.top = '0'
        iframe.style.height = '100%'
    }

    /**
     * 切换侧边栏
     */
    hassToggleMenu() {
        this.fireEvent("hass-toggle-menu")
    }
}

const ha = new HomeAssistant()

ha.fullScreen()
export default ha

