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
}

const ha = new HomeAssistant()
export default ha