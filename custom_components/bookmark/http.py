import datetime, hashlib, uuid, time
from operator import index
from homeassistant.components.http import HomeAssistantView
from homeassistant.helpers.network import get_url
from homeassistant.helpers.storage import STORAGE_DIR

from homeassistant.util.json import load_json, save_json
from .manifest import manifest
DOMAIN = manifest.domain

CONFIG_FILE = f'{STORAGE_DIR}/bookmark.json'

class HttpView(HomeAssistantView):
    url = f'/{DOMAIN}-api'
    name = DOMAIN
    cors_allowed = True

    def get_config(self, hass):
        result = load_json(hass.config.path(CONFIG_FILE))
        if isinstance(result, dict):
            result = []
        return result

    def save_config(self, hass, data):
        save_json(hass.config.path(CONFIG_FILE), data)

    def datetime_now(self):
        return datetime.datetime.now().replace(microsecond=0).isoformat()

    def md5(self, text):
        return hashlib.md5(text.encode(encoding='UTF-8')).hexdigest()

    async def get(self, request):
        hass = request.app["hass"]
        # 获取全部书签
        config = self.get_config(hass)
        # 获取单个类型书签
        return self.json(config)

    async def delete(self, request):
        hass = request.app["hass"]
        response = await request.json()
        url = response.get('url')
        config = self.get_config(hass)
        for index, item in enumerate(config):
            if item['url'] == url:
                del config[index]
                break
        self.save_config(hass, config)
        return self.json(config)

    async def post(self, request):
        hass = request.app["hass"]
        response = await request.json()
        category = response.get('category')
        id = response.get('id')
        url = response.get('url')
        name = response.get('name')

        config = self.get_config(hass)
        not_exists = True
        for item in config:
            if item['url'] == url:
                item['name'] = name
                item['category'] = category
                not_exists = False
                break
        
        if not_exists:
            config.append({
                'category': category,
                'url': url,
                'name': name
            })

        self.save_config(hass, config)
        return self.json(config)