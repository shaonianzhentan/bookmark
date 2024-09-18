from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
import homeassistant.helpers.config_validation as cv

from .http import HttpView
from .const import DOMAIN, VERSION
from .shaonianzhentan import Page

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    hass.http.register_view(HttpView)
    
    await Page.async_register_www(Page.WWW_PATH, f"custom_components/{DOMAIN}/www")
    await Page.async_register_iframe("书签", "mdi:bookmark", DOMAIN, f"{Page.WWW_PATH}/index.html?ver={VERSION}", entry.options.get('require_admin', False))
    
    entry.async_on_unload(entry.add_update_listener(update_listener))
    return True

async def update_listener(hass, entry):
    """Handle options update."""
    await async_unload_entry(hass, entry)
    await async_setup_entry(hass, entry)

async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    await Page.async_remove_iframe(DOMAIN)
    return True