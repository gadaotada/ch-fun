// Desc: helper functions for general use

export function timeStampGen () {
    // returns time stamp for Bulgarian time zone - Sofia 
    // mostly used in error logging
    return new Date().toLocaleString('bg-BG', { timeZone: 'Europe/Sofia' })
}

export function getCurrDay () {
    // returns curr day in the following format "dd/mm/yyyy г" per Sofia
    // mostly used in client components
    return new Date().toLocaleString('bg-BG', { timeZone: 'Europe/Sofia' }).slice(0, 11)
}

const rgbaToHex = (rgba: string) => {
    let parts = rgba.substring(rgba.indexOf("(")).split(",");
    let r = parseInt(parts[0].trim().substring(1), 10);
    let g = parseInt((parts[1]).trim(), 10);
    let b = parseInt((parts[2]).trim(), 10);
    return "#" +
      (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
  }

export const getTailwindHexColor = (tailwindClass: string) => {
    if (typeof document === 'undefined') {
      return "#FFFFFF"; // or some default color
    }
  
    let el = document.createElement('div');
    el.className = tailwindClass;
    el.style.display = 'none'; // make it invisible
    document.body.appendChild(el);
  
    let color = window.getComputedStyle(el).backgroundColor;
    document.body.removeChild(el);
  
    return rgbaToHex(color);
  }