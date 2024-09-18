from homeassistant.core import async_get_hass
from homeassistant.components.frontend import async_register_built_in_panel, async_remove_panel
from homeassistant.components.http import StaticPathConfig

from .manifest import manifest

DOMAIN = manifest.domain

class Page:
    
    WWW_PATH = f'/{DOMAIN}-www'

    @staticmethod
    async def async_register_www(url_path, config_path, cache=False):
        hass = async_get_hass()
        await hass.http.async_register_static_paths(
            [ StaticPathConfig(url_path, hass.config.path(config_path), cache) ]
        )

    @staticmethod
    async def async_register_iframe(title, icon, url_path, url, require_admin=False):
        hass = async_get_hass()
        async_register_built_in_panel(hass, "iframe", title, icon, url_path,
                            { "url": url }, require_admin=require_admin)

    @staticmethod
    async def async_remove_iframe(url_path):
        hass = async_get_hass()
        async_remove_panel(hass, DOMAIN)