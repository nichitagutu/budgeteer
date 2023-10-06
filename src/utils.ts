export function colorToRGBA(hex: string, opacity: number) {
  if (opacity < 0 || opacity > 1) {
    throw new Error("Opacity must be between 0 and 1");
  }

  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) {
    throw new Error(
      "Invalid HEX color format. Expected format: #RRGGBB. Got " + hex
    );
  }

  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  return `${hex}${alpha}`;
}

export function blurColor(color: string, fallback: string, alpha: number) {
  let fillColor;
  try {
    fillColor = colorToRGBA(color, alpha);
  } catch (error) {
    fillColor = colorToRGBA(fallback, alpha);
  }

  return fillColor;
}
