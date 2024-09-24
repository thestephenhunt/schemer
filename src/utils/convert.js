function RGBtoHSL(r,g,b) {
    let red = r / 255
    let green = g / 255
    let blue = b / 255

    let cmin = Math.min(red,green,blue),
        cmax = Math.max(red,green,blue),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0

    // Calculate the hue
    if (delta == 0)
        h = 0
    else if (cmax == red)
        h = ((green - blue) / delta) % 6
    else if (cmax == green)
        h = (blue - red) / delta + 2
    else
        h = (red - green) / delta + 4

    h = Math.round(h * 60)

    if (h < 0)
        h += 360

    l = (cmax + cmin) / 2

    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)

    return { h: h, s: s, l: l }
}

function RGBtoHex(r,g,b) {
    let red = r.toString(16)
    let green = g.toString(16)
    let blue = b.toString(16)

    if (red.length == 1) {
        red = "0" + red
    }
    if (green.length == 1) {
        green = "0" + green
    }
    if (blue.length == 1) {
        blue = "0" + blue
    }

    return "#" + red + green + blue
}

function HSLToHex(h,s,l) {
    let sat = s / 100;
    let lum = l / 100;
  
    let c = (1 - Math.abs(2 * lum - 1)) * sat,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = lum - c/2,
        r = 0,
        g = 0, 
        b = 0; 
  
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);
  
    // Prepend 0s, if necessary
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
}

function relLum(r,g,b) {
    let red = r/255
    let green = g/255
    let blue = b/255

    if (red <= 0.03928) {
        red = red/12.92
    } else {
        red = ((red+0.055)/1.055)**2.4
    }
    if (green <= 0.03928) {
        green = green/12.92
    } else {
        green = ((green+0.055)/1.055)**2.4
    }
    if (blue <= 0.03928) {
        blue = blue/12.92
    } else {
        blue = ((blue+0.055)/1.055)**2.4
    }

    return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function HexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

export {
    RGBtoHSL,
    RGBtoHex,
    HSLToHex,
    relLum,
    HexToRgb
}